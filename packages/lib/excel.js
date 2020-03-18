/**
 * 借用table 进行渲染的
 */
import Excel from "exceljs/dist/es5/exceljs.browser";
import { saveAs } from "file-saver";
import optionsHelper from "./options";

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
 * @param {*} data
 * @param {*} formItems
 */
export function readExcelFromTemplate(data, seeds) {
  let { file } = data;
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
      data.onSuccess();
      return rows;
    });
}

/**
 * 生成excel文件
 * @param {*} rows
 * @param {*} seeds
 * @param {*} workbook
 */
export function generateExcel(rows, seeds, workbook) {
  workbook = workbook || new Excel.Workbook();

  let worksheet = workbook.addWorksheet("数据");
  let columns = getColumns(seeds);
  worksheet.columns = columns;

  return rows
    .reduce(
      (promise, row) =>
        promise
          .then(() =>
            Promise.all(
              columns.map(({ _seed }) => {
                return new Promise((resolve, reject) => {
                  try {
                    if (
                      _seed.options.excelRenderer &&
                      typeof _seed.options.excelRenderer === "function"
                    ) {
                      resolve(_seed.options.excelRenderer(row));
                    } else {
                      // 模拟环境然后生成vue项目
                      // let context = {
                      //   row,
                      //   column: _seed,
                      //   ...columnRender.computed
                      // };
                      // let renderer =
                      //   columnRender.components[context.renderer()];
                      /**
                       * 如果拥有Excel相关渲染函数的话，就交给它们
                       * @todo 拥有文件后缀支持插入图片
                       */
                      // if (renderer && renderer.excelRenderer) {
                      //   // 后缀系统
                      //   // if (
                      //   //   value.extension &&
                      //   //   ['jpeg', 'png', 'gif'].includes(value.extension)
                      //   // ) {
                      //   //   let imageId = workbook.addImage({
                      //   //     buffer: '',
                      //   //     extension: value.extension
                      //   //   })
                      //   //   worksheet.addImage(imageId, 'B1:D1')
                      //   // }
                      //   resolve(renderer.excelRenderer(_seed, contextValue));
                      // } else {
                      // }
                      resolve(1);
                    }
                  } catch (e) {
                    reject(e);
                  }
                }).then(value => {
                  // 优化为文本插入
                  row[_seed.key] = Array.isArray(value)
                    ? value.join("\n")
                    : value;
                  return row;
                });
              })
            )
          )
          .then(() => {
            worksheet.addRow(row);
            return 0;
          }),
      Promise.resolve()
    )
    .then(() => {
      return workbook;
    });
}

export default Excel;
