import { Text } from "react-native";
import { Colors } from "@/utils/Colors";
import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <Text
      style={{
        fontFamily: "inter-bold",
        fontSize: 40,
        color: Colors.violet[950],
      }}>
      {children}
    </Text>
  );
}
