import * as Yup from "yup";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { MotionContainer, varBounceIn } from "../components/animate";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ItemList from "../layouts/whosart/ItemList";
import COMMON_HEADER from "../common/HeaderType";
import COMMON_ABI from "../common/ABI";
import COMMON_CONTRACT from "../common/SaleInfoGetter";
import { onResponse, onInvalidAddress } from "../common/ErrorMessage";
import moment from "moment";
import axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";

/**
 * [후즈컬렉션]를 위한 UI와 기능
 */
const WhosArt = () => {
  // [변수] 판매자 주소 (URL 파라미터 사용 / 구매하기 - 상세 작품 화면 - 컬렉션 보기로 진입한 경우 사용)
  const prevAddress = useLocation().pathname.substring(9);

  // [변수] 아이템, 로딩, 컬렉션 유무, 현재 시간
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const currentTime = parseInt((moment() / 1000).toFixed(0));

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 판매되고 있는 작품 리스트를 조회합니다.
   * 만약 구매하기 - 상세 작품 화면 - 컬렉션 보기로 진입한 경우 판매자 주소가 넘어오며,
   * 해당 주소를 조회하여 판매하고 있는 아이템을 확인합니다.
   */
  useEffect(() => {
    // if (prevAddress !== "app") searchItem(prevAddress);
    if (prevAddress !== "") searchItem(prevAddress);
    else {
      showItems();
    }
  }, []);

  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    address: Yup.string().required(),
  });

  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      checkAddress(value.address);
    },
  });
  const { isSubmitting, setSubmitting, handleSubmit, handleReset, getFieldProps } = formik;

  // 카드 화면 생성을 위한 데이터 전달
  const products = [...Array(item.length)].map((_, index) => {
    return {
      image: item[index].image,
      title: item[index].title,
      onSale: item[index].onSale,
      tokenId: item[index].id,
      hash: item[index].hash,
      ended: item[index].ended,
    };
  });

  /**
   * [주소 정합성 확인]
   * 지갑 주소 창에 입력한 주소가 유효한 주소인 경우에 아이템을 조회하며,
   * 지갑 주소 형태가 아닌 경우에는 유효한 주소를 입력해달라는 경고창을 출력합니다.
   * @param {*} addr
   */
  const checkAddress = (addr) => {
    const targetAddress = web3.utils.isAddress(addr);

    if (targetAddress) searchItem(addr);
    else {
      setSubmitting(false);
      onInvalidAddress();
    }
  };

  /**
   * PJT Ⅱ - 과제 2: 작품 조회
   * Req.2-F1 작품 목록 조회
   *
   * PJT Ⅲ - 과제 2: 거래 진행
   * Req.4-F2 후즈컬렉션 화면 - 판매 상태에 따라 호출할 수 있는 기능이 달라집니다.
   *
   * 구현 예)
   * 지갑 주소가 입력되어 있지 않은 경우 현재 판매중인 모든 아이템을 화면 상에 보여줍니다.
   * 1. 판매 작품 조회 API 호출 후 반환 받은 데이터를 가지고 카드 화면을 생성합니다.
   * 요청 응답 데이터: Token ID, Sale 컨트랙트 주소, 아이템 Hash(카드 화면의 고유 구별 Key), 제목, 판매중 여부
   * 2. NFT 컨트랙트의 tokenURI() 함수를 호출해 이미지를 화면에 표시할 수 있어야 합니다.
   * 3. 빈 응답인 경우 결과 없음 화면이 출력됩니다.
   * ------
   *
   * PJT Ⅲ에 아래 로직이 추가됩니다.
   * Sale 컨트랙트의 상태와 버튼을 조회하여 종료 여부를 카드 요소에 전달합니다.
   */
  const showItems = async () => {
    // TODO
    // setIsCollection(false);
    // setLoading(false);

    setLoading(true);

    try {
      const resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + "/items");
      console.log(resp);

      const items = resp.data.items;
      console.log(items);

      if (items.length == 0) setIsCollection(false);
      else {
        setIsCollection(true);

        const ssafyNft = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.NFT_ABI, process.env.REACT_APP_NFT_CA);

        // setItem(
        //   items.map(async (item) => {
        //     if (item.token_id == null) item.token_id = 0;
        //     let URI = await ssafyNft.methods.tokenURI(item.token_id).call();
        //     if (URI == null) URI = "SOME URI";

        //     const data = {
        //       image: URI,
        //       title: item.item_title,
        //       onSale: item.on_sale_yn,
        //       tokenId: item.token_id,
        //       hash: item.item_hash,
        //     };
        //     console.log(data);
        //   })
        // );

        let itemList = [];
        for (const item of items) {
          if (item.token_id == null) continue;

          // const image = await ssafyNft.methods.tokenURI(item.token_id).call({});
          // console.log(image);
          itemList.push({
            image: await ssafyNft.methods.tokenURI(item.token_id).call(),
            title: item.item_title,
            onSale: item.on_sale_yn,
            id: item.token_id,
            hash: item.item_hash,
            ended: item.on_sale_yn == 0,
          });
        }
        setItem(itemList);
      }
    } catch (err) {
      console.log(err);
      setIsCollection(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * PJT Ⅱ - 과제 2: 작품 조회
   * Req.2-F2 특정 주소의 보유 작품 목록 조회
   *
   * PJT Ⅲ - 과제 2: 거래 진행
   * Req.4-F2 후즈컬렉션 화면 - 판매 상태에 따라 호출할 수 있는 기능이 달라집니다.
   *
   * 구현 예)
   * 지갑 주소 입력 시 해당 주소가 보융한 작품 목록을 보여줍니다.
   * 1. 판매 작품 조회 API 호출(with additional query data) 후 반환 받은 데이터를 가지고 카드 화면을 생성합니다.
   * 요청 응답 데이터: Token ID, Sale 컨트랙트 주소, 아이템 Hash(카드 화면의 고유 구별 Key), 제목, 판매중 여부
   * 2. NFT 컨트랙트의 tokenURI() 함수를 호출해 이미지를 화면에 표시할 수 있어야 합니다.
   * 3. 빈 응답인 경우 결과 없음 화면이 출력됩니다.
   * ------
   *
   * PJT Ⅲ에 아래 로직이 추가됩니다.
   * Sale 컨트랙트의 상태와 버튼을 조회하여 종료 여부를 카드 요소에 전달합니다.
   */
  const searchItem = async (addr) => {
    // TODO
    // setIsCollection(false);
    // setLoading(false);

    try {
      setLoading(true);

      var resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + `/items?address=${addr}`);
      console.log(resp);

      const items = resp.data.items;
      console.log(items);

      if (items.length == 0) setIsCollection(false);
      else {
        setIsCollection(true);

        const ssafyNft = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.NFT_ABI, process.env.REACT_APP_NFT_CA);

        let itemList = [];
        alert("let's loop");
        for (const item of items) {
          if (item.token_id == null) continue;

          var resp = await axios
            .get(process.env.REACT_APP_BACKEND_HOST_URL + `/sales?token_id=${item.token_id}`)
            .catch((err) => console.log("searchItem get sale error", err));
          const sale = resp.data.data;
          const saleContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.SALE_ABI, sale.sale_contract_address);

          // const image = await ssafyNft.methods.tokenURI(item.token_id).call({});
          // console.log(image);
          console.log(item.on_sale_yn, item.on_sale_yn === 0);
          itemList.push({
            image: await ssafyNft.methods.tokenURI(item.token_id).call(),
            title: item.item_title,
            onSale: item.on_sale_yn,
            id: item.token_id,
            hash: item.item_hash,
            ended: (await saleContract.methods.getTimeLeft().call()) < 0,
          });
        }
        setItem(itemList);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%">
      <Container maxWidth="xl">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} onReset={handleReset}>
            <Stack direction="row" sx={{ mt: 2 }} justifyContent="center" alignItems="center">
              <TextField sx={{ width: "40%" }} type="text" label="지갑 주소" {...getFieldProps("address")} />
              <LoadingButton sx={{ ml: 5, fontSize: 18 }} size="large" type="submit" variant="contained" loading={isSubmitting}>
                확인
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>

        {loading === true ? (
          <Container>
            <MotionContainer initial="initial" sx={{ mt: 10 }} open>
              <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                <motion.div variants={varBounceIn}>
                  <Typography variant="h3" paragraph>
                    아이템 로딩중...
                  </Typography>
                </motion.div>
                <Typography sx={{ color: "text.secondary" }}>아이템을 검색하고 있습니다.</Typography>

                <motion.div variants={varBounceIn}>
                  <Box
                    component="img"
                    src="/static/illustrations/illustration_register.png"
                    sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                  />
                </motion.div>
              </Box>
            </MotionContainer>
          </Container>
        ) : (
          <>
            {isCollection === true ? (
              <ItemList sx={{ mt: 5 }} products={products} />
            ) : (
              <Container>
                <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                  <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                    <motion.div variants={varBounceIn}>
                      <Typography variant="h3" paragraph>
                        검색 결과 없음
                      </Typography>
                    </motion.div>
                    <Typography sx={{ color: "text.secondary" }}>보유하고 있는 컬렉션이 없습니다.</Typography>

                    <motion.div variants={varBounceIn}>
                      <Box
                        component="img"
                        src="/static/illustrations/illustration_register.png"
                        sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                      />
                    </motion.div>
                  </Box>
                </MotionContainer>
              </Container>
            )}
          </>
        )}
      </Container>
    </Page>
  );
};

export default WhosArt;
