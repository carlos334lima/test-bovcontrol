import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 16px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

export const ModalItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

export const ModalItemText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 15px;
  align-items: center;
  background-color: #ff5555;
  border-radius: 5px;
  margin-top: 10px;
`;

export const CloseButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Checkbox = styled.Switch`
  margin-right: 10px;
`;

export const CheckboxLabel = styled.Text`
  font-size: 16px;
`;

export const SubmitButton = styled.Button`
  margin-top: 20px;
`;