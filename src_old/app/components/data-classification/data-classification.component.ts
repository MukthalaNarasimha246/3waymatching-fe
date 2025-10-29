import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from '../../services/common-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { interval, of, Subscription } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { GstinStateCode } from '../../constant/utility';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-data-classification',
  templateUrl: './data-classification.component.html',
  styleUrl: './data-classification.component.scss',
  animations: [
    trigger('splashAnimation', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
        pointerEvents: 'none'
      })),
      transition('show => hide', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class DataClassificationComponent implements OnDestroy {
  showSplash = false;
  splashState = 'show';
  splashProgress = 0;
  verificationStatus: any = 'not_verified';
  isAddCaseOpen = false;
  isLoader = false
  totalClaims = 11;
  totalPages = 286;
  selectedDocType: string = 'invoice'; // Default selected document type
  activeTab: string = 'upload';
  isdocumentVisible = false;
  pdf_list: any
  activeTabs: string = 'Purchase Order'; // Default active tab
  cliamIds: any
  image_orginal_image: any
  document: any
  invoiceDetails: any = {}
  supplierDetails: any;
  buyerDetails: any;
  shippingDetails: any;
  invoiceLineItem: any;
  summaryLineItem: any;
  bankDetails: any;
  assetDetails: any;
  filetarget: any
  data: any;
  activeDocId: number | null = null;
  list_top_class: any
  based_on_cliamId_list: any
  classificaiton_data: any;
  imageDocView: any
  imagePath: any;
  claim_number: any;
  po_currentItem: any
  mrn_currentItem: any
  review_data: any
  invoice_currentItem: any
  image_path_mrn: any
  image_path_po: any
  image_path_invoice: any
  searchImage_value: any
  poLineItem: any;
  poDetails: any;
  termsAndConditions: any;
  image_duplicates_value: any
  searchInfoextracted: any;
  classification_obj!: FormGroup;
  selectedValue: any
  isVerifying: boolean = false
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  searchText: string = 'INVOICE ID';
  searchText1: string = 'romashka';
  imageSrc: any; // Replace with your image
  ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private scale = 1;
  detectedWords: any;
  // docList:any;
  // docCategoryList:any
  docCategoryList: Record<string, string[]> = {
    'Id Proof': ["Passport", "AadharCard", "VoterID", "PANCard"],
    'Diagnostic Report': ["DiagnosticReports", "Biocam", "Pathology", "Histpathology", "MicroBiology", "Heamatology", "Ultrasound", "MRI_CT_USG_Report", "MRI_CT_USG_Scan",
      "X-ray",],
    'Discharge Summary': ["DischargeSummary"],
    'Medical Bills': ["HospitalBill", "MedicalBills", "Pharmasybills", "Opdbills"],
    'Claim Form': ["ClaimForm", "Letters", "Emails"],
    'Cheque': ["Cheque", "Bankpassbook", "Bankstatement"],
    // "X-ray & Scan":[ "MRI_CT_USG_Scan",
    //   "X-ray",],
    'Others': ["Utility"]

  };

  based_on_cliamId_list_flag_list: any



  docList = [
    'Aadhaar', 'Agreement', 'Bill of Supply', 'Claims', 'Diagnostic Report',
    'Discharge Summary', 'Growth Scan', 'Hospital Bill', 'Inpatient Credit Bill',
    'Medical Prescription', 'PAN', 'Policy Document', 'Purchase Order',
    'Tax Invoice', 'e-invoice', 'eway bill', "MRN"
  ]

  pollingIntervals: any = {};
  cases: any[] = [];
  statuses = ['Exact Duplicate Found', 'Po No not mapped', 'Checklist Failed', 'Reconciliation'];

  // statuses = ['Exact Duplicate Found', 'PO Not Mapped', 'Audit Complete', 'Reconciliation'];
  currentStep = 0;

  tabs = [
    {
      id: 'upload',
      label: 'Upload',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>`
    },
    {
      id: 'classification',
      label: 'Classification',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>`
    },


    {
      id: 'extraction',
      label: 'Extraction',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>`
    },
    {
      id: 'review',
      label: 'Review',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>`
    }
  ];


  extraction_tabs = [
    {
      id: 'Image',
      label: 'Image',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>`
    },
    {
      id: 'Json',
      label: 'Json',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>`
    },


    {
      id: 'MD File',
      label: 'MD File',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>`
    },
    {
      id: 'Text File',
      label: 'Text File',
      icon: `<svg class="icon" viewBox="0 0 24 24" width="20" height="20">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>`
    }
  ];

  selectedTab = 'file';
  totalDocuments = 0;
  batchId = '';
  path = '';
  uploadedFiles: File[] = [];
  // cdr: any;

  batchId_progress_bar = 'BATCH_2025-10-07_14-22-16'; // can be dynamic
  processedCount = 0;
  totalCount = 0;
  progressPercentage = 0;
  loading = false;
  showModal = false;
  private pollingSubscription!: any;
  private intervalId: any;

  progress = 0; // % value
  progressData: any = { processed_count: 0, total_count: 0 };

  private timer: any;


  constructor(private http: HttpClient, private projectService: ProjectsService, private router: Router, private cdr: ChangeDetectorRef, private fb: FormBuilder, private _commonService: CommonServiceService,) { }
  // constructor() { }

  ngOnInit(): void {
    this.pdf_conversion_hypotus()
    this.classification_details()
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isAddCaseOpen) {
        this.closeAddCase();
      }
    });


    this.classification_obj = this.fb.group({
      "claim_id": [''],
      "img": [''],
      "top_label": ['']
    })




  }





  getStepFromStatus(status: string): number {
    const index = this.statuses.indexOf(status);
    return index >= 0 ? index + 1 : 0;
  }

  isStepCompleted(status: string, currentStep: number, expectedStatus: string, stepNumber: number): boolean {
    return currentStep >= stepNumber && this.statuses[stepNumber - 1] === expectedStatus;
  }


  animateSplashProgress(): void {
    // Animate splash screen progress bar from 0 to 100%
    const startTime = performance.now();
    const duration = 3000; // 3 seconds

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use ease-out cubic for smoother progress
      this.splashProgress = Math.round(100 * (1 - Math.pow(1 - progress, 3)));

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
      this.cdr.detectChanges();
    };

    requestAnimationFrame(updateProgress);
  }



  image_url = ''
  // /Users/fis/Downloads/way-matching/way-matching/src/assets/output_images
  toggleInvoiceInfo(image: any) {
    this.isdocumentVisible = !this.isdocumentVisible;
    this.imageDocView = image
    console.log(this.imageDocView, 'imsgesrd');


    this.imagePath = `assets/output_images/${image.claim_id}/${image.image}`;
    this.selectedValue = image.top_label
    this.classification_obj.controls['claim_id'].setValue(image.claim_id)
    this.classification_obj.controls['img'].setValue(image.image)
    this.classification_obj.controls['top_label'].setValue(image.top_label)
    this.image_url = `${environment.idpUrlUpload}/files/${image.image}`
  }
  toggleInvoiceInfo_close() {
    this.isdocumentVisible = !this.isdocumentVisible;
  }
  toggleAddCase(): void {
    this.isAddCaseOpen = !this.isAddCaseOpen;

    if (this.isAddCaseOpen) {
      // Reset form when opening
      this.resetForm();
    }
  }

  closeAddCase(): void {
    this.isAddCaseOpen = false;
  }

  setTab(tab: string): void {
    this.selectedTab = tab;
  }
  file: any


  generateBatchFolderName(): string {

    const project_id = localStorage.getItem('project_id')
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // months are 0-based
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    const dateStr = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    return `BATCH_${project_id}_${dateStr}`;
  }

  batch_id = ''

  handleFileUpload(event: any): void {


    const token = localStorage.getItem('authToken')
    this.file = event.target.files[0];

    const batchId = this.generateBatchFolderName()



    const formData = new FormData();
    formData.append('file', this.file);
    this.isAddCaseOpen = false;
    this.loading = true
    this.progress = 0;
    this.progressData = { processed_count: 0, total_count: this.files.length };

    this.http.post(`${environment.idpUrlUpload}/upload/${token}/${batchId}`, formData)
      .subscribe((response: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'File Uploaded Successful!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        this.loading = false
        this.pdf_conversion_hypotus()
        this.classification_details()

      }, (error: any) => {
        console.error('File upload failed', error);

      })
    // refresh every 5 seconds
    this.getProgress(batchId)




  }
  onDocTypeChange(event: any): void {
    this.selectedDocType = event.target.value;
    // You can add logic here to handle the change in document type
  }

  addCase(): void {
    // // alert(this.selectedDocType);
    // // return
    // this.showSplash = true
    // this.animateSplashProgress()


    // console.log("this.filetarget", this.filetarget)
    // const formData = new FormData();
    // formData.append('file', this.filetarget);
    // this.projectService.upload(formData,this.selectedDocType).subscribe((response: any) => {
    //   console.log("response", response);
    //   if(response){


    //     this.showSplash = false
    //     console.log(response,'response');

    //     // if(response.process_result[0]['image_duplicates'] == 'No_Duplicate'){
    //     //   this.showSuccessMessage('Files uploaded successfully');
    //     //   this.router.navigate(['/data-clasification']);
    //     // }else if(response.process_result[0]['image_duplicates'] == 'Po No not mapped'){
    //     //   this.showSuccessMessage('Po No not mapped');
    //     //   this.router.navigate([`/po_list/${response.process_result[0]['insert_id']}`]);
    //     // }else{
    //     //   this.showSuccessMessage('Duplicate Similarity Analysis');
    //     //   this.router.navigate([`/duplicat_similarity/${response.process_result[0]['insert_id']}`]);
    //     // }
    //   }
    // } , (error:any) => {
    //   console.error('Error uploading files:', error);
    //   this.showSuccessMessage('Error uploading files');
    // }
    // );
    //     this.resetForm();
    // this.closeAddCase();
  }

  resetForm(): void {
    this.batchId = '';
    this.path = '';
    this.totalDocuments = 0;
    this.uploadedFiles = [];
    this.selectedTab = 'file';
  }

  reviewCase(caseItem: any): void {
    // In a real app, navigate to case review page or open modal
    // this.showSuccessMessage(`Reviewing case: ${caseItem.id}`);
    if (caseItem.status == 'Exact Duplicate Found' || caseItem.status === 'similarity Found') {
      // this.image_duplicates(caseItem.id)
      this.router.navigate([`/duplicat_similarity/${caseItem.id}`]);
    } else if (caseItem.status == "Checklist Failed") {
      // alert("HI")
      this.router.navigate([`/invoice_check_list/${caseItem.id}/${caseItem.claim_id}`]);
    } else if (caseItem.status == "Po No not mapped") {
      this.router.navigate([`/po_list/${caseItem.id}`]);
    } else {
      this.router.navigate(['/standard']);
    }

  }

  showSuccessMessage(message: string): void {
    // In a real app, use a proper toast/notification service
    // alert(message);
  }
  toggleInvoiceInfo_1() {
    this.isdocumentVisible = !this.isdocumentVisible;
  }



  reviewImage(image: any): void {
    // Add logic to handle image review
  }

  summarizeClaim(claim: any): void {
    // Add logic to handle claim summarization
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  // extraction
  onTabClick(tab: string): void {
    this.activeTabs = tab;

    if (this.activeTab == 'extraction') {
      this.list_top_class = this.filterByTopLabel(this.review_data, tab)

    }
  }
  onInputClick(e: any) {
    this.searchInImage(e); // Trigger highlighting when the input field is clicked
  }
  pdf_conversion_hypotus() {
    this.projectService.pdf_conversion_hypotus().subscribe((data: any) => {
      this.cases = data.map((item: any) => {
        return {
          ...item,
          currentStep: this.getStepFromStatus(item.status)
        };
      });
      this.pdf_list = this.cases;
    })
  }
  classification_details() {
    this.projectService.classification_details().subscribe((data: any) => {

      this.classificaiton_data = data
      // this.pdf_list = data;
      const cliamIds: any = [];
      data.map((res: any) => {
        cliamIds.push(res.claim_id)
      })

      this.cliamIds = cliamIds.filter((value: any, index: any) => cliamIds.indexOf(value) === index);
      console.log(this.cliamIds, 'c;a');


      // Start polling for each claim
      this.cliamIds.forEach((claimId: string) => {
        this.startPollingClaimStatus(claimId);
      });






      //Flag related code here

      const matchedObjects1 = this.cliamIds.reduce((acc: any, value: any) => {
        // Find all objects in `objectsArray` with the matching `id`
        const matchedvalues: any = []
        const matched = data.filter((obj: any) => obj.claim_id === value ? matchedvalues.push(obj.top_label) : '');
        let uniqueArray = [...new Set(matchedvalues)];
        let result = this.docList.filter((value: any) => !uniqueArray.includes(value));


        const unmatchedCategories: any = {};
        // const category:any='';
        // const items:any = ''
        Object.entries(this.docCategoryList).forEach(([category, items]) => {
          // Log the category and items for debugging


          // Ensure items is an array and check if it has any matches in arrayToCheck
          if (Array.isArray(items)) {
            const hasMatch = items.some(item => uniqueArray.includes(item));



            // If no items in this category match arrayToCheck, add it to unmatchedCategories
            if (!hasMatch) {
              unmatchedCategories[category] = items;
            }
          }
        });



        // If we found matches, add them to the accumulator object under the `id` key
        if (matched.length > 0) {
          acc[value] = acc[value] ? acc[value].concat(Object.keys(unmatchedCategories)) : Object.keys(unmatchedCategories);
        }

        return acc;
      }, {} as Record<string, typeof data[]>);
      // this.based_on_cliamId_list_flag_list = matchedObjects1
      this.based_on_cliamId_list_flag_list = matchedObjects1

    })
  }




  groupByClaimId(data: any[]) {
    return data.reduce((acc: { [key: string]: any[] }, item: any) => {
      if (!acc[item.claim_id]) {
        acc[item.claim_id] = [];
      }
      acc[item.claim_id].push(item);
      return acc;
    }, {});
  }

  activeClaimId: any
  tabs_dynamically: any
  showextraction(claim: any) {
    this.activeClaimId = claim;
    this.review_data = this.based_on_cliamId_list[claim];
    console.log(this.review_data, 'review_data')
    this.tabs_dynamically = this.getUniqueTopLabels(this.review_data);
    this.activeTabs = this.tabs_dynamically[0]['value'];

    this.list_top_class = this.filterByTopLabel(this.review_data, this.tabs_dynamically[0]['value']);
    this.setActiveTab('extraction');


  }




  getUniqueTopLabels(data: any) {
    const labels = data.map((item: any) => item.top_label);
    const uniqueLabels = Array.from(new Set(labels));

    // Map to the desired object format
    return uniqueLabels.map(label => ({
      label: label,
      value: label
    }));
  }




  filterByTopLabel(data: any[], label: string) {
    return data.filter(item => item.top_label === label);
  }





  ngAfterViewInit() {
    this.loadthesidenav()
  }




  loadthesidenav() {
    this._commonService.updateSidebarOptionFlag();

    this._commonService.detected_sidebar_option$.subscribe(option_enable => {

      // this.isReConciliation = option_enable

    });
  }

  searchInImage(e: any) {
    const searchValue = e.target.value.trim().toLowerCase();
    // alert(searchValue)
    // Clear canvas and redraw the image
    const img = new Image();
    img.src = this.searchImage_value;
    img.onload = () => {
      const canvas = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(img, 0, 0);

      if (!searchValue) return; // If input is empty, don't highlight

      this.detectedWords.forEach((word: any) => {
        if (word.text.toLowerCase().includes(searchValue)) {
          const x = word.bbox[0][0]; // Top-left X
          const y = word.bbox[0][1]; // Top-left Y
          const width = word.bbox[1][0] - word.bbox[0][0]; // Width from x1 - x0
          const height = word.bbox[2][1] - word.bbox[0][1]; // Height from y1 - y0

          this.ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'; // Yellow transparent highlight
          this.ctx.fillRect(x, y, width, height);
        }
      });
    };
  }
  testing(image_path: any) {
    // return this.searchInfoextracted =
    this.projectService.bbox_api(image_path).subscribe((data: any) => {
      // this.imageSrc = data[0].image;
      this.detectedWords = JSON.parse(data[0].bbox);
      return this.detectedWords
    })
  }






  classification_Update() {
    const payload = {
      token: localStorage.getItem('authToken'),
      image_id: this.classification_obj.controls['img'].value,
      doc_type: this.classification_obj.controls['top_label'].value,
      batch_id: this.imageDocView?.claim_id,
      insert_id: this.imageDocView?.id
    };
    console.log(payload, 'payload');


    const update_payload = {
      image: this.classification_obj.controls['img'].value,
      top_label: this.classification_obj.controls['top_label'].value,
    };

    this.projectService.clasification_Update_Data(update_payload).subscribe((res: any) => {
      console.log(res, 'Updated in Postgress Database');
      if (res) {
        this.projectService.extracte_image(payload).subscribe((res: any) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Classification Doc type Updated',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });

          this.isdocumentVisible = false
          this.pdf_conversion_hypotus()
          this.classification_details()

        })

      }

    })







  }

  closeModal() {
    this.showModal = false;
  }



  ngOnDestroy(): void {

    this._commonService.disableReconcilation()
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }

  }






  activeImageId: any

  onDocumentClick(doc: any) {
    this.activeImageId = doc['image']
    this.activeDocId = doc.id;
    this.image_orginal_image = `http://localhost:8001/files/${doc['image']}`
    this.fetchDocument(doc['image'])

    this.refreshVariable()

    // Ensure canvas exists
    setTimeout(() => {
      const canvasEl = this.canvas?.nativeElement;
      if (!canvasEl) {
        console.error('Canvas is undefined!');
        return;
      }

      this.ctx = canvasEl.getContext('2d')!;
      this.loadImage()
    }, 0);

  }

  private originalWidth = 0;
  private originalHeight = 0;

  loadImage() {
    this.image.src = this.image_orginal_image || 'http://localhost:8001/images_files/68f9be114f25dde2f8db3f99';

    this.image.onload = () => {
      this.originalWidth = this.image.width;
      this.originalHeight = this.image.height;

      const canvasEl = this.canvas.nativeElement;
      this.ctx = canvasEl.getContext('2d')!;

      // Initial draw
      this.scale = 1;
      this.drawImage();
    };

    this.image.onerror = (err) => {
      console.error('Failed to load image', err);
    };
  }



  purchaseOrderDetails: any
  mrnDetails: any
  ewaybillDetail: any
  fetchData: any
  fetchBatchData: any
  fetchDocument(fileId: any) {
    this.projectService.getDocumentByFileId(fileId).subscribe({
      next: (res: any) => {
        this.fetchBatchData = res

        console.log(this.activeTabs);
        this.fetchData = res['llm_parse_json']



        switch (this.activeTabs) {
          case 'Tax Invoice':
            this.invoiceDetails = res['llm_parse_json'];
            this.summaryLineItem = [
              {
                "total_cgst_amount": this.invoiceDetails?.total_cgst_amount,
                "total_discount_value": this.invoiceDetails?.total_discount_value,
                "total_invoice_value": this.invoiceDetails?.total_invoice_value,
                "total_quantity": this.invoiceDetails?.total_quantity,
                "total_sgst_amount": this.invoiceDetails?.total_sgst_amount,
                "total_tax_amount": this.invoiceDetails?.total_tax_amount,
                "total_taxable_amount": this.invoiceDetails?.total_taxable_amount,
                "tcs_rate": this.invoiceDetails?.tcs_rate,
                "taxable_value": this.invoiceDetails?.taxable_value,
              }

            ]

            break;

          case 'Purchase Order':
            this.purchaseOrderDetails = res['llm_parse_json'];


            break;

          case 'MRN':
            this.mrnDetails = res['llm_parse_json'];
            console.log('MRN document loaded');
            break;
          case 'eway bill':
            this.ewaybillDetail = res['llm_parse_json'];
            console.log(this.ewaybillDetail);

            console.log('eway bill document loaded');
            break;
          case 'e-invoice':
            this.invoiceDetails = res['llm_parse_json'];
            console.log(this.ewaybillDetail);

            console.log('eway bill document loaded');
            break;


          default:
            console.warn('Unknown document type');
            this.invoiceDetails = null;
            this.purchaseOrderDetails = null;
            this.mrnDetails = null;
            break;
        }
      },
      error: (err) => {
        this.document = null;
      }
    });
  }



  // Initialize verification flags
  GSTIN_verified = false;
  PAN_verified = false;
  MSME_verified = false;
  CIN_verified = false;
  BANK_verified = false;

  gstinVerfiedObject: any = null
  verifie_loader_text = ''


  verifyGSTIN(gstin: any) {
    this.isVerifying = true
    this.verifie_loader_text = 'Verifying the GSTIN number'

    this.projectService.verifyGstin(gstin).subscribe({
      next: (res: any) => {
        this.gstinVerfiedObject = res?.result
        this.verificationStatus = res?.result.status
        this.GSTIN_verified = res?.result?.status == 'id_found' || false;
        this.isVerifying = false
        this.verifie_loader_text = ''
        this.callAfterVerifiedCompleted();
      },
      error: (erro) => {
        console.log(erro);
        this.isVerifying = false
        this.verifie_loader_text = ''

      }
    })
  }


  panVerifiedObject: any = null;
  verificationStatusPan: any = null;

  verifyPAN(pan: string) {
    this.isVerifying = true
    this.verifie_loader_text = 'Verifying the PAN number'
    this.projectService.verifyPan(pan).subscribe({
      next: (res: any) => {
        this.panVerifiedObject = res?.result?.details
        this.verificationStatusPan = res?.result?.status;
        this.PAN_verified = res?.result?.status == 'id_found' || false
        this.isVerifying = false
        this.verifie_loader_text = ''
        this.callAfterVerifiedCompleted()
      },
      error: (err) => {
        this.isVerifying = false
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
    const state = gstinCodes?.gstinstateCode[code] || "Unknown State";

    return { code, state };
  }

  getStateCodeValidation(stateCode: any, gstin: any) {
    const code = gstin?.substring(0, 2);
    return code == stateCode ? true : false
  }



  refreshVariable() {
    this.isVerifying = false
    this.verifie_loader_text = ''
    this.verificationStatusPan = null
    this.gstinVerfiedObject = null
    this.verificationStatus = ''

  }


  onLoaderChange(isLoading: boolean) {
    this.loading = isLoading;

  }



  memsVerifiedObject: any = null;
  verificationStatusMems: any = null;


  verifyMems(pan: string) {
    this.isVerifying = true
    this.verifie_loader_text = 'Verifying the PAN number'
    this.projectService.verifyMems(pan).subscribe({
      next: (res: any) => {
        this.memsVerifiedObject = res
        this.verificationStatusMems = res?.status;
        this.BANK_verified = res?.status == 'succes' || false
        this.isVerifying = false
        this.verifie_loader_text = ''
        this.callAfterVerifiedCompleted()
      },
      error: (err) => {
        console.log(err);
        this.isVerifying = false
        this.verifie_loader_text = ''
      }
    });
  }




  // Function to start polling for a claim
  startPollingClaimStatus(claimId: string) {
    if (this.pollingIntervals[claimId]) return; // Avoid duplicate polling

    this.pollingIntervals[claimId] = setInterval(() => {
      this.projectService.getFilesByBatch(claimId).subscribe((res: any) => {
        if (res.files && res.files.length > 0) {
          const status = res.files[0].status;

          // Update your classification_data objects with this claimId
          this.classificaiton_data = this.classificaiton_data.map((item: any) => {
            if (item.claim_id === claimId) {
              return { ...item, status }; // append status
            }
            return item;
          });




          this.based_on_cliamId_list = this.groupByClaimId(this.classificaiton_data)




          // Stop polling if completed
          if (status === 'completed') {
            clearInterval(this.pollingIntervals[claimId]);
            delete this.pollingIntervals[claimId];
          }
        }
      });
    }, 5000); // poll every 5 seconds
  }



  isBatchCompleted(batchItems: any): boolean {
    return batchItems.every((item: any) => item.status === 'completed');
  }



  getValidation(field: string, index?: number, subField?: string) {
    if (!this.invoiceDetails?.validation) return null;

    let fieldValidation;

    if (field === 'line_items' && index != null && subField) {
      fieldValidation = this.invoiceDetails.validation.line_items?.[index]?.[subField];
    } else {
      fieldValidation = this.invoiceDetails.validation[field];
    }

    if (!fieldValidation) return null;

    return {
      isValid: fieldValidation.is_valid,
      remarks: fieldValidation.remarks
    };
  }



  verified_back_details: any = null

  verifyBankDetails(back_no: any, ifsc_code: any) {

    this.isVerifying = true

    this.projectService.verifybd(back_no, ifsc_code).subscribe({
      next: (res: any) => {
        this.verified_back_details = res?.result;
        if (this.verified_back_details) {
          this.BANK_verified = true
        }
        this.isVerifying = false
        this.callAfterVerifiedCompleted()
      },
      error: (err) => {
        this.isVerifying = false
      }
    });
  }


  checkHitlStatus(array: any[]) {
    const allTrue = array.every((item: any) => item.is_hitl === true);
    const allFalse = array.every((item: any) => item.is_hitl === false);
    const allExtraction = array.every((item: any) => item.is_extracted == true);

    if (allExtraction) {
      return "Completed";        // ✅ All items extracted → Completed
    } else if (allTrue) {
      return "Extracting";       // ✅ All HITL true → Extracting
    } else {
      return "CLS_HITL";         // ✅ Otherwise → CLS_HITL
    }
  }




  drawImage() {
    const canvas = this.canvas.nativeElement;

    // Set canvas size based on scaled image
    canvas.width = this.image.width * this.scale;
    canvas.height = this.image.height * this.scale;

    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(this.image, 'imagesss');


    // Draw image
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  zoomIn() {
    console.log(this.scale, 'scc');

    if (this.scale < 5) { // max zoom
      this.scale *= 1.2;
      this.drawImage();
    }
  }

  zoomOut() {
    if (this.scale > 0.1) { // min zoom
      this.scale /= 1.2;
      this.drawImage();
    }
  }

  toggleFullScreen() {
    const canvas = this.canvas.nativeElement;
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }


  editableInvoice: any = {};
  isEditMode: boolean = false;
  isEditBillMode: boolean = false
  isEditSupplierMode: boolean = false
  isEditBankDetailMode: boolean = false


  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  disableEditMode() {
    this.isEditMode = false
  }


  enableEditBill() {
    this.isEditBillMode = true;
  }

  cancelEditBill() {
    this.isEditBillMode = false;
  }

  disableEditModeBill() {
    this.isEditBillMode = false
  }


  enableEditSupplier() {
    this.isEditSupplierMode = true;
  }

  cancelEditBillSupplier() {
    this.isEditSupplierMode = false;
  }

  disableEditModeBillSupplier() {
    this.isEditSupplierMode = false
  }


  enableEditBankDetail() {
    this.isEditBankDetailMode = true;
  }

  cancelEditBillBankDetail() {
    this.isEditBankDetailMode = false;
  }

  disableEditModeBillBankDetail() {
    this.isEditBankDetailMode = false
  }


  reset_variable() {

    this.isEditMode = false;
    this.isEditBillMode = false
    this.isEditSupplierMode = false
    this.isEditBankDetailMode = false
  }





  saveinvoicedetails(data: any) {
    console.log('Updated invoice details:', this.invoiceDetails);



    try {
      const manualJson = this.invoiceDetails // parse string to JSON
      this.projectService
        .updateLLMParseJson(this.activeImageId, manualJson)
        .subscribe(
          (res) => {
            console.log(res);
            if (res) {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Date Updated Successfully',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
              });
              this.fetchDocument(this.activeImageId)
              this.reset_variable()
            }


          },
          (err) => {
            console.error(err);
          }
        );
    } catch (e) {
      alert('Invalid JSON');
    }

  }



  saveinvoicedetailsOutput(data: any) {
    try {
      const manualJson = data // parse string to JSON
      this.projectService
        .updateLLMParseJson(this.activeImageId, manualJson)
        .subscribe(
          (res) => {
            console.log(res);
            if (res) {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Date Updated Successfully',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
              });
              this.fetchDocument(this.activeImageId)
              this.reset_variable()
            }


          },
          (err) => {
            console.error(err);
          }
        );
    } catch (e) {
      alert('Invalid JSON');
    }

  }



  isJsonPopupOpen = false;

  // Original JSON
  jsonData = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
  };

  // Editable copy for the popup
  editableJson: any = {};

  // Open popup
  openJsonPopup() {
    this.editableJson = JSON.parse(JSON.stringify(this.jsonData)); // Deep copy
    this.isJsonPopupOpen = true;
  }

  // Close popup without saving
  closeJsonPopup() {
    this.isJsonPopupOpen = false;
  }

  // Save JSON changes
  saveJson() {
    this.jsonData = JSON.parse(JSON.stringify(this.editableJson)); // Save changes
    console.log("Saved JSON:", this.jsonData);
    this.isJsonPopupOpen = false;
  }

  // Optional: track changes
  onJsonChange(updatedJson: any) {
    this.editableJson = updatedJson;
  }



  //  invoiceDetails = {
  //   line_items: [
  //     { item_name: 'Item A', hsn: '1001', item_qty: 2, unit_price: 50, total_retail_price: 100, isEditing: false },
  //     { item_name: 'Item B', hsn: '1002', item_qty: 1, unit_price: 75, total_retail_price: 75, isEditing: false }
  //   ]
  // };

  editRow(index: number) {
    this.invoiceDetails.line_items[index].isEditing = true;
  }

  saveRow(index: number) {
    const row = this.invoiceDetails.line_items[index];
    row.total_retail_price = row.item_qty * row.unit_price;
    row.isEditing = false;
  }

  addRow() {
    this.invoiceDetails.line_items.push({
      item_name: '',
      hsn: '',
      item_qty: 0,
      unit_price: 0,
      total_retail_price: 0,
      isEditing: true
    });
  }

  deleteRow(index: number) {
    this.invoiceDetails.line_items.splice(index, 1);
  }

  calculateTotal(row: any) {
    return row.item_qty * row.unit_price;
  }


  extractedActiveTab: string = 'Image';

  setExtractedActiveTab(tab: string) {
    this.extractedActiveTab = tab;
    this.loadMdFile()
    this.loadTxtFile()
  }

  mdContent: string | null = null;

  loadMdFile() {
    const md_file = this.fetchBatchData?.ocr_text_file_id_md
    this.http.get(`${environment.idpUrlUpload}/files/${md_file}`, { responseType: 'text' })
      .subscribe({
        next: (data) => this.mdContent = data,
        error: (err) => console.error('❌ Error loading Markdown:', err)
      });
  }


  txtContent: string | null = null

  loadTxtFile() {
    const text_file = this.fetchBatchData?.ocr_text_file_id_txt

    this.http.get(`http://127.0.0.1:8001/files/${text_file}`, { responseType: 'text' })
      .subscribe({
        next: (data) => this.txtContent = data,
        error: (err) => console.error('❌ Error loading text file:', err)
      });
  }


  callAfterVerifiedCompleted() {
    const payload = {
      GSTIN_verified: true,
      PAN_verified: this.PAN_verified,
      MSME_verified: this.MSME_verified,
      CIN_verified: this.CIN_verified,
      BANK_verified: this.BANK_verified,
    };

    this.http.post(`http://127.0.0.1:8001/validate_third_party/${this.activeImageId}`, payload)
      .subscribe({
        next: (res) => console.log('✅ Third-party validation called successfully!', res),
        error: (err) => console.error('❌ Error calling third-party validation', err)
      });
  }



  // progressData: any = null;
  // progress: number = 0;


  // getProgress(batchId: string) {
  //   console.log(batchId, 'Batch ID');
  //   this.isLoader = true;

  //   // Start polling every 2 seconds (adjust if needed)
  //   this.intervalId = setInterval(() => {
  //     this.projectService.get_progress_bar_count(batchId).subscribe({
  //       next: (res: any) => {
  //         this.progressData = res;
  //         console.log(this.progressData, 'Progress Data');

  //         // Calculate progress percentage
  //         this.progress = Math.min(
  //           (this.progressData?.processed_count / this.progressData?.total_count) * 100,
  //           100
  //         );

  //         // Stop polling and hide loader when all files processed
  //         if (this.progressData.processed_count >= this.progressData.total_count) {
  //   this.classification_details()
  //                this.pdf_conversion_hypotus()


  //           clearInterval(this.intervalId);
  //           this.intervalId = null;
  //           this.isLoader = false;
  //           console.log('✅ All files processed, loader hidden.');
  //         }
  //       },
  //       error: (err) => {
  //         // console.error('Error loading progress', err);
  //         // clearInterval(this.intervalId);
  //         // this.isLoader = false;
  //       }
  //     });
  //   }, 2000); // polling interval
  // }


  progressData: any = 0;
  // isLoader: boolean = false;
  // intervalId: any = null;

  getProgress(batchId: string) {
    console.log(batchId, 'Batch ID');
    this.isLoader = true;

    this.projectService.get_progress_bar_count(batchId).subscribe({
      next: (res: any) => {
        this.progressData = res;
        console.log(this.progressData, 'Progress Data');

        // Show overlay for 5 seconds
        setTimeout(() => {
          this.isLoader = false;
        }, 5000);
      },
      error: (err) => {
        // console.error('Error loading progress', err);
        // this.isLoader = false;
      }
    });
  }











}
