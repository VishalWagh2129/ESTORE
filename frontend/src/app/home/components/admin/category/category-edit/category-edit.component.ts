import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {

  categoryForm: FormGroup;
  submitted: boolean = false;
  categoryId: any;
  mode: any;
  brandDetailData: any;
  user: any;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private componentManagerService: ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!!params.id) {
        this.categoryId = params.id;
        this.mode = params.mode;
        this.getCategoryDetailsById(this.categoryId);
      }
    });
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.user = this.componentManagerService.user;
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      const data = {
        category_name: this.categoryForm.value.name,
        created_by: this.user.UDID,
        updated_by: this.user.UDID,
        record_status: this.categoryForm.value.status
      };
      this.categoryService.save(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Category saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/category']);
        } else {
          this.SnackBar.open('Error While Saving Category', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      const data = {
        category_name: this.categoryForm.value.name,
        updated_by: this.user.UDID,
        record_status: this.categoryForm.value.status
      };
      this.categoryService.update(this.categoryId, data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Category Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/category']);
        } else {
          this.SnackBar.open('Error While Updated Category', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getCategoryDetailsById(id) {
    this.categoryService.getById(id).subscribe((res: any) => {
      if (res.success) {
        this.brandDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data) {
    if (this.mode === 'edit') {
      this.categoryForm.get('name').setValue(data.category_name);
      this.categoryForm.get('status').setValue(data.record_status);
    }
  }

}
