import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../../services/products/products.storeItems';
import { ProductsComponent } from '../products/products.component';
import { SidenavigationComponent } from '../sidenavigation/sidenavigation.component';

@Component({
  selector: 'app-products-gallery',
  standalone: true,
  imports: [ProductsComponent,SidenavigationComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss'
})
export class ProductsGalleryComponent {

  constructor(private productsStoreItem: ProductsStoreItem) {}

  onSelectSubCategory(subCategeoryId:number){
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategeoryId);
  }

}
