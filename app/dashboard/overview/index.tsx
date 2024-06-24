import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import dayjs from "dayjs";
import { overview } from "@/utils/dummy";
import { Colors } from "@/utils/Colors";

export default function Overview() {
  return (
    <FlatList
      data={overview}
      renderItem={(data) => (
        <View>
          <Pressable
            style={styles.itemPressable}
            android_ripple={{
              color: Colors.violet[100],
            }}>
            <Text
              style={styles.dateText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              1 - {dayjs(data.item.lastDay).format("D MMMM")}{" "}
            </Text>

            <Text
              style={{
                fontFamily: "inter-regular",
                fontSize: 15,
                color:
                  Number(data.item.amount) > 0
                    ? Colors.green[700]
                    : Number(data.item.amount) === 0
                    ? "#000"
                    : Colors.rose[700],
              }}
              ellipsizeMode="tail"
              numberOfLines={1}>
              Rp {data.item.amount}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  dateText: {
    fontFamily: "inter-medium",
    fontSize: 15,
  },
});
