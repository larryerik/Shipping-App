<template>
	<!--
	本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2651
	uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	uni-clientDB 组件文档：https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component
	DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view style="overflow: hidden;">
		<view class="search-container-bar" >
			<uni-search-bar ref="searchBar" style="flex:1;" radius="100" v-model="searchText"
				@search-click="searchClick" @clear="clear" cancelButton="none" 
				placeholder="请输入搜索内容" />
				
		</view>
		<view class="list">
			<!-- 刷新页面后的顶部提示框 -->
			<!-- 当前弹出内容没有实际逻辑 ，可根据当前业务修改弹出提示 -->
			<view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条内容</view>
			<!-- 页面分类标题 -->
			<!-- <uni-section style="margin:0;" :title="listTitle" type="line"><button class="button-box"
					@click="select">切换视图</button></uni-section> -->
			<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData"
				collection="inventory" :where="where" @load="load" manual>
				<text v-if="error" class="list-info">{{error.message}}</text>
				<!-- 基于 uni-list 的页面布局 -->
				<view class="tabContent" v-show="true">
					<view v-for="item in data" :key="item._id">
						<view class="paramBox">
							<view class="param-title">{{item.boxid}}</view>
							<view v-for="subItem in item.skuList" :key="subItem.sku">
								<view class="param-item">

									<label v-if=" colorDisplay(subItem.sku)"
										style="width: 80%;font-size: 28rpx; color: red;">{{subItem.sku}}</label>
									<label v-else-if="matchList.includes(subItem.sku)" style="width: 80%;font-size: 28rpx; color: orange;">{{subItem.sku}}</label>
									<label v-else
										style="width: 80%;font-size: 24rpx; color: #999;">{{subItem.sku}}</label>
									<text>{{subItem.number}}</text>
								</view>
							</view>

						</view>


					</view>


					<view style="height: 30rpx;"></view>
				</view>
				<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
				<uni-load-more v-if="!error && (loading || options.status === 'noMore') " :status="options.status" />
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	function escapeRegExp(string) {
	    return string.replace(/[+?^${}()|[\]\\]/g, '\\$&');
	    // $& 表示匹配到的完整字符串
	}

	export default {
		data() {
			return {
				searchText: '',
				matchList:[],
				formData: {
					waterfall: false, // 布局方向切换
					status: 'loading', // 加载状态
				},
				where: "",
				tipShow: false // 是否显示顶部提示框
			};
		},
		mounted() {
			this.searchText = getApp().globalData.searchText;
			let text =this.searchText
			if (text) {
				text = text.trim()
				text = text.replace(/\s+/g, ".*")
			}
			if (text) {
				 text=escapeRegExp(text)
				const db = uniCloud.database() //代码块为cdb
				db.collection('same').where(`${new RegExp(text, 'i')}.test(list)`)
					.get().then(({
						result
					}) => {
						console.log("result", result)
						let data = result.data
						let skuJQL = ''
						if ((data.length >= 1) &&(data.length <= 20)) {


							let skuList = []
							
							
							for (let item of data) {
								skuList = [...skuList, ...item.list]
							}

							this.matchList = [...new Set(skuList)]
							
							console.log("skuList", skuList)
							
							// skuJQL = this.matchList.map((item) => `||skuList.sku =="${item}"`).join("")
							for(let index = 0; index < this.matchList.length & index < 30; index++) {
							    skuJQL=skuJQL+ `||skuList.sku =="${this.matchList[index]}"`
							}
							
							
						}

						this.where = `(${new RegExp(text, 'i')}.test(skuList.sku)${skuJQL})&&state==1`
						this.$nextTick(() => {
							this.$refs.udb.loadData()
						})


						// db.collection('inventory').where(`( ${new RegExp(text, 'i')}.test(skuList.sku)${skuJQL})&&state==1`).get()

					}).catch((err) => {

						console.log(err.errCode); // 打印错误码
						console.log(err.errMsg); // 打印错误内容

					})
			} else {
				this.where = "state==1"
				this.$nextTick(() => {
					this.$refs.udb.loadData()
				})

			}


		},
		methods: {
			/**
			 * 切换商品列表布局方向
			 */
			select() {
				this.formData.waterfall = !this.formData.waterfall;
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.tipShow = true
				this.formData.status = 'more'
				this.$refs.udb.loadData({
					clear: true
				}, () => {
					this.tipShow = false
					uni.stopPullDownRefresh()
				})
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				this.$refs.udb.loadMore()
			},
			load(data, ended) {
				if (ended) {
					this.formData.status = 'noMore'
				}
			},
			clear() {
				getApp().globalData.searchText = '';
				uni.redirectTo({
					url: '/pages/search/search',
					animationType: 'fade-in'
				});

			},
			searchClick() {
				uni.hideKeyboard();
				uni.redirectTo({
					url: '/pages/search/search',
					animationType: 'fade-in'
				});
			},
			colorDisplay(value) {
				let keyword = this.searchText

				if (!keyword || (!value)) {
					return false
				}
				keyword = escapeRegExp(keyword.trim())
				
				keyword = keyword.replace(/\s+/g, ".*")

				let re = new RegExp(keyword, 'i')


				return (re.test(value))
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}

	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #ff5a5f;
	}

	.shop-price-text {
		font-size: 16px;
	}

	.hot-tag {
		background: #ff5a5f;
		border: none;
		color: #fff;
	}

	.button-box {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: #007AFF;
		color: #fff;
	}

	.uni-link {
		flex-shrink: 0;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}


	// 默认加入 scoped ，所以外面加一层提升权重
	.list {
		margin-top: 52px;

		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			::v-deep .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				::v-deep

				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
		}
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE */
	::v-deep

	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE */
	::v-deep

	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.list-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		margin-top: 20rpx;
	}

	.tabContent {
		background: #fff;
		overflow: hidden;
	}

	.param-title {
		background: #f5f5f5;
		height: 80rpx;
		line-height: 80rpx;
		margin: 20rpx 30rpx 0;
		font-size: 28rpx;
		text-indent: 30rpx;
	}

	.param-item {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
		border-bottom: 1rpx solid #f5f5f5;
		margin: 0 30rpx;
		border-left: 1rpx solid #f5f5f5;
		border-right: 1rpx solid #f5f5f5;
		padding: 0 30rpx;
		display: flex;
	}
</style>