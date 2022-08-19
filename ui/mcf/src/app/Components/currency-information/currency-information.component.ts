import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductCurrecy } from 'src/app/Models/ProductsModel';
import { CurrencyData, CurrencyVal } from 'src/app/Models/ListOfValues';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductProvider } from 'src/app/Providers/ProductProvider';


@Component({
  selector: 'app-currency-information',
  templateUrl: './currency-information.component.html',
  styleUrls: ['./currency-information.component.css']
})
export class CurrencyInformationComponent implements OnInit {
  model: ProductCurrecy = new ProductCurrecy;
  productCurrency: ProductCurrecy[] = [];
  CurrencyData: CurrencyData[] = CurrencyVal;
  modalRef: BsModalRef;
  addNewForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private modalService: BsModalService,
               private productProvider: ProductProvider) {
    this.addNewForm = this.formBuilder.group({
      Currency: new FormControl('', [Validators.required]),
    });
   }
   get f() { return this.addNewForm.controls; }

  ngOnInit() {
    this.productProvider.getProductsCurrency();
    this.productCurrency = this.productProvider.productCurrency;
      this.productProvider.productCurrency.forEach(c=>{
        this.CurrencyData = this.CurrencyData.filter(cd => cd.innertext != c.Currency_Name);
      });
      if(this.model.Id){
        this.CurrencyData.push( {"value": this.model.Currency_Name, "innertext": this.model.Currency_Name})
      }
  }

  ngDoCheck() {
    this.productCurrency = this.productProvider.productCurrency;
    this.productProvider.productCurrency.forEach(c=>{
      this.CurrencyData = this.CurrencyData.filter(cd => cd.innertext != c.Currency_Name);
    });
    if(this.model.Id){
      this.CurrencyData.push( {"value": this.model.Currency_Name, "innertext": this.model.Currency_Name})
    }
  }

  addClick(template: TemplateRef<any>):void {
    this.model = new ProductCurrecy;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  editCurrency(template: TemplateRef<any>, data: ProductCurrecy):void {
    let currencyEdit : ProductCurrecy = new ProductCurrecy();
    currencyEdit = Object.assign(currencyEdit, data);
    this.model = data;
    this.CurrencyData;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  onFormSubmit(): void {
    this.model.Currency_Name = this.addNewForm.get('Currency').value;
    this.productProvider.addProductCurrency(this.model);
    this.modalRef.hide();
  }

}
