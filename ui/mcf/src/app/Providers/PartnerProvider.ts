import { Injectable } from '@angular/core';
import { PartnerService } from 'src/app/Services/Partner/partner.service';
import { PartnerModel, PartnerProduct, PartnerContact, PartnerInventory } from '../Models/PartnerModel';


@Injectable({
    providedIn: 'root'
})

export class PartnerProvider {
    partner: PartnerModel[] = [];
    partnerProduct: PartnerProduct[] = [];
    partnerContact: PartnerContact[] = [];
    partnerInventory: PartnerInventory[] = [];

    constructor(private partnerService: PartnerService) {
    }

    getPartners(): void {
        this.partnerService.getPartner().subscribe(
            (data) => {
                this.partner = data as PartnerModel[];
            }
        )
    }

    addPartner(addPartnerModel: PartnerModel): void {
        this.partnerService.addPartner(addPartnerModel).subscribe(
            (data) => {
                if (!addPartnerModel.Id) {
                    this.partner.push(data as PartnerModel);
                }
            }
        )
    }

}