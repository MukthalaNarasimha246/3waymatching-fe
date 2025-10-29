import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { GstinStateCode } from '../../constant/utility';

@Component({
  selector: 'app-material-receipt-note',
  templateUrl: './material-receipt-note.component.html',
  styleUrl: './material-receipt-note.component.scss',
})
export class MaterialReceiptNoteComponent {
  mrnData: any;
  mrnLineItem: any;
  mrnDetails: any;
  supplierDetails: any;
  buyerDetails: any;
  invoiceLineItem: any;
    @Output() isLoader = new EventEmitter()
  summaryLineItem: any;
  @Input() item:any = '';
   verificationStatus:any = 'not_verified';
  isVerifying:boolean = false

  constructor(private projectService: ProjectsService) {}
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.projectService
      .getData('mrn', this.item.mapping_id)
      .subscribe((data: any) => {
        this.mrnDetails = data.mrn_details;
        this.supplierDetails = data.supplier_details[0];
        this.buyerDetails = data.buyer_details[0];
        this.mrnLineItem = data.line_items;
        this.summaryLineItem = data.summary;
        // this.data = data[0];
        console.log(this.buyerDetails);
      });
  }



   gstinVerfiedObject:any = null
      verifie_loader_text = ''
    
    
      verifyGSTIN(gstin:any) {
        this.isVerifying = true
         this.isLoader.emit(true)
        this.verifie_loader_text = 'Verifying the GSTIN number'
    
        this.projectService.verifyGstin(gstin).subscribe({
          next:(res:any)=>{
            console.log(res,'response');
            this.gstinVerfiedObject = res?.result
            this.verificationStatus = res?.result.status
            this.isVerifying = false
            this.isLoader.emit(false)
            this.verifie_loader_text = ''
          },
          error:(erro)=>{
            console.log(erro);
            this.isVerifying = false
             this.isLoader.emit(false)
            this.verifie_loader_text = ''
    
          }
        })
      }
    
    
      panVerifiedObject: any = null;
    verificationStatusPan: any = null;
    
    verifyPAN(pan: string) {
      this.isVerifying = true
        this.isLoader.emit(true)
      this.verifie_loader_text = 'Verifying the PAN number'
      this.projectService.verifyPan(pan).subscribe({
        next: (res: any) => {
          console.log(res, 'PAN verification response');
          this.panVerifiedObject = res?.result?.details
          this.verificationStatusPan = res?.result?.status;
           this.isVerifying = false
            this.isLoader.emit(false)
            this.verifie_loader_text = ''
        },
        error: (err) => {
          console.log(err);
           this.isVerifying = false
            this.isLoader.emit(false)
  
            this.verifie_loader_text = ''
        }
      });
    }
    
    
    showDatePicker = false;
    selectedDate = '';
    
    onSelectOption(event: any) {
      const value = event.target.value;
      if (value === 'date') {
        this.showDatePicker = true;  // Hide select, show date picker
      } else {
        this.showDatePicker = false; // Keep showing select
      }
    }
    
    
    
    
    
    
    getStateInfo(gstin: string) {
      const gstinCodes = new GstinStateCode();
      const code = gstin?.substring(0, 2); // first 2 digits
      const state = gstinCodes?.gstinstateCode[code] || "Unknown State".toLowerCase()
    
      console.log(code, 'state code');
      console.log(state, 'state name');
    
      return { code, state };
    }
    
    getStateCodeValidation(stateCode:any,gstin:any){
      const code = gstin?.substring(0, 2);
      return code == stateCode ? true:false
    }
  
  
    memsVerifiedObject: any = null;
  verificationStatusMems: any = null;
  
  
  verifyMems(pan: string) {
    this.isVerifying = true
    this.verifie_loader_text = 'Verifying the PAN number'
    this.projectService.verifyMems(pan).subscribe({
      next: (res: any) => {
        console.log(res, 'UAN verification response');
        this.memsVerifiedObject = res
        this.verificationStatusMems = res?.status;
         this.isVerifying = false
          this.verifie_loader_text = ''
      },
      error: (err) => {
        console.log(err);
         this.isVerifying = false
          this.verifie_loader_text = ''
      }
    });
  }
}
