import { get, post, put, deleteAxios } from "./http";
const api = {
  getActiveInfo: "/huitongyi/turntable/getInfo",
  getDrewCount: "/huitongyi/turntable/getDrewCount",
  getMyPrize: "/huitongyi/turntable/getPrize",
  getAllPrize: "/huitongyi/turntable/rollPrize",
  getResult: "/huitongyi/turntable/draw",
  addCount: "/huitongyi//turntable/fpShareDraw",
};

const getActiveInfo = params => {
  return get(api.getActiveInfo, params);
};

const getDrewCount = params => {
  return get(api.getDrewCount, params);
};

const getMyPrize = params => {
  return get(api.getMyPrize, params);
}

const getAllPrize= params => {
  return get(api.getAllPrize, params)
}

const getResult = params => {
  return get(api.getResult, params)
}

const addCount = params => {
  return get(api.addCount, params)
}

export default {
  getActiveInfo,
  getDrewCount,
  getMyPrize,
  getAllPrize,
  getResult,
  addCount
};
