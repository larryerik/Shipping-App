<template>
	<view class="container">
		<view class="search-container">
			<!-- 搜索框 -->
			<view class="search-container-bar">

				<!-- :cancelText="keyBoardPopup ? '取消' : '搜索'" -->
				<uni-search-bar ref="searchBar" style="flex:1;" radius="100" v-model="searchText" :focus="focus"
					clearButton="auto" cancelButton="always" @clear="clear" @confirm="confirm" @cancel="cancel" />
			</view>
		</view>
		<view class="search-body">
			<!-- 搜索历史 -->
			<view class="word-container" v-if="localSearchList.length">
				<view class="word-container_header">
					<text class="word-container_header-text">搜索历史</text>
					<uni-icons v-if="!localSearchListDel" @click="localSearchListDel = true" class="search-icons"
						style="padding-right: 0;" :color="iconColor" size="18" type="trash"></uni-icons>
					<view v-else class="flex-center flex-row" style="font-weight: 500;justify-content: space-between;">
						<text
							style="font-size: 22rpx;color: #666;padding-top:4rpx;padding-bottom:4rpx;padding-right:20rpx;"
							@click="LocalSearchListClear">全部删除</text>
						<text
							style="font-size: 22rpx;color: #c0402b;padding-top:4rpx;padding-bottom:4rpx;padding-left:20rpx;"
							@click="localSearchListDel = false">完成</text>
					</view>
				</view>

				<view class="word-container_body">
					<view class="flex-center flex-row word-container_body-text" v-for="(word,index) in localSearchList"
						:key="index" @click="LocalSearchlistItemClick(word,index)">
						<text class="word-display" :key="word">{{word}}</text>
						<uni-icons v-if="localSearchListDel" size="12" type="closeempty" />
					</view>
				</view>
			</view>
			<!-- 搜索联想 -->
			<view class="search-associative" v-if="associativeShow">
				<uni-list>
					<uni-list-item v-for="(item,index) in associativeList" :key="item._id" :ellipsis="1"
						:title="item.sku" @click="associativeClick(item)" show-extra-icon clickable
						:extra-icon="{size:18,color:iconColor,type:'search'}" />
				</uni-list>
			</view>
		</view>

	</view>
</template>

