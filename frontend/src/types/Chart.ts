export interface DataItem {
  category: string;
  value: number;
  color: string;
  image: string;
}

export interface DataItems {
  totalAmount?: number;
  categories: DataItem[];
}
