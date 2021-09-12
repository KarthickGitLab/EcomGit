import { Guid } from "guid-typescript";

export interface Product {
  ProductId: Guid;
  SkuCode: string;
  Name: string;
  Price: number;
  ImageUrl: string;
  IsActive: boolean
  CreatedBy: string;
  UpdatedBy: string;
  CreatedOn: Date;
  UpdatedOn: Date;
}
