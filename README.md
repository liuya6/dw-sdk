# 介绍

当玩游戏小程序 sdk 对接文档

### #开始使用

```typescript
// sdk.js
import { useDwSdk } from "./dwsdk.js"; //引入SDK
const dwSdk = useDwSdk(initConfig);

export { dwSdk };

// 其他地方引入调用
import { dwSdk } from "sdk.js";
// dwSdk.xxx
```

###### initConfig 初始化参数说明

| 参数名       | 类型   | 说明         | 示例                             | 必须 |
| ------------ | ------ | ------------ | -------------------------------- | ---- |
| game_id      | string | 游戏 id      | 10358                            | 是   |
| package_id   | string | 包 id        | 19034                            | 是   |
| product_code | string | 产品 code    | c1d6719e76994210693eb20b3b5651a3 | 是   |
| client_code  | string | 客户端 code  | 2596a12f4237673e0ee5ad4fffdd161e | 是   |
| appid        | string | 小程序 appid | wx4dfa0edc0749c5e0               | 是   |

### #角色上报

在创建角色并选择区服后调用。<br />

使用方式

```typescript
dwSdk.roleReport(roleReportConfig).then((res) => {
  console.log(res);
});
```

###### roleReportConfig 参数说明

| 参数名      | 类型            | 说明       | 示例     | 必须 |
| ----------- | --------------- | ---------- | -------- | ---- |
| server_name | string          | 服务器名称 | 1 服     | 是   |
| server_id   | string / number | 服务器 id  | 1        | 是   |
| role_id     | string / number | 角色 id    | 123      | 是   |
| role_name   | string          | 角色名称   | 花开富贵 | 是   |
| level       | string / number | 角色登记   | 100      | 是   |

### #下单

在角色下单时调用 <br />

使用方式

```typescript
dwSdk.payOrder(payOrderConfig).then((res) => {
  console.log(res);
});
```

###### payOrderConfig 参数说明

| 参数名      | 类型            | 说明                 | 示例                 | 必须 |
| ----------- | --------------- | -------------------- | -------------------- | ---- |
| role_name   | string          | 角色名称             | 花开富贵             | 是   |
| role_id     | string / number | 角色 id              | 123                  | 是   |
| server_name | string          | 服务器名称           | 1 服                 | 是   |
| server_id   | string / number | 服务器 id            | 1                    | 是   |
| level       | string / number | 角色登记             | 100                  | 是   |
| goods_id    | string / number | 商品 id              | 10                   | 是   |
| goods_name  | string          | 商品名称             | 68 钻石              | 是   |
| cp_num      | string          | 游戏研发订单号       | ev0329d8cc2e67d98406 | 是   |
| amount      | string / number | 下单金额（单位：分） | 1                    | 是   |

### #拉起分享界面

使用方式

```typescript
dwSdk.shareContent();
```

### #前往微信客服

使用方式

```typescript
dwSdk.openCustomerService();
```
