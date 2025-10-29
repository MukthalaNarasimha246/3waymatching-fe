import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardSeviceService {
  constructor(private http: HttpClient) {}

  apiUrl: any = 'http://localhost:8008';

  // 1
  // getSpendDataByBranch(branch: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/branch/${branch}`);
  // }

  // // 2
  // getSpendDataByQuarter(quarter: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/quarter/${quarter}`);
  // }

  // // 3
  // getSpendDataByTaxes(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/taxes`);
  // }

  // // 4
  // getSpendData(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/spend-data`);
  // }

  // // 5
  // getSpendDataByParty(party: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/party/${party}`);
  // }

  // // 6
  // getSpendDataByCurrency(currency: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/currency/${currency}`);
  // }

  // 7
  // getSpendDataByQuarter(quarter: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/quarter/${quarter}`);
  // }

  getQuantityByBranch(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quantitybyBranch`);
  }

  totalValuebyDate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalValuebyDate`);
  }

  grossAmtwithDiscount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/grossAmtwithDiscount`);
  }

  totalValuebyParty(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalValuebyParty`);
  }

  totalValuebyYrQTR(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalValuebyYrQTR`);
  }

  totalQtybyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalQtybyYr`);
  }

  totalPartiesbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalPartiesbyYr`);
  }

  totalGrossbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalGrossSalesbyYr`);
  }

  totalNetbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalNetSalesbyYr`);
  }

  totalInvoicesbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalInvoicesbyYr`);
  }

  totalTotalValueInvoicesbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalTotalValueInvoicesbyYr`);
  }

  totalTotalDiscountbyYr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalTotalDiscountbyYr`);
  }

  top5VendorsByValue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top5/vendors/value`);
  }

  top5VendorsByInvoice(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top5/vendors/invoice`);
  }

  fullMatches(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total/fullMatches`);
  }

  violatingVendors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total/violatingVendors`);
  }

  rejections(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total/rejections`);
  }

  checkedInvoices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total/checkedInvoices`);
  }

  top5VendorsByViolations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top5/vendors/violation`);
  }

  partialMatchesByDate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/partialMatchesByDate`);
  }

  fullMatchesByDate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fullMatchesByDate`);
  }

  mismatchesByCurrency(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mismatch/currency`);
  }

  top5RejectionReasons(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top5/rejection/reasons`);
  }

  top5VendorsByItemMismatch(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top5/vendor/item_mismatch`);
  }

  top5RejectionReasonByTaxDiscrepancy(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tax_discrepancy/rejection_reason`);
  }
}
