import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Creating a reactive form for input validation
  loginForm!:FormGroup;
  isSubmitted = false
  errorMsg: string = '';

  constructor(private readonly fb: FormBuilder, private authService: AuthService, private router:Router){
    // Storing the reactive form in loginForm
    this.loginForm = this.fb.group({
      email:['', [Validators.required,Validators.email, Validators.pattern(/^(?!\s*$).+/)]],
      // password:['', [Validators.required,Validators.pattern(/^(?!\s*$).+/),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
      password:['', [Validators.required,Validators.pattern(/^(?!\s*$).+/)]]
    })
  }

  //api for login functionality
  loginApi(){
    let loginReq={
      "email": "test@yopmail.com",
      "password": "123456",
      "device_type": "W",
      "device_token": "",
      "device_model": "",
      "app_version": "",
      "os_version": "",
      "phone_code":""
    }
    
    this.authService.login(loginReq).subscribe({
      next: (response:any) => {
        // Navigate to profile if login successful
        if(response.status === 200){
          console.log('Response in login',response)
          this.router.navigate(['/profile']);
        }
        else{
          console.warn('Unexpected status:', response.status);
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Login failed';
      }
    });

  }


  //function to be executed while submitting the form
  submitForm(){
    this.isSubmitted = true
    if(this.loginForm.valid )
    {
      this.loginApi()
    }
  
  }


}
