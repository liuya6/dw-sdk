import { apiConst } from "./const";
import { baseUrl } from "./baseurl";
import { ResponseAll } from "../typings";

export function init(params) {
  return fetch(apiConst.init, "post", params);
}

export function activateReport(params) {
  return fetch(apiConst.activateReport, "post", params);
}

export function getOpenId(params) {
  return fetch(apiConst.getOpenId, "get", params);
}

export function toLogin(params) {
  return fetch(apiConst.toLogin, "post", params);
}

export function roleReport(params) {
  return fetch(apiConst.roleReport, "post", params);
}

export function payOrder(params) {
  return fetch(apiConst.payOrder, "post", params);
}

export function fetch(
  url: string,
  method: "get" | "post",
  params?
): Promise<ResponseAll> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data: params,
      method,
      header: {
        "content-type": "application/json",
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}
