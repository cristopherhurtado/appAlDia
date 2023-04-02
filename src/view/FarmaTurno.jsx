import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Divider, Card } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Search from '../component/Search';
import dataTurno from '../js/Apis';

export default function FarmaTurno() {
  const [farma, setFarma] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dataTurno(setFarma, setIsLoading);
  }, []);

  const filteredFarma = farma.filter(item => item.comuna_nombre.toLowerCase().includes(searchQuery.toLowerCase()));
  

  return (
    <View style={styles.container}>
      <Divider />
      <Text style={styles.titulo}>Farmacias de Turno</Text>
      <Search onChangeText={setSearchQuery} value={searchQuery} />
      <Divider />
      {searchQuery !== "" ? (
        <ScrollView style={styles.scroll}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
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
      padding: 5,
    },
    titulo: {
        fontSize: 45,
        textAlign: 'center',
        margin: 0,
        fontWeight: 'bold',
        color: 'green',
    },
    card: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },
    farma: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    img: {
        width: 60, 
        height: 60, 
        marginTop: '40%', 
        marginRight: 25, 
        marginLeft: 25,
    },
    scroll: {
        backgroundColor: 'white',
    },
  });

