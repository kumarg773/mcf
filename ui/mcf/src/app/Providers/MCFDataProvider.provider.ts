import { Injectable } from "@angular/core";
import { EventType, EventData } from "./../Models/SharedModel";
import { AreaDataProvider } from "./AreaDataProvider.provider";
import { RouteDataProvider } from "./RouteDataProvider.provider";
import { ProductProvider } from "./ProductProvider";
import { ServerProvider } from "./ServerProvider";
import { ClientProvider } from "./ClientProvider";
import { DatabaseProvider } from "./DatabaseProvider";
import { PartnerProvider } from "./PartnerProvider";
import { ProductsModel, ProductPricing, ProductCurrecy, ProductVarient } from "../Models/ProductsModel";
import { ServerModel } from "../Models/ServerModel";
import { DatabaseModel } from "../Models/DatabaseModel";
import { PartnerModel } from "../Models/PartnerModel";
import { ClientModel } from "../Models/ClientModel";

@Injectable()
export class MCFDataProvider extends AreaDataProvider {
    product: ProductsModel[]= [];
    productPricing: ProductPricing[]= [];
    productCurrency: ProductCurrecy[] = [];
    productVarient: ProductVarient[]= [];
    server: ServerModel[] = [];
    database: DatabaseModel[] = [];
    partner: PartnerModel[] = [];
    client: ClientModel[] = [];
    
    currentAreaTitle: string = "Dashboard";

    constructor(
       routeDataProvider: RouteDataProvider,
       private productsProvider: ProductProvider,
       private serverProvider: ServerProvider,
       private clientProvider: ClientProvider,
       private databaseProvider: DatabaseProvider,
       private partnerProvider: PartnerProvider
        ) {
        super('LConnectt', routeDataProvider);
    }

    areaChanged(newArea: string, firstCall: boolean) {
        if (firstCall) {
            return;
        }
        this.eventHandler({ type: EventType.areaChanged });
    }

    subAreaChanged(newSubArea: string, firstCall: boolean) {
        if (firstCall || newSubArea == this.currentAreaName) {
            return;
        }
        this.eventHandler({ type: EventType.subAreaChanged });
    }

    queryParamChanged(newQueryParams: any, firstCall: boolean) {
        if (firstCall) {
            return;
        }
        if (newQueryParams.id !== undefined) {
            this.eventHandler({ type: EventType.queryParamChanged });
        } else {
            this.eventHandler({ type: EventType.areaChanged });
        }
    }

    urlMaker(data: any): string {
        return "";
    }

    eventHandler(eventData: EventData) {
        switch (eventData.type) {
            case EventType.queryParamChanged:
                console.log("Query param changed", this.currentQueryParam);
                break;
            case EventType.areaChanged:
                    console.log("Area Changed", this.currentAreaName);
                    break;
            case EventType.subAreaChanged:
                console.log("Sub Area changed", this.currentSubAreaName);
                switch (this.currentSubAreaName) {
                    case "dashboard":
                        this.currentAreaTitle = "Dashboard";
                        break;
                    case "products":
                        this.currentAreaTitle = "Products";
                        if (this.productsProvider.product.length == 0) {
                            this.productsProvider.getProducts();
                        }
                        if (this.productsProvider.productCurrency.length == 0) {
                            this.productsProvider.getProductsCurrency();
                        }
                        if (this.productsProvider.productVarient.length == 0) {
                            this.productsProvider.getProductsVarient();
                        }
                        if (this.productsProvider.productPricing.length == 0) {
                            this.productsProvider.getProductsPricing();
                        }
                        break;
                    case "partners":
                        this.currentAreaTitle = "Partners";
                        if (this.partnerProvider.partner.length == 0) {
                            this.partnerProvider.getPartners();
                        }
                        break;
                    case "servers":
                        this.currentAreaTitle = "Servers";
                        if (this.serverProvider.server.length == 0) {
                            this.serverProvider.getServers();
                        }
                        break;
                    case "databases":
                        this.currentAreaTitle = "Databases";
                        if (this.databaseProvider.database.length == 0) {
                            this.databaseProvider.getDatabase();
                        }
                        break;
                    case "clients":
                        this.currentAreaTitle = "Clients";
                        if (this.clientProvider.clients.length == 0) {
                            this.clientProvider.getClients();
                        }
                        break;
                }
                break;

        }
    }
}