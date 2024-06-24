import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useState, useContext, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/utils/Colors";
import {
  WalletButton,
  WalletSettingsButton,
  NavigationButton,
} from "./DrawerNavigationButton";
import { navigations, walletSettings } from "@/utils/data";
import { useFocusEffect } from "expo-router";
import { WalletItem } from "@/utils/types";
import { AddContext } from "@/contexts/AddContextProvider";
import * as Icons from "@/utils/icons";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { AuthContext } from "@/contexts/AuthContextProvider";
const walletCollection = collection(db, "wallets");

export default function CustomDrawer() {
  const addContext = useContext(AddContext);
  const authContext = useContext(AuthContext);
  const [wallet, setWallet] = useState<null | WalletItem>(
    addContext.currentWallet
  );
  const [walletList, setWalletList] = useState<null | WalletItem[]>(null);
  const [showWallet, setShowWallet] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const q = query(
          walletCollection,
          where("ownerId", "==", `${authContext.user?.uid}`)
        );
        const data = await getDocs(q);
        const list: WalletItem[] = [];

        data.forEach((item) => {
          const itemData = item.data();
          list.push({
            name: String(itemData.name),
            icon: String(itemData.icon),
            initialAmount: itemData.initialAmount,
            currency: String(itemData.currency),
            ownerId: String(itemData.ownerId),
          });
        });

        console.log("Wallet List (Drawer)");
        console.log(list);
        setWalletList(list);
      }

      fetchData();
    }, [])
  );

  useFocusEffect(() => {
    setWallet(addContext.currentWallet);
  });

  function toggleDropdown() {
    setShowWallet((prev) => !prev);
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.drawerContainer}>
        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <View style={styles.walletContainer}>
            {walletList &&
              (wallet ? (
                <Image
                  source={Icons[wallet.icon].icon}
                  resizeMode="contain"
                  style={styles.walletImage}
                />
              ) : (
                <Image
                  source={Icons[walletList[0].icon].icon}
                  resizeMode="contain"
                  style={styles.walletImage}
                />
              ))}
          </View>
        </View>

        <View>
          <Pressable style={styles.dropdownContainer} onPress={toggleDropdown}>
            <View>
              <Text style={styles.walletText}>
                {walletList && (wallet ? wallet.name : "")}
              </Text>
              <Text style={styles.moneyText}>
                {walletList && (wallet ? wallet.currency : "Rp")}{" "}
                {walletList &&
                  (wallet ? String(wallet?.initialAmount) : String(0))}
              </Text>
            </View>

            {showWallet ? (
              <Entypo name="triangle-down" size={20} color="#fff" />
            ) : (
              <Entypo name="triangle-up" size={20} color="#fff" />
            )}
          </Pressable>
        </View>
      </SafeAreaView>

      <View
        style={{
          gap: 5,
          paddingTop: 5,
        }}>
        {showWallet ? (
          <>
            {walletList &&
              walletList.map((item, index) => (
                <WalletButton key={index} item={item} />
              ))}

            {walletSettings.map((item, index) => (
              <WalletSettingsButton key={index} item={item} />
            ))}
          </>
        ) : (
          navigations.map((item, index) => (
            <NavigationButton key={index} item={item} />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Colors.violet[700],
    height: 170,
    elevation: 4,
    justifyContent: "space-between",
  },
  walletContainer: {
    backgroundColor: Colors.slate[800],
    borderRadius: 100,
    alignSelf: "flex-start",
    elevation: 10,
  },
  walletImage: {
    width: 50,
    height: 50,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  walletText: {
    fontFamily: "inter-semibold",
    fontSize: 14,
    color: "#fff",
  },
  moneyText: {
    fontFamily: "inter-regular",
    fontSize: 14,
    color: "#fff",
  },
});
