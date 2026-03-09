<template>
	<view class="page">
		<view class="table-head">
			<text class="head-cell">序号</text>
			<text class="head-cell">数量</text>
			<text class="head-cell">重量</text>
			<text class="head-cell">箱号</text>
			<text class="head-cell head-action">操作</text>
		</view>

		<scroll-view scroll-y class="list-wrap">
			<view v-for="(item, index) in boxes" :key="item.id" class="row" @click="showBoxDetail(item)">
				<text class="cell seq">{{ index + 1 }}</text>
				<text class="cell">{{ item.qty }}</text>
				<text class="cell">{{ item.weight }}kg</text>
				<text class="cell">{{ item.boxNo || '-' }}</text>
				<text class="cell action" @click.stop="removeBox(item.id)">删除</text>
			</view>
		</scroll-view>

		<view class="stats">
			<text>总箱数: {{ totalBox }}</text>
			<text>总数量: {{ totalQty }}</text>
			<text>总重量: {{ totalWeight }}kg</text>
		</view>

		<view class="bottom-actions">
			<view class="btn primary" @click="scanBox">扫码</view>
			<view class="btn" @click="clearAll">清空</view>
			<view class="btn accent" @click="operateOptions">操作</view>
		</view>

		<view class="mask" v-if="detailVisible" @click="detailVisible = false"></view>
		<view class="detail-popup" v-if="detailVisible">
			<view class="title">整箱详情 - {{ currentBox.boxNo || '无箱号' }}</view>
			<view class="detail-body">
				<scroll-view v-if="currentBox.details && currentBox.details.length" scroll-y class="detail-list">
					<view v-for="(line, idx) in currentBox.details" :key="`${line.sku}-${idx}`" class="detail-line">
						<text>{{ line.sku }}</text>
						<text>{{ line.qty }}</text>
					</view>
				</scroll-view>
				<view v-else class="detail-empty">暂无产品</view>
			</view>
			<view class="close-btn" @click="detailVisible = false">
				关闭
			</view>
		</view>
	</view>
</template>

