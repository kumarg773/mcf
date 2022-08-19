import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PartnerProvider } from 'src/app/Providers/PartnerProvider';
import { PartnerModel, PartnerProduct, PartnerContact, PartnerInventory } from 'src/app/Models/PartnerModel';
import { Http } from '@angular/http';
import { ProductProvider } from 'src/app/Providers/ProductProvider';
import { CurrencyData, CurrencyVal } from 'src/app/Models/ListOfValues';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { DatePipe } from '@angular/common';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class PartnerDetailsComponent implements OnInit {
  AddUserStep1: FormGroup;
  AddUserStep2: FormGroup;
  AddUserStep3: FormGroup;
  AddUserStep4: FormGroup;
  AddUserStep5: FormGroup;
  CountryData: any;
  StateData: any;
  SelectedCountry: [] = [];
  CurrencyData: CurrencyData[] = CurrencyVal;
  model: PartnerModel = new PartnerModel;
  //partnerContact: PartnerContact = new PartnerContact;
  addPartner: PartnerModel = new PartnerModel;
  partnerProduct: PartnerProduct = new PartnerProduct;
  partnerContact: PartnerContact = new PartnerContact;//Contact Person Deatils
  partnerInventory: PartnerInventory = new PartnerInventory;//Billing Contact Person Deatils and Bank details
  modalRef: BsModalRef;
  Partner: PartnerModel [] = [];
  PartnerProduct: PartnerProduct[] = [];
  PartnerContact: PartnerContact[] = [];
  PartnerInventory: PartnerInventory[] = [];
  countryName: string = "";
  selectedCountries: string[] = [];
  dropdownSettingsCountry = {
    allowSearchFilter: true,
    idField: 'country',
    textField: 'country',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All'
  };
  dropdownSettingsState = {
    allowSearchFilter: true,
    idField: 'state',
    textField: 'state',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All'
  };
  constructor(private modalService: BsModalService,
              private PartnerProvider: PartnerProvider,
              private formBuilder: FormBuilder,
              private http: Http,
              private productProvider: ProductProvider,
              private datePipe: DatePipe
              ) { 
                this.AddUserStep1 = this.formBuilder.group({
                  Name: new FormControl('', [Validators.required]),
                  Address: new FormControl('', [Validators.required]),
                  PartnerCountry: new FormControl('', []),
                  State: new FormControl('', []),
                  PostCode: new FormControl('', [Validators.required]),
                  Currency: new FormControl('', [Validators.required]),
                });
                this.AddUserStep2 = this.formBuilder.group({
                  Start_Date: new FormControl('', [Validators.required]),
                  Tenure: new FormControl('', [Validators.required]),
                  Due_Date: new FormControl('', [Validators.required]),
                  Rating: new FormControl('0'),
                  Product: new FormControl('0'),
                  First_Cut_Percentage: new FormControl('', []),
                  First_Cut_Startdate: new FormControl('', []),
                  Progressive_Cut_Percentage: new FormControl('', []),
                  Progressive_Cut_Startdate: new FormControl('', []),
                });
                this.AddUserStep3 = this.formBuilder.group({
                  ContactPersonName: new FormControl('', [Validators.required]),
                  Designation: new FormControl('', [Validators.required]),
                  mobilenumber: new FormControl('', [Validators.required]),
                  contactalternativenumber: new FormControl('', [Validators.required]),
                  emailaddress: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
                });
                this.AddUserStep4 = this.formBuilder.group({
                  ContactPersonName: new FormControl('', [Validators.required]),
                  Designation: new FormControl('', [Validators.required]),
                  mobilenumber: new FormControl('', [Validators.required]),
                  alternativenumber: new FormControl('', [Validators.required]),
                  emailaddress: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
                  ModeOfPayment: new FormControl('0'),
                });
                this.AddUserStep5 = this.formBuilder.group({
                  BankName: new FormControl('', []),
                  branchaddress: new FormControl('', []),
                  country: new FormControl('', []),
                  accountenumber: new FormControl('', []),
                  ifsccode: new FormControl('', []),
                  swiftcode: new FormControl('', []),
                });
              }
  
  ngOnInit() {
    this.PartnerProvider.getPartners();
    this.productProvider.getProducts();
    this.Partner = this.PartnerProvider.partner;
    this.PartnerProduct = this.PartnerProvider.partnerProduct;
    this.PartnerContact = this.PartnerProvider.partnerContact;
    this.PartnerInventory= this.PartnerProvider.partnerInventory;
    this.CurrencyData;
    this.formControlValueChanged();
    this.getCountries();
  }

  ngDoCheck() {
    this.Partner = this.PartnerProvider.partner;
    this.addPartner.Product = this.productProvider.product;
  }

  formControlValueChanged() {
      this.AddUserStep2.get('Product').clearValidators();
      this.AddUserStep2.get('Rating').clearValidators();
      this.AddUserStep4.get('ModeOfPayment').clearValidators();
      this.AddUserStep2.get('Tenure').clearValidators();
        this.AddUserStep2.get('Product').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
        this.AddUserStep2.get('Rating').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
        this.AddUserStep4.get('ModeOfPayment').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
        this.AddUserStep2.get('Tenure').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep2.get('Product').updateValueAndValidity();
      this.AddUserStep2.get('Rating').updateValueAndValidity();
      this.AddUserStep4.get('ModeOfPayment').updateValueAndValidity();
      this.AddUserStep2.get('Tenure').updateValueAndValidity();
  }

  addClick(template: TemplateRef<any>):void {
    this.model = new PartnerModel;
    this.partnerProduct = new PartnerProduct;
    this.partnerContact = new PartnerContact;
    this.partnerInventory = new PartnerInventory;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  viewClick(template1: TemplateRef<any>, data: PartnerModel):void {
    this.model = data;
    this.partnerProduct = data.partnerProduct[0];
    let productName = this.productProvider.product.find(p =>p.Id == this.partnerProduct.Product_Id);
      if(productName){
        this.partnerProduct.Product_Name = productName.Product_Name;
      }
    this.partnerContact = data.partnerContact[0];
    this.partnerInventory = data.partnerInventory[0];
    this.modalRef = this.modalService.show(template1, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  editPartner(template: TemplateRef<any>, data: PartnerModel):void {
    let partnerEdit : PartnerModel = new PartnerModel();
    partnerEdit = Object.assign(partnerEdit, data);
    this.model = data;
    this.partnerProduct = data.partnerProduct[0];
    this.partnerContact = data.partnerContact[0];
    this.partnerInventory = data.partnerInventory[0];
  
    if (this.partnerProduct.First_Cut_Startdate) {
      let startString = this.partnerProduct.First_Cut_Startdate.toString().replace("T", " ");
      this.partnerProduct.First_Cut_Startdate = new Date(startString + " +0000");
    }

  if (this.partnerProduct.Progressive_Cut_Startdate) {
      let endString = this.partnerProduct.Progressive_Cut_Startdate.toString().replace("T", " ");
      this.partnerProduct.Progressive_Cut_Startdate = new Date(endString + " +0000");
  }
    this.CurrencyData;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  callClose():void {
    this.modalRef.hide();
  }

  getCountries(){
    let svc = this.http.get('assets/json/countries.json')
      .map(response => { return response.json() });

        svc.subscribe(
          (x) => { this.CountryData = x.countries; },
          (err) => console.log(err)
        );
  }

  onChangeCountry(countryValue) {
    this.StateData=this.CountryData[countryValue].states;
  }

  callSubmit():void {
    this.model.Partner_Name = this.AddUserStep1.get('Name').value;
    this.model.Address = this.AddUserStep1.get('Address').value;
    this.model.Country = this.AddUserStep1.get('PartnerCountry').value;
    this.model.Sate = this.AddUserStep1.get('State').value;
    this.model.Zip_Code = this.AddUserStep1.get('PostCode').value;
    this.model.Currency = this.AddUserStep1.get('Currency').value;
    this.model.Start_Date = this.AddUserStep2.get('Start_Date').value;
    this.model.Tenure = this.AddUserStep2.get('Tenure').value;
    this.model.Due_Date = this.AddUserStep2.get('Due_Date').value;
    this.model.Rating = this.AddUserStep2.get('Rating').value;
    this.model.Product_Id = this.AddUserStep2.get('Product').value;
    this.model.First_Cut_Percentage = this.AddUserStep2.get('First_Cut_Percentage').value;
    this.model.First_Cut_Startdate =  this.AddUserStep2.get('First_Cut_Startdate').value;
    this.model.Progressive_Cut_Percentage = this.AddUserStep2.get('Progressive_Cut_Percentage').value;
    this.model.Progressive_Cut_Startdate =  this.AddUserStep2.get('Progressive_Cut_Startdate').value;
    this.model.Contact_Person_Name = this.AddUserStep3.get('ContactPersonName').value;
    this.model.Designation = this.AddUserStep3.get('Designation').value;
    this.model.Mobile_Number = this.AddUserStep3.get('mobilenumber').value;
    this.model.Alternate_Number = this.AddUserStep3.get('contactalternativenumber').value;
    this.model.Email_Address = this.AddUserStep3.get('emailaddress').value;
    this.model.Billing_ContactPerson_Name = this.AddUserStep4.get('ContactPersonName').value;
    this.model.Partner_Designation = this.AddUserStep4.get('Designation').value;
    this.model.Partner_Mobile_Number = this.AddUserStep4.get('mobilenumber').value;
    this.model.Partner_Email_Address = this.AddUserStep4.get('emailaddress').value;
    this.model.Partner_Alternate_Number = this.AddUserStep4.get('alternativenumber').value;
    this.model.Mode_Of_Payment = this.AddUserStep4.get('ModeOfPayment').value;
    this.model.Bank_Name = this.AddUserStep5.get('BankName').value;
    this.model.Branch_Address = this.AddUserStep5.get('branchaddress').value;
    this.model.Partner_Country = this.AddUserStep5.get('country').value;
    this.model.Account_Number = this.AddUserStep5.get('accountenumber').value;
    this.model.Ifsc_Code = this.AddUserStep5.get('ifsccode').value;
    this.model.Swift_Code = this.AddUserStep5.get('swiftcode').value;
    this.PartnerProvider.addPartner(this.model);
    console.log(this.model);
    // this.productProvider.addProductPricing(this.model);
    this.modalRef.hide();
  }
}
