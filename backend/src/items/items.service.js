/**
 * Services Logics related to Digital Assets(item)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ItemsRepository = require('./items.repository');
const {getS3List, deleteS3Object} = require("../../config/s3-config");
const itemRepository = new ItemsRepository();

class ItemsService {

	/**
 	 * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 (파일 업로드 포함)
	 * 1. 이미지의 중복 여부를 판별합니다.
	 * 2. 중복된 이미지가 없다면 정보를 DB에 추가합니다.
	 * 3. 저장된 작품의 id를 responseBody에 추가하여 반환합니다.
	 * 
     */
	async createItems(req) {
		// 이미지 중복 여부 판별
		// const list = await getS3List();
		// const isDup = list.filter(img => img.ETag === req.file.etag);

		// if(isDup) {
		// 	return {
		// 		statusCode: 409,
		// 		responseBody: {
		// 			result: 'Duplicate img',
		// 		}
		// 	}
		// }

		// DB 추가
		const data = {
			author: req.body.author,
			title: req.body.title,
			description: req.body.description,
			hashCode: req.file.key,
			// hashCode: req.file.etag,
		}
		const itemId = await itemRepository.createItems(data);

		return {
			statusCode: 201,
			responseBody: {
				result: 'success',
				itemId: itemId,
			}
		}
	}

	/**
	 * PJT Ⅱ - 과제 1: Req.1-B2 작품 정보 업데이트
	 */
	async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
		if (await itemRepository.updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress)) {
			return {
				statusCode: 200,
				responseBody: {
					result: 'success'
				}
			};
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B1 작품 목록 조회 
	 * Req.2-B2 주소가 보유한 작품 목록 조회
	 *
	 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
	 * Req.4-B1 작품 목록 조회
	 * Req.4-B2 주소가 보유한 작품 목록 조회
	 */
	async getItems(address) {
		const items = address ? await itemRepository.getItemsByOwnerAddress(address) : await itemRepository.getItems();

		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: items
			}
		};
	}

	/*
	 * PJT Ⅲ 과제 3: 
	 * Req.4-B3 최근 등록 작품 조회
	 */
	async getRecentItems() {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B3 작품 상세 조회 
	 */
	async getItemByTokenId(tokenId) {
		const items = await itemRepository.getItemByTokenId(tokenId);

		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: items
			}
		};
	}


	async updateItemOwnerAddress(tokenId, ownerAddress) {
		if (await itemRepository.updateItemOwnerAddress(tokenId, ownerAddress)) {
			return {
				statusCode: 200,
				responseBody: {
					result: 'success'
				}
			};
		}
	}

}

module.exports = ItemsService;