import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginServiceService } from '../../login-service.service';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  // setLogin() {
  //     localStorage.setItem('isLoggedIn', 'true');
  //   }

  loginForm!: FormGroup;

  ngOnInit(): void {
    localStorage.clear()
  }



  constructor(private fb: FormBuilder, private _apiService: ApiService, private http: HttpClient, private router: Router, private authService: LoginServiceService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
        confirmButtonText: 'OK'
      });
      return;
    }





    const formData = new FormData();
    formData.append('username', this.loginForm.controls['username'].value);
    formData.append('password', this.loginForm.controls['password'].value);

    this.http.post(`${this._apiService.baseUrl}/login`, formData)
      .subscribe(
        (response: any) => {
          console.log(response, 'response');

          if (response.status_code === 200) {
            const payload = response;
            localStorage.setItem('userId', payload?.user_id);
            localStorage.setItem('role', payload?.role);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', payload?.name);
            localStorage.setItem('authToken', payload?.access_token);

            this.authService.login();
            this.router.navigate(['/dashboard']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: response.message || 'Invalid credentials',
              confirmButtonText: 'Try Again'
            });
          }
        },
        (error: any) => {
          console.error('Login error', error);
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: error?.error?.message || 'Something went wrong. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
  }

}
