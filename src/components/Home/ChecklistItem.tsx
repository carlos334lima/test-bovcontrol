import React from "react";

import { ICheckListItem } from "../../interfaces";
import { ItemContainer, ItemText } from "../../screens/Home/styles";

interface IRenderItem {
  item: ICheckListItem;
  onPress: () => void;
}

export const ChecklistItem = React.memo(({ item, onPress }: IRenderItem) => (
  <ItemContainer onPress={onPress}>
    <ItemText>Fazendeiro: {item.farmer.name}</ItemText>
    <ItemText>Fazenda: {item.farmer.city}</ItemText>
    <ItemText>Cidade: {item.farmer.city}</ItemText>
    <ItemText>
      Data de criação: {new Date(item.created_at).toLocaleDateString()}
    </ItemText>
  </ItemContainer>
));
