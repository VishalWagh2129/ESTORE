import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CategoriesStoreItem } from './home/services/category/categories.storeitem';

import { routes } from './app.routes';
import { CategoryService } from './home/services/category/category.service';
import { ProductsService } from './home/services/products/products.service';
import { ProductsStoreItem } from './home/services/products/products.storeItems';
import { CartStoreItem } from './home/services/cart/cart.storeItem';
import { UserServiceService } from './home/services/users/user-service.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SubCategoriesStoreItem } from './home/services/sub-category/subcategory.storeitem';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),UserServiceService,SubCategoriesStoreItem,provideHttpClient(),CartStoreItem,CategoriesStoreItem,CategoryService,ProductsStoreItem,ProductsService, provideAnimationsAsync()]
};
