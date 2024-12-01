import React, { useEffect, useState, useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { ChecklistItem } from "../../components/Home/ChecklistItem";

import { toast } from "../../utils/toast";
import { COLORS } from "../../utils/colors";
import { ICheckListItem } from "../../interfaces";
import { Container, CreateButton, EmptyText } from "./styles";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {
  url_get_checklist,
  useDefaultGetAPI,
} from "../../services/api";

import realm from "../../database/realm"; 
import { syncChecklists } from "../../database/sync"; 

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  const [checklists, setChecklists] = useState<ICheckListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getChecklist = useCallback(async () => {
    setLoading(true);
    try {
      const response = await useDefaultGetAPI(url_get_checklist);

      const sortedChecklists = response?.data.sort(
        (a: ICheckListItem, b: ICheckListItem) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );

      setChecklists(sortedChecklists);
    } catch (error) {
      toast.failedCustom("Erro ao buscar informações!");
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAndSyncOfflineChecklists = useCallback(async () => {
    try {
      const unsyncedChecklists = realm
        .objects("Checklist")
        .filtered("isSynced == false");

      if (unsyncedChecklists.length > 0) {
        toast.sucessCustom("Sincronizando checklists offline...");

        // Sincronize cada checklist
        await syncChecklists();

        // Atualize a lista após a sincronização
        getChecklist();
      }
    } catch (error) {
      toast.failedCustom("Erro ao sincronizar checklists offline!");
    }
  }, [getChecklist]);

  useEffect(() => {
    // Verifique checklists offline ao carregar a tela
    checkAndSyncOfflineChecklists();

    // Carregue os checklists da API
    getChecklist();
  }, [checkAndSyncOfflineChecklists, getChecklist]);

  const handleOpenDetails = (item: ICheckListItem) => {
    navigate("ChecklistDetails", { checklist: item });
  };

  return (
    <Container>
      <CreateButton
        title="Criar Checklist"
        onPress={() => {
          navigate("CreateChecklist");
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.COLOR_PRIMARY} />
      ) : (
        <FlatList
          data={checklists}
          renderItem={({ item }) => (
            <ChecklistItem
              item={item}
              onPress={() => handleOpenDetails(item)}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={
            <EmptyText>Nenhum checklist encontrado.</EmptyText>
          }
          contentContainerStyle={
            checklists.length === 0 ? { flex: 1 } : undefined
          }
        />
      )}
    </Container>
  );
};

export { Home };
