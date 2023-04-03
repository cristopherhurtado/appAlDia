import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import diacritic from 'diacritic';

export default function Search(props) {
  const handleTextChange = (text) => {
    const trimmedText = text.trim().toUpperCase();
    const textWithoutAccents = diacritic.clean(trimmedText);
    props.onChangeText(textWithoutAccents);
  };

  return (
    <Searchbar
      style={styles.search}
      onChangeText={handleTextChange}
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