<script>
	const SHIPPING_CACHE_KEY = 'shipping_cache'

	export default {
		onLoad() {
			this.loadCache()
		},
		onHide() {
			this.saveCache()
		},
		onUnload() {
			this.saveCache()
		},
		data() {
			return {
				detailVisible: false,
				currentBox: { boxNo: '', details: [] },
				boxes: []
			}
		},
		watch: {
			boxes: {
				deep: true,
				handler() {
					this.saveCache()
				}
			}
		},
		computed: {
			totalBox() {
				return this.boxes.length
			},
			totalQty() {
				return this.boxes.reduce((sum, item) => sum + Number(item.qty || 0), 0)
			},
			totalWeight() {
				const n = this.boxes.reduce((sum, item) => sum + Number(item.weight || 0), 0)
				return n.toFixed(1)
			}
		},
		methods: {
			loadCache() {
				const cache = uni.getStorageSync(SHIPPING_CACHE_KEY)
				if (!cache || typeof cache !== 'object') return
				if (!Array.isArray(cache.boxes)) return
				this.boxes = cache.boxes.map(item => ({
					id: String(item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
					qty: Number(item.qty || 0),
					weight: Number(item.weight || 0),
					boxNo: String(item.boxNo || ''),
					details: Array.isArray(item.details)
						? item.details.map(line => ({
							sku: String(line.sku || ''),
							fnsku: String(line.fnsku || ''),
							qty: Number(line.qty || 0)
						})).filter(line => line.sku)
						: []
				}))
			},
			saveCache() {
				uni.setStorageSync(SHIPPING_CACHE_KEY, {
					boxes: this.boxes
				})
			},
			getCloudAPI() {
				if (!this.cloudApi) {
					this.cloudApi = uniCloud.importObject('CloudAPI')
				}
				return this.cloudApi
			},
			isSkuListQrCode(content) {
				return /^[^,;|]+,\d+(?:;[^,;|]+,\d+)*\|-?\d+(?:\.\d+)?$/.test(content)
			},
			isBoxQrCode(content) {
				return /^[A-Za-z0-9]+_\d+$/.test(content)
			},
			normalizeSkuItem(raw = {}) {
				return {
					sku: String(raw.sku || raw.fnsku || ''),
					fnsku: String(raw.fnsku || ''),
					qty: Number(raw.number || 0)
				}
			},
			toPound(weight) {
				return (Number(weight || 0) * 2.20462).toFixed(2)
			},
			escapeCsvCell(value) {
				const str = String(value == null ? '' : value)
				if (/[",\r\n]/.test(str)) {
					return `"${str.replace(/"/g, '""')}"`
				}
				return str
			},
			buildCsvContent() {
				const rows = [['序号', 'sku', 'fnsku', '数量', '重量', '磅重', '箱号']]
				this.boxes.forEach((box, boxIndex) => {
					const details = Array.isArray(box.details) && box.details.length
						? box.details
						: [{ sku: '', fnsku: '', qty: '' }]
					const weight = Number(box.weight || 0)
					const pound = this.toPound(weight)
					details.forEach((line, lineIndex) => {
						rows.push([
							boxIndex + 1,
							line.sku === line.fnsku ? "" : line.sku,
							line.fnsku || '',
							line.qty == null ? '' : line.qty,
							lineIndex === 0 ? weight : '',
							lineIndex === 0 ? pound : '',
							lineIndex === 0 ? (box.boxNo || '') : ''
						])
					})
				})
				return rows
					.map(row => row.map(cell => this.escapeCsvCell(cell)).join(','))
					.join('\r\n')
			},
			getTodayString() {
				const now = new Date()
				const y = now.getFullYear()
				const m = String(now.getMonth() + 1).padStart(2, '0')
				const d = String(now.getDate()).padStart(2, '0')
				return `${y}-${m}-${d}`
			},
			sanitizeFileName(name) {
				const trimmed = String(name || '').trim()
				const noExt = trimmed.replace(/\.csv$/i, '')
				return noExt.replace(/[\\/:*?"<>|]/g, '_').trim()
			},
			promptExportFileName() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: '导出文件名',
						editable: true,
						placeholderText: `默认：${this.getTodayString()}`,
						success: res => {
							if (!res.confirm) {
								reject(new Error('cancel'))
								return
							}
							const inputName = this.sanitizeFileName(res.content || '')
							resolve(inputName || this.getTodayString())
						},
						fail: reject
					})
				})
			},
			async exportCsv(baseName) {
				if (!this.boxes.length) {
					uni.showToast({ title: '暂无可导出数据', icon: 'none' })
					return false
				}
				try {
					const finalBaseName = this.sanitizeFileName(baseName || '')
					const safeBaseName = finalBaseName || this.getTodayString()
					const fileName = `${safeBaseName}.csv`
					const csv = '\uFEFF' + this.buildCsvContent()
					if (typeof uni.getFileSystemManager === 'function' && uni.env && uni.env.USER_DATA_PATH) {
						const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`
						await new Promise((resolve, reject) => {
							uni.getFileSystemManager().writeFile({
								filePath,
								data: csv,
								encoding: 'utf8',
								success: resolve,
								fail: reject
							})
						})
						uni.showToast({ title: '导出成功', icon: 'success' })
						return true
					}
					await new Promise((resolve, reject) => {
						uni.setClipboardData({
							data: csv,
							success: resolve,
							fail: reject
						})
					})
					uni.showToast({ title: '已复制CSV到剪贴板', icon: 'none' })
					return true
				} catch (error) {
					if (String(error && error.message) === 'cancel') {
						return false
					}
					uni.showToast({ title: '导出失败', icon: 'none' })
					return false
				}
			},
			getValidBoxNoList() {
				const list = this.boxes
					.map(item => String(item.boxNo || '').trim())
					.filter(Boolean)
				return [...new Set(list)]
			},
			async changeWarehouseState(action) {
				const boxNoList = this.getValidBoxNoList()
				if (!boxNoList.length) {
					uni.showToast({ title: '没有可操作的箱号', icon: 'none' })
					return false
				}
				const cloudApi = this.getCloudAPI()
				const isOut = action === 'out'
				try {
					uni.showLoading({ title: isOut ? '出库中...' : '入库中...', mask: true })
					const res = isOut
						? await cloudApi.outWarehouse(boxNoList)
						: await cloudApi.toWarehouse(boxNoList)
					uni.hideLoading()
					if (res && (res.code === 0 || res.code === 207)) {
						const successText = isOut ? '出库完成' : '入库完成'
						const updated = Number(res.updated || 0)
						uni.showToast({ title: `${successText}(${updated})`, icon: 'none' })
						return true
					}
					uni.showToast({ title: (res && res.message) || '操作失败', icon: 'none' })
					return false
				} catch (error) {
					uni.hideLoading()
					uni.showToast({ title: isOut ? '出库失败' : '入库失败', icon: 'none' })
					return false
				}
			},
			makeBoxRecord({ boxNo = '', weight = 0, skuList = [] }) {
				const details = Array.isArray(skuList)
					? skuList.map(this.normalizeSkuItem).filter(item => item.sku)
					: []
				const qty = details.reduce((sum, item) => sum + Number(item.qty || 0), 0)
				return {
					id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
					qty,
					weight: Number(weight || 0),
					boxNo: String(boxNo || ''),
					details
				}
			},
			upsertBoxByBoxNo(record) {
				this.boxes.push(record)
			},
			async handleSkuListQr(content) {
				const cloudApi = this.getCloudAPI()
				const list = await cloudApi.querySkuList(content)
				if (!Array.isArray(list) || !list.length) {
					uni.showToast({ title: '未查询到产品', icon: 'none' })
					return
				}
				const weightStr = String(content).split('|')[1] || '0'
				const record = this.makeBoxRecord({
					boxNo: '',
					weight: Number(weightStr),
					skuList: list
				})
				this.upsertBoxByBoxNo(record)
			},
			async handleBoxQr(content) {
				const cloudApi = this.getCloudAPI()
				const boxRes = await cloudApi.queryBox(content)
				if (!boxRes || !Array.isArray(boxRes.skuList) || !boxRes.skuList.length) {
					uni.showToast({ title: '箱号无数据', icon: 'none' })
					return
				}
				const record = this.makeBoxRecord({
					boxNo: content,
					weight: Number(boxRes.weight || 0),
					skuList: boxRes.skuList
				})
				this.upsertBoxByBoxNo(record)
			},
			async scanBox() {
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: async (res) => {
						const content = String(res.result || '').trim()
						if (!content) {
							uni.showToast({ title: '扫码内容为空', icon: 'none' })
							return
						}
						try {
							if (this.isSkuListQrCode(content)) {
								await this.handleSkuListQr(content)
								return
							}
							if (this.isBoxQrCode(content)) {
								await this.handleBoxQr(content)
								return
							}
							uni.showToast({ title: '二维码格式不支持', icon: 'none' })
						} catch (error) {
							uni.showToast({ title: '扫码处理失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '扫码失败', icon: 'none' })
					}
				})
			},
			removeBox(id) {
				this.boxes = this.boxes.filter(item => item.id !== id)
			},
			clearAll() {
				this.boxes = []
			},
			showBoxDetail(item) {
				this.currentBox = item
				this.detailVisible = true
			},
			operateOptions() {
				uni.showActionSheet({
					itemList: ['导出并出库', '导出', '出库', '入库'],
					success: async res => {
						if (res.tapIndex === 0) {
							let fileName = ''
							try {
								fileName = await this.promptExportFileName()
							} catch (error) {
								return
							}
							await this.changeWarehouseState('out')
							await this.exportCsv(fileName)
							return
						}
						if (res.tapIndex === 1) {
							try {
								const fileName = await this.promptExportFileName()
								await this.exportCsv(fileName)
							} catch (error) {
								return
							}
							return
						}
						if (res.tapIndex === 2) {
							await this.changeWarehouseState('out')
							return
						}
						if (res.tapIndex === 3) {
							await this.changeWarehouseState('in')
						}
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		padding: 24rpx;
		background: #f4f7fc;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.table-head {
		display: grid;
		grid-template-columns: 90rpx 1fr 1fr 2fr 120rpx;
		align-items: center;
		padding: 16rpx 22rpx;
		border-radius: 16rpx;
		background: #eaf1ff;
		margin-bottom: 10rpx;
		flex-shrink: 0;
	}

	.head-cell {
		font-size: 24rpx;
		font-weight: 700;
		color: #2e4f86;
	}

	.head-action {
		text-align: right;
	}

	.list-wrap {
		flex: 1;
		min-height: 0;
		background: #fff;
		border-radius: 16rpx;
		padding: 12rpx;
	}

	.row {
		display: grid;
		grid-template-columns: 90rpx 1fr 1fr 2fr 120rpx;
		align-items: center;
		padding: 18rpx 10rpx;
		border-bottom: 1px solid #edf2fb;
	}

	.cell {
		font-size: 24rpx;
		color: #33415f;
	}

	.seq {
		color: #1e67cc;
		font-weight: 700;
	}

	.action {
		color: #e25353;
		text-align: right;
	}

	.stats {
		margin-top: 14rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 16rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #425372;
		flex-shrink: 0;
	}

	.bottom-actions {
		margin-top: 14rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12rpx;
		flex-shrink: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.btn {
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		border-radius: 12rpx;
		font-size: 26rpx;
		background: #edf1f9;
		color: #33415f;
	}

	.btn.primary {
		background: #2f7ce0;
		color: #fff;
	}

	.btn.accent {
		background: #ff8e35;
		color: #fff;
	}

	.mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.35);
		z-index: 20;
	}

	.detail-popup {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 580rpx;
		background: #fff;
		border-radius: 18rpx;
		padding: 24rpx;
		z-index: 30;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f2d4d;
		margin-bottom: 16rpx;
	}

	.detail-body {
		flex: none;
		margin-bottom: 16rpx;
	}

	.detail-list {
		height: 56vh;
		position: relative;
		z-index: 1;
	}

	.detail-line {
		display: flex;
		justify-content: space-between;
		padding: 12rpx 0;
		border-bottom: 1px solid #edf2fb;
		font-size: 24rpx;
		color: #425372;
	}

	.detail-empty {
		padding: 20rpx 0;
		text-align: center;
		font-size: 24rpx;
		color: #8b97ad;
	}

	.close-btn {
		flex-shrink: 0;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 12rpx;
		background: #2f7ce0;
		color: #fff;
		position: relative;
		z-index: 3;
	}
</style>
