import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AdminProductsService } from '../../../services/admin-products/admin-products.service';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.scss'
})
export class AdminToolbarComponent {

  constructor(private router: Router,
    private auth:AuthService,
    private productsService:AdminProductsService
  ) {}
  previewUrl: string | ArrayBuffer | null = null;


  ngOnInit(): void {
    this.getAllLogo();
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/admin-login']);
  }

  getAllLogo(){
    this.productsService.getAllLogo().subscribe((res)=>{
      if(res.success){
        this.convertBufferToBase64(res.data[0].LOGO.data).then(base64Image=>{
          if(base64Image){
            this.previewUrl = base64Image;
          }else{
            this.previewUrl = '';
          }
        })
      }
    })
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
