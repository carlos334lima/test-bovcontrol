import Realm from "realm";

export const ChecklistSchema: Realm.ObjectSchema = {
  name: "Checklist",
  primaryKey: "_id",
  properties: {
    _id: "string",
    type: "string",
    amount_of_milk_produced: "int",
    number_of_cows_head: "int",
    had_supervision: "bool",
    farmer: "Farmer",
    from: "Person",
    to: "Person",
    location: "Location",
    created_at: "date",
    updated_at: "date",
    isSynced: "bool",
    operationType: "string",
  },
};