<script>
	const localSearchListKey = '__local_search_history'; //	本地历史存储字段名

	// 数组去重
	const arrUnique = arr => {
		for (let i = arr.length - 1; i >= 0; i--) {
			const curIndex = arr.indexOf(arr[i]);
			const lastIndex = arr.lastIndexOf(arr[i])
			curIndex != lastIndex && arr.splice(lastIndex, 1)
		}
		return arr
	}
	function escapeRegExp(string) {
	    return string.replace(/[+?^${}()|[\]\\]/g, '\\$&');
	    // $& 表示匹配到的完整字符串
	}


	export default {
		watch: {
			searchText: function(newVal) {
				if (!newVal) return
				this.searchDebounce()

			}
		},
		computed: {
			associativeShow() {
				return this.searchText && this.associativeList.length;
			}
		},
		data() {
			return {
				associativeList: [],
				localSearchList: uni.getStorageSync(localSearchListKey),
				localSearchListDel: false,
				searchText: '',
				iconColor: '#999999',
				keyBoardPopup: false,
				focus: true, //	是否自动聚焦
				searchDebounce: this.debounce(this.searchEvent, 300)
			}
		},
		created() {


			this.mallGoodsDb = uniCloud.database().collection('sku');
			// #ifdef APP-PLUS
			uni.onKeyboardHeightChange((res) => {
				this.keyBoardPopup = res.height !== 0;
			})
			// #endif

			this.searchText = getApp().globalData.searchText;
		},
		methods: {
			searchEvent() {
				if (this.searchText) {
					let stext = escapeRegExp(this.searchText)
					stext=stext.replace(/\s+/g, ".*")
					this.mallGoodsDb.where(`${new RegExp(stext, 'i')}.test(sku)`).get().then(res => {
						this.associativeList = res.result.data;
					})
				} else {
					this.associativeList.length = 0;
					getApp().globalData.searchText = '';
				}
			},
			debounce(foo, delay) {
				//     防抖函数
				let timer;
				return function() {
					if (timer) clearTimeout(timer);
					timer = setTimeout(() => {
						foo.call(this, arguments)
						// 不输入延迟 则默认 1000 ms
					}, delay || 1000)
				}
			},
			associativeClick(item) {
				console.log("associativeClick: ", item);
				// this.loadList(item.sku);
				this.search(item.sku);
			},
			clear(res) {
				console.log("res: ", res);
			},
			confirm(res) {
				// 键盘确认

				console.log(res.value)
				this.search(res.value);
			},
			cancel(res) {
				uni.hideKeyboard();
				this.searchText = '';
				this.loadList();
			},
			search(value) {
				if (!value) {
					return;
				}
				if (value) {
					if (this.searchText !== value) {
						this.searchText = value
					}

					this.localSearchListManage(value);
				}

				uni.hideKeyboard();
				this.loadList(this.searchText);
			},
			localSearchListManage(word) {
				let list = uni.getStorageSync(localSearchListKey);
				if (list.length) {
					this.localSearchList.unshift(word);
					arrUnique(this.localSearchList);
					if (this.localSearchList.length > 10) {
						this.localSearchList.pop();
					}
				} else {
					this.localSearchList = [word];
				}
				uni.setStorageSync(localSearchListKey, this.localSearchList);
			},
			LocalSearchListClear() {
				uni.showModal({
					content: '确认清空搜索历史吗？',
					confirmText: '删除',
					confirmColor: 'red',
					cancelColor: '#808080',
					success: res => {
						if (res.confirm) {
							this.localSearchListDel = false;
							this.localSearchList = [];
							uni.removeStorageSync(localSearchListKey)
						}
					}
				});
			},
			LocalSearchlistItemClick(word, index) {
				if (this.localSearchListDel) {
					this.localSearchList.splice(index, 1);
					uni.setStorageSync(localSearchListKey, this.localSearchList);
					if (!this.localSearchList.length) {
						this.localSearchListDel = false;
					}
					return;
				}
				this.search(word);
			},

			loadList(text = '') {
				getApp().globalData.searchText = text;
				// uni.navigateBack()
				uni.redirectTo({
					url: '/pages/search-list/search-list',
					animationType: 'fade-in'
				});

			}
		},

	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		height: 100%;
		flex: 1;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	$search-bar-height: 52px;
	$word-container_header-height: 72rpx;

	.container {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		flex: 1;
		background-color: #f7f7f7;
	}

	.search-body {
		background-color: #fff;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	@mixin uni-flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
	}

	@mixin words-display {
		font-size: 26rpx;
		color: #666;
	}

	.flex-center {
		@include uni-flex;
		justify-content: center;
		align-items: center;
	}

	.flex-row {
		@include uni-flex;
		flex-direction: row;
	}

	/* #ifdef APP-PLUS */
	/* #ifndef APP-NVUE */
	::v-deep

	/* #endif */
	.uni-searchbar {
		padding-left: 0;
	}

	/* #endif */

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

	.search-container {
		height: $search-bar-height;
		@include uni-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #fff;

		@at-root {
			#{&}-bar {
				@include uni-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}
		}
	}

	.search-associative {
		/* #ifndef APP-NVUE */
		overflow-y: auto;
		/* #endif */
		position: absolute;
		top: $search-bar-height;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		margin-top: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.search-icons {
		padding: 16rpx;
	}

	.word-display {
		@include words-display;
	}

	.word-container {
		padding: 20rpx;

		@at-root {
			#{&}_header {
				@include uni-flex;
				height: $word-container_header-height;
				line-height: $word-container_header-height;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				@at-root {
					#{&}-text {
						color: #3e3e3e;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}

			#{&}_body {
				@include uni-flex;
				flex-wrap: wrap;
				flex-direction: row;

				@at-root {
					#{&}-text {
						@include uni-flex;
						@include words-display;
						justify-content: center;
						align-items: center;
						background-color: #f6f6f6;
						padding: 10rpx 20rpx;
						margin: 20rpx 30rpx 0 0;
						border-radius: 30rpx;
						/* #ifndef APP-NVUE */
						box-sizing: border-box;
						/* #endif */
						text-align: center;
					}

					#{&}-info {
						/* #ifndef APP-NVUE */
						display: block;
						/* #endif */
						flex: 1;
						text-align: center;
						font-size: 26rpx;
						color: #808080;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>