import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './Providers/AuthGuard';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProductInformationComponent } from './Components/product-information/product-information.component';
import { CurrencyInformationComponent } from './Components/currency-information/currency-information.component';
import { VariantInformationComponent } from './Components/variant-information/variant-information.component';
import { ProductPricingComponent } from './Components/product-pricing/product-pricing.component';
import { PartnerDetailsComponent } from './Components/partner-details/partner-details.component';
import { ServerPathComponent } from './Components/server-path/server-path.component';
import { DatabaseDetailsComponent } from './Components/database-details/database-details.component';
import { CustomerDetailsComponent } from './Components/customer-details/customer-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'product-information', component: ProductInformationComponent, canActivate: [AuthGuard] },
  { path: 'currency-information', component: CurrencyInformationComponent, canActivate: [AuthGuard] },
  { path: 'variant-information', component: VariantInformationComponent, canActivate: [AuthGuard] },
  { path: 'product-pricing', component: ProductPricingComponent, canActivate: [AuthGuard] },
  { path: 'partner-details', component: PartnerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'server-details', component: ServerPathComponent, canActivate: [AuthGuard] },
  { path: 'database-details', component: DatabaseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'client-details', component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo:'login', pathMatch : 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
