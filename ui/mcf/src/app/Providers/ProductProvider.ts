import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/Services/Products/product.service';
import { ProductsModel, ProductPricing, ProductCurrecy, ProductVarient } from '../Models/ProductsModel';


@Injectable({
    providedIn: 'root'
})

export class ProductProvider {
    product: ProductsModel[] = [];
    productPricing: ProductPricing[] = [];
    productCurrency: ProductCurrecy[] = [];
    productVarient: ProductVarient[] = [];

    constructor(private productService: ProductService) {
    }

    getProducts(): void {
        this.productService.getProductList().subscribe(
            (data) => {
                this.product = data as ProductsModel[];
            }
        )
    }

    getProductsPricing(): void {
        this.productService.getProductPricingList().subscribe(
            (data) => {
                this.productPricing = data as ProductPricing[];
                this.productPricing.forEach(pp =>{
                    let productName = this.product.find(p =>p.Id == pp.Product_Id);
                    if(productName){
                        pp.Product_Name = productName.Product_Name;
                    }
                })
                this.productPricing.forEach(pp =>{
                    let varientName = this.productVarient.find(p =>p.Id == pp.Variant_Id);
                    if(varientName){
                        pp.Variant_Name = varientName.Variant_Name;
                    }
                })
                this.productPricing.forEach(pp =>{
                    let currencyName = this.productCurrency.find(p =>p.Id == pp.Currency_Id);
                    if(currencyName){
                        pp.Currency_Name = currencyName.Currency_Name;
                    }
                })
            }
        )
    }

    getProductsCurrency(): void {
        this.productService.getProductCurrencyList().subscribe(
            (data) => {
                this.productCurrency = data as ProductCurrecy[];
            }
        )
    }

    getProductsVarient(): void {
        this.productService.getProductVarientList().subscribe(
            (data) => {
                this.productVarient = data as ProductVarient[];
                this.productVarient.forEach(pp =>{
                    let productName = this.product.find(p =>p.Id == pp.Product_Id);
                    if(productName){
                        pp.Product_Name = productName.Product_Name;
                    }
                })
            }
        )
    }

    addProduct(addProductModel: ProductsModel): void {
        this.productService.addProduct(addProductModel).subscribe(
            (data) => {
                if (!addProductModel.Id) {
                    this.product.push(data as ProductsModel);
                }
            }
        )
    }

    addProductPricing(addProductPricingModel: ProductPricing): void {
        this.productService.addProductPricing(addProductPricingModel).subscribe(
            (data) => {
                if (!addProductPricingModel.Id) {
                    this.productPricing.push(data as ProductPricing);
                }
            }
        )
    }

    addProductCurrency(addProductCurrencyModel: ProductCurrecy): void {
        this.productService.addProductCurrency(addProductCurrencyModel).subscribe(
            (data) => {
                if (!addProductCurrencyModel.Id) {
                    this.productCurrency.push(data as ProductCurrecy);
                }
            }
        )
    }

    addProductVarient(addProductVarientModel: ProductVarient): void {
        this.productService.addProductVarient(addProductVarientModel).subscribe(
            (data) => {
                if (!addProductVarientModel.Id) {
                    this.productVarient.push(data as ProductVarient);
                }
            }
        )
    }
}