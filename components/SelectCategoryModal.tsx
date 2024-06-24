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
import { useState, useEffect } from "react";
import { CategoryItem } from "@/utils/types";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const categoryCollection = collection(db, "categories");

interface SelectCategoryModalProps {
  isVisible: boolean;
  close: () => void;
  setCategory: (name: string) => void;
}

export default function SelectCategoryModal({
  isVisible,
  close,
  setCategory,
}: SelectCategoryModalProps) {
  const [categoryList, setCategoryList] = useState<null | CategoryItem[]>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getDocs(categoryCollection);
      const list: CategoryItem[] = [];

      data.forEach((item) => {
        const itemData = item.data();
        if (itemData.type !== "System") {
          list.push({
            name: itemData.name,
            iconName: itemData.iconName,
            type: itemData.type,
          });
        }
      });

      setCategoryList(list);
    }

    fetchData();
  }, []);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View
        style={{
          backgroundColor: Colors.violet[100],
          flex: 1,
          paddingTop: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontFamily: "inter-semibold",
              fontSize: 30,
              color: Colors.violet[950],
            }}>
            Select Category
          </Text>
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
          <View
            style={{
              paddingBottom: 40,
            }}>
            <Text
              style={{
                fontFamily: "inter-semibold",
                fontSize: 20,
                marginLeft: 20,
              }}>
              Income
            </Text>
            {categoryList &&
              categoryList
                .filter((item) => item.type === "Income")
                .map((item, index) => (
                  <CategoryObject
                    key={index}
                    data={item}
                    setCategory={setCategory}
                  />
                ))}
          </View>

          <View
            style={{
              paddingBottom: 40,
            }}>
            <Text
              style={{
                fontFamily: "inter-semibold",
                fontSize: 20,
                marginLeft: 20,
              }}>
              Expense
            </Text>
            {categoryList &&
              categoryList
                .filter((item) => item.type === "Expense")
                .map((item, index) => (
                  <CategoryObject
                    key={index}
                    data={item}
                    setCategory={setCategory}
                  />
                ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

interface CategoryObjectProps {
  data: CategoryItem;
  setCategory: (text: string) => void;
}

function CategoryObject({ data, setCategory }: CategoryObjectProps) {
  return (
    <View>
      <Pressable
        style={styles.pressableContainer}
        android_ripple={{
          color: Colors.violet[300],
        }}
        onPress={() => setCategory(`${data.name}`)}>
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
