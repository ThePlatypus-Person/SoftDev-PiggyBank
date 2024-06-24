import {
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/utils/Colors";
import * as Icons from "@/utils/icons";

interface SelectIconModalProps {
  isVisible: boolean;
  close: () => void;
  setIcon: (name: String) => void;
}

export default function SelectIconModal({
  isVisible,
  close,
  setIcon,
}: SelectIconModalProps) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Select Icon</Text>
          <Pressable
            android_ripple={{
              borderless: true,
              foreground: true,
            }}
            onPress={close}>
            <Feather name="x" size={40} color={Colors.violet[950]} />
          </Pressable>
        </View>

        {/* Icons */}

        <ScrollView>
          <View style={styles.iconListContainer}>
            {Icons &&
              Object.keys(Icons).map((item) => (
                <Pressable key={item} onPress={() => setIcon(item)}>
                  <Image
                    source={Icons[item].icon}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Pressable>
              ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.violet[100],
    flex: 1,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: "inter-semibold",
    fontSize: 40,
    color: Colors.violet[950],
  },
  iconListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 40,
  },
});
