import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  userRole: string = '';

  isReConciliation:boolean = false

  constructor(private authService:AuthService,private _common_service:CommonServiceService) { }
  isSidebarCollapsed = false;
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout(){
    this.authService.logout()
    localStorage.clear();
    window.location.href = '/login';
  }
  ngOnInit(): void {
    console.log('Calling the ngOnInit Functiona');
    this.userRole = localStorage.getItem('role') || ''; 
    
    
    // commente beacause there iam something wrong below code

     // ✅ This handles refresh: re-check value and emit it
  this._common_service.updateSidebarOptionFlag();
    
     this._common_service.detected_sidebar_option$.subscribe(option_enable => {

      console.log(option_enable,'option_enable&&&&&&&&&&');
      this.isReConciliation = option_enable

    });
  }
}
