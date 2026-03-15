<template>
	<view class="page">
		<view class="search-bar">
			<view class="search-input-wrap">
				<input
					v-model="keyword"
					class="search-input"
					placeholder="输入箱号或 SKU"
					@input="onKeywordInput"
					@confirm="doSearch"
					@focus="showSuggest = true"
					@blur="onKeywordBlur"
				/>
				<view v-if="keyword" class="input-clear" @click.stop="clearKeyword">×</view>
			</view>
			<view class="scan-btn" @click="scan">扫码</view>
			<view class="search-btn" @click="doSearch">搜索</view>
		</view>

		<scroll-view
			scroll-y
			class="suggest-panel"
			lower-threshold="60"
			@scrolltolower="onSuggestReachBottom"
			v-if="showSkuSuggest"
		>
			<view
				v-for="item in matchSkuRecommends"
				:key="item._id || item.sku"
				class="suggest-item"
				@click="pickKeyword(item.sku)"
			>
				{{ item.sku }}
			</view>
			<view v-if="suggestLoading && !matchSkuRecommends.length" class="suggest-empty">联想加载中...</view>
			<view v-else-if="!suggestLoading && !matchSkuRecommends.length" class="suggest-empty">暂无匹配 SKU</view>
			<view v-if="matchSkuRecommends.length" class="suggest-more">
				<text v-if="suggestLoading">加载中...</text>
				<text v-else-if="!suggestHasMore">没有更多了</text>
			</view>
		</scroll-view>

		<view class="panel" v-if="showHistoryPanel">
			<view class="panel-head">
				<view class="panel-title">搜索历史</view>
				<view v-if="histories.length" class="clear-history" @click="clearHistories">清空</view>
			</view>
			<view class="tags">
				<text v-for="item in histories" :key="item" class="tag" @click="pickKeyword(item)">{{ item }}</text>
			</view>
			<view v-if="!histories.length" class="result-empty">暂无历史记录</view>
		</view>

		<scroll-view
			scroll-y
			class="result-wrap"
			lower-threshold="80"
			@scrolltolower="onResultReachBottom"
			v-if="showResultPanel"
		>
			<view v-if="loading" class="result-loading">搜索中...</view>
			<view v-else-if="searched && !results.length" class="result-empty">暂无搜索结果</view>
			<view v-for="item in results" :key="item.boxNo" class="result-card">
				<view class="box-no">{{ item.boxNo }}</view>
				<view class="table-head">
					<text>SKU</text>
					<text>数量</text>
				</view>
				<view v-for="line in item.lines" :key="line.sku" class="table-row">
					<text :class="getSkuTextClass(line.sku)">{{ line.sku }}</text>
					<text>{{ line.qty }}</text>
				</view>
			</view>
			<view v-if="searched && results.length" class="result-more">
				<text v-if="loadingMore">加载中...</text>
				<text v-else-if="!hasMore">没有更多了</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const LOCAL_SEARCH_LIST_KEY = '__local_search_history'

	const arrUnique = arr => {
		for (let i = arr.length - 1; i >= 0; i--) {
			const curIndex = arr.indexOf(arr[i])
			const lastIndex = arr.lastIndexOf(arr[i])
			if (curIndex !== lastIndex) {
				arr.splice(lastIndex, 1)
			}
		}
		return arr
	}

	function escapeRegExp(string) {
		return string.replace(/[+?^${}()|[\]\\]/g, '\\$&')
	}

	export default {
		watch: {
			keyword(newVal) {
				if (!newVal || !String(newVal).trim()) {
					this.resetSuggestState()
					return
				}
				this.searchDebounce()
			}
		},
		data() {
			return {
				keyword: '',
				searched: false,
				showSuggest: false,
				histories: [],
				associativeList: [],
				matchList: [],
				results: [],
				loading: false,
				loadingMore: false,
				hasMore: false,
				pageNo: 0,
				pageSize: 20,
				lastSearchedKeyword: '',
				currentWhere: '',
				suggestPageNo: 0,
				suggestPageSize: 50,
				suggestHasMore: false,
				suggestLoading: false,
				suggestKeyword: '',
				suggestRequestToken: 0,
				searchDebounce: () => {}
			}
		},
		created() {
			const localList = uni.getStorageSync(LOCAL_SEARCH_LIST_KEY)
			this.histories = Array.isArray(localList) ? localList : []
			this.searchDebounce = this.debounce(this.searchEvent, 300)
			this.mallGoodsDb = uniCloud.database().collection('sku')
			this.inventoryDb = uniCloud.database().collection('inventory')
			this.sameDb = uniCloud.database().collection('same')
		},
		computed: {
			showSkuSuggest() {
				return this.showSuggest && !!this.keyword.trim()
			},
			showHistoryPanel() {
				return !this.showSkuSuggest && !this.searched && !this.keyword.trim()
			},
			showResultPanel() {
				return !this.showSkuSuggest && this.searched
			},
			matchSkuRecommends() {
				return this.associativeList
			}
		},
		methods: {
			getCloudAPI() {
				if (!this.cloudApi) {
					this.cloudApi = uniCloud.importObject('CloudAPI')
				}
				return this.cloudApi
			},
			isQrScanType(scanType) {
				return String(scanType || '').toUpperCase().includes('QR')
			},
			normalizeBoxLines(skuList) {
				if (!Array.isArray(skuList)) return []
				return skuList.map(line => ({
					sku: line.sku || line.fnsku || '',
					qty: Number(line.number || 0)
				})).filter(line => line.sku)
			},
			getResultData(res) {
				if (res && res.result && Array.isArray(res.result.data)) {
					return res.result.data
				}
				if (res && Array.isArray(res.data)) {
					return res.data
				}
				return []
			},
			buildRegexText(text) {
				if (!text) return ''
				return escapeRegExp(String(text).trim()).replace(/\s+/g, '.*')
			},
			debounce(foo, delay) {
				let timer
				return function(...args) {
					if (timer) clearTimeout(timer)
					timer = setTimeout(() => {
						foo.apply(this, args)
					}, delay || 1000)
				}
			},
			resetSuggestState() {
				this.associativeList = []
				this.suggestPageNo = 0
				this.suggestHasMore = false
				this.suggestLoading = false
				this.suggestKeyword = ''
				this.suggestRequestToken += 1
			},
			async loadSuggest({ reset = false } = {}) {
				const keyword = String(this.keyword || '').trim()
				if (!keyword) {
					this.resetSuggestState()
					return
				}
				if (reset) {
					this.associativeList = []
					this.suggestPageNo = 0
					this.suggestHasMore = true
					this.suggestKeyword = keyword
				}
				if (this.suggestLoading || (!reset && !this.suggestHasMore)) {
					return
				}
				const currentToken = ++this.suggestRequestToken
				this.suggestLoading = true
				const nextPage = this.suggestPageNo + 1
				const skip = (nextPage - 1) * this.suggestPageSize
				const queryKeyword = this.suggestKeyword || keyword
				const sText = this.buildRegexText(queryKeyword)
				try {
					const res = await this.mallGoodsDb
						.where(`(${new RegExp(sText, 'i')}.test(sku)||${new RegExp(sText, 'i')}.test(fnsku))`)
						.orderBy('sku', 'asc')
						.skip(skip)
						.limit(this.suggestPageSize)
						.get()
					if (currentToken !== this.suggestRequestToken || String(this.keyword || '').trim() !== queryKeyword) {
						return
					}
					const data = this.getResultData(res)
					const merged = reset ? data : this.associativeList.concat(data)
					const dedupMap = Object.create(null)
					this.associativeList = merged.filter(item => {
						const key = String(item.sku || item.fnsku || item._id || '')
						if (!key || dedupMap[key]) return false
						dedupMap[key] = true
						return true
					})
					this.suggestPageNo = nextPage
					this.suggestHasMore = data.length === this.suggestPageSize
				} catch (error) {
					if (reset) {
						this.associativeList = []
					}
					this.suggestHasMore = false
				} finally {
					if (currentToken === this.suggestRequestToken) {
						this.suggestLoading = false
					}
				}
			},
			searchEvent() {
				if (!this.keyword.trim()) {
					this.resetSuggestState()
					return
				}
				this.loadSuggest({ reset: true })
			},
			onKeywordInput() {
				const currentKeyword = String(this.keyword || '').trim()
				if (currentKeyword !== this.lastSearchedKeyword) {
					this.searched = false
				}
				this.showSuggest = true
			},
			onKeywordBlur() {
				// Keep the suggestion panel open while the user scrolls or taps it.
			},
			onSuggestReachBottom() {
				if (!this.showSkuSuggest || this.suggestLoading || !this.suggestHasMore) {
					return
				}
				this.loadSuggest()
			},
			async handleBarcodeScan(content) {
				const cloudApi = this.getCloudAPI()
				const sku = String(await cloudApi.querySku(content) || '').trim()
				if (!sku) {
					uni.showToast({ title: '条码未匹配SKU', icon: 'none' })
					return
				}
				this.keyword = sku
				await this.doSearch()
			},
			async handleQrCodeScan(content) {
				const cloudApi = this.getCloudAPI()
				const boxData = await cloudApi.queryBox(content)
				const lines = this.normalizeBoxLines(boxData && boxData.skuList)
				this.keyword = content
				this.showSuggest = false
				this.lastSearchedKeyword = content
				this.saveHistory(content)
				this.searched = true
				this.loading = false
				this.loadingMore = false
				this.currentWhere = ''
				this.pageNo = 0
				this.hasMore = false
				this.matchList = []
				if (!lines.length) {
					this.results = []
					uni.showToast({ title: '箱号无数据', icon: 'none' })
					return
				}
				this.results = [{
					boxNo: content,
					lines
				}]
			},
			scan() {
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: async (res) => {
						const content = String(res.result || '').trim()
						if (!content) {
							uni.showToast({ title: '扫码内容为空', icon: 'none' })
							return
						}
						this.showSuggest = false
						this.resetSuggestState()
						try {
							if (this.isQrScanType(res.scanType)) {
								await this.handleQrCodeScan(content)
								return
							}
							await this.handleBarcodeScan(content)
						} catch (error) {
							uni.showToast({ title: '扫码查询失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '扫码失败', icon: 'none' })
					}
				})
			},
			pickKeyword(value) {
				this.keyword = value
				this.showSuggest = false
				this.doSearch()
			},
			resetKeyword() {
				this.keyword = ''
				this.searched = false
				this.showSuggest = false
				this.resetSuggestState()
			},
			clearKeyword() {
				this.resetKeyword()
			},
			saveHistory(value) {
				if (!value) return
				this.histories.unshift(value)
				arrUnique(this.histories)
				if (this.histories.length > 10) {
					this.histories.pop()
				}
				uni.setStorageSync(LOCAL_SEARCH_LIST_KEY, this.histories)
			},
			clearHistories() {
				uni.showModal({
					content: '确认清空搜索历史吗？',
					confirmText: '删除',
					confirmColor: 'red',
					cancelColor: '#808080',
					success: res => {
						if (res.confirm) {
							this.histories = []
							uni.removeStorageSync(LOCAL_SEARCH_LIST_KEY)
						}
					}
				})
			},
			async fetchMatchList(regexText) {
				this.matchList = []
				let skuJQL = ''
				const sameRes = await this.sameDb.where(`${new RegExp(regexText, 'i')}.test(list)`).get()
				const sameData = this.getResultData(sameRes)
				if (!(sameData.length >= 1 && sameData.length <= 20)) {
					return skuJQL
				}
				let skuList = []
				for (const item of sameData) {
					if (Array.isArray(item.list)) {
						skuList = skuList.concat(item.list)
					}
				}
				this.matchList = [...new Set(skuList)].slice(0, 30)
				for (let i = 0; i < this.matchList.length; i++) {
					const safeSku = String(this.matchList[i]).replace(/"/g, '\\"')
					skuJQL += `||skuList.sku =="${safeSku}"`
				}
				return skuJQL
			},
			async buildWhere(keyword) {
				const regexText = this.buildRegexText(keyword)
				if (!regexText) {
					return ''
				}
				let skuJQL = ''
				try {
					skuJQL = await this.fetchMatchList(regexText)
				} catch (error) {
					this.matchList = []
					skuJQL = ''
				}
				return `(${new RegExp(regexText, 'i')}.test(skuList.sku)||${new RegExp(regexText, 'i')}.test(boxid)${skuJQL})&&state==1`
			},
			async loadResults({ reset = false } = {}) {
				if (!this.currentWhere || (!reset && (!this.hasMore || this.loadingMore))) {
					return
				}
				if (reset) {
					this.pageNo = 0
					this.results = []
					this.hasMore = true
				}
				const nextPage = this.pageNo + 1
				const skip = (nextPage - 1) * this.pageSize
				if (nextPage === 1) {
					this.loading = true
				} else {
					this.loadingMore = true
				}
				const queryRes = await this.inventoryDb
					.where(this.currentWhere)
					.orderBy('boxid', 'asc')
					.skip(skip)
					.limit(this.pageSize)
					.get()
				const data = this.getResultData(queryRes)
				const mapped = data.map(item => ({
					boxNo: item.boxid || '-',
					lines: Array.isArray(item.skuList) ? item.skuList.map(line => ({
						sku: line.sku || line.fnsku || '',
						qty: Number(line.number || 0)
					})) : []
				}))
				this.pageNo = nextPage
				this.hasMore = mapped.length === this.pageSize
				this.results = reset ? mapped : this.results.concat(mapped)
				this.loading = false
				this.loadingMore = false
			},
			async onResultReachBottom() {
				if (!this.searched || this.loading || this.loadingMore || !this.hasMore) {
					return
				}
				try {
					await this.loadResults()
				} catch (error) {
					this.loadingMore = false
					uni.showToast({ title: '加载失败', icon: 'none' })
				}
			},
			async doSearch() {
				const value = String(this.keyword || '').trim()
				if (!value) {
					uni.showToast({ title: '请输入关键字', icon: 'none' })
					return
				}
				this.keyword = value
				this.showSuggest = false
				this.lastSearchedKeyword = value
				this.saveHistory(value)
				this.searched = true
				this.loading = true
				this.loadingMore = false
				try {
					this.currentWhere = await this.buildWhere(value)
					if (!this.currentWhere) {
						this.results = []
						return
					}
					await this.loadResults({ reset: true })
				} catch (error) {
					this.results = []
					uni.showToast({ title: '搜索失败', icon: 'none' })
				} finally {
					this.loading = false
					this.loadingMore = false
				}
			},
			colorDisplay(value) {
				const keyword = String(this.keyword || '').trim()
				if (!keyword || !value) {
					return false
				}
				const regexText = this.buildRegexText(keyword)
				const re = new RegExp(regexText, 'i')
				return re.test(value)
			},
			sameColorDisplay(value) {
				if (!value) {
					return false
				}
				return this.matchList.includes(value)
			},
			getSkuTextClass(value) {
				const isDirectHit = this.colorDisplay(value)
				return {
					'line-highlight': isDirectHit,
					'line-same-highlight': !isDirectHit && this.sameColorDisplay(value)
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		padding: 24rpx;
		background: #f4f7fc;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: 10rpx;
		margin-bottom: 14rpx;
		position: sticky;
		top: 0;
		z-index: 20;
		background: #f4f7fc;
		flex-shrink: 0;
		padding-bottom: 6rpx;
	}

	.search-input-wrap {
		flex: 1;
		position: relative;
	}

	.search-input {
		width: 100%;
		height: 76rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 0 56rpx 0 20rpx;
		border: 1px solid #d9e1f0;
		box-sizing: border-box;
	}

	.input-clear {
		position: absolute;
		right: 14rpx;
		top: 50%;
		width: 34rpx;
		height: 34rpx;
		line-height: 34rpx;
		margin-top: -17rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 24rpx;
		background: #d6deec;
		color: #ffffff;
	}

	.scan-btn,
	.search-btn {
		height: 76rpx;
		line-height: 76rpx;
		padding: 0 20rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
	}

	.scan-btn {
		background: #edf1f9;
		color: #33415f;
	}

	.search-btn {
		background: #2f7ce0;
		color: #fff;
	}

	.suggest-panel {
		background: #fff;
		border-radius: 12rpx;
		margin-bottom: 14rpx;
		padding: 6rpx 0;
		box-shadow: 0 8rpx 20rpx rgba(31, 45, 77, 0.08);
		height: calc(100vh - 210rpx);
	}

	.suggest-item {
		padding: 16rpx 18rpx;
		font-size: 25rpx;
		color: #2f3f5f;
		border-bottom: 1px solid #edf2fb;
	}

	.suggest-empty {
		padding: 18rpx;
		font-size: 24rpx;
		color: #8b97ad;
	}

	.suggest-more {
		padding: 14rpx 0 16rpx;
		font-size: 22rpx;
		color: #8b97ad;
		text-align: center;
	}

	.panel {
		background: #fff;
		border-radius: 16rpx;
		padding: 18rpx;
	}

	.panel-title {
		font-size: 28rpx;
		font-weight: 700;
		color: #1f2d4d;
	}

	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12rpx;
	}

	.clear-history {
		font-size: 22rpx;
		color: #65759a;
	}

	.mt {
		margin-top: 16rpx;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
	}

	.tag {
		padding: 10rpx 16rpx;
		border-radius: 999rpx;
		background: #eef3fc;
		color: #4b5c7d;
		font-size: 24rpx;
	}

	.tag.recommend {
		background: #e8f7f1;
		color: #2d8a63;
	}

	.result-wrap {
		height: calc(100vh - 160rpx);
	}

	.result-loading,
	.result-empty {
		padding: 32rpx 20rpx;
		text-align: center;
		font-size: 24rpx;
		color: #8b97ad;
	}

	.result-more {
		padding: 20rpx 0 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #8b97ad;
	}

	.result-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 18rpx;
		margin-bottom: 12rpx;
	}

	.box-no {
		font-size: 28rpx;
		font-weight: 700;
		color: #1f4ea1;
		margin-bottom: 10rpx;
	}

	.table-head,
	.table-row {
		display: grid;
		grid-template-columns: 1fr 120rpx;
		padding: 12rpx 0;
		border-bottom: 1px solid #edf2fb;
		font-size: 24rpx;
		color: #425372;
	}

	.table-head {
		font-weight: 700;
		color: #28385a;
	}

	.line-highlight {
		color: #d44832;
		font-weight: 600;
	}

	.line-same-highlight {
		color: #d4a017;
		font-weight: 600;
	}
</style>
