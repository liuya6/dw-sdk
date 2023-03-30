export function getReposeData(result: {
  code: number;
  data: any;
  msg?: string;
}) {
  return {
    success: result.code === 0,
    data: result.data,
    msg: result.msg ? result.msg : result.code === 0 ? "成功" : "失败",
  };
}
