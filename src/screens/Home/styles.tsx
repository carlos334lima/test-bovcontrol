import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ItemContainer = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

export const ItemText = styled.Text`
  font-size: 16px;
`;

export const CreateButton = styled.Button`
  margin-bottom: 20px;
`;

export const EmptyText = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #333;
`;
