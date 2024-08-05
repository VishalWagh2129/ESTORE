import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CategoriesStoreItem } from './services/category/categories.storeitem';

import { routes } from './app.routes';
import { CategoryService } from './services/category/category.service';
import { ProductsService } from './services/products/products.service';
import { ProductsStoreItem } from './services/products/products.storeItems';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { UserServiceService } from './services/users/user-service.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SubCategoriesStoreItem } from './services/sub-category/subcategory.storeitem';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),UserServiceService,SubCategoriesStoreItem,provideHttpClient(),CartStoreItem,CategoriesStoreItem,CategoryService,ProductsStoreItem,ProductsService, provideAnimationsAsync(), provideIonicAngular({})]
};
