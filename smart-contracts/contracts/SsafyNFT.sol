// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("SsafyNFT", "SNFT") {
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function increment() public {
        _tokenIds += 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        tokenURIs[tokenId] = _tokenURI;
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        increment();

        uint256 newItemId = current();
        _mint(to, newItemId);
        setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }
}