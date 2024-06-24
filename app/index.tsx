import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import NavButton from "../components/NavButton";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={[Colors.violet[600], Colors.violet[800]]}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <Image
            source={require("../assets/images/icon.png")}
            resizeMode="contain"
            style={styles.largeImage}
          />
          <Text style={styles.largeText}>Piggy Bank</Text>
        </View>

        <NavButton
          path="/login"
          style={{
            backgroundColor: Colors.violet[700],
          }}>
          Let's Get Started
        </NavButton>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  mainContainer: {
    width: "80%",
    backgroundColor: Colors.violet[600],
    height: "60%",
    borderRadius: 20,
    elevation: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  largeImage: {
    width: "100%",
    height: 300,
  },
  largeText: {
    fontFamily: "bebas-neue",
    color: "#fff",
    fontSize: 55,
  },
});
