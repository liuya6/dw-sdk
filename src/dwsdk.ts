import { getReposeData } from "../utils/tools";
import {
  DwSdkProps,
  RoleReportParams,
  UserInfo,
  PayOrderParams,
} from "../typings";
import { VERSION } from "./version";
import md5 from "js-md5";
import * as sdkService from "../api";

class DwSdk {
  static VERSION: string = VERSION;
  static dwInstance: DwSdk | null = null;
  static commonParams = {};

  state = {
    appid: "", // 小程序id
    openid: "", // 小程序唯一id
    sign: "", // 签名
    time: 0, // 时间戳
    game_id: "", // 游戏id
    package_id: "", // 包id
    product_code: "", // 产品code
    client_key: "", // 客户端code
    device_type: "3", // 设备类型 1 安卓 2 ios 3 小程序,因目前只有小程序所以固定为3，后期可能会有h5
    device_model: "", // 设备型号
    device_version: "", // 系统版本
    device_brand: "", // 设备品牌
    device_net: "", // 网络类型
  };

  wxUserInfo: any = {};
  userInfo: Partial<UserInfo> = {};

  constructor(params: DwSdkProps) {
    this.initData(params);
    this.openShare();
    this.getAuthorize();
    this.initServiceData();
    this.activateReport();
    this.login();
  }

  openShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }

  initData(params: DwSdkProps) {
    this.state = Object.assign(this.state, params);
    this.state.time = Date.now();
    const math = `${this.state.product_code}.fast-sdk.${this.state.client_key}.fast-sdk.${this.state.time}.fast-sdk.${this.state.game_id}`;
    this.state.sign = md5(math);
    DwSdk.commonParams = {
      sign: this.state.sign,
      game_id: this.state.game_id,
      package_id: this.state.package_id,
      time: this.state.time,
      product_code: this.state.product_code,
      client_key: this.state.client_key,
    };
  }

  getAuthorize() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.userInfo"]) {
          wx.authorize({
            scope: "scope.userInfo",
            success(res) {},
          });
        } else {
          wx.getUserInfo({
            success(res) {
              this.wxUserInfo = res.userInfo;
            },
          });
        }
      },
      fail(err) {
        console.log(err, "err");
      },
    });
  }

  // 初始化
  async initServiceData() {
    return await sdkService.init(DwSdk.commonParams);
  }

  // 激活上报
  async activateReport() {
    const systemInfo = wx.getSystemInfoSync();
    const netInfo = await wx.getNetworkType();
    this.state.device_net = netInfo.networkType;
    this.state.device_brand = systemInfo.brand;
    this.state.device_model = systemInfo.model;
    this.state.device_version = systemInfo.system;

    return await sdkService.activateReport(
      Object.assign({}, DwSdk.commonParams, {
        device_type: this.state.device_type,
        device_brand: this.state.device_brand,
        device_model: this.state.device_model,
        device_version: this.state.device_version,
        device_net: this.state.device_net,
      })
    );
  }

  // 微信授权登陆
  async login() {
    const { code } = await wx.login();
    const openidData: any = await sdkService.getOpenId(
      Object.assign({}, DwSdk.commonParams, {
        appid: this.state.appid,
        js_code: code,
      })
    );
    this.state.openid = openidData.data.openid;
    return new Promise(async (resolve) => {
      const userInfoData = await sdkService.toLogin(
        Object.assign({}, DwSdk.commonParams, {
          openid: openidData.data.openid,
          device_type: this.state.device_type,
        })
      );
      this.userInfo = userInfoData.data;
      resolve(getReposeData(userInfoData));
    });
  }

  // 角色上报
  roleReport(params: RoleReportParams) {
    return new Promise(async (resolve) => {
      const data = await sdkService.roleReport(
        Object.assign({}, DwSdk.commonParams, params, {
          user_id: this.userInfo.user_id,
          account: this.userInfo.account,
          device_type: this.state.device_type,
        })
      );
      resolve(getReposeData(data));
    });
  }

  // 下单
  async payOrder(params: PayOrderParams) {
    wx.showLoading({
      title: "加载中",
    });
    return new Promise(async (resolve) => {
      const data = await sdkService.payOrder(
        Object.assign({}, DwSdk.commonParams, params, {
          device_type: this.state.device_type,
          account: this.userInfo.account,
          real_amount: params.amount,
          user_id: this.userInfo.user_id,
        })
      );
      wx.hideLoading();
      wx.openCustomerServiceConversation({
        showMessageCard: true,
        sendMessageTitle: `支付${Number(params.amount) / 100}元订单`,
        sendMessagePath: data.data.url,
        success(res) {
          console.log(res, "openCustomerServiceConversation");
        },
      });
      resolve(getReposeData(data));
    });
  }

  // 分享
  shareContent() {
    wx.shareAppMessage();
  }

  // 前往客服
  openCustomerService() {
    wx.openCustomerServiceConversation();
  }

  // 获取设备类型
  getSystemOS(system: string) {
    const str = system.toLocaleLowerCase();
    if (str.indexOf("android") > -1) return "android";
    if (str.indexOf("ios") > -1) return "ios";
    if (str.indexOf("windows") > -1) return "windows";
    if (str.indexOf("macos") > -1) return "macos";
    return "other";
  }

  // 获取dwsdk实例
  static getInstance(params: DwSdkProps) {
    if (!this.dwInstance) {
      this.dwInstance = new DwSdk(params);
    }
    return this.dwInstance;
  }
}

export { DwSdk };
