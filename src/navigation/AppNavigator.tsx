import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { CreateCheckList } from "../screens/CreateCheckList";
import { CheckListDetails } from "../screens/CheckListDetails";

export type RootStackParamList = {
  Home: undefined;
  ChecklistDetails: { checklistId: string };
  CreateChecklist: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: "Checklists" }}
    />
    <Stack.Screen
      name="ChecklistDetails"
      component={CheckListDetails}
      options={{ title: "Detalhes do Checklist" }}
    />
    <Stack.Screen
      name="CreateChecklist"
      component={CreateCheckList}
      options={{ title: "Criar Checklist" }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
