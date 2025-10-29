import { Component, ElementRef, Input, Output,EventEmitter, ViewChild } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { GstinStateCode } from '../../constant/utility';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.scss',
})
export class PurchaseOrderComponent {
  activeTab: string = 'po'; // Default active tab
  data: any;
  poLineItem: any;
  verificationStatus:any = 'not_verified';
  isVerifying:boolean = false

  @Input()  poDetails: any = {}
  supplierDetails: any;
  buyerDetails: any;
  shippingDetails: any;
  summaryLineItem: any;
  termsAndConditions: any;
  @Input() item:any = '';

  @Output() isLoader = new EventEmitter()

  image_path:any
  image_path_image:any
    searchInfoextracted:any;

    @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  searchText: string = 'INVOICE ID';
  searchText1: string = 'romashka';
  imageSrc: any; // Replace with your image
  ctx!: CanvasRenderingContext2D;
  detectedWords: any;


  onTabClick(tab: string): void {
    this.activeTab = tab;
  }
  constructor(private projectService: ProjectsService) {}
  ngOnInit() {
    console.log(this.poDetails,'POO Details');
    
    

  }
  // getData() {

  //   this.projectService.getData('po',this.item.mapping_id).subscribe((data: any) => {
  //   this.data = data[0];
  //   this.poDetails = data.po_details;
  //   this.supplierDetails = data.supplier_details[0];
  //   this.buyerDetails = data.buyer_details[0];
  //   this.shippingDetails = data.shipping_details[0];
  //   this.poLineItem = data.line_items;
  //   this.summaryLineItem = data.summary;
  //   this.termsAndConditions = data.terms_and_conditions[0];
  //   this.image_path_image = data.image_path;
  //   // this.image_path = `assets/output_images/${this.item.claim_id}/${this.item.image}`;
  //   this.image_path = this.item.image;
  //     console.log(data);
  //   });
  // }

  ngAfterViewInit() {

    // this.loadImage();
    // this.detectedWords = this.testing()
  }
  loadImage() {
    // alert("Hi there")
    console.log("this.imageSrc;", this.image_path)
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = this.image_path;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      this.ctx.drawImage(img, 0, 0);
    };
  }

  testing(){
    // console.log("image_path", this
    // return this.searchInfoextracted =
    this.projectService.bbox_api(this.image_path_image).subscribe((data: any) => {
      console.log("testing", data)
      // this.imageSrc = data[0].image;
      this.detectedWords =JSON.parse(data[0].bbox);
      console.log("detectedWords", this.detectedWords)
      return this.detectedWords
    })

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
