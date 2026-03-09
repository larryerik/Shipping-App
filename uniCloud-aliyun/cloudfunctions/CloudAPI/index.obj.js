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
	},
	toWarehouse: async function(boxNoList) {
	
			// 1. 获取并去重所有要处理的boxid
			const boxIdList = [...new Set(Array.isArray(boxNoList) ? boxNoList : [])];
			if (boxIdList.length === 0) {
				return {
					code: 0,
					message: '无有效boxid',
					updated: 0
				};
			}
	
			const db = uniCloud.databaseForJQL({
				clientInfo: this.getClientInfo()
			});
			const dbCmd = db.command;
	
			// 2. 定义每批处理的大小（关键参数）
			const BATCH_SIZE = 200; // 可根据实际情况调整，建议 200-1000
			let totalUpdated = 0;
			const errors = [];
	
			// 3. 将超长ID列表拆分成多个批次
			for (let i = 0; i < boxIdList.length; i += BATCH_SIZE) {
				const currentBatch = boxIdList.slice(i, i + BATCH_SIZE);
	
				try {
					console.log(`正在处理第 ${Math.floor(i/BATCH_SIZE) + 1} 批，共 ${currentBatch.length} 个ID`);
	
					// 4. 批量更新当前这批数据
					const updateResult = await db.collection('inventory')
						.where({
							boxid: dbCmd.in(currentBatch) // 每批只传入200个ID
						})
						.update({
							state: 1
	
						});
	
					totalUpdated += updateResult.updated || 0;
	
					// 5. 可选：每批处理完稍作停顿，减轻数据库压力
					if (i + BATCH_SIZE < boxIdList.length) {
						await new Promise(resolve => setTimeout(resolve, 100));
					}
	
				} catch (err) {
					console.error(`第 ${Math.floor(i/BATCH_SIZE) + 1} 批处理失败:`, err);
					errors.push({
						batchIndex: Math.floor(i / BATCH_SIZE) + 1,
						error: err.message
					});
					// 根据需求决定：是继续下一批，还是终止整个操作
					// 这里选择继续，记录错误后继续处理下一批
				}
			}
	
			// 6. 返回汇总结果
			const result = {
				code: errors.length === 0 ? 0 : 207, // 207 表示部分成功
				message: `处理完成。成功更新 ${totalUpdated} 条记录。`,
				updated: totalUpdated,
				totalBatches: Math.ceil(boxIdList.length / BATCH_SIZE)
			};
	
			if (errors.length > 0) {
				result.errors = errors;
				result.errorCount = errors.length;
			}
	
			return result;
	
		},
	outWarehouse: async function(boxNoList) {
	
			// 1. 获取并去重所有要处理的boxid
			const boxIdList = [...new Set(Array.isArray(boxNoList) ? boxNoList : [])];
			if (boxIdList.length === 0) {
				return {
					code: 0,
					message: '无有效boxid',
					updated: 0
				};
			}
	
			const db = uniCloud.databaseForJQL({
				clientInfo: this.getClientInfo()
			});
			const dbCmd = db.command;
	
			// 2. 定义每批处理的大小（关键参数）
			const BATCH_SIZE = 200; // 可根据实际情况调整，建议 200-1000
			let totalUpdated = 0;
			const errors = [];
	
			// 3. 将超长ID列表拆分成多个批次
			for (let i = 0; i < boxIdList.length; i += BATCH_SIZE) {
				const currentBatch = boxIdList.slice(i, i + BATCH_SIZE);
	
				try {
					console.log(`正在处理第 ${Math.floor(i/BATCH_SIZE) + 1} 批，共 ${currentBatch.length} 个ID`);
	
					// 4. 批量更新当前这批数据
					const updateResult = await db.collection('inventory')
						.where({
							boxid: dbCmd.in(currentBatch) // 每批只传入200个ID
						})
						.update({
							state: 0
	
						});
	
					totalUpdated += updateResult.updated || 0;
	
					// 5. 可选：每批处理完稍作停顿，减轻数据库压力
					if (i + BATCH_SIZE < boxIdList.length) {
						await new Promise(resolve => setTimeout(resolve, 100));
					}
	
				} catch (err) {
					console.error(`第 ${Math.floor(i/BATCH_SIZE) + 1} 批处理失败:`, err);
					errors.push({
						batchIndex: Math.floor(i / BATCH_SIZE) + 1,
						error: err.message
					});
					// 根据需求决定：是继续下一批，还是终止整个操作
					// 这里选择继续，记录错误后继续处理下一批
				}
			}
	
			// 6. 返回汇总结果
			const result = {
				code: errors.length === 0 ? 0 : 207, // 207 表示部分成功
				message: `处理完成。成功更新 ${totalUpdated} 条记录。`,
				updated: totalUpdated,
				totalBatches: Math.ceil(boxIdList.length / BATCH_SIZE)
			};
	
			if (errors.length > 0) {
				result.errors = errors;
				result.errorCount = errors.length;
			}
	
			return result;
	
		},
}
