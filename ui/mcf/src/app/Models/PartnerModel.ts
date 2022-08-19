import { ProductsModel } from "./ProductsModel";

export class PartnerModel {
    Id: number;
    Partner_Name: string;
    Address: string;
    Country: string;
    Sate: string;
    Zip_Code: string;
    Currency: string;
    Tenure: string;
    Start_Date: string;
    Due_Date: string;
    Partner_Type: string;
    Rating: string;

    Partner_Id: number;
    Product_Id: number;
    First_Cut_Percentage: string;
    First_Cut_Startdate: Date;
    Progressive_Cut_Percentage: string;
    Progressive_Cut_Startdate: Date;
    Remarks: string;

    Contact_Person_Name: string;
    Designation: string;
    Mobile_Number: string;
    Alternate_Number: string;
    Email_Address: string;
    PartnerId: number;

    Billing_ContactPerson_Name: string;
    Partner_Designation: string;
    Partner_Mobile_Number: string;
    Partner_Alternate_Number: string;
    Partner_Email_Address: string;
    Card_Type: string;
    Mode_Of_Payment: string;
    Card_Holder_Name: string;
    Card_Number: string;
    Expiry_Month: string;
    Expiry_Year: string;
    Bank_Name: string;
    Account_Number: string;
    Ifsc_Code: string;
    Swift_Code: string;
    Branch_Address: string;
    Partner_Country: string;
    Partner_ID: string;
    Partner_Remarks: string;
    
    Product: ProductsModel[] = [];
    partnerProduct: PartnerProduct[] = [];
    partnerContact: PartnerContact[] = [];
    partnerInventory: PartnerInventory[] = [];
}

export class PartnerProduct {
    Id: number;
    Partner_Id: number;
    Product_Id: number;
    Product_Name: string;
    First_Cut_Percentage: string;
    First_Cut_Startdate: Date;
    Progressive_Cut_Percentage: string;
    Progressive_Cut_Startdate: Date;
    Remarks: string;
}

export class PartnerContact {
    Id: number;
    Contact_Person_Name: string;
    Designation: string;
    Mobile_Number: string;
    Alternate_Number: string;
    Email_Address: string;
    Partner_Id: number;
}

export class PartnerInventory {
    Billing_ContactPerson_Name: string;
    Partner_Designation: string;
    Partner_Mobile_Number: string;
    Partner_Alternate_Number: string;
    Partner_Email_Address: string;
    Card_Type: string;
    Mode_Of_Payment: string;
    Card_Holder_Name: string;
    Card_Number: string;
    Expiry_Month: string;
    Expiry_Year: string;
    Bank_Name: string;
    Account_Number: string;
    Ifsc_Code: string;
    Swift_Code: string;
    Branch_Address: string;
    Partner_Country: string;
    Partner_Id: string;
    Remarks: string;
    isSelected: boolean = false;
}