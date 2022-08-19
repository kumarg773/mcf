import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductVarient } from 'src/app/Models/ProductsModel';
import { BsModalService,BsModalRef } from 'ngx-bootstrap';
import { ProductProvider } from 'src/app/Providers/ProductProvider';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-variant-information',
  templateUrl: './variant-information.component.html',
  styleUrls: ['./variant-information.component.css']
})
export class VariantInformationComponent implements OnInit {
  addNewForm: FormGroup;
  productVarient: ProductVarient [] = [];
  modalRef: BsModalRef;
  model: ProductVarient = new ProductVarient;
  addProductVarient: ProductVarient = new ProductVarient;
  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private productProvider: ProductProvider) {
      this.addNewForm = this.formBuilder.group({
        Name: new FormControl('',Validators.compose([
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z][a-zA-Z0-9 &_.-]*$/),
          Validators.required
        ])),
        Product: new FormControl('', [Validators.required]),
      }); 
     }

     get f() { return this.addNewForm.controls; }

  ngOnInit() {
    this.productProvider.getProductsVarient();
    this.productProvider.getProducts();
    this.productVarient = this.productProvider.productVarient;
    this.addProductVarient.Product = this.productProvider.product;
    this.productVarient.forEach(pp =>{
      let productName = this.productProvider.product.find(p =>p.Id == pp.Product_Id);
      if(productName){
          pp.Product_Name = productName.Product_Name;
      }
  })
    this.formControlValueChanged();  
  }

  ngDoCheck(){
    this.productVarient = this.productProvider.productVarient;
    this.addProductVarient.Product = this.productProvider.product;
    this.productVarient.forEach(pp =>{
      let productName = this.productProvider.product.find(p =>p.Id == pp.Product_Id);
      if(productName){
          pp.Product_Name = productName.Product_Name;
      }
  })
  }

  formControlValueChanged() {
    this.addNewForm.get('Product').clearValidators();
      this.addNewForm.get('Product').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
    this.addNewForm.get('Product').updateValueAndValidity();
}

  addClick(template: TemplateRef<any>): void {
    this.model = new ProductVarient;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  onFormSubmit(): void {
    this.model.Product_Id = this.addNewForm.get('Product').value;
    this.model.Variant_Name = this.addNewForm.get('Name').value;
    let found: number = -1;
    if (!this.model.Id) {         
      found = this.productProvider.productVarient.findIndex(r => r.Product_Id == this.model.Product_Id && r.Variant_Name.toLowerCase() == this.model.Variant_Name.toLowerCase());
      console.log(found);
    } else {
      found = this.productProvider.productVarient.findIndex(r => r.Product_Id == this.model.Product_Id && r.Variant_Name.toLowerCase() == this.model.Variant_Name.toLowerCase() && r.Id != this.model.Id);
    }
    if (found >= 0) {
      alert("Duplicate Varient Name");
    } else {
    this.productProvider.addProductVarient(this.model);
    this.modalRef.hide();
    }
    this.modalRef.hide();
  }

}
