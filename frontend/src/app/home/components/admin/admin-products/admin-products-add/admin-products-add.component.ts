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
import { AdminProductsService } from '../../../../services/admin-products/admin-products.service';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentManagerService } from '../../../../services/component-manager.service';
import { BrandService } from '../../../../services/brand/brand.service';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-admin-products-add',
  standalone: true,
  imports: [RouterModule, MatRadioModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './admin-products-add.component.html',
  styleUrl: './admin-products-add.component.scss'
})
export class AdminProductsAddComponent {

  productsForm: FormGroup;
  submitted: boolean = false;
  productId: any;
  mode: any;
  productDetailData: any;
  brandsData: any;
  user: any;
  selectedFile: File | null = null;
  selectedFileBase64: string | null = null;
  categoryData:any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private productsService: AdminProductsService,
    private componentManagerService: ComponentManagerService,
    private brandService: BrandService,
    private categoryService:CategoryService
  ) { }

  ngOnInit() {
    this.getAllActiveBrands();
    this.getAllCategory();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (!!params.id) {
        this.productId = params.id;
        this.mode = params.mode;
        this.getBrandDetailsById(this.productId);
      }
    });
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      origin: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      rating: ['', Validators.required],
      keyword: ['', Validators.required]
    });
    this.user = this.componentManagerService.user;

  }

  getAllActiveBrands() {
    this.brandService.getActive().subscribe((res: any) => {
      if (res.success) {
        this.brandsData = res.data;
      }
    });
  }

  getAllCategory() {
    this.categoryService.getAllMainCategory().subscribe((res: any) => {
      if (res.success) {
        this.categoryData = res.data;
      }
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string; // Change this line
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.productsForm.valid) {
      const data = {
        name: this.productsForm.value.name,
        createdBy: this.user.UDID,
        updatedBy: this.user.UDID,
        description: this.productsForm.value.description,
        status: this.productsForm.value.status,
        price: this.productsForm.value.price,
        quantity: this.productsForm.value.quantity,
        brand: this.productsForm.value.brand,
        origin: this.productsForm.value.origin,
        availability: this.productsForm.value.available,
        image: this.selectedFileBase64
      };
      this.productsService.save(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Product saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/products']);
        } else {
          this.SnackBar.open('Error While Saving Product', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate() {
    this.submitted = true;
    if (this.productsForm.valid) {
      const data = {
        name: this.productsForm.value.name,
        createdBy: this.user.UDID,
        updatedBy: this.user.UDID,
        description: this.productsForm.value.description,
        status: this.productsForm.value.status,
        price: this.productsForm.value.price,
        quantity: this.productsForm.value.quantity,
        brand: this.productsForm.value.brand,
        origin: this.productsForm.value.origin,
        availability: this.productsForm.value.available,
        image: this.selectedFileBase64
      };
      this.productsService.update(this.productId, data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Product Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/products']);
        } else {
          this.SnackBar.open('Error While Updated Product', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getBrandDetailsById(id) {
    this.productsService.getById(id).subscribe((res: any) => {
      if (res.success) {
        this.productDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data) {
    if (this.mode === 'edit') {
      this.productsForm.get('name').setValue(data.NAME);
      this.productsForm.get('description').setValue(data.DESCRIPTION);
      this.productsForm.get('status').setValue(data.RECORD_STATUS);
      this.productsForm.get('price').setValue(data.PRICE);
      this.productsForm.get('available').setValue(data.AVAILABILITY);
      this.productsForm.get('origin').setValue(data.ORIGIN_COUNTRY);
      this.productsForm.get('quantity').setValue(data.QUANTITY_AVAILABLE);
      this.productsForm.get('brand').setValue(data.BRAND);
      if (data.IMAGE) {
        this.convertBufferToBase64(data.IMAGE.data)
          .then(base64Image => {
            this.selectedFileBase64 = base64Image;
          })
          .catch(error => {
            console.error('Error converting buffer to base64:', error);
          });
      }
    }
  }

  convertBufferToBase64(bufferData: ArrayBuffer): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }


}
