import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { Card, ActivityIndicator, Button } from "react-native-paper";
import { ScrollView } from "react-native";
import Search from "../component/Search";
import dataTurno from "../js/Apis";

export default function FarmaTurno() {
  const [farma, setFarma] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dataTurno(setFarma, setIsLoading);
  }, []);

  const filteredFarma = farma.filter((item) =>
    item.comuna_nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMapApp = (latitude, longitude) => {
    const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Farmacias de Turno</Text>
        <Search onChangeText={setSearchQuery} value={searchQuery} />
      </View>
      {searchQuery !== "" ? (
        <ScrollView style={styles.scroll}>
          {isLoading ? (
            <ActivityIndicator size="large" color="green" animating={true} />
          ) : filteredFarma.length > 0 ? (
            filteredFarma.map((item, index) => (
              <Card key={index} style={styles.card}>
                <View style={{ flexDirection: "row", maxWidth: "80%" }}>
                  <View tyle={{ flex: 1 }}>
                    <Image
                      source={require("../img/farma.png")}
                      style={styles.img}
                    />
                  </View>
                  <View tyle={{ flex: 1 }}>
                    <Text style={styles.farma}>{item.local_nombre}</Text>
                    <Text>Comuna: {item.comuna_nombre}</Text>
                    <Text>Direccion: {item.local_direccion}</Text>
                    <Text>Telefono: {item.local_telefono}</Text>
                    <Text>
                      Horario Apertura: {item.funcionamiento_hora_apertura}
                    </Text>
                    <Text>
                      Horario Cierre: {item.funcionamiento_hora_cierre}
                    </Text>
                    <Text>Funcionamiento Dia: {item.funcionamiento_dia}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <View tyle={{ flex: 1 }}>
                        <Button
                          icon="phone"
                          mode="contoured"
                          onPress={() => makePhoneCall(item.local_telefono)}
                          style={styles.button}
                        >
                          Llamar
                        </Button>
                      </View>
                      <View tyle={{ flex: 1 }}>
                        <Button
                          icon="map-marker"
                          mode="contoured"
                          onPress={() =>
                            openMapApp(item.local_lat, item.local_lng)
                          }
                          style={styles.button}
                        >
                          Cómo llegar
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Text>No se encontraron datos.</Text>
          )}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 45,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    flexDirection: "row",
    margin: 5,
    padding: 10,
  },
  farma: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: '#5B2C6F',
  },
  img: {
    width: 60,
    height: 60,
    marginTop: "30%",
    marginRight: 25,
    marginLeft: 25,
  },
  cabecera: {
    backgroundColor: "green",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scroll: {
    padding: 5,
    backgroundColor: "white",
  },
  button: {
    width: 115,
    margin: 3,
    color: "green",
    backgroundColor: "#FBFCFC",
    borderWidth: 1,
    borderColor: "green",
  },
});
