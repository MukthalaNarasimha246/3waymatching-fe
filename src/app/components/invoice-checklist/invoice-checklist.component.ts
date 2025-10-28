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
  get_invoice_checklist_data: any
  image_orginal_image: any
  noMatchCount: any
  yesMatchCount: any = 1
  batchid: any
  msme: any;
  constructor(private projectService: ProjectsService, private activaterouter: ActivatedRoute) { }
  ngOnInit() {
    this.activaterouter.params.subscribe((params) => {
      console.log("params", params['batch_id']);
      this.batchid = params['batch_id']
      this.invoice_details_data(params['id'])
      this.showextractiondetails(params['batch_id'])
    })

    this.calculateStats()
  }

  getInvoiceDetails: any

  invoice_details_data(id: any) {
    this.projectService.invoice_detials_based_on_id(id).subscribe((res: any) => {
      console.log("invoice_details_datainvoice_details_data", res);
      this.getInvoiceDetails = res
      this.msme = res.msme
      this.generate_invoice_checklist(res.invoice_id)
    })
  }
  get vendorMatchPercentage(): number {
    const raw = this.get_invoice_checklist_data?.vendorname_check || '0%';
    return parseInt(raw.replace('%', '')) || 0;
  }
  generate_invoice_checklist(invoice_id: any) {
    this.projectService.invoice_checklist(invoice_id, this.batchid).subscribe((res: any) => {
      console.log("generate_invoice_checklist", res);
      this.get_invoice_checklist_data = res

      let noMatchCount = 0;
      let yesMatchCount = 1;

      for (const key in this.get_invoice_checklist_data) {
        const value = String(this.get_invoice_checklist_data[key]).trim().toLowerCase();

        if (value === "no") {
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


  showextractiondetails(id: any) {
    console.log("id", id);
    this.projectService.showextraction(id).subscribe((res: any) => {
      console.log("showextractiondetails", res);
      this.image_orginal_image = `http://localhost:8001/files/${'68ff007c165827cd955cd153'}`
      this.fetchDocument(res[0]['image'])


    })
  }

  fetchBatchData: any
  fetchDocument(fileId: any) {
    this.projectService.getDocumentByFileId('68ff007c165827cd955cd153').subscribe({
      next: (res: any) => {
        this.fetchBatchData = res['llm_parse_json']

      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  totalConditions: number = 0;
  trueCount: number = 0;
  falseCount: number = 0;
  truePercentage: number = 0;
  falsePercentage: number = 0;


  calculateStats() {
    const conditions: boolean[] = [];

    // Duplicate Invoice No 1
    conditions.push(this.get_invoice_checklist_data?.invoice_no_duplicate === 'yes');

    // Invoice Date <= PO Date 2
    conditions.push(this.get_invoice_checklist_data?.invoice_po_date_check === 'no match');

    // Vendor Name match 3
    conditions.push(this.vendorMatchPercentage > 70);

    // Vendor DB match 4
    conditions.push(this.fetchBatchData?.company_name === this.getInvoiceDetails?.vendor_name);
    // Vendor Address
    conditions.push(this.fetchBatchData?.supplier_address == this.getInvoiceDetails?.delivery_location)
    // PO match 5
    conditions.push(this.fetchBatchData?.po_ref === this.getInvoiceDetails?.po_ref);



    // Supplier PAN 10
    conditions.push(this.get_invoice_checklist_data?.suplier_pan_check === 'yes');

    // Vendor & Supplier GSTIN validation 11
    conditions.push(
      this.get_invoice_checklist_data?.gstin_invoice_master_check === 'yes' &&
      this.get_invoice_checklist_data?.supplier_gstin_check !== 'no match'
    );

    // Vendor & Supplier GSTIN validation 12
    conditions.push(
      this.get_invoice_checklist_data?.invoice_total_lineitems ==
      this.get_invoice_checklist_data?.invoice_total
    );

    // Bill to GSTIN 13
    conditions.push(this.get_invoice_checklist_data?.buyer_gstin_check !== 'no match');

    // Count totals
    this.totalConditions = conditions.length;
    console.log(this.totalConditions)
    this.trueCount = conditions.filter(Boolean).length;
    this.falseCount = this.totalConditions - this.trueCount;
    this.truePercentage = (this.trueCount / this.totalConditions) * 100;
    this.falsePercentage = (this.falseCount / this.totalConditions) * 100;
  }
}

