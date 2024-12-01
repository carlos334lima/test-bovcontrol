import React from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";

import { COLORS } from "./src/utils/colors";
import AppNavigator from "./src/navigation/AppNavigator";
import ToastMessage from "./src/components/ToastMessage";

export default function App() {
  return (
    <NavigationContainer
      fallback={
        <>
          <ActivityIndicator color={COLORS.COLOR_PRIMARY} size="large" />
        </>
      }
    >
      <AppNavigator />
      <Toast config={ToastMessage} />
    </NavigationContainer>
  );
}
