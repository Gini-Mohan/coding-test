export interface Catalog {
    SKU: string;    
    Description: string;
    Source: string;
}
export interface Product {
    supplierId: number;    
    SKU: string;       
    Barcode: string;
    Source: string;
}

export interface CatalogProduct {
    SKU: string; 
    Description: string;
    Source: string,
    Product: string[];
}