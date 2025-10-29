import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-checklist',
  templateUrl: './invoice-checklist.component.html',
  styleUrl: './invoice-checklist.component.scss'
})
export class InvoiceChecklistComponent {
parseInt(arg0: any) {
throw new Error('Method not implemented.');
}
  get_invoice_checklist_data:any
  image_orginal_image:any
  noMatchCount:any
  yesMatchCount:any = 1
  batchid:any
  msme:any;
  constructor(private projectService:ProjectsService, private activaterouter:ActivatedRoute) { }
  ngOnInit(){
    this.activaterouter.params.subscribe((params) => {
      console.log("params",params['batch_id']);
      this.batchid = params['batch_id']
      this.invoice_details_data(params['batch_id'])
      this.showextractiondetails(params['batch_id'])
    } )
  }

  invoice_details_data(id:any){
    this.projectService.invoice_detials_based_on_id(id).subscribe((res:any) => {
      console.log("invoice_details_datainvoice_details_data",res);
      this.msme = res.msme
      this.generate_invoice_checklist(res.invoice_id)
    })
  }
  get vendorMatchPercentage(): number {
    const raw = this.get_invoice_checklist_data?.vendorname_check || '0%';
    return parseInt(raw.replace('%', '')) || 0;
  }
  generate_invoice_checklist(invoice_id:any){
    this.projectService.invoice_checklist(invoice_id,this.batchid).subscribe((res:any) => {
      console.log("generate_invoice_checklist",res);
      this.get_invoice_checklist_data = res

      let noMatchCount = 0;
let yesMatchCount = 1;

for (const key in this.get_invoice_checklist_data) {
    const value = String(this.get_invoice_checklist_data[key]).trim().toLowerCase();

    if ( value === "no") {
        noMatchCount++;
    } else if (value === "yes" || value === "match") {
        yesMatchCount++;
    } else if (value.endsWith("%")) {
        const percent = parseFloat(value.replace("%", ""));
        if (percent >= 70) {
            yesMatchCount++;
        }
    }
}
this.noMatchCount = noMatchCount
this.yesMatchCount = yesMatchCount;
console.log("No Match / No Count:", noMatchCount);
console.log("Match / Yes / >=70% Count:", yesMatchCount);
    })
  }
  showextractiondetails(id:any){
    console.log("id",id);
    this.projectService.showextraction(id).subscribe((res:any) => {
      console.log("showextractiondetails",res);
       this.image_orginal_image = `http://localhost:8001/images_files/${res[0]['blob_image']}`
       console.log(this.image_orginal_image);
       

    })
  }
}
