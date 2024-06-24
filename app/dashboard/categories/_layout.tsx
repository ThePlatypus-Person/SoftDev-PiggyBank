import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { Colors } from "@/utils/Colors";
import { useState, useEffect } from "react";
import Expenses from "./expenses";
import Incomes from ".";
import System from "./system";

import { CategoryItem } from "@/utils/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const categoryCollection = collection(db, "categories");

const Tab = createMaterialTopTabNavigator();

export default function TransactionLayout() {
  const [categoryList, setCategoryList] = useState<null | CategoryItem[]>(null);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getDocs(categoryCollection);
      const list: CategoryItem[] = [];
      data.forEach((item) => {
        const itemData = item.data();
        return {
          name: itemData.name,
          iconName: itemData.iconName,
          type: itemData.type,
        };
      });

      setCategoryList(list);
    }

    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "inter-semibold",
            fontSize: 15,
            textTransform: "capitalize",
            color: "#fff",
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.violet[300],
            height: 2,
          },
          tabBarAndroidRipple: {
            borderless: false,
          },
          tabBarStyle: {
            backgroundColor: Colors.violet[700],
            elevation: 5,
          },
        }}>
        <Tab.Screen
          name="index"
          component={Incomes}
          options={{
            title: "Incomes",
          }}
        />
        <Tab.Screen name="Expenses" component={Expenses} />
        <Tab.Screen name="System" component={System} />
      </Tab.Navigator>
    </View>
  );
}
