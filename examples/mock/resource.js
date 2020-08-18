import Mock, { Random } from "mockjs";
const MAX_SIZE = 92;
function log(log) {
  const time = new Date();
  console.info(
    `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
    log
  );
}

const VIDEOS = [
  "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "http://vjs.zencdn.net/v/oceans.mp4",
  ""
];

/**
 * @typedef MockItem mock
 * @param {number} [id]
 * @param {string} name
 * @param {string} address
 * @param {string} pic
 * @param {string} description
 * @param {string} blog
 * @param {string} ip
 * @param {string} birthday
 * @param {string} addtime
 * @param {string} updatetime
 */

export const ENUM = {
  ["0"]: "未通过",
  ["1"]: "已通过",
  ["2"]: "已驳回"
};

export function getEnum() {
  return Promise.resolve(
    Object.entries(ENUM).map(([key, value]) => ({ key, value }))
  );
}

/**
 * 获取数据的方法
 * @param params
 */
export function getList(params) {
  const { pageSize, pageIndex } = params;

  const template = {
    pageSize,
    pageIndex,
    totalNumber: MAX_SIZE,
    hasMore: pageIndex * pageSize < MAX_SIZE
  };

  template[
    `data|${Math.min(MAX_SIZE + pageSize - pageSize * pageIndex, pageSize)}`
  ] = [
    {
      "id|+1": pageSize * pageIndex,
      name: "@cname",
      address: "@county(true)",
      pic: "@image",
      ["video|1"]: VIDEOS,
      description: "@cparagraph",
      blog: "@url",
      ip: "@ip",
      ["status|1"]: Object.keys(ENUM),
      birthday: '@datetime("yyyy-MM-dd")',
      addtime: "@datetime",
      updatetime: "@datetime"
    }
  ];
  return new Promise(resolve => {
    setTimeout(() => {
      const response = Mock.mock(template);
      log(
        `获取${pageSize * (pageIndex - 1)} ${pageIndex * pageSize}, 
          查询条件${JSON.stringify(params, null, 2)}, 
        结果: ${JSON.stringify(response, null, 2)}`
      );
      resolve(response);
    }, Math.random() * 1000);
  });
}

/**
 * 增加
 * @param {MockItem} item
 */
export function addItem(item) {
  return new Promise((resolve, reject) => {
    // 90%概率true
    if (Random.boolean(1, 9, false)) {
      log(JSON.stringify(item));
      resolve(item);
    } else {
      reject(new Error(Random.csentence()));
    }
  });
}

/**
 * 增加
 * @param {MockItem} item
 */
export function updateItem(item) {
  return addItem(item);
}

/**
 * 删除
 * @param {number|string} id
 */
export function deleteItem(id) {
  log(`删除${id}号数据`);
  return addItem();
}

export default {
  getList,
  addItem,
  updateItem,
  deleteItem
};
