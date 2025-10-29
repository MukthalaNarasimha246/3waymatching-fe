import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pepsico',
  templateUrl: './pepsico.component.html',
  styleUrl: './pepsico.component.scss'
})
export class PepsicoComponent {
isAddCaseOpen: boolean = false;
file:any
imageurl:any
imageurl_boolean:boolean = false;
projectForm!:FormBuilder
constructor(private fb:FormBuilder, private http:HttpClient) {}
    closeAddCase(): void {
    this.isAddCaseOpen = false;
  }

  onSubmit(){
        console.log("this.filetarget", this.file)
    const formData = new FormData();
    formData.append('file', this.file);
    this.http.post('http://localhost:8000/analyze-image/', formData)
      .subscribe((response:any) => {
        this.imageurl_boolean = true;
        console.log('File uploaded successfully', response);
        this.closeAddCase()
        const imagePath = response.image_url.split('/')[2]// Extract the image name from the response
        this.imageurl = 'http://localhost:8000/images/' + imagePath;
        // Handle successful upload here, e.g., show a success message
      }      , (error:any) => {
        console.error('File upload failed', error);
        // Handle upload failure here, e.g., show an error message
      })
  }
   toggleAddCase(): void {
    this.isAddCaseOpen = !this.isAddCaseOpen;

    if (this.isAddCaseOpen) {
      // Reset form when opening
     
    }
  }

  onFileSelected(e:any){
    this.file = e.target.files[0];
    console.log(this.file, 'file&&&&&&&&&&&&&&&&&&&');
  }
}
