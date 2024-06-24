import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { Colors } from "@/utils/Colors";
import Transactions from "./transactions/_layout";
import Categories from "./categories/_layout";
import Overview from "./overview/index";
import Account from "../account";
import AddButton from "@/components/AddButton";

import SearchButton from "@/components/SearchButton";
import CustomDrawer from "@/components/CustomDrawer";
import { useEffect, useContext, useState } from "react";
import { AddContext } from "@/contexts/AddContextProvider";

const Drawer = createDrawerNavigator();
const allowAdd = ["/dashboard/transactions", "/dashboard/categories"];

export default function DashboardLayout() {
  const [showAdd, setShowAdd] = useState<Boolean>(false);
  const [addType, setAddType] = useState<String | null>(null);
  const addContext = useContext(AddContext);

  useEffect(() => {
    const path = String(addContext.currentPath);
    addContext.changePath(path);

    if (allowAdd.includes(path)) {
      addContext.show();
    } else {
      addContext.hide();
    }

    setShowAdd(addContext.isShown);
  }, [addContext.isShown]);

  return (
    <View style={{ flex: 1 }}>
      {showAdd && <AddButton path="/addTransaction" />}
      <Drawer.Navigator
        drawerContent={CustomDrawer}
        initialRouteName="transactions"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.violet[700],
            borderEndColor: Colors.violet[700],
            elevation: 0,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "#fff",
        }}>
        <Drawer.Screen
          name="transactions"
          component={Transactions}
          options={{
            headerRight: SearchButton,
            title: "Transactions",
          }}
        />
        <Drawer.Screen
          name="categories"
          component={Categories}
          options={{
            headerRight: SearchButton,
            title: "Categories",
          }}
        />
        <Drawer.Screen
          name="overview"
          component={Overview}
          options={{
            headerRight: SearchButton,
            title: "Overview",
          }}
        />
        <Drawer.Screen
          name="account"
          component={Account}
          options={{
            title: "Account",
          }}
        />
      </Drawer.Navigator>
    </View>
  );
}
