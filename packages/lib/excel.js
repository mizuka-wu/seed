/**
 * 借用table 进行渲染的
 */
import Excel from "exceljs/dist/es5/exceljs.browser";
import { saveAs } from "file-saver";
import optionsHelper from "./options";
import valueHelper from "./value";

/**
 * 将seed转为excelJS专用格式
 * @param {*} formItems
 */
function getColumns(seeds) {
  return optionsHelper(seeds, "excel").map(seed => {
    let column = {
      header: seed.label ? `${seed.label}(${seed.key})` : seed.key,
      key: seed.key,
      width: 20,
      _seed: seed // 原始配置
    };
    return column;
  });
}

/**
 * 导出
 * @param {Excel.Workbook} workbook
 * @todo 增加检测
 */
export function download(workbook, name = "template") {
  if (!workbook) {
    throw new Error("workbook不能为空");
  }
  return workbook.xlsx
    .writeBuffer()
    .then(buffer => new Blob([buffer], { type: "application/octet-stream" }))
    .then(blob => saveAs(blob, `${name}-${new Date().toLocaleString()}.xlsx`));
}

/**
 * 根据seed来读取excel
 * @param {File} file
 * @param {*} formItems
 */
export function readExcelFromTemplate(file, seeds) {
  let workbook = new Excel.Workbook();
  let columns = getColumns(seeds);

  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = e => reject(e);
    reader.onload = event => {
      let buffer = event.target.result;
      resolve(workbook.xlsx.load(buffer));
    };
    reader.readAsArrayBuffer(file);
  })
    .then(() => {
      return workbook.getWorksheet(1);
    })
    .then(worksheet => {
      let rows = [];
      worksheet.columns = columns;
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          rows.push(
            columns.reduce((value, { key }, index) => {
              /**
               * @todo 处理一些key特殊情况
               */
              value[key] = row.values[index + 1]; // excel 没有0
              return value;
            }, {})
          );
        }
      });
      return rows;
    });
}

/**
 * 生成excel文件
 * @param {*} rows
 * @param {*} seeds
 * @param {*} workbook
 */
export async function generateExcel(
  rows,
  seeds,
  { workbook, sheetName = "数据" } = {}
) {
  workbook = workbook || new Excel.Workbook();

  let worksheet = workbook.addWorksheet(sheetName);
  let columns = getColumns(seeds);
  worksheet.columns = columns;

  for (let row of rows) {
    let renderedRow = await rowRenderer(row, seeds, workbook, worksheet);
    worksheet.addRow(renderedRow);
  }

  return workbook;
}

/**
 * 渲染单行数据
 * @param {*} row
 * @param {*} seeds
 */
async function rowRenderer(row, seeds) {
  seeds = optionsHelper(seeds, "excel"); // 获取excel的渲染方案
  /**
   * 全列渲染，增加Promise.all 防止未来使用renderfunction的时候造成的问题
   */
  return Promise.all(
    seeds.map(async seed => {
      const value = valueHelper(row, seed);

      /**
       * @todo 转excel相关格式, jsx支持
       */
      let result = value;
      // typeof seed.render === "function" ? await seed.render(value) : value;

      // 判断result是否是jpg等图片，是的话加入成图片
      // if (
      //   value.extension &&
      //   ['jpeg', 'png', 'gif'].includes(value.extension)
      // ) {
      //   let imageId = workbook.addImage({
      //     buffer: '',
      //     extension: value.extension
      //   })
      //   worksheet.addImage(imageId, 'B1:D1')
      // }

      return Array.isArray(result) ? result.join(",") : result;
    })
  );
}

export default Excel;
