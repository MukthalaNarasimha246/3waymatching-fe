import { Component } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../services/common-service.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  isAddCaseOpen = false;
  totalDocuments = 0;
  entities_data: any
  selectedTab = 'file';
  uploadedFiles: File[] = [];
  role: any
  projectForm!: FormGroup;
  contented_type: any = 'table'

  constructor(private projectServices: ProjectsService, private router: Router, private fb_builder: FormBuilder, private _common_service: CommonServiceService) { }

  ngOnInit(): void {
    this.renderProjectForm()
    this.role = localStorage.getItem('role')
    // Initialization logic can go here
    this.entities_user(localStorage.getItem('userId'), this.role);
    localStorage.removeItem('enableReconciliation')
  }

  renderProjectForm() {
    this.projectForm = this.fb_builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  entityId(entity: any) {
    // alert("Hi")
    console.log(entity);
    // console.log("Entity ID clicked:", entity);
    localStorage.setItem('entityId', JSON.stringify(entity));
    //  localStorage.setItem('enableReconciliation', 'true');

  }

  entities_user(user_id: any, role: any) {
    // alert("role"+role)
    if (role == 'admin') {

      this.projectServices.get_all_entities().subscribe({
        next: (response: any) => {
          this.entities_data = response.payload

        },
      })
    } else {
      // alert("user")
      this.projectServices.projects_user(user_id).subscribe((data: any) => {
        console.log(data);
        this.entities_data = data.payload;
        // Handle the data as needed
      }, (error: any) => {
        console.error('Error fetching entities:', error);
        // Handle the error as needed
      });
    }

  }

  toggleAddCase(): void {
    this.isAddCaseOpen = !this.isAddCaseOpen;

    if (this.isAddCaseOpen) {
      // Reset form when opening

    }
  }
  closeAddCase(): void {
    this.isAddCaseOpen = false;
  }

  setTab(tab: string): void {
    this.selectedTab = tab;
  }

  handleFileUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      this.uploadedFiles = Array.from(files);
      this.totalDocuments = this.uploadedFiles.length;
    }
  }

  connector(value: any) {
    // alert(id)
    localStorage.setItem('entityId', JSON.stringify(value));
    if (value.is_project_active) {
      var data = {
        id: value.id,
      }

      this.projectServices.connector(data).subscribe((response: any) => {
        console.log('Connector response', response);
        localStorage.setItem('connector', response.access_token);
        localStorage.setItem('authToken', response.access_token);
        this.router.navigate(['/data-clasification']); // Navigate to the flow screen after fetching connector data
        // Handle successful connector retrieval here, e.g., display the data
        // localStorage.setItem('enableReconciliation', 'true');

      })
    } else {
      alert("Please Contact admin to enable the Project to Inactive")
    }

  }







  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Form Values:', this.projectForm.value);

      this.projectServices.create_entities(this.projectForm.value).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);

          if (response.status_code === 200) {
            this.projectForm.reset();
            this.closeAddCase();
            this.entities_user(localStorage.getItem('userId'), this.role);

            this._common_service.renderSuccessAlert();
          } else {
            this._common_service.renderErrorAlert();
          }
        },
        error: (err) => {
          console.error('Error creating project:', err);
          this._common_service.renderErrorAlert();
        },
      });

    } else {
      console.warn('Form is invalid');
      this._common_service.renderErrorAlert();
    }
  }







  enableRouterReconciliation() {
    // Reconciliation
    this.router.navigate(['/data-clasification']);

    localStorage.setItem('enableReconciliation', 'true');

    this._common_service.updateSidebarOptionFlag(); // ✅ Notify sidebar



  }

  showProjectView(type: any) {
    this.contented_type = type
  }


  // Add any additional methods or properties needed for the component
  // For example, if you want to fetch data from a service, you can inject the service in the constructor
}
