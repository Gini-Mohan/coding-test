import { ExportToCsv } from 'export-to-csv';
import * as Papa from "papaparse";
import { ParseError, ParseResult } from "papaparse";
import { Catalog } from '../model/catalog.model';

export class FileParser {

  public static async parseCsv(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        download: true,
        header: true,
        skipEmptyLines: true,
        transform: (value: string): string => {
          return value.trim();
        },
        complete: (results: ParseResult<any>) => {
          return resolve(results);
        },
        error: (error: ParseError) => {
          return reject(error);
        },
      });
    });
  }

  public static parseJson(data: Catalog[]): void {   
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }
}
