import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Transactions from ".";
import Transfers from "./transfers";
import { View } from "react-native";
import { Colors } from "@/utils/Colors";
import { useContext, useEffect } from "react";
import { AddContext } from "@/contexts/AddContextProvider";

const Tab = createMaterialTopTabNavigator();

export default function TransactionLayout() {
  const addContext = useContext(AddContext);

  useEffect(() => {
    const path = String(addContext.currentPath);
    addContext.changePath(path);
    addContext.show();
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
          component={Transactions}
          options={{
            title: "Transactions",
          }}
        />
        <Tab.Screen name="transfers" component={Transfers} />
      </Tab.Navigator>
    </View>
  );
}
