# 블록체인 프로젝트

탈중앙형 NFT 거래 플랫폼 **스켈레톤 코드**입니다.

- backend (Node.js)
- frontend (React.js)
- contracts (Truffle/Solidity)

## 명세서 읽고 구현하기(오용록)

### 개발 환경 구성

- nvm으로 node 버전 관리(lts 버전 사용)

```bash
$ nvm install lts
$ nvm use lts
```

- 트러플 설치

```bash
$ npm i truffle -g
```

- 트러플 프로젝트 생성 (연습용)

```bash
$ mkdir nft-contracts
$ cd nft-contracts
$ (nft-conftracts)> truffle init
```

### 백엔드 DB 설정

- Docker Hub 에서 nft-mysql 이미지 가져와서 실행 (Port: 3307)

```bash
$ docker pull noncelab/nft-mysql
$ docker run -d -p 3307:3306 --name nft-mysql noncelab/nft-mysql
```

- 백엔드 설정(.env) 수정

```
DB_HOST=localhost
DB_PORT=3307
DB_USER=bcssafy
DB_PASSWORD=bcssafy
DB_SCHEMA=nftdb
```

### 과제 1 ERC-721 구현

- NFT의 표준 규약인 EIP-721을 참고하여 ERC721.sol 완성
- OpenZeppelin을 참고하여 보다 더 좋은 코드로 수정

### 과제 2 NFT Creator 구현

- 과제 1에서 구현한 ERC721를 상속하는 SsafyNFT 구현
- SsafyNFT에서 create호출 시 ERC721의 mint 호출되게 구현
- OpenZeppelin Docs를 참고하여 구현

### 과제 3 테스트 코드 작성

- 과제 2에서 구현한 SsafyNFT가 올바르게 동작하는지 테스트 코드를 작성
- test/NftContractTest.js 에 작성
- 참고: https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html#using-asyncawait

### 프로젝트 배포

- 스마트 컨트랙트 컴파일 (build 폴더 생성)

```bash
$ truffle compile
```

- 스마트 컨트랙트 배포 설정 환경인 가나슈 설치
  Link: https://trufflesuite.com/ganache/

- 스마트 컨트랙트 배포

```bash
$ truffle migrate
```

- 테스트 코드 실행

```bash
$ truffle test ./test/NftContractTest.js
```
