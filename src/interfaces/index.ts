export interface ICheckListItem {
  __v: number;
  _id: number;
  operationType?: string;
  amount_of_milk_produced: string;
  created_at: string;
  farmer: {
    city: string;
    name: string;
  };
  from: {
    name: string;
  };
  had_supervision: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  number_of_cows_head: string;
  to: {
    name: string;
  };
  type: string;
  updated_at: string;
}
