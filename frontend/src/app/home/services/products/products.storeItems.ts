import { Product } from "../../components/types/products.type";
import { ProductsService } from "./products.service";
import { StoreItem } from "../../../shared/storeitems";
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductsStoreItem extends StoreItem<Product[]> {
    constructor(private productsService: ProductsService) {
        super([]);
    }

    async loadProducts(query?:string) {
        this.productsService.getAllProducts(query).subscribe(products => {
            this.setValue(products);
        });
    }

    get products$(): Observable<Product[]> {
        return this.value$;
    }

    get products(): Product[] {
        return this.value;
    }

}