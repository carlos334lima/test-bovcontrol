import realm from "./realm";
import NetInfo from "@react-native-community/netinfo";

import { generateId } from "../utils";
import { useDefaultPostAPI, useDefaultPutAPI } from "../services/api";
import { ICheckListItem } from "../interfaces";

export const syncChecklists = async () => {
  const unsyncedChecklists: ICheckListItem[] = realm
    .objects("Checklist")
    .filtered("isSynced == false");

  for (const checklist of unsyncedChecklists) {
    try {
      const isUpdate = checklist.operationType == "update";

      const url = isUpdate
        ? `http://challenge-front-end.bovcontrol.com/v1/checkList/${checklist._id}`
        : "http://challenge-front-end.bovcontrol.com/v1/checkList";

      const checklistData = isUpdate
        ? {
            type: checklist.type,
            amount_of_milk_produced: checklist.amount_of_milk_produced,
            number_of_cows_head: checklist.number_of_cows_head,
            had_supervision: checklist.had_supervision,
            farmer: {
              name: checklist?.farmer?.name,
              city: checklist?.farmer?.city,
            },
            from: { name: checklist.from.name },
            to: { name: checklist.to.name },
            location: {
              latitude: checklist.location.latitude,
              longitude: checklist.location.longitude,
            },
            updated_at: new Date().toISOString(),
            created_at: checklist.created_at,
          }
        : {
            _id: generateId(),
            type: checklist.type,
            amount_of_milk_produced: checklist.amount_of_milk_produced,
            number_of_cows_head: checklist.number_of_cows_head,
            had_supervision: checklist.had_supervision,
            farmer: {
              name: checklist.farmer.name,
              city: checklist.farmer.city,
            },
            from: { name: checklist.from.name },
            to: { name: checklist.to.name },
            location: {
              latitude: checklist.location.latitude,
              longitude: checklist.location.longitude,
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

      const payload = { checklists: [checklistData] };

      const response = isUpdate
        ? await useDefaultPutAPI(url, checklistData)
        : await useDefaultPostAPI(url, payload);

      if (response.status === 200 || response.status === 201) {
        realm.write(() => {
          realm.delete(checklist);
        });
      } else {
        console.error("Erro na sincronização:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao sincronizar checklist:", error);
    }
  }
};

export const monitorConnection = () => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      syncChecklists();
    }
  });
};
