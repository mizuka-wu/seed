/**
 * 借用table 进行渲染的
 */
import { saveAs } from "file-saver";
import optionsHelper from "./options";
import valueHelper from "./value";

function loadExcel() {
  if (window.Excel) {
    return Promise.resolve(window.Excel);
  } else {
    return import(
      /* webpackChunkName: "exceljs" */ "exceljs/dist/exceljs.min.js"
    );
  }
}

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
    if (seed.render === "enum" && (seed.options || {}).enum) {
      const options =
        typeof seed.options.enum === "object"
          ? Object.keys(seed.options.enum)
          : seed.options.enum;
      column.dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`"${options.join(",")}"`]
      };
    }
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
  return Promise.resolve(workbook)
    .then(book => book.xlsx.writeBuffer())
    .then(buffer => new Blob([buffer], { type: "application/octet-stream" }))
    .then(blob => saveAs(blob, `${name}-${new Date().toLocaleString()}.xlsx`));
}

/**
 * 根据seed来读取excel
 * @param {File} file
 * @param {*} formItems
 */
export function readExcelFromTemplate(file, seeds) {
  loadExcel.then(Excel => {
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
  const Excel = await loadExcel();
  workbook = workbook || new Excel.Workbook();

  let worksheet = workbook.addWorksheet(sheetName);
  let columns = getColumns(seeds);
  worksheet.columns = columns;

  // 一些需要对 cell 操作的放在这里
  columns.forEach((column, columnIndex) => {
    /**
     * @see https://github.com/exceljs/exceljs/issues/1027
     * 3.3.1版本的exceljs可以增加列校验，会报错
     */
    if (column.dataValidation) {
      const columnName = String.fromCharCode(65 + columnIndex);
      worksheet.dataValidations.add(
        `${columnName}2:${columnName}99999`,
        column.dataValidation
      );
    }
  });

  rows.forEach(async row => {
    let renderedRow = await rowRenderer(row, seeds, workbook, worksheet);
    worksheet.addRow(renderedRow);
  });

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
