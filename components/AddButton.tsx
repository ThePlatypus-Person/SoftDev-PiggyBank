import { StyleSheet, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/utils/Colors";
import { Feather } from "@expo/vector-icons";

interface AddButtonProps {
    path: String
}

export default function AddButton({ path }: AddButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Link push href={`${path}`} asChild>
        <Pressable
          android_ripple={{
            color: Colors.rose[700],
            borderless: true,
          }}>
          <Feather name="plus" size={34} color="#fff" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    backgroundColor: Colors.rose[500],
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 100,
    zIndex: 100,
    bottom: 20,
    right: 20,
    elevation: 10,
  },
});
