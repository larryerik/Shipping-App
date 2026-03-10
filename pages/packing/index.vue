<template>
	<view class="page">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-arrow">‹</text>
			</view>
			<view class="bt-status" :class="{ connected: connectedDevice }">
				{{ connectedDevice ? `已连接：${connectedDevice}` : '蓝牙未连接' }}
			</view>
			<view class="connect-btn" @click="openPrinterDrawer">连接</view>
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
			<view class="drawer-head">
				<view class="drawer-title">扫描到的蓝牙设备</view>
				<view class="drawer-refresh" @click="refreshPrinters">{{ isScanning ? '扫描中' : '刷新' }}</view>
			</view>
			<view v-if="!btDevices.length" class="empty-tip">
				{{ isScanning ? '正在搜索打印机...' : '未发现可用打印机' }}
			</view>
			<view v-for="item in btDevices" :key="item.deviceId" class="device-item" @click="connectDevice(item)">
				<view class="device-info">
					<text class="device-name">{{ item.name }}</text>
					<text class="device-rssi">{{ item.rssiText }}</text>
				</view>
				<text class="device-action">{{ connectedDeviceId === item.deviceId ? '已连接' : '连接' }}</text>
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
	import { LPAPIFactory } from "../../uni_modules/dothan-lpapi-ble/js_sdk"

	const PACKING_CACHE_KEY = 'packing_cache'
	const PACKING_PRINTER_CACHE_KEY = 'packing_printer_cache'
	const PRINTER_IDLE_CLOSE_MS = 30 * 1000

	export default {
		onLoad() {
			this.loadCache()
			// #ifdef MP-WEIXIN
			this.isWeiXin = true
			this.initPrinter()
			// #endif
		},
		onUnload() {
			if (this.highlightTimer) {
				clearTimeout(this.highlightTimer)
				this.highlightTimer = null
			}
			this.teardownPrinter()
		},
		data() {
			return {
				drawerVisible: false,
				connectedDevice: '',
				connectedDeviceId: '',
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
				btDevices: [],
				isScanning: false,
				isConnectingPrinter: false,
				isWeiXin: false,
				lpapi: null,
				printContext: null,
				printIdleTimer: null,
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
			},
			drawerVisible(visible) {
				if (visible) {
					this.refreshPrinters()
					return
				}
				this.stopPrinterDiscovery()
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
			initPrinter() {
				try {
					this.lpapi = LPAPIFactory.getInstance({
						showLog: 3
					})
					this.printContext = this.lpapi.createDrawContext()
					this.lpapi.setDrawContext(this.printContext)
				} catch (error) {
					this.lpapi = null
					this.printContext = null
					uni.showToast({ title: '打印模块初始化失败', icon: 'none' })
				}
			},
			teardownPrinter() {
				this.clearPrintIdleTimer()
				this.stopPrinterDiscovery()
				if (this.lpapi) {
					this.lpapi.closePrinter().catch(() => {})
				}
				this.connectedDevice = ''
				this.connectedDeviceId = ''
			},
			getCachedPrinter() {
				const cache = uni.getStorageSync(PACKING_PRINTER_CACHE_KEY)
				if (!cache || typeof cache !== 'object') return null
				const deviceId = String(cache.deviceId || '').trim()
				const name = String(cache.name || '').trim()
				if (!deviceId || !name) return null
				return { deviceId, name }
			},
			saveCachedPrinter(device = {}) {
				const deviceId = String(device.deviceId || '').trim()
				const name = String(device.name || '').trim()
				if (!deviceId || !name) return
				uni.setStorageSync(PACKING_PRINTER_CACHE_KEY, {
					deviceId,
					name
				})
			},
			clearPrintIdleTimer() {
				if (!this.printIdleTimer) return
				clearTimeout(this.printIdleTimer)
				this.printIdleTimer = null
			},
			scheduleAutoClosePrinter() {
				this.clearPrintIdleTimer()
				this.printIdleTimer = setTimeout(() => {
					this.printIdleTimer = null
					this.closeConnectedPrinter()
				}, PRINTER_IDLE_CLOSE_MS)
			},
			closeConnectedPrinter() {
				this.clearPrintIdleTimer()
				if (!this.lpapi) return
				this.lpapi.closePrinter().catch(() => {})
				this.connectedDevice = ''
				this.connectedDeviceId = ''
			},
			openPrinterDrawer() {
				if (!this.isWeiXin) {
					uni.showToast({ title: '仅支持微信小程序', icon: 'none' })
					return
				}
				if (!this.lpapi) {
					this.initPrinter()
				}
				if (!this.lpapi || !this.printContext) {
					uni.showToast({ title: '打印模块未就绪', icon: 'none' })
					return
				}
				this.drawerVisible = true
			},
			normalizePrinterDevice(raw = {}) {
				const deviceId = String(raw.deviceId || raw.id || '').trim()
				const name = String(raw.name || raw.localName || '').trim() || '未命名打印机'
				const rssi = Number(raw.RSSI || raw.rssi)
				const rssiText = Number.isFinite(rssi) ? `${rssi}dBm` : '--'
				return {
					deviceId,
					name,
					rssiText
				}
			},
			onPrinterFound(devices = []) {
				if (!Array.isArray(devices) || !devices.length) return
				const mergedMap = new Map(this.btDevices.map(item => [item.deviceId, item]))
				devices
					.map(this.normalizePrinterDevice)
					.filter(item => item.deviceId)
					.forEach(item => {
						mergedMap.set(item.deviceId, item)
					})
				this.btDevices = Array.from(mergedMap.values())
			},
			async refreshPrinters() {
				if (!this.lpapi || this.isScanning) return
				this.btDevices = []
				this.isScanning = true
				try {
					await this.lpapi.startBleDiscovery({
						timeout: 5000,
						deviceFound: (devices) => {
							this.onPrinterFound(devices)
						},
						adapterStateChange: (result) => {
							if (!result.discovering) this.isScanning = false
						}
					})
				} catch (error) {
					this.isScanning = false
					uni.showToast({ title: '搜索打印机失败', icon: 'none' })
				}
			},
			stopPrinterDiscovery() {
				if (!this.lpapi) return
				this.isScanning = false
				this.lpapi.stopBleDiscovery().catch(() => {})
			},
			async connectDevice(device) {
				if (!device || !device.deviceId || !this.lpapi || this.isConnectingPrinter) return
				this.isConnectingPrinter = true
				this.clearPrintIdleTimer()
				uni.showLoading({ title: '正在连接打印机...' })
				try {
					const res = await this.lpapi.openPrinter({
						name: device.name,
						deviceId: device.deviceId,
						tryTimes: 5,
						connectionStateChange: (state) => {
							if (state && state.connected === false) {
								this.connectedDevice = ''
								this.connectedDeviceId = ''
							}
						}
					})
					if (res && res.statusCode === 0) {
						this.connectedDevice = device.name
						this.connectedDeviceId = device.deviceId
						this.saveCachedPrinter(device)
						this.drawerVisible = false
						uni.showToast({ title: '连接成功', icon: 'success' })
						return
					}
					uni.showToast({ title: '连接失败', icon: 'none' })
				} catch (error) {
					uni.showToast({ title: '连接失败', icon: 'none' })
				} finally {
					this.isConnectingPrinter = false
					uni.hideLoading()
				}
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
			async ensurePrinterConnected() {
				if (!this.lpapi || !this.printContext) return false
				if (this.lpapi.isPrinterOpened()) return true
				if (!this.connectedDeviceId) {
					const cached = this.getCachedPrinter()
					if (!cached) return false
					this.connectedDeviceId = cached.deviceId
					this.connectedDevice = cached.name
				}
				try {
					const res = await this.lpapi.openPrinter({
						name: this.connectedDevice,
						deviceId: this.connectedDeviceId,
						tryTimes: 5,
						connectionStateChange: (state) => {
							if (state && state.connected === false) {
								this.connectedDevice = ''
								this.connectedDeviceId = ''
							}
						}
					})
					if (res && res.statusCode === 0) {
						this.saveCachedPrinter({
							deviceId: this.connectedDeviceId,
							name: this.connectedDevice
						})
					}
					return !!(res && res.statusCode === 0)
				} catch (error) {
					return false
				}
			},
			async waitCanvasReady(jobInfo) {
				if (!jobInfo || !jobInfo.canvas) return
				await new Promise(resolve => setTimeout(resolve, 100))
			},
			getPrintTimeText() {
				const now = new Date()
				const pad = (v) => String(v).padStart(2, '0')
				return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
			},
			drawPackingLabel(boxid, weight) {
				const api = this.lpapi
				const labelWidth = 70
				const labelHeight = 50
				const margin = 3
				const qrSize = 21
				const textWidth = labelWidth - qrSize - margin * 3

				const jobInfo = api.startJob({
					context: this.printContext,
					width: labelWidth,
					height: labelHeight,
					orientation: 0,
					isPreview: false
				})
				return this.waitCanvasReady(jobInfo).then(() => {
					api.drawText({
						text: '装箱标签',
						x: margin,
						y: 2.5,
						width: textWidth,
						height: 6,
						fontHeight: 4.8
					})
					api.drawText({
						text: `箱号: ${boxid}`,
						x: margin,
						y: 10,
						width: textWidth,
						height: 5,
						fontHeight: 3.6
					})
					api.drawText({
						text: `重量: ${weight}kg`,
						x: margin,
						y: 16.2,
						width: textWidth,
						height: 5,
						fontHeight: 3.4
					})
					api.drawText({
						text: `SKU种类: ${this.skuCount}`,
						x: margin,
						y: 22.4,
						width: textWidth,
						height: 5,
						fontHeight: 3.4
					})
					api.drawText({
						text: `总数量: ${this.totalQty}`,
						x: margin,
						y: 28.6,
						width: textWidth,
						height: 5,
						fontHeight: 3.4
					})
					api.drawText({
						text: this.getPrintTimeText(),
						x: margin,
						y: 35,
						width: textWidth,
						height: 4.8,
						fontHeight: 2.9
					})
					api.draw2DQRCode({
						text: boxid,
						x: labelWidth - qrSize - margin,
						y: margin,
						width: qrSize,
						height: qrSize
					})
					api.drawText({
						text: boxid,
						x: labelWidth - qrSize - margin,
						y: margin + qrSize + 1,
						width: qrSize,
						height: 5,
						fontHeight: 2.6,
						horizontalAlignment: 1
					})

					return api.commitJob({
						gapType: 2,
						printDarkness: 8,
						printSpeed: 3
					})
				})
			},
			printOptions() {
				// #ifndef MP-WEIXIN
				uni.showToast({ title: '仅支持微信小程序', icon: 'none' })
				return
				// #endif

				const boxid = String(this.boxId || '').trim()
				if (!boxid) {
					uni.showToast({ title: '没有箱号', icon: 'none' })
					return
				}
				const weight = String(this.weight || '').trim()
				if (!weight) {
					uni.showToast({ title: '请先输入重量', icon: 'none' })
					return
				}
				if (!this.skuList.length) {
					uni.showToast({ title: '产品列表为空', icon: 'none' })
					return
				}
				if (!this.lpapi || !this.printContext) {
					uni.showToast({ title: '打印模块未就绪', icon: 'none' })
					return
				}

				this.handlePrint(boxid, weight)
			},
			async handlePrint(boxid, weight) {
				this.clearPrintIdleTimer()
				const connected = await this.ensurePrinterConnected()
				if (!connected) {
					uni.showToast({ title: '未找到可用打印机，请先手动连接一次', icon: 'none' })
					return
				}
				uni.showLoading({ title: '正在打印...' })
				try {
					const res = await this.drawPackingLabel(boxid, weight)
					uni.hideLoading()
					if (res && res.statusCode === 0) {
						this.scheduleAutoClosePrinter()
						uni.showToast({ title: '打印成功', icon: 'success' })
						return
					}
					uni.showToast({ title: (res && res.errMsg) || '打印失败', icon: 'none' })
				} catch (error) {
					uni.hideLoading()
					uni.showToast({ title: '打印失败', icon: 'none' })
				}
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
	}

	.drawer-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.drawer-refresh {
		font-size: 22rpx;
		color: #2f7ce0;
		background: #eef4ff;
		border-radius: 999rpx;
		padding: 8rpx 18rpx;
	}

	.empty-tip {
		padding: 24rpx 12rpx;
		color: #7a889f;
		font-size: 24rpx;
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

	.device-info {
		display: flex;
		flex-direction: column;
	}

	.device-name {
		color: #1f2d4d;
	}

	.device-rssi {
		color: #7a889f;
		font-size: 20rpx;
		margin-top: 6rpx;
	}

	.device-action {
		color: #2f7ce0;
		font-weight: 600;
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
