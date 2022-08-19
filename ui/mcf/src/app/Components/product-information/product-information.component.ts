import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductsModel } from 'src/app/Models/ProductsModel';
import { ProductProvider } from 'src/app/Providers/ProductProvider';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {

  addNewForm: FormGroup;

  product: ProductsModel[] = [];
  modalRef: BsModalRef;
  model: ProductsModel = new ProductsModel;
  constructor(private modalService: BsModalService
    , private formBuilder: FormBuilder
    , private productProvider: ProductProvider) {
    this.addNewForm = this.formBuilder.group({
      Name: new FormControl('',Validators.compose([
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9 &_.-]*$/),
        Validators.required
      ])),
      SKUCode: new FormControl('',Validators.compose([
        Validators.maxLength(100),
        Validators.required
      ]))
    });   
  }
  get f() { return this.addNewForm.controls; }
  
  ngOnInit() {
    this.productProvider.getProducts();
    this.product = this.productProvider.product;
  }

  ngDoCheck() {
    this.product = this.productProvider.product;
  }

  addClick(template: TemplateRef<any>): void {
    this.model = new ProductsModel;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  editProduct(template: TemplateRef<any>, data: ProductsModel):void {
    let productEdit : ProductsModel = new ProductsModel();
    productEdit = Object.assign(productEdit, data);
    this.model = data;
    console.log(this.model);
    this.product = this.productProvider.product;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose(): void {
    this.modalRef.hide();
  }

  onFormSubmit(): void {
    this.model.Product_Name = this.addNewForm.get('Name').value;
    this.model.Sku_Code = this.addNewForm.get('SKUCode').value;
    let found: number = -1;
    if (!this.model.Id) {         
      found = this.productProvider.product.findIndex(r => r.Product_Name.toLowerCase() == this.model.Product_Name.toLowerCase());
      console.log(found);
    } else {
      found = this.productProvider.product.findIndex(r => r.Product_Name.toLowerCase() == this.model.Product_Name.toLowerCase() && r.Id != this.model.Id);
    }
    if (found >= 0) {
      alert("Duplicate Product Name");
    } else {
    this.productProvider.addProduct(this.model);
    this.modalRef.hide();
    }
    this.modalRef.hide();
  }
}
