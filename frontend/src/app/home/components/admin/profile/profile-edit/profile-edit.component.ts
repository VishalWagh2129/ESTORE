import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentManagerService } from '../../../../services/component-manager.service';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [RouterModule, MatRadioModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {

  profileForm: FormGroup;
  user: any;
  userData: any;
  adminUdid: any;
  mode: any;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private componentManagerService: ComponentManagerService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.user = this.componentManagerService.user;
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!!params.id) {
        this.adminUdid = params.id;
        this.mode = params.mode;
        this.getAdminDetails(this.adminUdid);
      }
    });
  }


  getAdminDetails(id) {
    this.adminService.getAdminDetails(id).subscribe((res) => {
      this.userData = res.data;
      this.setData(res.data);
    })
  }

  setData(data) {
    if (this.mode === 'edit') {
      this.profileForm.get('name').setValue(data.username);
      this.profileForm.get('email').setValue(data.email);
      this.profileForm.get('status').setValue(data.record_status);
    }
  }

  onUpdate() {
    this.submitted = true;
    if (this.profileForm.valid) {
      const data = {
        name: this.profileForm.value.name,
        email: this.profileForm.value.email,
        status: this.profileForm.value.status,
      };
      this.adminService.update(this.adminUdid, data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Admin Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/profile']);
        } else {
          this.SnackBar.open('Error While Updated Admin', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }


}
