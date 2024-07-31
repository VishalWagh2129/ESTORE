import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesStoreItem } from '../services/category/categories.storeitem';
import { ProductsStoreItem } from '../services/products/products.storeItems';
import { SearchKeyword } from './components/types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserServiceService } from '../services/users/user-service.service';
import { SubCategoriesStoreItem } from '../services/sub-category/subcategory.storeitem';
import { PluginService } from '../services/plugin-service/plugin.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,WishlistComponent,FooterComponent,ReactiveFormsModule,RouterOutlet,SidenavigationComponent,CatnavigationComponent,FontAwesomeModule,ProductsComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  subscriptions:Subscription = new Subscription();
  udid:any;
  pluginData:any=[];

  constructor(private categoriesStoreItem:CategoriesStoreItem,
    private productsStoreItem:ProductsStoreItem,
    private subCategoriesStoreItem:SubCategoriesStoreItem,
    private router:Router,
    private userService:UserServiceService,
    private pluginService:PluginService
  ){

    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.udid = result.udid;
      })
    );

    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['home/products']);
      }
    });
    this.categoriesStoreItem.loadCategories();
    this.subCategoriesStoreItem.loadSubCategories();
    this.productsStoreItem.loadProducts();
  }
  ngOnInit(): void {
    this.pluginService.getAllPlugin().subscribe((res) => {
      this.pluginData = res.data;
      this.pluginData.forEach(plugin => {
        switch (plugin.plugin_id) {
          case 'PLG0LZ8BDNHS':
            if (plugin.record_status === 'ACTIVE') {
              this.loadTawkScript(plugin.pluginSettings.secretKey);
            }
            break;
          case 'PLG0LZ9KTZ1M':
            if (plugin.record_status === 'ACTIVE') {
              this.loadJivoChat(plugin.pluginSettings.secretKey);
            }
            break;
          default:
            break;
        }
      });
    });
  }


  loadTawkScript(id) {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${id}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }

  loadJivoChat(id){
    const s2 = document.createElement('script');
    s2.src = `//code.jivosite.com/widget/${id}`;
    s2.async = true;
    s2.charset = 'UTF-8';
    s2.setAttribute('crossorigin', '*');
    document.head.appendChild(s2);
  }

  onSelectSubCategory(subCategeoryId:number){
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategeoryId);
  }

  onSelectCategory(categeoryId:number){
    this.productsStoreItem.loadProducts('maincategoryid=' + categeoryId);
  }

  onSearchKeyword(searchKeyword:SearchKeyword){
    this.productsStoreItem.loadProducts('maincategoryid=' + searchKeyword.categoryId + '&keyword=' + searchKeyword.keyword);
  }


}
