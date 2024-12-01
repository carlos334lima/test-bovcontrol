import Toast from "react-native-toast-message";

export const toast = {
  success: () =>
    Toast.show({
      type: "success",
      text1: "Deu tudo certo!",
    }),
  failed: () =>
    Toast.show({
      type: "error",
      text1: "Erro interno! tente novamente mais tarde",
    }),
  failedCustom: (message: string) =>
    Toast.show({
      position: "bottom",
      type: "error",
      text1: `${message}`,
    }),
  sucessCustom: (message: string) =>
    Toast.show({
      position: "bottom",
      type: "success",
      text1: `${message}`,
    }),
};
