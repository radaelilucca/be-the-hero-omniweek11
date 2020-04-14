import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import * as loadingAnimationData from "../../assets/loadingAnimation.json";

import {
  Container,
  Header,
  Logo,
  HeaderText,
  CaseCount,
  WelcomeText,
  IntroductionText,
  IncidentsList,
  Incident,
  OngProperty,
  PropertyValue,
  DetailsButton,
  DetailsText,
  DetailsIcon,
} from "./styles";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import Welcome from "../../components/Welcome";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [modalVisible, setModalVisible] = useState(true);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("incidents", {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers.count);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  // welcome modal
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 4500);
  }, []);

  return (
    <Container>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <Welcome />
      </Modal>
      <Header>
        <Logo source={logo} />
        <HeaderText>
          Total de <CaseCount>{total} Casos</CaseCount>.
        </HeaderText>
      </Header>
      <WelcomeText>Bem-vindo!</WelcomeText>
      <IntroductionText>
        Escolha um dos casos abaixo e salve o dia.
      </IntroductionText>
      <IncidentsList
        data={incidents}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <Incident>
            <OngProperty>ONG:</OngProperty>
            <PropertyValue>{incident.ong.name}</PropertyValue>
            <OngProperty>CASO:</OngProperty>
            <PropertyValue>{incident.title}</PropertyValue>
            <OngProperty>VALOR</OngProperty>
            <PropertyValue>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.amount)}
            </PropertyValue>
            <DetailsButton
              onPress={() => {
                navigateToDetail(incident);
              }}
            >
              <DetailsText>Ver mais detalhes</DetailsText>
              <DetailsIcon>
                <Feather name="arrow-right" size={20} color="#e02041" />
              </DetailsIcon>
            </DetailsButton>
          </Incident>
        )}
      ></IncidentsList>
    </Container>
  );
}
