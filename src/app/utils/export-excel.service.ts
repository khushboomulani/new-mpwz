import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  exportexcel(id:any,filename:string): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById(id); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, filename);
			
    }

    exportexcel1(id:any,filename:string): void 
    {
       /* table id is passed over here */   
       let element1 = document.getElementById(id); 
       let element2 = document.getElementById(id+'1'); 
       let element3 = document.getElementById(id+'2'); 
       const ws1: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element1);
       const ws2: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element2);
       const ws3: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element3);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws1, 'BARCODE_NOT_MATCHED');
       XLSX.utils.book_append_sheet(wb, ws2, 'SHORT_ITEMS');
       XLSX.utils.book_append_sheet(wb, ws3, 'EXCESS_ITEMS');

       /* save to file */
       XLSX.writeFile(wb, filename);
			
    }




  // getFormattedDate(input) {


  //   var res = input.split("-");
  //   // 14-Jun-19
  //   let syear = res[0];
  //   let smonth = res[1];
  //   let sdate = res[2];
  //   // alert(res[0]);
  //   // alert(res[1]);
  //   // alert(res[2]);
  //   if (smonth == '01') {
  //     this.month = 'JAN'
  //   }
  //   else if (smonth == '02') {
  //     this.month = 'FEB'
  //   }
  //   else if (smonth == '03') {
  //     this.month = 'MAR'
  //   } else if (smonth == '04') {
  //     this.month = 'APR'
  //   } else if (smonth == '05') {
  //     this.month = 'MAY'
  //   } else if (smonth == '06') {
  //     this.month = 'JUN'
  //   } else if (smonth == '07') {
  //     this.month = 'JUL'
  //   } else if (smonth == '08') {
  //     this.month = 'AUG'
  //   } else if (smonth == '09') {
  //     this.month = 'SEP'
  //   } else if (smonth == '10') {
  //     this.month = 'OCT'
  //   } else if (smonth == '11') {
  //     this.month = 'NOV'
  //   } else if (smonth == '12') {
  //     this.month = 'DEC'
  //   } else {

  //   }

  //   let nnn = syear.split('20');
  //   return nnn[1] + "-" + this.month + "-" + sdate;
  // }

  // changeMessage(message: string) {
  //   this.messageSource.next(message)
  // }

  // GetLastMonthDate(month) {
  //   var res = month.split("-");
  //   let smonth = res[0];
  //   let syear = res[1];
  //   if (smonth == "Jan") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Feb") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "28-" + smonth + "-" + syear;
  //   } else if (smonth == "Mar") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Apr") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "30-" + smonth + "-" + syear;
  //   } else if (smonth == "May") {
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Jun") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "30-" + smonth + "-" + syear;
  //   } else if (smonth == "Jul") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Aug") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Sep") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "30-" + smonth + "-" + syear;
  //   } else if (smonth == "Oct") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else if (smonth == "Nov") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "30-" + smonth + "-" + syear;
  //   } else if (smonth == "Dec") {
  //     this.startDate = "01-" + smonth + "-" + syear;
  //     this.endDate = "31-" + smonth + "-" + syear;
  //   } else {

  //   }
  //   return this.startDate + "|" + this.endDate;
  // }

  // Yearget() {

  //   let data = new Date().getFullYear();

  //   this.data = JSON.stringify(data);
  //   this.year = this.data;


  //   return this.year;
  // }

  // years() {
  //   const now = new Date().getUTCFullYear();
  //   return Array(now - (now - 20)).fill('').map((v, idx) => now - idx) as Array<number>;
  // }
  // getYEar() {

  //   //  let newyear=new Date().getFullYear()%100;
  //   let start_year = 2017;
  //   let end_year = new Date().getFullYear();
  //   let newyear = end_year - start_year + 1;

  //   let years = [];
  //   for (var i = 0; i < newyear; i++) {
  //     years.push(start_year + i);
  //   }

  //   let yearsStr = JSON.stringify(years, null, 4);

  //   return years;
  // }
}
