import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductProvider } from 'src/app/Providers/ProductProvider';
import { ClientModel, ClientAdmin, clientInventory, ClientProduct } from 'src/app/Models/ClientModel';
import { ClientProvider } from 'src/app/Providers/ClientProvider';
import { CurrencyData, CurrencyVal } from 'src/app/Models/ListOfValues';
import { Http } from '@angular/http';
import { PartnerProvider } from 'src/app/Providers/PartnerProvider';
import { ServerProvider } from 'src/app/Providers/ServerProvider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  AddUserStep1: FormGroup;
  AddUserStep2: FormGroup;
  AddUserStep3: FormGroup;
  AddUserStep4: FormGroup;
  AddUserStep5: FormGroup;
  AddUserStep6: FormGroup;
  modalRef: BsModalRef;
  model: ClientModel = new ClientModel;
  client: ClientModel[] = [];
  addClient: ClientModel = new ClientModel;
  clientAdmin: ClientAdmin = new ClientAdmin;
  clientInventory: clientInventory = new clientInventory;
  clientProduct: ClientProduct = new ClientProduct;
  CurrencyData: CurrencyData[] = CurrencyVal;
  ProductMap: ClientProduct[] = [];
  AdminDetails: ClientAdmin[] = [];
  Inventory: clientInventory[] = [];
  countryName: any;

  today: Date = new Date();
  // StartMinDate: Date = this.today;
  //StartMaxDate: Date = null;
  // EndtMinDate: Date = this.today;
  //EndMaxDate: Date = null;

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private productProvider: ProductProvider,
              private clientProvider: ClientProvider,
              private http: Http,
              private partnerProvider: PartnerProvider,
              private serverProvider: ServerProvider,
              private datePipe: DatePipe) {
                this.AddUserStep1 = this.formBuilder.group({
                  Name: new FormControl('', [Validators.required]),
                  Address: new FormControl('', [Validators.required]),
                  url: new FormControl('', [Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/),
                  Validators.maxLength(45)]),
                  Country: new FormControl('', []),
                  State: new FormControl('', []),
                  city: new FormControl('', [Validators.required]),
                  postcode: new FormControl('', []),
                  Currecny: new FormControl('', [Validators.required]),
                  Industry: new FormControl('', [Validators.required]),
                  ClientCreationDate: new FormControl('', []),
                  StartDate: new FormControl('', [Validators.required]),
                  primaryemail: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
                  //partner: new FormControl('0'),
                  timezone: new FormControl('', []),
                });
                this.AddUserStep2 = this.formBuilder.group({
                  ServerPath: new FormControl('0'),
                  AdminName: new FormControl('', [Validators.required]),
                  Designation: new FormControl('', [Validators.required]),
                  MobileNumber: new FormControl('', [Validators.required]),
                  AlternativeNumber: new FormControl('', []),
                  Email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
                  AlternativeEmail: new FormControl('', []),
                });
                this.AddUserStep3 = this.formBuilder.group({
                  Product: new FormControl('0'),
                  Varient: new FormControl('0'),
                  Subscription: new FormControl('0'),
                  Licenses: new FormControl('', [Validators.required]),
                  Pricing: new FormControl('', []),
                  Discount_Type: new FormControl('', []),
                  Discount: new FormControl('', []),
                  TotalDiscount: new FormControl('', []),
                  NetBillable: new FormControl('', []),
                  BillingStartDate: new FormControl('', []),
                  DiscountEndDate: new FormControl('', []),
                  PaymentSchedule: new FormControl('0'),
                  TenureExtendDate: new FormControl('', []),
                  TenureEndDate: new FormControl('', []),
                });
                this.AddUserStep4 = this.formBuilder.group({
                  ContactPersonName: new FormControl('', [Validators.required]),
                  InventoryDesignation: new FormControl('', [Validators.required]),
                  Inventorymobilenumber: new FormControl('', [Validators.required]),
                  alternativenumber: new FormControl('', []),
                  emailaddress: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
                });
                this.AddUserStep5 = this.formBuilder.group({
                  HolderName: new FormControl('', []),
                  CardType: new FormControl('', []),
                  CardNumber: new FormControl('', []),
                  Month: new FormControl('', []),
                  Year: new FormControl('', []),
                });
                this.AddUserStep6 = this.formBuilder.group({
                  BankName: new FormControl('', []),
                  branchaddress: new FormControl('', []),
                  Inventorycountry: new FormControl('', []),
                  accountenumber: new FormControl('', []),
                  ifsccode: new FormControl('', []),
                  swiftcode: new FormControl('', []),
                });

               }

  ngOnInit() {
    this.model.Timezone = '(GMT +05:30) Asia/Calcutta';
    //this.partnerProvider.getPartners();
    this.clientProvider.getClients();
    this.productProvider.getProducts();
    this.productProvider.getProductsVarient();
    this.serverProvider.getServers();
    this.clientProvider.getCountry();
    this.clientProvider.getState();
    this.client = this.clientProvider.clients;
    this.ProductMap = this.clientProvider.ProductMap;
    this.AdminDetails = this.clientProvider.AdminDetails;
    this.Inventory = this.clientProvider.Inventory;
    this.CurrencyData;
    this.formControlValueChanged();
    if (this.model.Created_Timestamp) {
      let Create = this.model.Created_Timestamp.toString().replace("T", " ");
      Create = Create.replace(Create.substring(Create.lastIndexOf(":")), ":00");
      this.model.Created_Timestamp = new Date(Create + " +0000");
    }
    if (this.model.Updated_Timestamp) {
      let update = this.model.Updated_Timestamp.toString().replace("T", " ");
      update = update.replace(update.substring(update.lastIndexOf(":")), ":00");
      this.model.Updated_Timestamp = new Date(update + " +0000");
    }
    this.clientProvider.clients.forEach(c =>{
      let countryName = this.clientProvider.Country.find(cc =>cc.Id == c.Country_Id);
      if(countryName){
          c.Country_Name = countryName.Country_Name;
      }
    })
  this.clientProvider.clients.forEach(pp =>{
      let stateName = this.clientProvider.State.find(p =>p.Id == pp.State_Id);
      if(stateName){
          pp.State_Name = stateName.State_Name;
      }
  })
  this.clientProvider.Inventory.forEach(c =>{
    let countryName = this.clientProvider.Country.find(cc =>cc.Id == c.Client_Country);
    if(countryName){
        c.Country_Name = countryName.Country_Name;
    }
  })
  }

  ngDoCheck() {
    //this.addClient.Partner = this.partnerProvider.partner;
    this.addClient.Server = this.serverProvider.server;
    this.client = this.clientProvider.clients;
    this.model.Product = this.productProvider.product;
    this.model.ProductVarient = this.productProvider.productVarient;
    this.ProductMap = this.clientProvider.ProductMap;
    this.AdminDetails = this.clientProvider.AdminDetails;
    this.Inventory = this.clientProvider.Inventory;
    this.clientProvider.clients.forEach(c =>{
      let countryName = this.clientProvider.Country.find(cc =>cc.Id == c.Country_Id);
      if(countryName){
          c.Country_Name = countryName.Country_Name;
      }
    })
  this.clientProvider.clients.forEach(pp =>{
      let stateName = this.clientProvider.State.find(p =>p.Id == pp.State_Id);
      if(stateName){
          pp.State_Name = stateName.State_Name;
      }
  })
  this.clientProvider.Inventory.forEach(c =>{
    let countryName = this.clientProvider.Country.find(cc =>cc.Id == c.Client_Country);
    if(countryName){
        c.Country_Name = countryName.Country_Name;
    }
  })
  if (this.model.Created_Timestamp) {
    let Create = this.model.Created_Timestamp.toString().replace("T", " ");
    Create = Create.replace(Create.substring(Create.lastIndexOf(":")), ":00");
    this.model.Created_Timestamp = new Date(Create + " +0000");
  }
  if (this.model.Updated_Timestamp) {
    let update = this.model.Updated_Timestamp.toString().replace("T", " ");
    update = update.replace(update.substring(update.lastIndexOf(":")), ":00");
    this.model.Updated_Timestamp = new Date(update + " +0000");
  }
  }

  callClose():void {
    this.modalRef.hide();
  }

  formControlValueChanged() {
    //this.AddUserStep1.get('partner').clearValidators();
    this.AddUserStep2.get('ServerPath').clearValidators();
    this.AddUserStep3.get('Product').clearValidators();
    this.AddUserStep3.get('Varient').clearValidators();
    this.AddUserStep3.get('Subscription').clearValidators();
    this.AddUserStep3.get('PaymentSchedule').clearValidators();
      //this.AddUserStep1.get('partner').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep2.get('ServerPath').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep3.get('Product').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep3.get('Varient').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep3.get('Subscription').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
      this.AddUserStep3.get('PaymentSchedule').setValidators([Validators.required, Validators.pattern(/[^0]$/)]);
    //this.AddUserStep1.get('partner').updateValueAndValidity();
    this.AddUserStep2.get('ServerPath').updateValueAndValidity();
    this.AddUserStep3.get('Product').updateValueAndValidity();
    this.AddUserStep3.get('Varient').updateValueAndValidity();
    this.AddUserStep3.get('Subscription').updateValueAndValidity();
    this.AddUserStep3.get('PaymentSchedule').updateValueAndValidity();
}

  addClick(template: TemplateRef<any>):void {
    this.model = new ClientModel;
    this.clientAdmin = new ClientAdmin;
    this.clientProduct = new ClientProduct;
    this.clientInventory = new clientInventory;
    this.model.Timezone = '(GMT +05:30) Asia/Calcutta';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  editClient(template: TemplateRef<any>, data: ClientModel):void {
    let clientEdit : ClientModel = new ClientModel();
    clientEdit = Object.assign(clientEdit, data);
    this.model = data;
    this.clientAdmin = data.adminDetails[0];
    this.clientProduct = data.productMap[0];
    this.clientInventory = data.Inventory[0];
    
    // this.model.Created_Timestamp = this.datePipe.transform(this.model.Created_Timestamp, 'yyyy-MM-dd');
    // this.model.Updated_Timestamp = this.datePipe.transform(this.model.Updated_Timestamp, 'yyyy-MM-dd');
    // this.clientProduct.Discount_Extended_Date = this.datePipe.transform(this.clientProduct.Discount_Extended_Date, 'yyyy-MM-dd');
    // this.clientProduct.Discount_End_Date = this.datePipe.transform(this.clientProduct.Discount_End_Date, 'yyyy-MM-dd');

    this.model.Product = this.productProvider.product;
    this.model.ProductVarient = this.productProvider.productVarient;
    clientEdit.Server = this.serverProvider.server;
    this.CurrencyData;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  viewClient(template1: TemplateRef<any>, data: ClientModel):void {
    let clientEdit : ClientModel = new ClientModel();
    clientEdit = Object.assign(clientEdit, data);
    this.model = data;
    // let partnerName = this.partnerProvider.partner.find(p =>p.Id == this.model.Partner_Id);
    //   if(partnerName){
    //     this.model.Partner_Name = partnerName.Partner_Name;
    //   }
    let serverName = this.serverProvider.server.find(p =>p.Id == this.model.Server_Path);
      if(serverName){
        this.model.Server_Name = serverName.Server_Name;
      }

      let countryName = this.clientProvider.Country.find(p =>p.Id == this.clientInventory.Client_Country);
      if(countryName){
        this.clientInventory.Country_Name = countryName.Country_Name;
      }
      
      
    this.clientAdmin = data.adminDetails[0];
    this.clientProduct = data.productMap[0];
    let productName = this.productProvider.product.find(p =>p.Id == this.clientProduct.Product_Id);
      if(productName){
        this.clientProduct.Product_Name = productName.Product_Name;
      }
    let variantName = this.productProvider.productVarient.find(p =>p.Id == this.clientProduct.Varient_Id);
      if(variantName){
        this.clientProduct.Variant_Name = variantName.Variant_Name;
      }
    this.clientInventory = data.Inventory[0];
    //this.clientProvider.Inventory.forEach(c =>{
       this.countryName = this.clientProvider.Country.find(cc =>cc.Id == this.clientInventory.Client_Country);
      if(this.countryName){
        this.clientInventory.Country_Name = this.countryName.Country_Name;
      }
    //})
    this.model.Product = this.productProvider.product;
    this.model.ProductVarient = this.productProvider.productVarient;
    clientEdit.Server = this.serverProvider.server;
    this.modalRef = this.modalService.show(template1, { class: 'modal-lg', animated: false, backdrop: 'static' });
  }

  callSubmit():void {
    this.model.Client_Name = this.AddUserStep1.get('Name').value;
    this.model.Address = this.AddUserStep1.get('Address').value;
    this.model.Website = this.AddUserStep1.get('url').value;
    this.model.Country_Id = this.AddUserStep1.get('Country').value;
    this.model.State_Id = this.AddUserStep1.get('State').value;
    this.model.City = this.AddUserStep1.get('city').value;
    this.model.Zip_Code = this.AddUserStep1.get('postcode').value;
    this.model.Currency = this.AddUserStep1.get('Currecny').value;
    this.model.Industry = this.AddUserStep1.get('Industry').value;
    this.model.Email_Address = this.AddUserStep1.get('primaryemail').value;
    //this.model.Partner_Id = this.AddUserStep1.get('partner').value;
    this.model.Updated_Timestamp = this.AddUserStep1.get('StartDate').value;
    this.model.Timezone = this.AddUserStep1.get('timezone').value;
    this.model.Server_Path = this.AddUserStep2.get('ServerPath').value;
    this.model.Admin_Name = this.AddUserStep2.get('AdminName').value;
    this.model.Designation = this.AddUserStep2.get('Designation').value;
    this.model.Contact_Number = this.AddUserStep2.get('MobileNumber').value;
    this.model.Admin_Alternate_Contact_Number = this.AddUserStep2.get('AlternativeNumber').value;
    this.model.Admin_Email_Address = this.AddUserStep2.get('Email').value;
    this.model.Admin_Alternate_Email_Address = this.AddUserStep2.get('AlternativeEmail').value;
    this.model.Product_Id = this.AddUserStep3.get('Product').value;
    this.model.Varient_Id = this.AddUserStep3.get('Varient').value;
    this.model.Subscription_Count = this.AddUserStep3.get('Subscription').value;
    this.model.Licenses = this.AddUserStep3.get('Licenses').value;
    this.model.Pricing = this.AddUserStep3.get('Pricing').value;
    this.model.Discount = this.AddUserStep3.get('Discount').value;
    this.model.Total_Discount = this.AddUserStep3.get('TotalDiscount').value;
    this.model.Net_Amount = this.AddUserStep3.get('NetBillable').value;
    this.model.Discount_Extended_Date = this.AddUserStep3.get('BillingStartDate').value;
    this.model.Discount_End_Date = this.AddUserStep3.get('DiscountEndDate').value;
    this.model.Payment_Schedule = this.AddUserStep3.get('PaymentSchedule').value;
    this.model.Tenure_Extend_date = this.AddUserStep3.get('TenureExtendDate').value;
    this.model.Tenure_End_Date = this.AddUserStep3.get('TenureEndDate').value;
    this.model.Billing_Person_Name = this.AddUserStep4.get('ContactPersonName').value;
    this.model.Client_Designation = this.AddUserStep4.get('InventoryDesignation').value;
    this.model.Client_Mobile_Number = this.AddUserStep4.get('Inventorymobilenumber').value;
    this.model.Client_Alternate_Number = this.AddUserStep4.get('alternativenumber').value;
    this.model.Client_Email_Address = this.AddUserStep4.get('emailaddress').value;
    this.model.Card_Holder_Name = this.AddUserStep5.get('HolderName').value;
    this.model.Card_Type = this.AddUserStep5.get('CardType').value;
    this.model.Card_Number = this.AddUserStep5.get('CardNumber').value;
    this.model.Expiry_Month = this.AddUserStep5.get('Month').value;
    this.model.Expiry_Year = this.AddUserStep5.get('Year').value;
    this.model.Bank_Name = this.AddUserStep6.get('BankName').value;
    this.model.Branch_Address = this.AddUserStep6.get('branchaddress').value;
    this.model.Client_Country = this.AddUserStep6.get('Inventorycountry').value;
    this.model.Account_Number = this.AddUserStep6.get('accountenumber').value;
    this.model.Ifsc_Code = this.AddUserStep6.get('ifsccode').value;
    this.model.Swift_Code = this.AddUserStep6.get('swiftcode').value;
    this.clientProvider.addClient(this.model);
    this.modalRef.hide();
  }

}
