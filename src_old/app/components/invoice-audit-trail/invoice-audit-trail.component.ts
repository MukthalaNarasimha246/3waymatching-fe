import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { retry } from 'rxjs';

@Component({
  selector: 'app-invoice-audit-trail',
  templateUrl: './invoice-audit-trail.component.html',
  styleUrl: './invoice-audit-trail.component.scss'
})
export class InvoiceAuditTrailComponent {
  po_details_list:any
  invoiceData:any
  batch_id:any
  constructor(private projectService:ProjectsService, private activaterouter:ActivatedRoute, private router:Router) { }

  ngOnInit(){
    this.activaterouter.params.subscribe((params) => {
      // console.log()
      console.log("params",params['batch_id']);
      this.batch_id = params['id']
      this.invoice_details_data(params['id'])
    } )
    // this.po_list_details()
  }

  po_list_details(vendor_name:any ){
    this.projectService.po_list_details(vendor_name).subscribe((res:any) => {
      console.log("res",res);
      this.po_details_list = res
    }
    )
  }
  invoice_details_data(id:any){
    this.projectService.invoice_detials_based_on_id(id).subscribe((res:any) => {
      console.log("invoice_details_datainvoice_details_data",res);
      this.invoiceData = res
      this.po_list_details(this.invoiceData['company_name']);
      if(res['po_ref'] != null){
        this.router.navigate(['/data-clasification']);
      }
      // this.generate_invoice_checklist(res.invoice_id)
    })
  }
  addToInvoice(po_details:any){
    // alert(this.batch_id)
    var update_details = {
      "po_ref": po_details.po_number,
      "invoice_id": this.invoiceData['invoice_id']
    }
    // return
    console.log("update_details",update_details);
    console.log("this.invoiceData['vendor_name']",this.invoiceData['vendor_name']);
    // return
    this.projectService.add_po_details_to_invoice(update_details).subscribe((res:any) => {
      console.log("add_po_details_to_invoice",res);
      if(res.message){
          this.projectService.invoice_checklist(this.invoiceData['invoice_id'],this.batch_id).subscribe((res:any) => {
            alert("PO details added to invoice successfully");
            console.log("check list res", res)
            this.router.navigate(['/data-clasification']);
          })
      }

    })

    console.log("po_details",po_details);

  }
}
