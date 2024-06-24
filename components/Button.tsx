import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  PressableAndroidRippleConfig,
} from "react-native";
import { Colors } from "@/utils/Colors";
import { ReactNode } from "react";

interface ButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  style: StyleProp<ViewStyle> | undefined | null;
  children: ReactNode;
  android_ripple?: PressableAndroidRippleConfig | null | undefined;
}

export default function Button({
  onPress,
  style,
  children,
  android_ripple,
}: ButtonProps) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={
          android_ripple
            ? android_ripple
            : {
                color: Colors.violet[900],
                borderless: true,
              }
        }>
        <Text
          style={{
            fontFamily: "inter-black",
            color: "#fff",
            paddingVertical: 15,
            paddingHorizontal: 60,
            textAlign: "center",
          }}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.violet[600],
    borderRadius: 15,
    elevation: 4,
  },
});
