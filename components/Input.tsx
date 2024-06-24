import { View } from "react-native";
import { Colors } from "@/utils/Colors";
import { ReactNode } from "react";

interface InputProps {
  children: ReactNode;
}

export default function Input({ children }: InputProps) {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colors.violet[950],
        backgroundColor: Colors.violet[100],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      {children}
    </View>
  );
}
