/**
 * 借用table 进行渲染的
 */
import Excel from "exceljs/dist/es5/exceljs.browser";
import { saveAs } from "file-saver";
import columnRender from "@/components/SeedForm/render/index.vue";
import { Notification } from "element-ui";
const MAX_PAGE_SIZE = 50; // 一次性拉取的数据数量

/**
 * 将seed转为excelJS专用格式
 * @param {*} formItems
 */
function getColumns(formItems) {
  return formItems.map(item => {
    let column = {
      header: item.label ? `${item.label}(${item.key})` : item.key,
      key: item.key,
      width: 20,
      _column: item // 原始配置
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
 *
 * @param {*} data
 * @param {*} formItems
 */
export function readExcelTemplate(data, formItems) {
  let { file } = data;
  let workbook = new Excel.Workbook();
  let columns = getColumns(formItems);

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
              value[key] = row.values[index + 1]; // excel 没有0
              return value;
            }, {})
          );
        }
      });
      data.onSuccess();
      return rows;
    });
}
