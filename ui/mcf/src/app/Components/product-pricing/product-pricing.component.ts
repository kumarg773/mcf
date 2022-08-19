import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductPricing } from 'src/app/Models/ProductsModel';
import { ProductProvider } from 'src/app/Providers/ProductProvider';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-pricing',
  templateUrl: './product-pricing.component.html',
  styleUrls: ['./product-pricing.component.css']
})
export class ProductPricingComponent implements OnInit {
  productPricing: ProductPricing [] = [];
  addProductPricing: ProductPricing = new ProductPricing;
  model: ProductPricing = new ProductPricing;
  modalRef: BsModalRef;
  addNewForm: FormGroup;

  constructor(private modalService: BsModalService,
    private productProvider: ProductProvider,
    private formBuilder: FormBuilder) { 
      this.addNewForm = this.formBuilder.group({
        Product: new FormControl('', [Validators.required]),
        Varient: new FormControl('', [Validators.required]),
        Currency: new FormControl('', [Validators.required]),
        Price: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
        Frequency: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit() {
    this.productProvider.getProductsPricing();
    this.productProvider.getProducts();
    this.productProvider.getProductsCurrency();
    this.productProvider.getProductsVarient();
    this.productPricing = this.productProvider.productPricing;
    this.addProductPricing.Product = this.productProvider.product;
    this.addProductPricing.Currency = this.productProvider.productCurrency;
    this.addProductPricing.Varient = this.productProvider.productVarient;
    this.formControlValueChanged();  
  }

  ngDoCheck(){
    this.productPricing = this.productProvider.productPricing;
    this.addProductPricing.Product = this.productProvider.product;
    this.addProductPricing.Currency = this.productProvider.productCurrency;
    this.addProductPricing.Varient = this.productProvider.productVarient;
  }

  formControlValueChanged() {
    this.addNewForm.get('Product').clearValidators();
    this.addNewForm.get('Varient').clearValidators();
    this.addNewForm.get('Currency').clearValidators();
    this.addNewForm.get('Frequency').clearValidators();
      this.addNewForm.get('Product').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.addNewForm.get('Varient').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.addNewForm.get('Currency').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.addNewForm.get('Frequency').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
    this.addNewForm.get('Product').updateValueAndValidity();
    this.addNewForm.get('Varient').updateValueAndValidity();
    this.addNewForm.get('Currency').updateValueAndValidity();
    this.addNewForm.get('Frequency').updateValueAndValidity();
}

  addClick(template: TemplateRef<any>):void {
    this.model = new ProductPricing;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  editPricing(template: TemplateRef<any>, data: ProductPricing):void {
    let pricingEdit : ProductPricing = new ProductPricing();
    pricingEdit = Object.assign(pricingEdit, data);
    this.model = data;
    console.log(this.model);
    // pricingEdit.productPrice = this.productProvider.productPricing;
    pricingEdit.Product = this.productProvider.product;
    pricingEdit.Currency = this.productProvider.productCurrency;
    pricingEdit.Varient = this.productProvider.productVarient;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  onFormSubmit(): void {
    this.model.Product_Id = this.addNewForm.get('Product').value;
    this.model.Variant_Id = this.addNewForm.get('Varient').value;
    this.model.Currency_Id = this.addNewForm.get('Currency').value;
    this.model.Amount = this.addNewForm.get('Price').value;
    this.model.Tenure = this.addNewForm.get('Frequency').value;
    let selectProduct = this.productProvider.product.find(pp =>pp.Id == this.model.Product_Id);
        if(selectProduct){
           this.model.Product_Name = selectProduct.Product_Name;
    }
    let selectVarient = this.productProvider.productVarient.find(pp =>pp.Id == this.model.Variant_Id);
        if(selectVarient){
           this.model.Variant_Name = selectVarient.Variant_Name;
    }
    let selectCurrency = this.productProvider.productCurrency.find(pp =>pp.Id == this.model.Currency_Id);
        if(selectCurrency){
           this.model.Currency_Name = selectCurrency.Currency_Name;
    }
    this.model.Product = this.productProvider.product;
    this.model.Varient = this.productProvider.productVarient;
    this.model.Currency = this.productProvider.productCurrency;

    this.productProvider.addProductPricing(this.model);
    console.log(this.model);
    // this.productProvider.addProductPricing(this.model);
    this.modalRef.hide();
  }

}
