import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/utils/Colors";
import { ExpoRouter } from "expo-router/types/expo-router";
import { ReactNode } from "react";
import { PressableAndroidRippleConfig } from "react-native";

interface NavButtonProps {
  path: ExpoRouter.Href;
  style: StyleProp<ViewStyle> | undefined | null;
  children: ReactNode;
  android_ripple?: PressableAndroidRippleConfig | null | undefined;
}

export default function NavButton({
  path,
  style,
  children,
  android_ripple,
}: NavButtonProps) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Link href={path} asChild>
        <Pressable
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
      </Link>
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
