import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { CategoryItem } from "@/utils/types";
import { Colors } from "@/utils/Colors";
import * as Icons from "@/utils/icons";

interface CategoryObjectProps {
  data: CategoryItem;
}

export default function CategoryObject({ data }: CategoryObjectProps) {
  return (
    <View>
      <Pressable
        style={styles.pressableContainer}
        android_ripple={{
          color: Colors.violet[100],
        }}>
        <View style={styles.iconContainer}>
          <Image
            source={Icons[data.iconName].icon}
            resizeMode="contain"
            style={styles.icon}
          />
        </View>
        <Text
          style={{
            fontFamily: "inter-semibold",
            fontSize: 14,
          }}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {data.name}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: Colors.slate[500],
    borderRadius: 100,
    alignSelf: "flex-start",
    elevation: 10,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
