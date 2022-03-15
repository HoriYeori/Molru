/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];

    const instance = await NftCreator.deployed();

    const tokenURI = "https://nft.example/nft-id-8u5h2m.json";
    const newNFT = await instance.create(sender, tokenURI);
    const newTokenId = await instance.current();
    assert.equal(sender, await instance.ownerOf(newTokenId), "NFT Mint Failed");

    await instance.transferFrom(sender, receiver, newTokenId);
    assert.equal(
      receiver,
      await instance.ownerOf(newTokenId),
      "NFT Transfer Failed."
    );

    const tokenURIFetched = await instance.tokenURI(newTokenId);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
  });
});
