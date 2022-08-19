import { Injectable } from '@angular/core';
import { ClientModel, ClientProduct, ClientAdmin, clientInventory, Country, State } from 'src/app/Models/ClientModel';
import { ClientService } from 'src/app/Services/Clients/client.service';
import { ProductVarient, ProductsModel } from '../Models/ProductsModel';


@Injectable({
    providedIn: 'root'
})

export class ClientProvider {
    clients: ClientModel[] = [];
    productVarient: ProductVarient[] = [];
    product: ProductsModel[] = [];
    clientProduct: ClientProduct[] = [];
    ProductMap: ClientProduct[] = [];
    AdminDetails: ClientAdmin[] = [];
    Inventory: clientInventory[] = [];
    Country: Country[] = [];
    State: State[] = [];

    constructor(private clientService: ClientService) {
    }

    getClients(): void {
        this.clientService.getClientList().subscribe(
            (data) => {
                this.clients = data as ClientModel[];
                this.clientProduct.forEach(pp =>{
                    let productName = this.product.find(p =>p.Id == pp.Product_Id);
                    if(productName){
                        pp.Product_Name = productName.Product_Name;
                    }
                })
                this.clientProduct.forEach(pp =>{
                    let varientName = this.productVarient.find(p =>p.Id == pp.Varient_Id);
                    if(varientName){
                        pp.Variant_Name = varientName.Variant_Name;
                    }
                })
                this.clients.forEach(c =>{
                    let countryName = this.Country.find(cc =>cc.Id == c.Country_Id);
                    if(countryName){
                        c.Country_Name = countryName.Country_Name;
                    }
                })
                this.clients.forEach(pp =>{
                    let stateName = this.State.find(p =>p.Id == pp.State_Id);
                    if(stateName){
                        pp.State_Name = stateName.State_Name;
                    }
                })
                this.clients.forEach(c=>{
                    if (c.Created_Timestamp) {
                        let Create = c.Created_Timestamp.toString().replace("T", " ");
                        Create = Create.replace(Create.substring(Create.lastIndexOf(":")), ":00");
                        c.Created_Timestamp = new Date(Create + " +0000");
                      }
                      if (c.Updated_Timestamp) {
                        let update = c.Updated_Timestamp.toString().replace("T", " ");
                        update = update.replace(update.substring(update.lastIndexOf(":")), ":00");
                        c.Updated_Timestamp = new Date(update + " +0000");
                      }
                })
            }
        )
    }

    getCountry(): void {
        this.clientService.getCountryList().subscribe(
            (data) => {
                this.Country = data as Country[];
            }
        )
    }

    getState(): void {
        this.clientService.getStateList().subscribe(
            (data) => {
                this.State = data as State[];
            }
        )
    }

    addClient(addClientModel: ClientModel): void {
        this.clientService.addClient(addClientModel).subscribe(
            (data) => {
                if (!addClientModel.Id) {
                    this.clients.push(data as ClientModel);
                }
            }
        )
    }
}