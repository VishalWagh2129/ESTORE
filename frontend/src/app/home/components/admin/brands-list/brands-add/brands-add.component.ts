import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../services/brand/brand.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';

@Component({
  selector: 'app-brands-add',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './brands-add.component.html',
  styleUrl: './brands-add.component.scss'
})
export class BrandsAddComponent {

  brandForm: FormGroup;
  submitted: boolean = false;
  brandId:any;
  mode:any;
  brandDetailData:any;
  user:any;

  constructor(private fb: FormBuilder,
    private brandService: BrandService,
    private router : Router,
    private SnackBar:MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private componentManagerService:ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (!!params.id) {
        this.brandId = params.id;
        this.mode = params.mode;
        this.getBrandDetailsById(this.brandId);
      }
    });
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.user = this.componentManagerService.user;
  }

  onSubmit() {
    this.submitted = true;
    if (this.brandForm.valid) {
      const data = {
        brand_name: this.brandForm.value.name,
        created_by: this.user.UDID,
        updated_by:this.user.UDID,
        description: this.brandForm.value.description,
        record_status: this.brandForm.value.status
      };
      this.brandService.save(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Brand saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/brands']);
        } else {
          this.SnackBar.open('Error While Saving Brand', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.brandForm.valid) {
      const data = {
        brand_name: this.brandForm.value.name,
        created_by: this.user.UDID,
        updated_by:this.user.UDID,
        description: this.brandForm.value.description,
        record_status: this.brandForm.value.status
      };
      this.brandService.update(this.brandId,data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Brand Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/brands']);
        } else {
          this.SnackBar.open('Error While Updated Brand', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getBrandDetailsById(id){
    this.brandService.getById(id).subscribe((res:any)=>{
      if(res.success){
        this.brandDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data){
    if(this.mode === 'edit'){
      this.brandForm.get('name').setValue(data.brand_name);
      this.brandForm.get('description').setValue(data.description);
      this.brandForm.get('status').setValue(data.record_status);
    }
  }

}
