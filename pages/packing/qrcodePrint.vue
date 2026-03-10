<template>
    <view>
        <view class="uni-list">
            <!-- 隐藏画布，用于标签绘制 -->
            <canvas
                :id="canvasId"
                :canvas-id="canvasId"
                type="2d"
                :style="{ width: labelWidth + 'px', height: labelHeight + 'px' }"
                style="position: fixed; left: -999999rpx; top: -999999rpx"
            />
            <!-- 打印机列表 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">打印机：</view>
                <view class="uni-list-cell-db">
                    <picker :value="deviceIndex" :range="deviceList" @change="onDeviceChanged" range-key="name">
                        <view class="uni-input">{{ deviceList[deviceIndex].name }}</view>
                    </picker>
                </view>
            </view>
            <!-- 出纸方向 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">出纸方向：</view>
                <view class="uni-list-cell-db">
                    <picker :value="rotationIndex" :range="rotationList" @change="onRotationChanged" range-key="name">
                        <view class="uni-input">{{ rotationList[rotationIndex].name }}</view>
                    </picker>
                </view>
            </view>
            <!-- 标签纸类型 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">纸张类型：</view>
                <view class="uni-list-cell-db">
                    <picker :value="gapIndex" :range="gapList" @change="onGapTypeChanged" range-key="name">
                        <view class="uni-input">{{ gapList[gapIndex].name }}</view>
                    </picker>
                </view>
            </view>
            <!-- 打印浓度 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">打印浓度：</view>
                <view class="uni-list-cell-db">
                    <picker :value="darknessIndex" :range="darknessList" @change="onDarknessChanged" range-key="name">
                        <view class="uni-input">{{ darknessList[darknessIndex].name }}</view>
                    </picker>
                </view>
            </view>
            <!-- 打印速度 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">打印速度：</view>
                <view class="uni-list-cell-db">
                    <picker :value="speedIndex" :range="speedList" @change="onPrintSpeedChanged" range-key="name">
                        <view class="uni-input">{{ speedList[speedIndex].name }}</view>
                    </picker>
                </view>
            </view>
            <!-- 图片处理灰度阈值 -->
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">灰度阈值：</view>
                <view class="uni-list-cell-db">
                    <input class="uni-input" type="number" v-model="threshold" />
                </view>
            </view>
            <!-- 打印方式，两种不同的写法 -->
            <view class="uni-list-cell uni-list-cell-pd">
                <view class="uni-list-cell-db">JSON配置模式</view>
                <switch :checked="jsonMode" @change="onPrintModeChanged" style="transform: scale(0.75)" />
            </view>
        </view>
        <view class="button-sp-area">
            <button class="mini-btn" type="warn" size="mini" plain="true" @click="handleStopDiscovery">停止搜索</button>
            <button class="mini-btn" type="primary" size="mini" plain="true" @click="handleStartDiscovery">
                搜索打印机
            </button>
        </view>
        <view class="button-sp-area">
            <button class="mini-btn" type="primary" size="mini" @click="handleOpenPrinter">打开打印机</button>
            <button class="mini-btn" type="default" size="mini" @click="handleClosePrinter">关闭打印机</button>
            <button class="mini-btn" type="warn" size="mini" @click="handlePrintLabel">打印</button>
        </view>
        <view style="text-align: center; padding: 10px">
            <view style="margin: 10px; border: solid lightgray 1px">
                <image
                    v-for="item in previewList"
                    :src="item.value"
                    :key="item.key"
                    class="image"
                    mode="widthFix"
                    style="margin: 10rpx; border: dashed lightgray 1px"
                />
            </view>
        </view>
    </view>
</template>

<script>
import { DrawType, LPAPIFactory, definePrintConfig } from "../../uni_modules/dothan-lpapi-ble/js_sdk";

