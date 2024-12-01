import React, { useState } from "react";
import { Alert } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import NetInfo from "@react-native-community/netinfo";
import { useDefaultPutAPI } from "../../services/api";
import realm from "../../database/realm"; // Instância do Realm
import {
  Container,
  DetailContainer,
  Label,
  Input,
  SaveButton,
  SaveButtonText,
} from "./styles";
import { ICheckListItem } from "../../interfaces";
import { saveChecklistOffline } from "../../database/helpers";
import { generateId } from "../../utils";

type RouteParams = {
  CheckListDetails: {
    checklist: ICheckListItem;
  };
};

const CheckListDetails = () => {
  const route = useRoute<RouteProp<RouteParams, "CheckListDetails">>();
  const { goBack } = useNavigation();
  const { checklist } = route.params;

  const [farmCity, setFarmCity] = useState(checklist?.farmer?.city);
  const [farmerName, setFarmerName] = useState(checklist?.farmer?.name);
  const [supervisorName, setSupervisorName] = useState(checklist?.from?.name);
  const [milkProduced, setMilkProduced] = useState(
    checklist?.amount_of_milk_produced?.toString()
  );
  const [cowsHead, setCowsHead] = useState(
    checklist?.number_of_cows_head?.toString()
  );

  const handleUpdate = async () => {

    const payload = {
      _id: String(checklist._id),
      type: checklist.type,
      amount_of_milk_produced: parseInt(milkProduced, 10),
      number_of_cows_head: parseInt(cowsHead, 10),
      had_supervision: checklist.had_supervision,
      farmer: {
        name: farmerName,
        city: farmCity,
      },
      from: {
        name: supervisorName,
      },
      to: checklist.to,
      location: checklist.location,
      updated_at: new Date().toISOString(),
      created_at: checklist.created_at,
    };

    const netInfo = await NetInfo.fetch();
    
    if (netInfo.isConnected) {
      // On
      const url = `http://challenge-front-end.bovcontrol.com/v1/checkList/${checklist._id}`;
      try {
        const response = await useDefaultPutAPI(url, payload);
        if (response.status === 200) {
          Alert.alert("Sucesso", "Checklist atualizado com sucesso!", [
            {
              text: "OK",
              onPress: () => goBack(),
            },
          ]);
        } else {
          Alert.alert("Erro", `Falha ao atualizar: ${response.statusText}`);
        }
      } catch (error) {
        Alert.alert("Erro", "Erro ao atualizar o checklist.");
      }
    } else {
      // Offline
      try {
        saveChecklistOffline(payload, "update");
        Alert.alert("Offline", "Checklist salvo localmente para sincronização.");
      } catch (error) {
        Alert.alert("Erro", "Falha ao salvar checklist localmente.");
      }
    }
  };

  return (
    <Container>
      <Label>Nome do Fazendeiro</Label>
      <Input
        value={farmerName}
        onChangeText={setFarmerName}
        placeholder="Digite o nome"
      />

      <Label>Cidade da Fazenda</Label>
      <Input
        value={farmCity}
        onChangeText={setFarmCity}
        placeholder="Digite a cidade"
      />

      <Label>Nome do Supervisor</Label>
      <Input
        value={supervisorName}
        onChangeText={setSupervisorName}
        placeholder="Digite o nome do supervisor"
      />

      <Label>Quantidade de Leite Produzido (mês)</Label>
      <Input
        value={milkProduced}
        onChangeText={setMilkProduced}
        keyboardType="numeric"
        placeholder="Digite a quantidade"
      />

      <Label>Quantidade de Cabeças de Gado</Label>
      <Input
        value={cowsHead}
        onChangeText={setCowsHead}
        keyboardType="numeric"
        placeholder="Digite a quantidade"
      />

      <DetailContainer>
        <Label>Supervisão Realizada:</Label>
        <Label>{checklist.had_supervision ? "Sim" : "Não"}</Label>
      </DetailContainer>

      <DetailContainer>
        <Label>Data de Criação:</Label>
        <Label>{new Date(checklist.created_at).toLocaleDateString()}</Label>
      </DetailContainer>

      <DetailContainer>
        <Label>Data de Atualização:</Label>
        <Label>{new Date(checklist.updated_at).toLocaleDateString()}</Label>
      </DetailContainer>

      <DetailContainer>
        <Label>Latitude</Label>
        <Label>{checklist.location.latitude.toFixed(6)}</Label>
        <Label>Longitude</Label>
        <Label>{checklist.location.longitude.toFixed(6)}</Label>
      </DetailContainer>

      <SaveButton onPress={handleUpdate}>
        <SaveButtonText>Atualizar Checklist</SaveButtonText>
      </SaveButton>
    </Container>
  );
};

export { CheckListDetails };
