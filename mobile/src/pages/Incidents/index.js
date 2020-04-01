import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

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

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

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

    const response = await api.get("/incidents", {
      params: { page },
    });

    console.tron.log("resposta: ", response);
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers.count);
    console.tron.log(total);

    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <Container>
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
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.5}
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
