import { useFocusEffect } from "expo-router";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { Colors } from "@/utils/Colors";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { AddContext } from "@/contexts/AddContextProvider";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { CategoryItem } from "@/utils/types";
import * as Icons from "@/utils/icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const transactionsCollection = collection(db, "transactions");
const categoryCollection = collection(db, "categories");

import { useState, useCallback } from "react";
import { TransactionItem, WalletItem } from "@/utils/types";

export default function Transactions() {
  const addContext = useContext(AddContext);
  const authContext = useContext(AuthContext);
  const [wallet, setWallet] = useState<WalletItem | null>(
    addContext.currentWallet
  );
  const [transactionList, setTransactionList] = useState<
    null | TransactionItem[]
  >(null);
  const [transactions, setTransactions] = useState<null | TransactionItem[]>(
    null
  );
  const [categoryList, setCategoryList] = useState<null | CategoryItem[]>(null);

  useFocusEffect(
    useCallback(() => {
      addContext.show();
      async function fetchData() {
        const data = await getDocs(transactionsCollection);
        const list: TransactionItem[] = [];

        data.forEach((item) => {
          const itemData = item.data();
          list.push({
            wallet: String(itemData.wallet),
            name: String(itemData.desc),
            amount: String(itemData.amount),
            category: String(itemData.category),
            timestamp: Number(itemData.date),
            ownerId: String(itemData.ownerId),
          });
        });

        setTransactions(list);

        console.log("UseFocusEffect:");
        if (addContext.currentWallet && transactions !== null) {
        }
      }

      async function fetchCategories() {
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

      fetchCategories();
      fetchData();
    }, [])
  );

  useEffect(() => {
    console.log("useEffect: ");
    console.log("Wallet:", addContext.currentWallet);

    if (addContext.currentWallet !== null && transactions !== null) {
      const newList = transactions.filter(
        (item) => item.wallet === addContext.currentWallet.name
      );
      console.log(newList);

      setTransactionList(newList);
    }
  }, [addContext.currentWallet]);

  return (
    <FlatList
      data={transactionList}
      renderItem={(data) => (
        <View>
          <Pressable
            style={styles.pressableContainer}
            android_ripple={{
              color: Colors.violet[100],
            }}
            onPress={() => router.push("/transaction")}>
            {categoryList &&
              categoryList.find((item) => item.name === data.item.category) && (
                <Image
                  source={
                    Icons[
                      categoryList.find(
                        (item) => item.name === data.item.category
                      ).iconName
                    ].icon
                  }
                  style={styles.imageSize}
                />
              )}

            {/*
             */}

            <View style={styles.itemContainer}>
              <Text
                style={styles.categoryText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {data.item.category}
              </Text>
              <Text
                style={styles.nameText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {data.item.name}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <Text
                style={styles.amountText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Rp {data.item.amount}
              </Text>
              <Text style={styles.timestampText}>
                {dayjs(data.item.timestamp).format("D MMM YYYY")}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  imageSize: {
    width: 45,
    height: 45,
  },
  itemContainer: {
    justifyContent: "center",
    marginLeft: 10,
    marginRight: "auto",
    overflow: "hidden",
  },
  categoryText: {
    fontFamily: "inter-semibold",
    fontSize: 14,
  },
  nameText: {
    fontFamily: "inter-regular",
    fontSize: 13,
    color: Colors.slate[600],
  },
  amountContainer: {
    justifyContent: "space-between",
    width: "30%",
  },
  amountText: {
    fontFamily: "inter-semibold",
    fontSize: 14,
    textAlign: "right",
  },
  timestampText: {
    fontFamily: "inter-regular",
    fontSize: 13,
    color: Colors.slate[600],
    textAlign: "right",
  },
});
