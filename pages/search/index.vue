<template>
	<view class="page">
		<view class="search-bar">
			<input
				v-model="keyword"
				class="search-input"
				placeholder="输入箱号或 SKU"
				@input="onKeywordInput"
				@focus="showSuggest = true"
			/>
			<view class="scan-btn" @click="scan">扫码</view>
			<view class="search-btn" @click="doSearch">搜索</view>
		</view>

		<view class="suggest-panel" v-if="showSkuSuggest">
			<view
				v-for="item in matchSkuRecommends"
				:key="item"
				class="suggest-item"
				@click="pickKeyword(item)"
			>
				{{ item }}
			</view>
			<view v-if="!matchSkuRecommends.length" class="suggest-empty">暂无匹配 SKU</view>
		</view>

		<view class="panel" v-if="!searched && !keyword.trim()">
			<view class="panel-title">搜索历史</view>
			<view class="tags">
				<text v-for="item in histories" :key="item" class="tag" @click="pickKeyword(item)">{{ item }}</text>
			</view>
		</view>

		<scroll-view scroll-y class="result-wrap" v-else>
			<view v-for="item in results" :key="item.boxNo" class="result-card">
				<view class="box-no">{{ item.boxNo }}</view>
				<view class="table-head">
					<text>SKU</text>
					<text>数量</text>
				</view>
				<view v-for="line in item.lines" :key="line.sku" class="table-row">
					<text>{{ line.sku }}</text>
					<text>{{ line.qty }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				searched: false,
				showSuggest: false,
				histories: ['BOX-20260307-001', 'SKU-10001', 'BOX-20260306-017'],
				skuPool: [
					'SKU-10001',
					'SKU-10002',
					'SKU-10003',
					'SKU-20001',
					'SKU-30088',
					'SKU-ABC-01'
				],
				results: []
			}
		},
		computed: {
			showSkuSuggest() {
				return this.showSuggest && !!this.keyword.trim()
			},
			matchSkuRecommends() {
				const key = (this.keyword || '').trim().toUpperCase()
				if (!key) return []
				const prefixMatched = this.skuPool.filter(item => item.startsWith(key))
				const containsMatched = this.skuPool.filter(item => !item.startsWith(key) && item.includes(key))
				return prefixMatched.concat(containsMatched).slice(0, 8)
			}
		},
		methods: {
			onKeywordInput() {
				this.searched = false
				this.showSuggest = true
			},
			scan() {
				uni.showToast({ title: '触发扫码', icon: 'none' })
			},
			pickKeyword(value) {
				this.keyword = value
				this.showSuggest = false
			},
			doSearch() {
				if (!this.keyword) {
					uni.showToast({ title: '请输入关键字', icon: 'none' })
					return
				}
				this.showSuggest = false
				if (!this.histories.includes(this.keyword)) {
					this.histories.unshift(this.keyword)
					this.histories = this.histories.slice(0, 8)
				}
				this.results = [
					{
						boxNo: 'BOX-20260307-001',
						lines: [
							{ sku: 'SKU-10001', qty: 8 },
							{ sku: 'SKU-10002', qty: 16 }
						]
					},
					{
						boxNo: 'BOX-20260307-002',
						lines: [
							{ sku: 'SKU-10003', qty: 12 }
						]
					}
				]
				this.searched = true
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		padding: 24rpx;
		background: #f4f7fc;
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: 10rpx;
		margin-bottom: 14rpx;
	}

	.search-input {
		flex: 1;
		height: 76rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 0 20rpx;
		border: 1px solid #d9e1f0;
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

	.panel {
		background: #fff;
		border-radius: 16rpx;
		padding: 18rpx;
	}

	.panel-title {
		font-size: 28rpx;
		font-weight: 700;
		color: #1f2d4d;
		margin-bottom: 12rpx;
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
</style>
