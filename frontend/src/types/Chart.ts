export interface DataItem {
    category: string;
    value: number;
    color: string;
    image: string;
}
  
export interface DataItems {
    [x: string]: any;
    totalAmount?: number;
    categories: DataItem[];
}