<template>
	<view class="page">
		<view class="header">
			<text class="header-title">发货作业台</text>
		</view>
		<view class="card-list">
			<view
				v-for="item in menus"
				:key="item.path"
				class="menu-card"
				@click="go(item.path)"
			>
				<text class="menu-title">{{ item.title }}</text>
				<text class="menu-desc">{{ item.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus: [
					{
						title: '装箱',
						desc: '扫码装箱',
						path: '/pages/packing/index'
					},
					{
						title: '发货',
						desc: '扫描发货',
						path: '/pages/shipping/index'
					},
					{
						title: '装箱',
						desc: '扫码装箱（旧版）',
						path: '/pages/packingLoc/index'
					},
					{
						title: '搜索',
						desc: '库存查询',
						path: '/pages/search/index'
					}
				]
			}
		},
		methods: {
			go(path) {
				uni.navigateTo({ url: path })
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		padding: 32rpx;
		background: linear-gradient(180deg, #eef4ff 0%, #f9fbff 100%);
	}

	.header {
		margin-bottom: 28rpx;
	}

	.header-title {
		display: block;
		font-size: 46rpx;
		font-weight: 700;
		color: #1e2a44;
		margin-bottom: 8rpx;
	}

	.header-subtitle {
		display: block;
		font-size: 26rpx;
		color: #5f6b85;
	}

	.card-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.menu-card {
		background: #ffffff;
		border-radius: 22rpx;
		padding: 28rpx 26rpx;
		box-shadow: 0 8rpx 24rpx rgba(20, 50, 100, 0.08);
	}

	.menu-title {
		display: block;
		font-size: 34rpx;
		font-weight: 700;
		color: #2a4f95;
		margin-bottom: 8rpx;
	}

	.menu-desc {
		display: block;
		font-size: 25rpx;
		color: #6f7c97;
	}


	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
