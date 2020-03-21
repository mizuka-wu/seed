import { Seed } from "types/index";
import { Workbook } from "exceljs/index.d.ts";

export declare interface ExcelColumn {
  header: string;
  key: string;
  width: number;
  _seed: Seed;
}

export function getColumns(seeds: Seed[]): ExcelColumn[] {}

export function download(workbook: Workbook, name: string): Promise<void>;

export function readExcelFromTemplate(
  file: File,
  seeds: Sees[]
): Promise<any[]> {}

export function generateExcel(
  rows: any[],
  seeds: Seed[],
  options?: {
    sheetName: string;
    workbook: Workbook;
  }
): Promise<Workbook> {}

export function rowRenderer(row: any, seeds: Seed): Promise<string> {}
