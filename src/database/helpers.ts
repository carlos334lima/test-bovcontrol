import realm from "./realm";

export const saveChecklistOffline = (
  checklist: any,
  operationType = "create"
) => {
  realm.write(() => {
    realm.create("Checklist", { ...checklist, isSynced: false, operationType });
  });
};

export const getUnsyncedChecklists = () => {
  return realm.objects("Checklist").filtered("isSynced == false");
};

export const markChecklistAsSynced = (id: string) => {
  const checklist = realm.objectForPrimaryKey("Checklist", id);
  if (checklist) {
    realm.write(() => {
      checklist.isSynced = true;
    });
  }
};

export const clearAllChecklists = () => {
  realm.write(() => {
    const allChecklists = realm.objects("Checklist");
    realm.delete(allChecklists);
  });
};
