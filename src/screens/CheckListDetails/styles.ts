import styled from "styled-components/native";
import { COLORS } from "../../utils/colors";

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.COLOR_PRIMARY};
  margin-bottom: 20px;
`;

export const DetailContainer = styled.View`
  margin-bottom: 15px;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})`
  flex: 1;
  padding: 20px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  border: 1px solid ${COLORS.COLOR_BLACK};
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${COLORS.COLOR_PRIMARY};
  border-radius: 8px;
  padding: 15px;
  align-items: center;
`;

export const SaveButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
