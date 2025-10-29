import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../services/common-service.service';
export interface OrgChartNode {
  id: string;
  name: string;
  title: string;
  company?: string;
  imageUrl?: string;
  children?: OrgChartNode[];
}
@Component({
  selector: 'app-entity-flow',
  templateUrl: './entity-flow.component.html',
  styleUrl: './entity-flow.component.scss'
})
export class EntityFlowComponent implements OnInit {
@Input() item_1:any = '';
  entityid_value:any
showOrgChart:any = false;
project_card_form:any = false;
project_manager_form:any = false
is_manager_form_op:any = false
projectForm!:FormGroup;
project_list:any;
showDetials:boolean = false;
userForm!: FormGroup;
selected_user_exist:any = {}
project_id:any
users:any
error:any;
getAllUsesV :any = []
projectIds:any
 // Sample data based on the reference image
 orgChartData: OrgChartNode = {
  id: '1',
  name: 'Sundar Pichai',
  title: 'Chief Executive Officer',
  imageUrl: 'assets/avatars/sundar-pichai.jpg',
  children: [
    {
      id: '2',
      name: 'Thomas Kurian',
      title: 'CEO',
      company: 'Google Cloud',
      imageUrl: 'assets/avatars/thomas-kurian.jpg',
      children: [
        {
          id: '3',
          name: 'Beau Avril',
          title: 'Global Head of Business Operations',
          imageUrl: 'assets/avatars/beau-avril.jpg',
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'Susan Wojcicki',
      title: 'CEO',
      company: 'YouTube',
      imageUrl: 'assets/avatars/susan-wojcicki.jpg',
      children: [
        {
          id: '5',
          name: 'Tara Walpert Levy',
          title: 'VP, Agency and Brand Solutions',
          imageUrl: 'assets/avatars/tara-walpert-levy.jpg',
          children: []
        },
        {
          id: '6',
          name: 'Ariel Bardin',
          title: 'VP, Product Management',
          imageUrl: 'assets/avatars/ariel-bardin.jpg',
          children: []
        }
      ]
    },
    {
      id: '7',
      name: 'Jeff Dean',
      title: 'Head of Artificial Intelligence',
      imageUrl: 'assets/avatars/jeff-dean.jpg',
      children: []
    },
    {
      id: '8',
      name: 'David Feinberg',
      title: 'CEO',
      company: 'Google Health',
      imageUrl: 'assets/avatars/david-feinberg.jpg',
      children: []
    }
  ]
};

constructor(private fb:FormBuilder,private router:Router, private _common_service:CommonServiceService, private projectServices: ProjectsService) {
  
  this.userForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    password_hash: ['',Validators.required],
    role: ['',Validators.required]
  });
 

 }

ngOnInit(): void {
  // alert(this.showDetials)
  // You could fetch real organization data from an API here
  console.log("test",this.item_1);
  // alert(localStorage.getItem('userId'))
  this.getAllUsers()
  this.entityid_value = localStorage.getItem('entityId');
  this.entityid_value = JSON.parse(this.entityid_value);
  console.log("entityid_value",this.entityid_value.id);
  this.projectForm = this.fb.group({
    name: [''],
    description: [''],
    entity_id:[this.entityid_value.id]
  });
  this.project_by_id(this.entityid_value.id);
  console.log(this.project_manager_form);
  
}



getAllUsers(){
  this.projectServices.get_all_users().subscribe({
    next:((response:any)=>{
      console.log(response,'response');
      this.getAllUsesV = response.payload
      
    })
  })
}

/**
 * Dynamically get avatar image or fallback to initials if no image exists
 */
getAvatar(node: OrgChartNode): string {
  if (node.imageUrl) {
    return node.imageUrl;
  }
  return this.getInitials(node.name);
}

/**
 * Get initials from name for avatar fallback
 */
getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

entityId(){
  alert("Entity ID clicked");
}

/**
 * Determine if a node has children
 */
hasChildren(node: OrgChartNode): boolean {
  return !!node && Array.isArray(node.children) && node.children.length > 0;
}

toggleOrgChart(){
  this.showOrgChart = !this.showOrgChart;
}

// onSubmit(){
// console.log(this.projectForm.value);
// this.projectServices.project_create(this.projectForm.value).subscribe((response:any) => {
//   console.log('Project created successfully', response);
//   // Handle successful project creation here, e.g., redirect or show a success message
//   this.showOrgChart = false; // Close the org chart after submission      
//   this.project_by_id(this.entityid_value.id);
// })
// }


onSubmit(): void {
  console.log('Form Data:', this.projectForm.value);

  if (!this.projectForm.valid) {
    this._common_service.renderErrorAlert();
    return;
  }

  this.projectServices.project_create(this.projectForm.value).subscribe({
    next: (response: any) => {
      console.log('Project created successfully:', response);

      if (response.status_code === 200) {
        this._common_service.renderSuccessAlert();
        this.showOrgChart = false; // Hide the org chart after submission
        this.project_by_id(this.entityid_value.id); // Refresh the project list
        this.projectForm.reset(); // Optionally reset the form
      } else {
        this._common_service.renderErrorAlert();
      }
    },
    error: (error) => {
      console.error('Error during project creation:', error);
      this._common_service.renderErrorAlert();
    }
  });
}


project_by_id(id:any){
this.projectServices.project_by_id(id).subscribe((response:any) => {
  console.log('Project', response);
  this.project_list = response.payload;
  console.log(this.project_list,'projectloist');
  
  this.projectIds = response.payload.map((project:any) => project.id);
 this.fetchUsersForProjects();
    
})
}
project_card(value:any = null){
  console.log("value",value);
  // console.log("data",data);
  this.project_id = value?.id
  this.project_card_form = !this.project_card_form
  this.showDetials = false
}

project_manager_assign(value:any = null){
  console.log("value",value);
  // console.log("data",data);
  this.project_id = value?.id
  this.is_manager_form_op = !this.is_manager_form_op
  this.showDetials = false
}

onSelectChange(event: any) {
  console.log("Selected value:", event.target.value);
  this.selected_user_exist = this.getUserByEmail(event.target.value)
  console.log(this.selected_user_exist);
  this.userForm.patchValue(this.selected_user_exist)
  this.showDetials = true;
  // You can add logic here to handle the selected value
}

managers_id:number = 0


onSelectChangeProjectManagers(event: any) {
  console.log(('Triggering the Project Managers'));
  
  this.showDetials = true;
  this.managers_id = event.target.value
  // You can add logic here to handle the selected value
}



getUserByEmail(id: any) {
  console.log(id,'.......id');
  
  console.log(this.getAllUsesV);
  
  return this.getAllUsesV.find((user:any) => user.id ==id);
}




onSubmitUser(){

  if (this.userForm.valid){
      this.projectServices.create_user(this.userForm.value).subscribe((response:any) => {
    console.log('User created successfully', response);
    if(response.detail == 'Email already exists'){
      alert("Email already exists, please try another email");
      this._common_service.renderSuccessAlert()
    }else{
     this.existingUserSubmit(response.id)
    }
  });

  }else{
this._common_service.renderErrorAlert()
  }
}


onSubmitAssignManagers(){

console.log(this.project_id,'this.project_id');
console.log(this.managers_id,'managers_id');

this.projectServices.updateProjectManager(this.project_id,this.managers_id).subscribe((response:any)=>{
console.log(response,'response');
 this.entityid_value = localStorage.getItem('entityId')
    this.entityid_value = JSON.parse(this.entityid_value);
    console.log(this.entityid_value,'this.entityid_value');
    
    this.project_by_id(this.entityid_value.id);

})


  
}


existingUserSubmit(id:any){
    this.user_access(id);  //Call user access method to fetch user access data
// Handle successful user creation here, e.g., redirect or show a success message
    this.showDetials = true; // Close the org chart after submission     
    this.userForm.reset(); // Reset the form after submission 
    // this.project_by_id(this.entityid_value.entity_id);
    // this.project_card()
      this.project_card_form = false
      this.fetchUsersForProjects()
       this._common_service.renderSuccessAlert()
}

user_access(user_id:any,){
  var data:any = {
    user_id: Number(user_id),
    entity_ids: Number(this.entityid_value.id),
    project_id:this.project_id,
  }
  this.projectServices.user_access(data).subscribe((response:any) => {
    console.log('User access response', response);

    this.entityid_value = localStorage.getItem('entityId')
    this.entityid_value = JSON.parse(this.entityid_value);
    console.log(this.entityid_value,'this.entityid_value');
    
    this.project_by_id(this.entityid_value.id);
    // Fetch users for the project after user access is set
    // Handle successful user access retrieval here, e.g., display the data
  });
}

fetchUsersForProjects() {
   
    // const userlist:any = []
   
    // this.projectIds.map((res:any) => {
    //    this.projectServices.getUsersByProjects(res).subscribe({
    //   next: (data:any) => {
    //     // this.users = data
    //     userlist.push(...data);
    //   },

    //   error: (err:any) => alert('Error fetching users: ' + err.message)
    // });
    // })
    
    // this.users = userlist;

    const userMap: any = {};

this.projectIds.forEach((projectId: number) => {
  this.projectServices.getUsersByProjects(projectId).subscribe({
    next: (data: any) => {
      // Store users under the key of projectId
      userMap[projectId] = data.payload;

    },
    error: (err: any) => alert('Error fetching users: ' + err.message)
  });
});
  this.users = userMap; // Assign the userMap to this.users
console.log("Users fetched for projects:", userMap);
   
  }


  navigatToClassificatio(){
      // Reconciliation
 this.router.navigate(['/data-clasification']);

 localStorage.setItem('enableReconciliation', 'true');

 this._common_service.updateSidebarOptionFlag(); // ✅ Notify sidebar
  }



  toggleStatus(user: any) {
  console.log(`${user.name} is now ${user.active ? 'Active' : 'Inactive'}`);
  // Optionally call backend API here to update user status
  // this.http.post('/api/update-status', { id: user.id, active: user.active }).subscribe();

   const payload = {
      user_id: user.id,
      entity_id: user.entity_id,
      project_id: user.project_id,
      is_project_active:user.is_project_active
    };
    console.log(payload,'payload api');
    

   this.projectServices.project_status_update(payload).subscribe((response:any) => {
    console.log(response);
    this.entityid_value = localStorage.getItem('entityId')
    this.entityid_value = JSON.parse(this.entityid_value);
    console.log(this.entityid_value,'this.entityid_value');
    
    this.project_by_id(this.entityid_value.id);
    
  });
}

}