export default {
    data() {
        return {
            canvasId: "lpapi-ble-uni1",
            labelWidth: 960,
            labelHeight: 960,
            deviceList: [
                {
                    name: "未检测到打印机",
                },
            ],
            rotationIndex: 0,
            rotationList: [
                { name: "横向打印", value: 0 },
                { name: "右转90度", value: 90 },
                { name: "转转180度", value: 180 },
                { name: "左转90度", value: 270 },
            ],
            deviceIndex: 0,
            gapList: [
                { name: "随打印机设置", value: 255 },
                { name: "小票纸", value: 0 },
                { name: "不干胶", value: 2 },
                { name: "卡纸", value: 3 },
            ],
            gapIndex: 0,
            darknessList: [
                { name: "随打印机设置", value: 255 },
                { name: "6 (正常)", value: 6 },
                { name: "7", value: 7 },
                { name: "8", value: 8 },
                { name: "9", value: 9 },
                { name: "10 (较浓)", value: 10 },
                { name: "11", value: 11 },
                { name: "12", value: 12 },
                { name: "13", value: 13 },
                { name: "14", value: 14 },
                { name: "15 (最浓)", value: 15 },
            ],
            darknessIndex: 0,
            speedList: [
                { name: "随打印机设置", value: 255 },
                { name: "最慢", value: 1 },
                { name: "较慢", value: 2 },
                { name: "正常", value: 3 },
                { name: "较快", value: 4 },
                { name: "最快", value: 5 },
            ],
            speedIndex: 0,
            isAppPlus: false,
            isWeiXin: false,
            isAlipay: false,
            /**
             * 图片预览列表
             * @type {{value: string; key: string;}[]}
             ***/
            previewList: [],
            threshold: 128,
            jsonMode: false,
            printType: "",
        };
    },
    onLoad(options) {
        console.log("========== onLoad  ==========");
        //option为object类型，会序列化上个页面传递的参数
        console.log(`---- type = ${options.type}`, options);

        // #ifdef APP-PLUS
        this.isAppPlus = true;
        // #endif
        // #ifdef MP-ALIPAY
        this.isAlipay = true;
        // #endif
        // #ifdef MP-WEIXIN
        this.isWeiXin = true;
        // #endif
        //
        this.lpapi = LPAPIFactory.getInstance({
            // 日志信息显示级别，值为 0 - 4，0表示不显示调试信息，4表示显示所有调试信息
            showLog: 4,
            // bleAdapter: bleAdapter,
			// writeExtendWaits: 5,
			// dataSendMode: 1,
        });
        // 搜索蓝牙设备
        this.lpapi.startBleDiscovery({
            timeout: 0,
            deviceFound: (devices) => {
                this.onDeviceFound(devices);
            },
        });
        // 微信小程序、支付宝小程序创建绘制上下文的时候，可以不用传递 canvasId，此时会通过离屏Canvas来创建绘制上下文环境。
        if (this.isWeiXin || this.isAlipay) {
            this.context = this.lpapi.createDrawContext();
        } else {
            this.context = this.lpapi.createDrawContext({
                // 用于进行标签绘制的画布ID
                canvasId: this.canvasId,
            });
        }
        //
        this.lpapi.setDrawContext(this.context);
        // 预览标签内容
        this.handlePreviewLabel();
    },
    onUnload() {
        console.log("========== onUnload  ==========");
        this.handleClosePrinter();
    },
    methods: {
        onDeviceChanged(e) {
            console.log(`---------- onDeviceChanged：${e.detail.value} ----------`);
            this.deviceIndex = e ? e.detail.value : 0;
        },
        onRotationChanged(e) {
            console.log(`---------- onRotationChanged: ${e.detail.value} ----------`);
            this.rotationIndex = e ? e.detail.value : 0;
        },
        onGapTypeChanged(e) {
            console.log(`---------- onGapTypeChanged：${e.detail.value} ----------`);
            this.gapIndex = e ? e.detail.value : 0;
        },
        onDarknessChanged(e) {
            console.log(`---------- onDarknessChanged：${e.detail.value} ----------`);
            this.darknessIndex = e ? e.detail.value : 0;
        },
        onPrintSpeedChanged(e) {
            console.log(`---------- onPrintSpeedChanged：${e.detail.value} ----------`);
            this.speedIndex = e ? e.detail.value : 0;
        },
        onPrintModeChanged(e) {
            console.log(`---------- onPrintModeChanged: ${e.detail.value} ----------`);
            this.jsonMode = e.detail.value;
            this.handlePreviewLabel();
        },
        handleStartDiscovery() {
            uni.showLoading({
                title: "正在搜索打印机...",
            });
            this.lpapi.startBleDiscovery({
                timeout: 5000,
                deviceFound: (devices) => {
                    this.onDeviceFound(devices);
                },
                adapterStateChange: (result) => {
                    if (!result.discovering) {
                        uni.hideLoading();
                    }
                },
            });
        },
        handleStopDiscovery() {
            this.lpapi.stopBleDiscovery();
        },
        handleOpenPrinter() {
            const currDevice = this.getDevice();
            const isAlipay = this.isAlipay;
            if (currDevice && currDevice.deviceId) {
                //
                uni.showLoading({
                    title: "正在链接打印机...",
                });
                return this.lpapi
                    .openPrinter({
                        name: currDevice.name,
                        deviceId: currDevice.deviceId,
                        // 如果打印机链接失败的话，可以尝试连续进行多次链接。
                        tryTimes: isAlipay ? 1 : 5,
                        success: (resp) => {
                            console.log(`---- 【打印机链接成功】`);
                            console.log(resp.resultInfo);
                            uni.hideLoading();
                            //
                            uni.showToast({
                                title: "打印机链接成功！",
                                icon: "success",
                            });
                        },
                        fail: (resp) => {
                            console.warn(`---- 【打印机链接失败】：`);
                            console.warn(JSON.stringify(resp));
                            //
                            uni.hideLoading();
                            //
                            uni.showToast({
                                title: "打印机链接失败！",
                                icon: "fail",
                            });
                        },
                    })
                    .then((res) => {
                        return res.statusCode === 0;
                    });
            } else {
                console.warn("---- 未检测到打印机！");
                uni.showToast({
                    title: "未检测到打印机",
                    icon: "fail",
                });
                if (typeof callback === "function") {
                    callback(false);
                }
                return false;
            }
        },
        handleClosePrinter() {
            console.log(`---- 关闭打印机！`);
            this.lpapi.closePrinter();
        },
        onDeviceFound(devices) {
            console.log(`---- 检测到打印机：`);
            console.log(devices);
            if (devices && devices.length > 0) {
                this.deviceList.splice(0);
                for (let item of devices) {
                    this.deviceList.push(item);
                    //
                    // const advertisData = item.advertisData ? new Uint8Array(item.advertisData) : undefined;
                    // const advDataStr = advertisData ? LPAUtils.arrayBufferToHex16(advertisData) : "-";
                    // console.log(`---- advertisData [${item.name}] : [${advDataStr}]`);
                }
            }
        },
        getDevice() {
            return this.deviceList[this.deviceIndex];
        },
        getOrientation() {
            return this.rotationList[this.rotationIndex].value;
        },
        getGapType() {
            return this.gapList[this.gapIndex].value;
        },
        getPrintDarkness() {
            return this.darknessList[this.darknessIndex].value;
        },
        getPrintSpeed() {
            return this.speedList[this.speedIndex].value;
        },
        getThreshold() {
            return Number(this.threshold);
        },
        updateCanvas(jobInfo) {
            // 如果通过 createSelectorQuery 获取到了 Canvas 实例，则不需要延迟处理；
            // 在微信小程序、支付宝小程序中是支持该功能的；
            return new Promise((resolve) => {
                // 更新canvas大小；
                if (jobInfo.canvas) {
                    this.labelWidth = jobInfo.canvas.width;
                    this.labelHeight = jobInfo.canvas.height;
                    // 等 Canvas 大小更新后在执行后续绘制操作；
                    setTimeout(() => {
                        resolve(true);
                    }, 100);
                } else {
                    resolve(true);
                }
            });
        },
        handlePreviewLabel() {
            // 1. 先清空当前的图片列表
            this.previewList.splice(0);
            // 2. 创建并绘制标签内容
            this.printLabel(true).then((res) => {
                console.warn(`----- printText.result: `, res);
                // 3. 标签绘制完毕后，预览标签内容
                if (res.statusCode === 0) {
                    res.previewData.forEach((value) => {
                        console.log(`dataUrl: ${value && value.length > 250 ? value.substring(0, 150) : value}`);
                        this.previewList.push({
                            value: value,
                            // 为了保证 v-for循环的唯一性，随便生成一个随机ID
                            key: `${new Date().getTime()}-${Math.random() * 1000}`,
                        });
                    });
                } else {
                    console.warn(`---- 标签预览失败！`, res);
                }
            });
        },
        async handlePrintLabel() {
            // 1. 连接打印机
            const openResult = await this.handleOpenPrinter();
            if (!openResult) {
                uni.showToast({
                    title: "打印机连接失败！",
                    icon: "success",
                });
                return;
            }
            // 2. 创建标签后直接打印
            this.printLabel(false).then((res) => {
                if (res.statusCode === 0) {
                    uni.showToast({
                        title: "打印成功！",
                        icon: "success",
                    });
                } else {
                    console.warn(`---- 打印失败！`);
                    if (res.errMsg) {
                        uni.showToast({
                            title: res.errMsg,
                            icon: "error",
                        });
                    }
                }
            });
        },
        printLabel(isPreview) {
            if (this.jsonMode) {
                return this.printLabelWithJsonMode(isPreview);
            } else {
                return this.printLabelWithDrawMode(isPreview);
            }
        },
        /**
         * 通过 draw 的方式绘制标签内容。
         */
        async printLabelWithDrawMode(isPreview) {
            console.log(`---- qrcodePrintWithDrawMode:`);
            const api = this.lpapi;
            //
            const labelWidth = 40;
            const labelHeight = 30;
            const margin = 2;
            // 二维码底部文本的高度
            const textHeight = 4;
            // 二维码大小
            const codeWidth = labelHeight - margin * 2 - textHeight;
            const text = typeof data === "string" ? data : "www.dothantech.com";
            // 创建 40mm x 30mm 大小的标签纸
            const jobInfo = api.startJob({
                context: this.context,
                width: labelWidth,
                height: labelHeight,
                orientation: this.getOrientation(),
                isPreview: isPreview,
            });
            //
            await this.updateCanvas(jobInfo);
            // 绘制二维码
            api.draw2DQRCode({
                text: text,
                x: (labelWidth - codeWidth) * 0.5,
                y: margin,
                width: codeWidth,
            });
            // 以文本形式，将二维码内容绘制到二维码底部
            api.drawText({
                text: text,
                x: 0,
                y: margin + codeWidth,
                width: labelWidth,
                height: textHeight,
                fontHeight: 3.5,
                horizontalAlignment: 1,
            });
            //
            return api.commitJob({
                gapType: this.getGapType(),
                printDarkness: this.getPrintDarkness(),
                printSpeed: this.getPrintSpeed(),
            });
        },
        /**
         * 通过 JSON 方式绘制标签内容。
         */
        printLabelWithJsonMode(isPreview) {
            console.log(`---- qrcodePrintWithJsonMode:`);
            const device = this.getDevice();
            const labelWidth = 40;
            const labelHeight = 30;
            const margin = 2;
            // 二维码底部文本的高度
            const textHeight = 4;
            // 二维码大小
            const codeWidth = labelHeight - margin * 2 - textHeight;
            const text = typeof data === "string" ? data : "www.dothantech.com";
            return this.lpapi
                .print(
                    definePrintConfig({
                        jobInfo: {
                            // context: this.context,
                            jobWidth: labelWidth,
                            jobHeight: labelHeight,
                            orientation: this.getOrientation(),
                            isPreview: isPreview, // 当前任务是否是预览任务
                        },
                        printerInfo: {
                            name: device?.name,
                            deviceId: device?.deviceId,
                        },
                        jobPage: [
                            // 绘制二维码
                            {
                                type: DrawType.qrcode,
                                text: text,
                                x: (labelWidth - codeWidth) * 0.5,
                                y: margin,
                                width: codeWidth,
                            },
                            // 以文本形式，将二维码内容绘制到二维码底部
                            {
                                type: DrawType.text,
                                text: text,
                                x: 0,
                                y: margin + codeWidth,
                                width: labelWidth,
                                height: textHeight,
                                fontHeight: 3.5,
                                horizontalAlignment: 1,
                            },
                        ],
                        onJobCreated: (jobInfo) => {
                            return this.updateCanvas(jobInfo);
                        },
                        onPageComplete: (res) => {
                            console.log(`---- onPageComplage:`, res);
                        },
                        onJobComplete: (res) => {
                            console.log(`---- onJobComplage:`, res);
                        },
                    })
                )
                .catch((error) => {
                    console.warn(`---- 标签预览或打印异常：`, error);
                    return { statusCode: 200 };
                });
        },
    },
};
</script>

<style>
button {
    margin-top: 15upx;
    margin-bottom: 15upx;
    height: 40px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
button {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
}
.button-sp-area {
    margin: 0 auto;
    width: 90%;
    display: flex;
}
.mini-btn {
    flex: 1;
    margin-right: 10rpx;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
}
</style>
