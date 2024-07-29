import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductdetailsComponent } from './home/components/productdetails/productdetails.component';
import { ProductsGalleryComponent } from './home/components/products-gallery/products-gallery.component';
import { CartComponent } from './home/components/cart/cart.component';
import { UserSignupComponent } from './home/components/users/user-signup/user-signup.component';
import { UserLoginComponent } from './home/components/users/user-login/user-login.component';
import { PastordersComponent } from './home/components/pastorders/pastorders.component';
import { authGuard } from './home/services/authGuard';
import { AdminSignupComponent } from './home/components/admin/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './home/components/admin/admin-login/admin-login.component';
import { AdminWrapperComponent } from './home/components/layouts/admin-wrapper/admin-wrapper.component';
import { ProfileComponent } from './home/components/admin/profile/profile.component';
import { ProfileEditComponent } from './home/components/admin/profile/profile-edit/profile-edit.component';
import { BrandsListComponent } from './home/components/admin/brands-list/brands-list.component';
import { BrandsAddComponent } from './home/components/admin/brands-list/brands-add/brands-add.component';
import { CustomersComponent } from './home/components/admin/customers/customers.component';
import { CustomersOrderComponent } from './home/components/admin/customers-order/customers-order.component';
import { AuthGuardService } from './home/services/auth-guard.service';
import { CustomerEditComponent } from './home/components/admin/customers/customer-edit/customer-edit.component';
import { WishlistComponent } from './home/components/wishlist/wishlist.component';
import { CategoryComponent } from './home/components/admin/category/category.component';
import { CategoryEditComponent } from './home/components/admin/category/category-edit/category-edit.component';
import { SubCategoryComponent } from './home/components/admin/sub-category/subcategory.component';
import { SubCategoryEditComponent } from './home/components/admin/sub-category/subcategory-edit/subcategory-edit.component';
import { ProductsListComponent } from './home/components/admin/products-list/products-list.component';
import { ProductsAddComponent } from './home/components/admin/products-list/products-add/products-add.component';

export const routes: Routes = [

    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-signup', component: AdminSignupComponent },
    {
        path: 'admin', component: AdminWrapperComponent,
        children: [
            {path:'profile',component:ProfileComponent},
            {path:'profile/edit',component:ProfileEditComponent},
            {path:'category',component:CategoryComponent},
            {path:'category/add',component:CategoryEditComponent},
            {path:'subcategory',component:SubCategoryComponent},
            {path:'subcategory/add',component:SubCategoryEditComponent},
            {path:'brands',component:BrandsListComponent},
            {path:'brands/add',component:BrandsAddComponent},
            {path:'products',component:ProductsListComponent},
            {path:'products/add',component:ProductsAddComponent},
            {path:'customers',component:CustomersComponent},
            {path:'customers/edit',component:CustomerEditComponent},
            {path:'customer-order',component:CustomersOrderComponent},
        ]
    },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'products', component: ProductsGalleryComponent },
            { path: 'product/:id', component: ProductdetailsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'signup', component: UserSignupComponent },
            { path: 'login', component: UserLoginComponent },
            { path: 'pastorders', component: PastordersComponent, canActivate: [authGuard] },
            { path: 'wishlist', component: WishlistComponent},
        ]
    },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotfoundComponent },
];
