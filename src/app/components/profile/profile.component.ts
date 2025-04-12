import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../../core/models/functions/passwordvalidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  phoneCodes: string[] = [];

  user:any;

  togglePass:any={
    showOldPassword:false,
    showNewPassword: false,
    confirmNewPass: false
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      first_name: [
        '',
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      last_name: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      email_address: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^(?!\s*$).+/),
        ],
      ],
      phone_num: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?!\s*$).+/),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      oldpassword: [
        '',
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      newpassword: ['', [passwordValidator]],
      renewpass: ['', [passwordValidator]],
      phone_code: ['', Validators.required],
    });

    const userData = localStorage.getItem('user.data');
    if (userData) {
      const user = JSON.parse(userData);
      this.user = user;
      this.profileForm.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email,
        phone_num: user.phone,
        phone_code: user.phone_code,
        oldpassword: '',
        newpassword: '',
        renewpass: '',
      });

      this.phoneCodes.push(user.phone_code);
    }
  }
  ngOnInit(): void {}

  //function to toggle password toggle
  toggleOldPasswordVisibility(id:any) {
    this.togglePass[id] = !this.togglePass[id];
  }

  //function to implement logout functionality
  logout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }
}
