import { ReactNode } from "react";
import { Text } from "react-native";
import { Colors } from "@/utils/Colors";

interface DescriptionProps {
  children: ReactNode;
}

export default function Description({ children }: DescriptionProps) {
  return (
    <Text
      style={{
        fontFamily: "inter-semibold",
        fontSize: 12,
        color: Colors.violet[950],
      }}>
      {children}
    </Text>
  );
}
