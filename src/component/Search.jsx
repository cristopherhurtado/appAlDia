import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Search(props) {
  return (
    <Searchbar style={styles.search}
      onChangeText={text => props.onChangeText(text.trim().toUpperCase())}
      value={props.value}
      placeholder="Buscar por comuna"
    />
  );
}

const styles = StyleSheet.create({
    search: {
      margin: 5,
    },
    
  });
