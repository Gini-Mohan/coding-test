import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CatalogProduct } from "../model/catalog.model";
import { FileParser } from "../util/file-parser";

import { CatalogComponent } from "./catalog.component";

describe("CatalogComponent", () => {
 

  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    spyOn(FileParser, "parseJson");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should create updated catalog - contains common barcodes in both company", () => {
    const mockProduct1A: CatalogProduct = {
      Description: "Walkers Special Old Whiskey",
      Product: [
        "z2783613083817",
        "z2783613083818",
        "z2783613083819",
        "n7405223693844",
        "c7417468772846",
      ],
      SKU: "647-vyk-317",
      Source: "A",
    };
    const mockProduct2A: CatalogProduct = {
      Description: "Bread - Raisin",
      Product: ["p2359014924610", "a7802303764525", "o5194275040472"],
      SKU: "280-oad-768",
      Source: "A",
    };
    const mockProduct1B: CatalogProduct = {
      Description: "Walkers Special Old Whiskey test",
      Product: ["z2783613083817", "n7405223693844", "c7417468772846"],
      SKU: "999-vyk-317",
      Source: "B",
    };
    const mockProduct2B: CatalogProduct = {
      Description: "Bread - Raisin",
      Product: ["p2359014924610", "a7802303764525", "o5194275040472"],
      SKU: "999-oad-768",
      Source: "B",
    };
    const mockProductA: CatalogProduct[] = [];
    mockProductA.push(mockProduct1A);
    mockProductA.push(mockProduct2A);
  
    const mockProductB: CatalogProduct[] = [];
    mockProductB.push(mockProduct1B);
    mockProductB.push(mockProduct2B);
  
    const mockOutPut: CatalogProduct[] = [];
    mockOutPut.push(mockProduct1A);
    mockOutPut.push(mockProduct2A);
    expect(component.mergeProductDetails(mockProductA, mockProductB)).toEqual(
      mockOutPut
    );
  });
  it("should create updated catalog - no matching barcode for one product", () => {
    const mockProduct11A: CatalogProduct = {
      Description: "Walkers Special Old Whiskey",
      Product: [
        "z2783613083810"
      ],
      SKU: "647-vyk-317",
      Source: "A",
    };
    const mockProduct12A: CatalogProduct = {
      Description: "Bread - Raisin",
      Product: ["p2359014924610", "a7802303764525", "o5194275040472"],
      SKU: "280-oad-768",
      Source: "A",
    };
    const mockProduct11B: CatalogProduct = {
      Description: "Walkers Special Old Whiskey",
      Product: ["z2783613083817", "n7405223693844", "c7417468772846"],
      SKU: "999-vyk-317",
      Source: "B",
    };
    const mockProduct12B: CatalogProduct = {
      Description: "Bread - Raisin",
      Product: ["p2359014924610", "a7802303764525", "o5194275040472"],
      SKU: "999-oad-768",
      Source: "B",
    };
    const mockCatalog1A: CatalogProduct[] = [];
    mockCatalog1A.push(mockProduct11A);
    mockCatalog1A.push(mockProduct12A);

    const mockCatalog1B: CatalogProduct[] = [];
    mockCatalog1B.push(mockProduct11B);
    mockCatalog1B.push(mockProduct12B);

    const mockOutPut: CatalogProduct[] = [];
    mockOutPut.push(mockProduct11A);
    mockOutPut.push(mockProduct11B);
    mockOutPut.push(mockProduct12A);

    expect(component.mergeProductDetails(mockCatalog1A, mockCatalog1B)).toEqual(
      mockOutPut
    );
  });
});
