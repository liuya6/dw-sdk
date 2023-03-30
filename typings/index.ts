declare global {
  const wx: any;
}

export interface ResponseError<T = any> {
  errorCode: string;
  message: string;
  errorDetail: T;
  success: false;
}

export interface ResponseAll {
  code: number;
  data: any;
}

export interface DwSdkProps {
  // md5($product_code."fast-sdk".$client_key."fast-sdk".$time."fast-sdk".$game_id);
  game_id: string; // 游戏id
  package_id: string; // 包id
  product_code: string; // 产品code
  client_code: string; // 客户端code
  appid: string; // 小程序appid
  appSecret: string; // 小程序密钥
}

export interface UserInfo {
  account: string;
  game_id: number;
  id: number;
  is_real_name: number;
  mobile: null | string | number;
  openid: string;
  token: string;
  user_id: number;
}

export interface RoleReportParams {
  server_name: string;
  server_id: number | string;
  role_id: number | string;
  role_name: string;
  level: number | string;
}

export interface PayOrderParams {
  role_name: string;
  role_id: string;
  server_name: string;
  server_id: string;
  cp_num: string; // 游戏研发订单号
  amount: string; // 金额
  goods_id: string;
  goods_name: string;
  level: string;
}
