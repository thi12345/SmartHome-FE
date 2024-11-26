export interface Category {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  desciption: string; 
}

export interface Device {
  id: number;
  name: string;
  statusDetail: string | null;
  description: string | null;
  isActive: boolean;
  category: Category;
  status: Status;
  energy: number;
}
