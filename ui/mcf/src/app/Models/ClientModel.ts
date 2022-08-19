import { ProductsModel, ProductVarient } from "./ProductsModel";
import { PartnerModel } from "./PartnerModel";
import { ServerModel } from "./ServerModel";

export class ClientModel {
    Id: number;
    Client_Id: string;
    Client_Name: string;
    Business_Name: string;
    Address: string;
    Email_Address: string;
    Website: string;
    Country_Id: number;
    State_Id: number;
    City: string;
    Zip_Code: string;
    Industry: string;
    Currency: string;
    Timezone: string;
    Created_Timestamp: Date;
    Db_Password: string;
    Db_Hostid: string;
    Active_State: number;
    Updated_Timestamp: Date;
    Instance_Status: number;
    Log_Method: string;
    Partner_Id: number;
    Server_Path: number;
    Sent_Email_State: number;
    Client_Remote_Address: string;
    Version: string
    Partner_Name: string;
    Server_Name: string;
    Country: Country[] = [];
    State: State[] = [];
    Country_Name: string;
    State_Name: string;

    Admin_Name: string;
    Designation: string;
    Contact_Number: string;
    Admin_Alternate_Contact_Number: string;
    Admin_Email_Address: string;
    Admin_Alternate_Email_Address: string;
    Client_ID: number;

    Billing_Person_Name: string;
    Client_Designation: string;
    Client_Mobile_Number: string;
    Client_Alternate_Number: string;
    Client_Email_Address: string;
    Card_Type: string;
    Card_Holder_Name: string;
    Card_Number: string;
    Expiry_Month: string;
    Expiry_Year: string;
    Bank_Name: string;
    Account_Number: string;
    Ifsc_Code: string;
    Swift_Code: string;
    Branch_Address: string;
    Client_Country: number;
    ClientId: number;
    Partner_Remarks: string;

    Product_Id: number;
    Varient_Id: number;
    Client_Idd: number;
    Subscription_Count:number;
    Licenses: number;
    Pricing: string;
    Discount: number;
    Total_Discount: number;
    Discount_End_Date: string;
    Discount_Extended_Date: string;
    Payment_Schedule: string;
    Bill_Date: Date;
    Net_Amount: number;
    Tenure_End_Date: Date;
    Tenure_Extend_date: Date;
    Active_Status: number;
    Extended_License: number;


    Product: ProductsModel[] = [];
    ProductVarient: ProductVarient[] = [];
    adminDetails: ClientAdmin[] = [];
    Inventory: clientInventory[] = [];
    productMap: ClientProduct[] = [];
    Partner: PartnerModel[] = [];
    Server: ServerModel[] = [];
}

export class ClientAdmin {
    Id: number;
    Admin_Name: string;
    Designation: string;
    Contact_Number: string;
    Admin_Alternate_Contact_Number: string;
    Admin_Email_Address: string;
    Admin_Alternate_Email_Address: string;
    Client_Id: number;
}

export class clientInventory {
    Id: number;
    Billing_Person_Name: string;
    Inventory_Designation: string;
    Inventory_Mobile_Number: string;
    Client_Alternate_Number: string;
    Inventory_Email_Address: string;
    Card_Type: string;
    Card_Holder_Name: string;
    Card_Number: string;
    Expiry_Month: string;
    Expiry_Year: string;
    Bank_Name: string;
    Account_Number: string;
    Ifsc_Code: string;
    Swift_Code: string;
    Branch_Address: string;
    Client_Country: number;
    Client_Id: number;
    Remarks: string;
    isSelected: boolean = false;
    Country_Name: string;
}

export class ClientProduct {
    Id: number;
    Product_Id: number;
    Varient_Id: number;
    Client_Id: number;
    Product_Name: string;
    Variant_Name: string;
    Subscription_Count:number;
    Licenses: number;
    Pricing: string;
    Discount: number;
    Total_Discount: number;
    Discount_End_Date: string;
    Discount_Extended_Date: string;
    Payment_Schedule: string;
    Bill_Date: Date;
    Net_Amount: number;
    Tenure_End_Date: Date;
    Tenure_Extend_date: Date;
    Active_Status: number;
    Extended_License: number;
}

export class Country {
    Id: number;
    Country_Id: number;
    Country_Name: string;
}

export class State {
    Id: number;
    State_Id: number;
    State_Name: string;
    Country_Id: number;
}