import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import FarmaTurno from "./src/view/FarmaTurno";

export default function App() {
  return (
    <View style={styles.container}>
      <FarmaTurno />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
