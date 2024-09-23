export interface FindAllProductDto {
  products: {
    id: string;
    name: string;
    description: string;  
    salesPricce: string;
  }[];
}