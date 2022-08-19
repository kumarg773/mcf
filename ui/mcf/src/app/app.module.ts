import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductInformationComponent } from './Components/product-information/product-information.component';
import { CurrencyInformationComponent } from './Components/currency-information/currency-information.component';
import { VariantInformationComponent } from './Components/variant-information/variant-information.component';
import { ProductPricingComponent } from './Components/product-pricing/product-pricing.component';
import { PartnerDetailsComponent } from './Components/partner-details/partner-details.component';
import { ServerPathComponent } from './Components/server-path/server-path.component';
import { DatabaseDetailsComponent } from './Components/database-details/database-details.component';
import { CustomerDetailsComponent } from './Components/customer-details/customer-details.component';
import { SidebarDirective } from './sidebar.directive';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Providers/AuthGuard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { httpFactory } from './Providers/HttpFactory';
import { Router } from '@angular/router';
import { MCFDataProvider } from './Providers/MCFDataProvider.provider';
import { RouteDataProvider } from './Providers/RouteDataProvider.provider';
import { DataTableModule } from "angular-6-datatable";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidebarDirective,
    ProductInformationComponent,
    CurrencyInformationComponent,
    VariantInformationComponent,
    ProductPricingComponent,
    PartnerDetailsComponent,
    ServerPathComponent,
    DatabaseDetailsComponent,
    CustomerDetailsComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ArchwizardModule,
    HttpModule,
    DataTableModule,
    NgMultiSelectDropDownModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard,
    RouteDataProvider,
    MCFDataProvider,
    DatePipe,
    { provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Router]}
  ]  
})
export class AppModule { 

}
