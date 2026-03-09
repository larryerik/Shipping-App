<template>
	<view class="page">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-arrow">‹</text>
			</view>
			<view class="bt-status" :class="{ connected: connectedDevice }">
				{{ connectedDevice ? `已连接：${connectedDevice}` : '蓝牙未连接' }}
			</view>
			<view class="connect-btn" @click="drawerVisible = true">连接</view>
		</view>

		<view class="summary">
			<text>SKU: {{ skuCount }} 个</text>
			<view class="sort-btn" @click="toggleSkuSort">{{ skuSortLabel }}</view>
			<text>数量: {{ totalQty }}</text>
		</view>

		<scroll-view scroll-y class="list-wrap" :scroll-into-view="scrollIntoViewId" scroll-with-animation>
			<uni-swipe-action>
				<uni-swipe-action-item
					v-for="(item, index) in skuList"
					:key="`${item.fnsku}-${index}`"
					class="swipe-row"
					:right-options="deleteOptions"
					@click="onSwipeClick($event, item.fnsku)"
				>
					<view class="swipe-main" :id="`sku-row-${index}`" :class="{ highlight: highlightedIndex === index }" @click="openQtyPopup(item)">
						<view class="left">
							<text class="sku">{{ item.sku }}</text>
							<text class="barcode">{{ item.fnsku }}</text>
						</view>
						<view class="qty">{{ item.number }}</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>

		<view class="bottom-panel">
			<view class="field-row">
				<input v-model="weight" class="input" type="digit" placeholder="输入重量(kg)" />
				<input v-model="boxId" class="input" placeholder="箱号" />
			</view>
			<view class="action-row">
				<view class="btn primary" @click="scanGoods">扫码</view>
				<view class="btn" @click="clearAll">清空</view>
				<view class="btn" @click="updateData">更新</view>
				<view class="btn accent" @click="printOptions">打印</view>
			</view>
		</view>

		<view class="mask" v-if="drawerVisible" @click="drawerVisible = false"></view>
		<view class="drawer" :class="{ show: drawerVisible }">
			<view class="drawer-title">扫描到的蓝牙设备</view>
			<view v-for="item in btDevices" :key="item.id" class="device-item" @click="connectDevice(item.name)">
				<text>{{ item.name }}</text>
				<text class="device-rssi">{{ item.rssi }}</text>
			</view>
		</view>

		<view class="mask" v-if="qtyPopupVisible" @click="closeQtyPopup"></view>
		<view class="qty-popup" v-if="qtyPopupVisible">
			<view class="popup-title">{{ qtyPopupMode === 'scanAdd' ? `输入数量：${editingTitle}` : `修改 ${editingTitle}` }}</view>
			<input
				v-model="editingQty"
				type="number"
				class="popup-input"
				:placeholder="`${editingOldQty}`"
				:focus="qtyInputFocus"
				@blur="qtyInputFocus = false"
			/>
			<view class="popup-actions">
				<view class="popup-btn" @click="closeQtyPopup">取消</view>
				<view class="popup-btn ok" @click="confirmQty">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	const PACKING_CACHE_KEY = 'packing_cache'

	export default {
		onLoad() {
			this.loadCache()
		},
		onUnload() {
			if (this.highlightTimer) {
				clearTimeout(this.highlightTimer)
				this.highlightTimer = null
			}
		},
		data() {
			return {
				drawerVisible: false,
				connectedDevice: '',
				weight: '',
				boxId: '',
				qtyPopupVisible: false,
				qtyInputFocus: false,
				editingFnsku: '',
				editingQty: '',
				editingOldQty: '',
				editingTitle: '',
				qtyPopupMode: 'edit',
				pendingScanCode: '',
				pendingScanIndex: -1,
				highlightedIndex: -1,
				highlightTimer: null,
				sortAsc: true,
				scrollIntoViewId: '',
				deleteOptions: [
					{
						text: '删除',
						style: {
							backgroundColor: '#e85252'
						}
					}
				],
				btDevices: [
					{ id: 1, name: 'Printer-BT-01', rssi: '-58dBm' },
					{ id: 2, name: 'Scale-BT-07', rssi: '-65dBm' },
					{ id: 3, name: 'Scanner-BT-19', rssi: '-72dBm' }
				],
				skuList: []
			}
		},
		watch: {
			skuList: {
				deep: true,
				handler() {
					this.saveCache()
				}
			},
			boxId() {
				this.saveCache()
			},
			weight() {
				this.saveCache()
			}
		},
		computed: {
			skuCount() {
				return this.skuList.length
			},
			totalQty() {
				return this.skuList.reduce((sum, item) => sum + Number(item.number || 0), 0)
			},
			skuSortLabel() {
				return this.sortAsc ? 'SKU排序：A-Z' : 'SKU排序：Z-A'
			}
		},
		methods: {
			loadCache() {
				const cache = uni.getStorageSync(PACKING_CACHE_KEY)
				if (!cache || typeof cache !== 'object') return
				if (Array.isArray(cache.skuList)) this.skuList = cache.skuList
				if (typeof cache.boxId === 'string') this.boxId = cache.boxId
				if (typeof cache.weight === 'string') this.weight = cache.weight
			},
			saveCache() {
				uni.setStorageSync(PACKING_CACHE_KEY, {
					skuList: this.skuList,
					boxId: this.boxId,
					weight: this.weight
				})
			},
			goBack() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack({ delta: 1 })
					return
				}
				uni.redirectTo({ url: '/pages/index/index' })
			},
			connectDevice(name) {
				this.connectedDevice = name
				this.drawerVisible = false
				uni.showToast({ title: '连接成功', icon: 'success' })
			},
			toggleSkuSort() {
				this.sortAsc = !this.sortAsc
				const sorted = [...this.skuList].sort((a, b) => {
					return this.sortAsc
						? a.sku.localeCompare(b.sku)
						: b.sku.localeCompare(a.sku)
				})
				this.skuList = sorted
			},
			onSwipeClick(e, fnsku) {
				if (e.position === 'right') this.removeSku(fnsku)
			},
			removeSku(fnsku) {
				this.skuList = this.skuList.filter(item => item.fnsku !== fnsku)
			},
			openQtyPopup(item) {
				this.editingFnsku = item.fnsku
				this.editingQty = ''
				this.editingOldQty = String(item.number || '')
				this.editingTitle = item.sku || item.fnsku || '商品'
				this.qtyPopupMode = 'edit'
				this.qtyPopupVisible = true
				this.qtyInputFocus = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.qtyInputFocus = true
					}, 50)
				})
			},
			closeQtyPopup() {
				this.qtyInputFocus = false
				this.qtyPopupVisible = false
				this.editingFnsku = ''
				this.editingQty = ''
				this.editingOldQty = ''
				this.editingTitle = ''
				this.pendingScanCode = ''
				this.pendingScanIndex = -1
			},
			openScanQtyPopup(code, targetIndex) {
				this.editingFnsku = code
				this.editingQty = ''
				this.editingOldQty = '1'
				this.editingTitle = code
				this.qtyPopupMode = 'scanAdd'
				this.pendingScanCode = code
				this.pendingScanIndex = targetIndex
				this.qtyPopupVisible = true
				this.qtyInputFocus = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.qtyInputFocus = true
					}, 50)
				})
			},
			getCloudAPI() {
				if (!this.cloudApi) {
					this.cloudApi = uniCloud.importObject('CloudAPI')
				}
				return this.cloudApi
			},
			normalizeSkuItem(raw = {}) {
				return {
					sku: String(raw.sku || raw.fnsku || ''),
					fnsku: String(raw.fnsku || ''),
					number: Number(raw.number || 0)
				}
			},
			scrollToIndex(index) {
				if (index < 0 || index >= this.skuList.length) return
				this.scrollIntoViewId = `sku-row-${index}`
				this.highlightedIndex = index
				if (this.highlightTimer) clearTimeout(this.highlightTimer)
				this.highlightTimer = setTimeout(() => {
					this.highlightedIndex = -1
					this.highlightTimer = null
				}, 2000)
				setTimeout(() => {
					this.scrollIntoViewId = ''
				}, 400)
			},
			isBatchSkuQRCode(content) {
				return /^[^,;|]+,\d+(?:;[^,;|]+,\d+)*\|-?\d+(?:\.\d+)?$/.test(content)
			},
			isBoxQRCode(content) {
				return /^[A-Z]+_\d+$/.test(content)
			},
			async handleBarcodeScan(code, qty, targetIndex = this.pendingScanIndex) {
				if (targetIndex >= 0) {
					const target = this.skuList[targetIndex]
					if (target) {
						target.number = Number(target.number || 0) + qty
						this.scrollToIndex(targetIndex)
					}
					return
				}
				try {
					const cloudApi = this.getCloudAPI()
					const sku = await cloudApi.querySku(code)
					this.skuList.push({
						sku: String(sku || code),
						fnsku: code,
						number: qty
					})
					this.scrollToIndex(this.skuList.length - 1)
				} catch (error) {
					uni.showToast({ title: '查询SKU失败', icon: 'none' })
				}
			},
			async handleBatchQrScan(content) {
				try {
					const cloudApi = this.getCloudAPI()
					const list = await cloudApi.querySkuList(content)
					
					if (!Array.isArray(list) || !list.length) {
						uni.showToast({ title: '未查询到产品', icon: 'none' })
						return
					}
					const normalized = list.map(this.normalizeSkuItem).filter(item => item.fnsku)
					let lastAffectedIndex = -1
					normalized.forEach(incoming => {
						const idx = this.skuList.findIndex(
							item => String(item.fnsku || '').trim() === String(incoming.fnsku || '').trim()
						)
						if (idx >= 0) {
							this.skuList[idx].number = Number(this.skuList[idx].number || 0) + Number(incoming.number || 0)
							lastAffectedIndex = idx
							return
						}
						this.skuList.push({
							sku: incoming.sku,
							fnsku: incoming.fnsku,
							number: Number(incoming.number || 0)
						})
						lastAffectedIndex = this.skuList.length - 1
					})
					this.$nextTick(() => {
						this.scrollToIndex(lastAffectedIndex >= 0 ? lastAffectedIndex : this.skuList.length - 1)
					})
				} catch (error) {
					uni.showToast({ title: '批量查询失败', icon: 'none' })
				}
			},
			async handleBoxQrScan(content) {
				this.skuList = []
				this.boxId = content
				try {
					const cloudApi = this.getCloudAPI()
					const boxRes = await cloudApi.queryBox(content)
					if (!boxRes || !boxRes.skuList) {
						return
					}
					const loadedList = Array.isArray(boxRes.skuList)
						? boxRes.skuList.map(this.normalizeSkuItem).filter(item => item.fnsku)
						: []
					this.skuList = loadedList
					this.weight = boxRes.weight ? String(boxRes.weight) : ''
					this.$nextTick(() => {
						this.scrollToIndex(this.skuList.length - 1)
					})
				} catch (error) {
					uni.showToast({ title: '箱号查询失败', icon: 'none' })
				}
			},
			async confirmQty() {
				const qty = Number(this.editingQty)
				if (!qty || qty <= 0) {
					uni.showToast({ title: '数量无效', icon: 'none' })
					return
				}
				if (this.qtyPopupMode === 'scanAdd') {
					const code = this.pendingScanCode
					const targetIndex = this.pendingScanIndex
					this.closeQtyPopup()
					await this.handleBarcodeScan(code, qty, targetIndex)
					return
				}
				const target = this.skuList.find(item => item.fnsku === this.editingFnsku)
				if (target) target.number = qty
				this.closeQtyPopup()
			},
			scanGoods() {
				uni.scanCode({
					scanType: ['barCode', 'qrCode'],
					success: async (res) => {
						const content = String(res.result || '').trim()
						if (!content) {
							uni.showToast({ title: '扫码内容为空', icon: 'none' })
							return
						}
						const scanType = String(res.scanType || '').toUpperCase()
						const isQr = scanType.includes('QR') || this.isBatchSkuQRCode(content) || this.isBoxQRCode(content)
						if (isQr) {
							if (this.isBatchSkuQRCode(content)) {
								await this.handleBatchQrScan(content)
								return
							}
							if (this.isBoxQRCode(content)) {
								await this.handleBoxQrScan(content)
								return
							}
							uni.showToast({ title: '二维码格式不支持', icon: 'none' })
							return
						}
						const existingIndex = this.skuList.findIndex(item => String(item.fnsku || '').trim() === content)
						this.openScanQtyPopup(content, existingIndex)
					},
					fail: () => {
						uni.showToast({ title: '扫码失败', icon: 'none' })
					}
				})
			},
			clearAll() {
				this.skuList = []
				this.weight = ''
			},
			async updateData() {
				const boxid = String(this.boxId || '').trim()
				const weight = String(this.weight || '').trim()
				if (!boxid) {
					uni.showToast({ title: '没有箱号', icon: 'none' })
					return
				}
				if (!weight) {
					uni.showToast({ title: '请先输入重量', icon: 'none' })
					return
				}
				if (!this.skuList.length) {
					uni.showToast({ title: '产品列表为空', icon: 'none' })
					return
				}
				const skuList = this.skuList.map(item => ({
					fnsku: String(item.fnsku || '').trim(),
					number: Number(item.number || 0)
				}))
				const hasInvalid = skuList.some(item => !item.fnsku || !item.number || item.number <= 0)
				if (hasInvalid) {
					uni.showToast({ title: '存在无效SKU数量', icon: 'none' })
					return
				}
				try {
					const cloudApi = this.getCloudAPI()
					const res = await cloudApi.updateBox(boxid, skuList, weight)
					if (res === 1) {
						uni.showToast({ title: '更新成功', icon: 'success' })
						return
					}
					if (res === 0) {
						uni.showToast({ title: '新增成功', icon: 'success' })
						return
					}
					uni.showToast({ title: '提交完成', icon: 'success' })
				} catch (error) {
					uni.showToast({ title: '更新失败', icon: 'none' })
				}
			},
			printOptions() {
				uni.showToast({ title: "打印", icon: 'none' })
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		padding: 24rpx;
		padding-top: calc(var(--status-bar-height) + 12rpx);
		padding-bottom: 24rpx;
		background: #f3f6fb;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16rpx;
		flex-shrink: 0;
	}

	.back-btn,
	.connect-btn {
		width: 120rpx;
		text-align: center;
	}

	.back-btn {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #1f2d4d;
		font-size: 30rpx;
		padding-left: 6rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.back-arrow {
		font-size: 50rpx;
		line-height: 1;
		margin-right: 2rpx;
		font-weight: 400;
	}

	.bt-status {
		flex: 1;
		margin: 0 16rpx;
		text-align: center;
		background: #e8eef8;
		color: #50607a;
		padding: 12rpx;
		border-radius: 999rpx;
		font-size: 24rpx;
	}

	.bt-status.connected {
		background: #e6f6ff;
		color: #0d70c7;
	}

	.connect-btn {
		background: #2f7ce0;
		color: #fff;
		padding: 12rpx 0;
		border-radius: 12rpx;
		font-size: 24rpx;
	}

	.summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #51617d;
		background: #fff;
		padding: 16rpx;
		border-radius: 14rpx;
		margin-bottom: 12rpx;
		flex-shrink: 0;
	}

	.sort-btn {
		padding: 8rpx 16rpx;
		border-radius: 999rpx;
		background: #eaf1ff;
		color: #2b5fad;
		font-size: 22rpx;
	}

	.list-wrap {
		flex: 1;
		min-height: 0;
		padding-bottom: 8rpx;
		box-sizing: border-box;
	}

	.swipe-row {
		border-radius: 16rpx;
		margin-bottom: 12rpx;
		box-sizing: border-box;
	}

	.swipe-main {
		background: #fff;
		padding: 20rpx 18rpx;
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: 16rpx;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.swipe-main.highlight {
		background: #fff6da;
		box-shadow: 0 0 0 2rpx #f7c948 inset;
	}

	.left {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		padding-right: 16rpx;
	}

	.sku {
		font-size: 28rpx;
		color: #1f2d4d;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.barcode {
		font-size: 22rpx;
		color: #7887a1;
		margin-top: 6rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.qty {
		font-size: 36rpx;
		font-weight: 700;
		color: #1f4ea1;
		flex-shrink: 0;
		min-width: 72rpx;
		text-align: right;
		white-space: nowrap;
	}

	.bottom-panel {
		background: #fff;
		border-radius: 18rpx;
		padding: 18rpx;
		margin-top: 12rpx;
		flex-shrink: 0;
		padding-bottom: calc(18rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.field-row {
		display: flex;
		gap: 12rpx;
		margin-bottom: 16rpx;
		min-width: 0;
	}

	.input {
		flex: 1;
		min-width: 0;
		height: 76rpx;
		border: 1px solid #d9e1ef;
		border-radius: 12rpx;
		padding: 0 20rpx;
		background: #fdfdff;
		box-sizing: border-box;
	}

	.action-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10rpx;
	}

	.btn {
		text-align: center;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 12rpx;
		background: #edf1f8;
		color: #33415f;
		font-size: 24rpx;
	}

	.btn.primary {
		background: #2f7ce0;
		color: #fff;
	}

	.btn.accent {
		background: #16a085;
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

	.drawer {
		position: fixed;
		right: 0;
		top: calc(var(--status-bar-height) + 24rpx);
		bottom: 24rpx;
		width: 560rpx;
		background: #fff;
		z-index: 30;
		padding: 26rpx;
		box-sizing: border-box;
		border-radius: 20rpx 0 0 20rpx;
		transform: translateX(100%);
		transition: transform 0.2s;
	}

	.drawer.show {
		transform: translateX(0);
	}

	.drawer-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1c2e52;
		margin-bottom: 20rpx;
	}

	.device-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-radius: 12rpx;
		margin-bottom: 10rpx;
		background: #f4f8ff;
		font-size: 24rpx;
	}

	.device-rssi {
		color: #7a889f;
	}

	.qty-popup {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 560rpx;
		background: #fff;
		border-radius: 18rpx;
		padding: 24rpx;
		z-index: 40;
	}

	.popup-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1c2e52;
		margin-bottom: 16rpx;
	}

	.popup-input {
		height: 78rpx;
		border: 1px solid #d8e0ef;
		border-radius: 12rpx;
		padding: 0 16rpx;
		margin-bottom: 16rpx;
	}

	.popup-actions {
		display: flex;
		gap: 12rpx;
	}

	.popup-btn {
		flex: 1;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: #eef2f8;
		border-radius: 12rpx;
		color: #33415f;
	}

	.popup-btn.ok {
		background: #2f7ce0;
		color: #fff;
	}
</style>
