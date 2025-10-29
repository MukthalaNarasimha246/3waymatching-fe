import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-receipt-against-order',
  templateUrl: './receipt-against-order.component.html',
  styleUrl: './receipt-against-order.component.scss',
})
export class ReceiptAgainstOrderComponent {
  data: any;
  raoLineItem: any;
  raoDetails: any;
  supplierDetails: any;
  buyerDetails: any;
  shippingDetails: any;
  raoSummaryLineItem: any;
  termsAndConditions: any;

  constructor(private projectService: ProjectsService) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.projectService.getData('rao','PC24-25RAO%202').subscribe((data: any) => {
      this.data = data;
      console.log(this.data.line_items);

      this.raoDetails = data.rao_details;
      // this.supplierDetails = data.supplier_details[0];
      // this.buyerDetails = data.buyer_details[0];
      // this.shippingDetails = data.shipping_details[0];
      this.raoLineItem = data.line_items;
      this.raoSummaryLineItem = data.summary;
      // this.termsAndConditions = data.terms_and_conditions[0];

      console.log(this.raoLineItem);
    });

    // this.projectService
    //   .getData('rao', 'PC24-25_MRO%201321')
    //   .subscribe((data: any) => {
    //     this.mrnDetails = data.mrn_details;
    //     this.supplierDetails = data.supplier_details[0];
    //     this.buyerDetails = data.buyer_details[0];
    //     this.mrnLineItem = data.line_items;
    //     this.summaryLineItem = data.summary;
    //     // this.data = data[0];
    //     console.log(this.buyerDetails);
    //   });
  }
}
