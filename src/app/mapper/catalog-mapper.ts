import { Catalog, CatalogProduct } from "../model/catalog.model";

export class CatalogMapper {
  public static mapLatestCatalog(catalog: CatalogProduct[]) {
    let finalCatalog: Catalog[] = [];
    let item: Catalog;
    catalog.forEach((catalog) => {
      item = {
        Source: catalog.Source,
        SKU: catalog.SKU,
        Description: catalog.Description,
      };
      finalCatalog.push(item);
    });
    return finalCatalog;
  }
}
