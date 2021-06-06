import { Component, OnInit } from '@angular/core';
import { CatalogMapper } from '../mapper/catalog-mapper';
import { Catalog, CatalogProduct, Product } from '../model/catalog.model';
import { FileParser } from '../util/file-parser';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public finalOutPut: Catalog[];

  async ngOnInit() {
    await this.mergeCatalog();
  }
  public async mergeCatalog() {    
    let latestCatalog: CatalogProduct[] = [];
    let productDetailsA: CatalogProduct[] = [];
    productDetailsA = await this.getProductDetails(
      "assets/input/catalogA.csv",
      "assets/input/barcodesA.csv",
      "A"
    );
    let productDetailsB: CatalogProduct[] = [];
    productDetailsB = await this.getProductDetails(
      "assets/input/catalogB.csv",
      "assets/input/barcodesB.csv",
      "B"
    );
    latestCatalog = this.mergeProductDetails(productDetailsA,productDetailsB);
    this.finalOutPut = CatalogMapper.mapLatestCatalog(latestCatalog);
    FileParser.parseJson(this.finalOutPut);
  }

  public mergeProductDetails(productDetailsA: CatalogProduct[],productDetailsB:CatalogProduct[]):CatalogProduct[]{
    
    let latestCatalog: CatalogProduct[] = [];
    if(!!productDetailsA && !!productDetailsB){
      productDetailsA.forEach((item1) => {
        latestCatalog.push(item1);
        productDetailsB.forEach((item2) => {
          if (item1.Description === item2.Description) {
            let match = item2.Product.some((item2) =>
            item1.Product.some((value) => value === item2)
            );
            if (!match) {
              latestCatalog.push(item2);
            }
          }
        });
      });
    }
    return latestCatalog;
  }

  public async getProductDetails(
    catalogFile: string,
    barcodeFile: string,
    source: string
  ): Promise<CatalogProduct[]> {
    var companyA = await FileParser.parseCsv(catalogFile);
    var catalogA: Catalog[] = companyA && companyA.data;
    catalogA.map((item) => (item.Source = source));
    var productA = await FileParser.parseCsv(barcodeFile);
    var barCodeA: Product[] = productA && productA.data;
    barCodeA.map((item) => (item.Source = source));
    const combinedOne: CatalogProduct[] = [];
    let catalogProduct: CatalogProduct;

    catalogA.forEach((catalog) => {
      catalogProduct = {
        Source: catalog.Source,
        SKU: catalog.SKU,
        Description: catalog.Description,
        Product: barCodeA
          .filter((product) => product.SKU === catalog.SKU)
          .map((res) => res.Barcode),
      };
      combinedOne.push(catalogProduct);
    });
    return combinedOne;
  }

}
