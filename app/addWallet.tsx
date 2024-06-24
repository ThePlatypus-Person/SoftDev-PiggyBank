import {
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Colors } from "@/utils/Colors";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { AddContext } from "@/contexts/AddContextProvider";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/Button";
import { router } from "expo-router";
import * as Icons from "@/utils/icons";
import SelectIconModal from "@/components/SelectIconModal";
import { WalletItem } from "@/utils/types";

import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const walletsCollection = collection(db, "wallets");

export default function AddWallet() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const addContext = useContext(AddContext);

  const [walletName, setWalletName] = useState("");
  const [iconName, setIconName] = useState<null | string>(null);
  const [initialAmount, setInitialAmount] = useState<Number>(0);
  const [currency, setCurrency] = useState("Rp");

  async function handleAddWallet() {
    try {
      const newWallet: WalletItem = {
        name: walletName,
        icon: iconName,
        initialAmount: initialAmount,
        currency: currency,
        ownerId: authContext.user?.uid,
      };
      const res = await addDoc(walletsCollection, newWallet);
      console.log(res);

      addContext.setWallet(newWallet);
    } catch (err) {
      console.log(err);
    } finally {
      router.back();
    }
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function setIcon(name: String) {
    setIconName(name);
    console.log(name);
    closeModal();
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.priceContainer}>
        <View style={styles.iconContainer}>
          <Pressable
            style={styles.iconPressable}
            onPress={() => setIsModalVisible(true)}
            android_ripple={{
              color: Colors.slate[500],
              borderless: true,
            }}>
            {iconName ? (
              <Image source={Icons[iconName].icon} style={styles.iconImage} />
            ) : (
              <Feather name="copy" color="#fff" size={20} />
            )}
          </Pressable>
        </View>

        <TextInput
          style={styles.walletInput}
          inputMode="text"
          cursorColor={Colors.rose[600]}
          autoFocus
          value={walletName}
          onChangeText={(text) => setWalletName(text)}
        />
      </View>

      <SelectIconModal
        isVisible={isModalVisible}
        close={closeModal}
        setIcon={setIcon}
      />

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.currencyContainer}>
          <Text style={styles.labelText}>Currency</Text>

          <View style={styles.currencyInputContainer}>
            <Feather name="dollar-sign" size={24} color={Colors.slate[500]} />
            <Text style={styles.currencyInputText}>Rupiah (Rp)</Text>
          </View>
        </View>

        <View style={styles.currencyContainer}>
          <Text style={styles.labelText}>Initial Amount</Text>

          <View style={styles.currencyInputContainer}>
            <Feather name="clipboard" size={24} color={Colors.slate[500]} />
            <TextInput
              placeholderTextColor={Colors.slate[500]}
              inputMode="numeric"
              placeholder="0"
              cursorColor={Colors.rose[600]}
              style={styles.currencyInputText}
              onChangeText={(text) => setInitialAmount(+text)}
            />
          </View>
        </View>

        <Button
          style={{
            backgroundColor: Colors.violet[500],
          }}
          onPress={handleAddWallet}>
          Add Wallet
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
    fontSize: 26,
    fontFamily: "inter-medium",
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  iconPressable: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  iconImage: {
    width: 45,
    height: 45,
  },
  walletInput: {
    flex: 1,
    fontSize: 20,
    fontFamily: "inter-semibold",
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: Colors.slate[300],
  },
  currencyContainer: {
    height: 60,
  },
  labelText: {
    marginLeft: 35,
    fontFamily: "inter-regular",
    fontSize: 10,
    marginBottom: -10,
    color: Colors.slate[800],
  },
  currencyInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currencyInputText: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "#000",
    flex: 1,
    fontSize: 18,
    fontFamily: "inter-medium",
  },
});
