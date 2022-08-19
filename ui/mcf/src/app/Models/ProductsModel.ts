export class ProductsModel {
    Id: number;
    Product_Name: string;
    Sku_Code: string;
}

export class ProductPricing {
    Id: number;
    Product_Id: number;
    Variant_Id: number;
    Currency_Id: number;
    Tenure: string;
    Amount: number;
    Amount_Per_Year: number;
    Active_Status: string;
    Currency: ProductCurrecy[] = [];
    Varient: ProductVarient[] = [];
    Product: ProductsModel[] = [];
    Product_Name: string;
    Variant_Name: string;
    Currency_Name: string;
    productPrice: ProductPricing[] = [];
}

export class ProductCurrecy {
    Id: number;
    Currency_Name: string;
}

export class ProductVarient {
    Id: number;
    Product_Id: number;
    Variant_Name: string;
    Product_Name: string;
    Product: ProductsModel[] = [];
}