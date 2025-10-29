import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private detected_sidebar = new BehaviorSubject<boolean>(this.hasToken());
  detected_sidebar_option$ = this.detected_sidebar.asObservable();

  constructor() { }
  private hasToken(): boolean {
    return localStorage.getItem('enableReconciliation') === 'true';
  }


  // ✅ Call this after setting localStorage to notify subscribers
  updateSidebarOptionFlag() {
    const flag = this.hasToken();
    // alert("Hi "+flag);
    this.detected_sidebar.next(flag);
  }


  disableReconcilation() {
    this.detected_sidebar.next(false);
  }


  renderErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'please fill the mandatory fields!',
      confirmButtonText: 'OK'
    });
  }


  renderSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Your form has been submitted successfully.',
      confirmButtonText: 'OK'
    });
  }


  renderSuccessAlertDynamic(message: string = 'Operation successful!') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }




}
