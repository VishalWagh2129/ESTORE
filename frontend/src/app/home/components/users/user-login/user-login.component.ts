import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user.type';
import { UserServiceService } from '../../../services/users/user-service.service';
import { RouterModule } from '@angular/router';
import { loginToken } from '../../types/user.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  userLoginForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error
  constructor(private fb: FormBuilder, private userService: UserServiceService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: loginToken) => {
        result.user.email = this.email.value;
        this.userService.activateToken(result);
        this.alertType = 0;
        this.alertMessage = 'Login successful';
        setTimeout(()=>{
          this.location.back();
        },1000);
      },
      error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      },
    });
  }

}
