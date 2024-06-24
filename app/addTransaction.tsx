import {
  Pressable,
  TextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "@/utils/Colors";
import { useContext, useState } from "react";
import { AddContext } from "@/contexts/AddContextProvider";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import Button from "@/components/Button";
import { router } from "expo-router";
import SelectCategoryModal from "@/components/SelectCategoryModal";

import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "@/contexts/AuthContextProvider";

const transactionsCollection = collection(db, "transactions");

export default function AddTransaction() {
  const addContext = useContext(AddContext);
  const authContext = useContext(AuthContext);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [amount, setAmount] = useState<Number>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [currentDate, setCurrentDate] = useState<number>(Date.now());
  const [wallet, setWallet] = useState<string | undefined>(
    addContext.currentWallet?.name
  );

  async function handleAddTransaction() {
    try {
      const newTransaction = await addDoc(transactionsCollection, {
        wallet: addContext.currentWallet?.name,
        amount: amount,
        desc: description,
        category: category,
        date: currentDate,
        ownerId: authContext.user?.uid,
      });

      console.log(newTransaction);
    } catch (err) {
      console.log(err);
    } finally {
      router.back();
    }
  }

  function closeCategoryModal() {
    setCategoryModalVisible(false);
  }

  function changeCategory(text: string) {
    setCategory(text);
    setCategoryModalVisible(false);
  }

  return (
    <View style={styles.rootContainer}>
      <SelectCategoryModal
        isVisible={categoryModalVisible}
        close={closeCategoryModal}
        setCategory={changeCategory}
      />

      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Rp</Text>

        <TextInput
          placeholderTextColor={Colors.slate[500]}
          inputMode="numeric"
          cursorColor={Colors.rose[600]}
          autoFocus
          style={styles.priceTextInput}
          onChangeText={(text) => setAmount(Number(text))}
        />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.formInputContainer}>
          <Feather name="align-left" size={24} color={Colors.slate[500]} />
          <TextInput
            placeholderTextColor={Colors.slate[500]}
            inputMode="text"
            placeholder="Description"
            cursorColor={Colors.rose[600]}
            style={styles.descInput}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.formInputContainer}>
          <Feather name="calendar" size={24} color={Colors.slate[500]} />
          <Text style={styles.dateText}>
            {dayjs(new Date(currentDate)).format("ddd D MMM YYYY, HH:mm")}
          </Text>
        </View>

        <View style={styles.formInputContainer}>
          <Feather name="grid" size={24} color={Colors.slate[500]} />
          <Pressable
            style={styles.categoryPressable}
            onPress={() => setCategoryModalVisible(true)}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-regular",
              }}>
              {category ? category : "Category"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.formInputContainer}>
          <Feather name="server" size={24} color={Colors.slate[500]} />
          <TextInput
            placeholderTextColor={Colors.slate[500]}
            inputMode="text"
            placeholder="wallet"
            cursorColor={Colors.rose[600]}
            style={styles.walletInput}
            value={wallet}
            onChangeText={(text) => setWallet(text)}
          />
        </View>

        <Button
          style={{
            backgroundColor: Colors.violet[500],
          }}
          onPress={handleAddTransaction}>
          Accept
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    elevation: 0,
  },
  priceContainer: {
    backgroundColor: Colors.violet[700],
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 20,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 26,
    fontFamily: "inter-medium",
    color: "#fff",
  },
  priceTextInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 26,
    fontFamily: "inter-medium",
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
  formInputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  descInput: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#000",
    flex: 1,
    fontSize: 16,
    fontFamily: "inter-regular",
  },
  dateText: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#000",
    flex: 1,
    fontSize: 16,
    fontFamily: "inter-regular",
  },
  categoryPressable: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#000",
    flex: 1,
  },
  walletInput: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#000",
    flex: 1,
    fontSize: 16,
    fontFamily: "inter-regular",
  },
});
