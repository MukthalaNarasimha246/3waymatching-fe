import { Component } from '@angular/core';

@Component({
  selector: 'app-procurement-table',
  templateUrl: './procurement-table.component.html',
  styleUrl: './procurement-table.component.scss'
})
export class ProcurementTableComponent {
invoices:any = [
  {
    invoiceNo: "INV-1001",
    invoiceDate: "2025-07-15",
    sellerGSTIN: "27ABCDE1234F1Z5",
    sellerPAN: "ABCDE1234F",
    buyerGSTIN: "29XYZPQ7890L1Z2",
    viewLink: "#"
  },
  {
    invoiceNo: "INV-1002",
    invoiceDate: "2025-07-18",
    sellerGSTIN: "07PQRSX5678K1Z8",
    sellerPAN: "PQRSX5678K",
    buyerGSTIN: "19LMNOP2345Q1Z9",
    viewLink: "#"
  },
  {
    invoiceNo: "INV-1003",
    invoiceDate: "2025-07-22",
    sellerGSTIN: "09WXYZA3456J1Z3",
    sellerPAN: "WXYZA3456J",
    buyerGSTIN: "27ABCDE9987F1Z4",
    viewLink: "#"
  },
  {
    invoiceNo: "INV-1004",
    invoiceDate: "2025-07-25",
    sellerGSTIN: "27MNOPQ8765R1Z6",
    sellerPAN: "MNOPQ8765R",
    buyerGSTIN: "10QWERT4567T1Z7",
    viewLink: "#"
  }
];
}
