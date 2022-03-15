/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {

	async getItems() {
		// const sql = `
		// 	SELECT 		author_name,
		// 				item_description,
		// 				item_hash,
		// 				item_title,
		// 				on_sale_yn,
		// 				owner_address,
		// 				token_id,
		// 				created_at as items_create_at
		// 	FROM    	items
		// 	WHERE 		on_sale_yn = TRUE
		// 	ORDER BY    created_at DESC
		// `;
		const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			ORDER BY    created_at DESC
		`;
		console.debug(sql);

		return await connection.query(sql)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByOwnerAddress(address) {
		const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		owner_address=?
			ORDER BY    created_at DESC
		`;
		console.debug(sql);

		return await connection.query(sql, [address])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getRecentRegisteredItem() {
		return null;
	}

	async getRecentItemsOnSale() {
		return null;
	}

	async getItemByTokenId(tokenId) {
		const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		token_id=?
			ORDER BY    created_at DESC
		`;
		console.debug(sql);

		return await connection.query(sql, [tokenId])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async updateItemOwnerAddress(tokenId, ownerAddress) {
		return null;
	}

	async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
		const sql = `UPDATE items SET token_id=?, owner_address=? WHERE id=?`;
		console.debug(sql);

		const values = [
			tokenId, ownerAddress, itemId
		];

		return await connection.query(sql, values)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async validateItemDuplicated(hashCode) {
		const sql = `SELECT item_hash FROM items WHERE=?`;
		console.debug(sql);

		return await connection.query(sql, [hashCode])
		.then(data => data[0])
		.catch((e) => {
			console.error(e);
			throw e;
		});
	}

	async createItems(data) {
		const sql = `INSERT INTO items (author_name, item_title, item_description, item_hash) VALUES ?`;
		console.debug(sql);

		const values = [
			[ data.author, data.title, data.description, data.hashCode ]
		];

		return await connection.query(sql, [values])
		.then(data => data[0].insertId)
		.catch((e) => {
			console.error(e);
			throw e;
		});
	}
}

module.exports = ItemsRepository;