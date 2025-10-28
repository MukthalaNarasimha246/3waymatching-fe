import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.scss'
})
export class ProcurementComponent {
 mrnData: any;
  mrnLineItem: any;
  mrnDetails: any;
  supplierDetails: any;
  buyerDetails: any;
  invoiceLineItem: any;
  summaryLineItem: any;
  @Input() item:any = '';
  searchImage_value:any


    @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  searchText: string = 'INVOICE ID';
  searchText1: string = 'romashka';
  imageSrc: any; // Replace with your image
  ctx!: CanvasRenderingContext2D;
  detectedWords: any;
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



      ngAfterViewInit(image:any,testingItem:any) {
      // alert(image)
      // alert(testingItem)
      this.loadImage(image);
      // this.extractTextFromImage();
      this.detectedWords = this.testing(testingItem)
    }
    loadImage(image:any) {
      // alert("Hi")
      console.log("this.imageSrc;", image)
      const canvas = this.canvas.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      const img = new Image();
      img.src = image;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
      };
      this.searchImage_value = image
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

          this.detectedWords.forEach((word:any) => {
            console.log("word.text.toLowerCase().includes(searchValue)", word.text.toLowerCase().includes(searchValue))
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

  testing(image_path:any){
    console.log("image_path", image_path)
    // return this.searchInfoextracted =
    this.projectService.bbox_api(image_path).subscribe((data: any) => {
      console.log("testing", data)
      // this.imageSrc = data[0].image;
      this.detectedWords =JSON.parse(data[0].bbox);
      console.log("detectedWords", this.detectedWords)
      return this.detectedWords
    })
  }
      onInputClick(e: any) {
      this.searchInImage(e); // Trigger highlighting when the input field is clicked
  }
}
