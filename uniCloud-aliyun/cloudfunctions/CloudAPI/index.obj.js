// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function() { // 通用预处理器

	},
	querySku: async function(content) {
		const fnsku = content.trim()
		const query = "'fnsku' ==" + "'" + fnsku + "'"
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})
		const QueryRes = await dbJQL.collection('sku').where(query).get()
		if (QueryRes.data.length >= 1) {
			return QueryRes.data[0].sku
		} else {
			return fnsku
		}
	},
	querySkuList: async function(content) {
		// 1. 解析数据
		const db = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})
		content = content.trim()
		let skuArr = content.split('|')[0].split(';')
		const fnskuSet = new Set();
		let skuList = []
		for (let item of skuArr) {
			fnskuSet.add(item.split(",")[0])
			skuList.push({
				fnsku: item.split(",")[0],
				number: item.split(",")[1]
			})
		}

		// 2. 批量查询sku信息
		const skuMap = new Map();
		if (fnskuSet.size > 0) {
			const skuRes = await db.collection('sku')
				.where({
					fnsku: db.command.in(Array.from(fnskuSet))
				})
				.field('fnsku,sku')
				.get();

			skuRes.data.forEach(item => {
				skuMap.set(item.fnsku, item.sku);
			});
		}

		//3. 将sku填入
		return skuList.map(item => ({
			sku: skuMap.get(item.fnsku) || item.fnsku,
			fnsku: item.fnsku,
			number: item.number,
		}))


	},
	queryBox: async function(boxid) {
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()

		})

		const query = "'boxid' ==" + "'" + boxid + "'"

		const queryRes = await dbJQL.collection('inventory').where(query).get()
		if (queryRes.data.length >= 1) {
			return {
				skuList: queryRes.data[0].skuList,
				weight: queryRes.data[0].weight
			}
		} else {
			return 0
		}



	},
	updateBox: async function(boxid, skuList, weight) {
		try {
			// 参数验证
			if (!boxid || !Array.isArray(skuList) || !weight) {
				throw new Error('参数不合法')
			}

			const dbJQL = uniCloud.databaseForJQL({
				clientInfo: this.getClientInfo()
			})

			// 构建 QRdata
			const items = skuList.map(item => {
				if (!item.fnsku || !item.number) {
					throw new Error('skuList 格式不正确')
				}
				return `${item.fnsku},${item.number}`
			})

			const QRdata = `${items.join(';')}|${weight}|${boxid}`

			// 获取账户名
			const accountParts = boxid.split('_')
			if (accountParts.length < 1) {
				throw new Error('boxid 格式不正确')
			}
			const account = accountParts[0]

			// 检查记录是否存在
			const existingRecord = await dbJQL.collection('inventory')
				.where({
					boxid: boxid
				})
				.get()



			if (existingRecord.data.length > 0) {
				// 更新现有记录
				await dbJQL.collection('inventory')
					.where({
						boxid: boxid
					})
					.update({
						product: QRdata,
						state: 1,
						skuList,
						weight
					})
				return 1
			} else {
				// 新增记录
				await dbJQL.collection('inventory').add({
					boxid,
					account,
					product: QRdata,
					state: 1,
					skuList,
					weight
				})
				return 0
			}
		} catch (error) {
			console.error('库存操作失败:', error)
			throw error
		}
	}
}
