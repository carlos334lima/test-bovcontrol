import React, { useState } from "react";
import { Alert, Modal, TouchableOpacity, FlatList } from "react-native";

import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

import { toast } from "../../utils/toast";
import { saveChecklistOffline } from "../../database/helpers"; // Função para salvar no Realm
import { useDefaultPostAPI } from "../../services/api";
import {
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
  CloseButton,
  CloseButtonText,
  Container,
  Input,
  ModalContainer,
  ModalContent,
  ModalItem,
  ModalItemText,
  SubmitButton,
} from "./styles";
import { generateId } from "../../utils";

const CreateCheckList = () => {
  const { goBack } = useNavigation();

  const [city, setCity] = useState("");
  const [type, setType] = useState("BPA");
  const [cowsHead, setCowsHead] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [milkProduced, setMilkProduced] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const [hadSupervision, setHadSupervision] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleTypeSelect = (selectedType: string) => {
    setType(selectedType);
    setModalVisible(false);
  };



  const handleSubmit = async () => {
    if (
      !farmerName ||
      !farmName ||
      !city ||
      !supervisorName ||
      !milkProduced ||
      !cowsHead
    ) {
      toast.failedCustom("Por favor, preencha todos os campos.");
      return;
    }

    const checklistData = {
      _id: generateId(),
      type: type,
      amount_of_milk_produced: parseInt(milkProduced, 10),
      number_of_cows_head: parseInt(cowsHead, 10),
      had_supervision: hadSupervision,
      farmer: {
        name: farmName,
        city: city,
      },
      from: {
        name: farmerName,
      },
      to: {
        name: supervisorName,
      },
      location: {
        latitude: -23.5,
        longitude: -46.6,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const payload = { checklists: [checklistData] };

    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      //on
       try {
        const result = await useDefaultPostAPI(
          "http://challenge-front-end.bovcontrol.com/v1/checkList",
          payload
        );
        if (result.status === 200) {
          Alert.alert(
            "Sucesso",
            "Checklist cadastrado com sucesso!",
            [
              {
                text: "OK",
                onPress: () => goBack(),
              },
            ]
          );
          clearForm();
        } else {
          throw new Error("Falha ao cadastrar checklist.");
        }
      } catch (error) {
        toast.failedCustom("Erro ao cadastrar o checklist!");
      } 
    } else {
      //offline
      try {
        saveChecklistOffline(checklistData, "create");
        Alert.alert(
          "Offline",
          "Checklist salvo localmente. Será sincronizado quando estiver online.",
          [
            {
              text: "OK",
              onPress: () => goBack(),
            },
          ]
        );
        clearForm();
      } catch (error) {
        toast.failedCustom("Erro ao salvar checklist offline!");
      } 
    }
  };

  const clearForm = () => {
    setFarmerName("");
    setFarmName("");
    setCity("");
    setSupervisorName("");
    setType("BPA");
    setMilkProduced("");
    setCowsHead("");
    setHadSupervision(false);
  };

  return (
    <Container>
      <Input
        placeholder="Nome do Fazendeiro"
        value={farmerName}
        onChangeText={setFarmerName}
      />
      <Input
        placeholder="Nome da Fazenda"
        value={farmName}
        onChangeText={setFarmName}
      />
      <Input
        placeholder="Cidade da Fazenda"
        value={city}
        onChangeText={setCity}
      />
      <Input
        placeholder="Nome do Supervisor"
        value={supervisorName}
        onChangeText={setSupervisorName}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          placeholder="Tipo de Checklist"
          value={type}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <ModalContainer>
          <ModalContent>
            <FlatList
              data={["BPA", "Antibiótico", "BPF"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <ModalItem onPress={() => handleTypeSelect(item)}>
                  <ModalItemText>{item}</ModalItemText>
                </ModalItem>
              )}
            />
            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseButtonText>Cancelar</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Input
        placeholder="Quantidade de Leite Produzido"
        value={milkProduced}
        onChangeText={setMilkProduced}
        keyboardType="numeric"
      />
      <Input
        placeholder="Número de Cabeças de Gado"
        value={cowsHead}
        onChangeText={setCowsHead}
        keyboardType="numeric"
      />
      <CheckboxContainer>
        <Checkbox value={hadSupervision} onValueChange={setHadSupervision} />
        <CheckboxLabel>Teve Supervisão?</CheckboxLabel>
      </CheckboxContainer>
      <SubmitButton title="Cadastrar Checklist" onPress={handleSubmit} />
    </Container>
  );
};

export { CreateCheckList };
