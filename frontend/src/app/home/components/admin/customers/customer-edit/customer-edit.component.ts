import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../../services/brand/brand.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../../../../services/component-manager.service';
import { UserServiceService } from '../../../../../services/users/user-service.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {

  brandForm: FormGroup;
  submitted: boolean = false;
  customerId: any;
  mode: any;
  brandDetailData: any;
  user: any;

  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private componentManagerService: ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!!params.id) {
        this.customerId = params.id;
        this.mode = params.mode;
        this.getBrandDetailsById(this.customerId);
      }
    });
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      lname: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      pin: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.user = this.componentManagerService.user;
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.brandForm.valid) {
    //   const data = {
    //     name: this.brandForm.value.name,
    //     createdBy: this.user.UDID,
    //     updatedBy: this.user.UDID,
    //     description: this.brandForm.value.description,
    //     status: this.brandForm.value.status
    //   };
    //   this.brandService.save(data).subscribe((res: any) => {
    //     if (res.success) {
    //       this.SnackBar.open('Brand saved successfully', 'Close', {
    //         duration: 3000 // duration in milliseconds
    //       });
    //       this.router.navigate(['/admin/brands']);
    //     } else {
    //       this.SnackBar.open('Error While Saving Brand', 'Close', {
    //         duration: 3000 // duration in milliseconds
    //       });
    //     }
    //   }
    //   );
    // }
  }

  onUpdate() {
    // this.submitted = true;
    // if (this.brandForm.valid) {
    //   const data = {
    //     name: this.brandForm.value.name,
    //     createdBy: this.user.UDID,
    //     updatedBy: this.user.UDID,
    //     description: this.brandForm.value.description,
    //     status: this.brandForm.value.status
    //   };
    //   this.brandService.update(this.customerId, data).subscribe((res: any) => {
    //     if (res.success) {
    //       this.SnackBar.open('Brand Updated successfully', 'Close', {
    //         duration: 3000 // duration in milliseconds
    //       });
    //       this.router.navigate(['/admin/brands']);
    //     } else {
    //       this.SnackBar.open('Error While Updated Brand', 'Close', {
    //         duration: 3000 // duration in milliseconds
    //       });
    //     }
    //   }
    //   );
    // }
  }

  getBrandDetailsById(id) {
    this.userService.getCustomerById(id).subscribe((res: any) => {
      if (res.success) {
        this.brandDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data) {
    if (this.mode === 'edit') {
      this.brandForm.get('name').setValue(data.firstName);
      this.brandForm.get('lname').setValue(data.lastName);
      this.brandForm.get('status').setValue(data.record_status);
      this.brandForm.get('email').setValue(data.email);
      this.brandForm.get('city').setValue(data.city);
      this.brandForm.get('state').setValue(data.state);
      this.brandForm.get('address').setValue(data.address);
      
    }
  }


}
