import Realm from "realm";

import { FarmerSchema } from "./schemas/FarmerSchema";
import { PersonSchema } from "./schemas/PersonSchema";
import { LocationSchema } from "./schemas/LocationSchema";
import { ChecklistSchema } from "./schemas/ChecklistSchema";

const realm = new Realm({
  schema: [ChecklistSchema, FarmerSchema, LocationSchema, PersonSchema],
  schemaVersion: 2,
});

export default realm;
