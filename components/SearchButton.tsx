import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/utils/Colors";

export default function SearchButton() {
  return (
    <View
      style={{
        marginRight: 20,
        padding: 3,
        borderRadius: 100,
      }}>
      <Pressable
        android_ripple={{
          color: Colors.violet[950],
          foreground: true,
          borderless: true,
        }}>
        <Feather name="search" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}
