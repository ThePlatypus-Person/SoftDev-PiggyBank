import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { WalletItem, User } from "@/utils/types";
import * as Icons from "@/utils/icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const walletCollection = collection(db, "wallets");
const userCollection = collection(db, "users");

export default function Leaderboard() {
  const [walletList, setWalletList] = useState<null | WalletItem[]>(null);
  const [userList, setUserList] = useState<null | User[]>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await getDocs(walletCollection);
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

        setWalletList(list);
      }

      async function fetchUsers() {
        const data = await getDocs(userCollection);
        const list: User[] = [];

        data.forEach((item) => {
          const itemData = item.data();
          list.push({
            email: String(itemData.email),
            userName: String(itemData.userName),
            uid: String(itemData.uid),
          });
        });

        setUserList(list);
      }

      fetchData();
      fetchUsers();
    }, [])
  );

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.walletList}>
          {walletList &&
            walletList
              .sort((a, b) => +b.initialAmount - +a.initialAmount)
              .map((item, index) => (
                <View key={index} style={styles.walletItem}>
                  <Image
                    source={Icons[item.icon].icon}
                    style={styles.walletImage}
                  />

                  <View>
                    <Text style={styles.walletNameText}>{item.name}</Text>

                    {userList && (
                      <Text style={styles.ownerText}>
                        Owned by{" "}
                        {
                          userList.find((user) => user.uid === item.ownerId)
                            ?.userName
                        }
                      </Text>
                    )}

                    <Text style={styles.currencyText}>
                      Rp {String(item.initialAmount)}
                    </Text>
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
  },
  walletList: {
    gap: 15,
  },
  walletItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  walletImage: {
    width: 60,
    height: 60,
  },
  walletNameText: {
    fontFamily: "inter-bold",
    fontSize: 20,
  },
  ownerText: {
    fontFamily: "inter-light",
    fontSize: 12,
  },
  currencyText: {
    fontFamily: "inter-medium",
    fontSize: 16,
  },
});
