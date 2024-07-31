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
import { AdminProductsService } from '../../../../../services/admin-products/admin-products.service';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentManagerService } from '../../../../../services/component-manager.service';
import { BrandService } from '../../../../../services/brand/brand.service';
import { CategoryService } from '../../../../../services/category/category.service';
import { SubcategoryService } from '../../../../../services/sub-category/subcategory.service';

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [RouterModule, MatRadioModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss'
})
export class ProductsAddComponent {

  productsForm: FormGroup;
  submitted: boolean = false;
  productId: any;
  mode: any;
  productDetailData: any;
  brandsData: any;
  user: any;
  selectedFile: File | null = null;
  selectedFileBase64: string | null = null;
  categoryData:any=[];
  subCategoryData:any=[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private productsService: AdminProductsService,
    private componentManagerService: ComponentManagerService,
    private brandService: BrandService,
    private categoryService:CategoryService,
    private subcategoryService:SubcategoryService
  ) { }

  ngOnInit() {
    this.getAllActiveBrands();
    this.getAllCategories();
    this.getAllSubCategory();
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
      quantity: ['', Validators.required],
      img: ['', Validators.required],
      category: ['', Validators.required],
      keyword: ['', Validators.required],
      sub: ['', Validators.required],
      rating: ['', Validators.required],
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

  getAllCategories(){
    this.categoryService.getAllActiveCategories().subscribe((res:any)=>{
      if (res.success) {
        this.categoryData = res.data;
      }
    })
  }

  getAllSubCategory(){
    this.subcategoryService.getAll().subscribe((res:any)=>{
      if (res.success) {
        this.subCategoryData = res.data;
      }
    })
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
        product_name: this.productsForm.value.name,
        created_by: this.user.UDID,
        updated_by: this.user.UDID,
        description: this.productsForm.value.description,
        record_status: this.productsForm.value.status,
        price: this.productsForm.value.price,
        quantity: this.productsForm.value.quantity,
        brand_id: this.productsForm.value.brand,
        origin: this.productsForm.value.origin,
        product_image: this.productsForm.value.img,
        category_id:this.productsForm.value.category,
        subcategory_id:this.productsForm.value.sub,
        ratings:this.productsForm.value.rating,
        keywords:this.productsForm.value.keyword
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
        product_name: this.productsForm.value.name,
        updated_by: this.user.UDID,
        description: this.productsForm.value.description,
        record_status: this.productsForm.value.status,
        price: this.productsForm.value.price,
        quantity: this.productsForm.value.quantity,
        brand_id: this.productsForm.value.brand,
        origin: this.productsForm.value.origin,
        product_image: this.productsForm.value.img,
        category_id:this.productsForm.value.category,
        subcategory_id:this.productsForm.value.sub,
        ratings:this.productsForm.value.rating,
        keywords:this.productsForm.value.keyword
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
      this.productsForm.get('name').setValue(data.product_name);
      this.productsForm.get('description').setValue(data.description);
      this.productsForm.get('status').setValue(data.record_status);
      this.productsForm.get('price').setValue(data.price);
      this.productsForm.get('keyword').setValue(data.keywords);
      this.productsForm.get('origin').setValue(data.origin);
      this.productsForm.get('quantity').setValue(data.quantity);
      this.productsForm.get('brand').setValue(data.brand_id);
      this.productsForm.get('rating').setValue(data.ratings);
      this.productsForm.get('category').setValue(data.category_id);
      this.productsForm.get('sub').setValue(data.subcategory_id);
      this.productsForm.get('img').setValue(data.product_image);
      // if (data.IMAGE) {
      //   this.convertBufferToBase64(data.IMAGE.data)
      //     .then(base64Image => {
      //       this.selectedFileBase64 = base64Image;
      //     })
      //     .catch(error => {
      //       console.error('Error converting buffer to base64:', error);
      //     });
      // }
    }
  }


  getAllActiveCategories(){
    this.categoryService.getAllActiveCategories().subscribe((res:any)=>{
      if(res.success){
        this.categoryData = res.data;
      }
    })
  }

}
