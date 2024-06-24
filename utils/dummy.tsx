import { View, Image, StyleSheet } from "react-native";
import { TransferItem } from "./types";
import { Colors } from "./Colors";

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: Colors.slate[500],
    padding: 5,
    borderRadius: 100,
    alignSelf: "flex-start",
    elevation: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});


const transfer = require("../assets/images/categories/transfer.png");
export const transferIcon = (
  <View style={styles.iconContainer}>
    <Image source={transfer} resizeMode="contain" style={styles.icon} />
  </View>
);

const credit = require("../assets/images/categories/credit.png");
export const creditIcon = (
  <View style={styles.iconContainer}>
    <Image source={credit} resizeMode="contain" style={styles.icon} />
  </View>
);


export const transfers: TransferItem[] = [
  {
    name: "Money Transfer",
    from: "Wallet Name",
    to: "Bank Account",
    amount: "1,000,000",
    timestamp: Date.now() - 9999,
    category: "transfer",
  },
  {
    name: "Money Transfer",
    from: "Wallet Name",
    to: "Bank Account",
    amount: "100,000,000",
    timestamp: Date.now() - 8888,
    category: "transfer",
  },
  {
    name: "Money Transfer",
    from: "Wallet Name",
    to: "Bank Account",
    amount: "10,000,000",
    timestamp: Date.now() - 7777,
    category: "transfer",
  },
  {
    name: "Money Transfer",
    from: "Wallet Name",
    to: "Bank Account",
    amount: "694,200",
    timestamp: Date.now() - 6666,
    category: "transfer",
  },
];

const date = new Date();
const y = date.getFullYear();
let dateList = [];

for (let i = 1; i <= 12; i++) {
  dateList.push({
    firstDay: new Date(y, i, 1),
    lastDay: new Date(y, i + 1, 0),
    amount: String(Math.floor(Math.random() * 10000)),
  });
}

export const overview = dateList;
