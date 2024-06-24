import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/utils/Colors";
import { Feather } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { Link } from "expo-router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Title from "@/components/Title";
import Description from "@/components/Description";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { AddContext } from "@/contexts/AddContextProvider";

import { FIREBASE_AUTH } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const userCollection = collection(db, "users");

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisible() {
    setIsPasswordVisible((prev) => !prev);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const addContext = useContext(AddContext);

  async function handleLogin() {
    try {
      const res = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      if (res) {
        const user = res.user;
        const q = query(userCollection, where("uid", "==", `${user.uid}`));
        const request = await getDocs(q);

        console.log("printing user data");
        request.forEach((item) => {
          const data = item.data();

          if (data.uid === user.uid) {
            authContext.setUser({
              uid: data.uid,
              email: data.email,
              userName: data.userName,
            });
          }
        });

        authContext.authenticate(user.uid);
        addContext.changePath("/dashboard/transactions");
        addContext.show();
      }
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Login Failed",
        "Failed to login. Email or Password is invalid.",
        [{ text: "Try Again", style: "destructive" }]
      );
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Title>Login</Title>
        <Description>Login to access all your wallets.</Description>
      </View>

      <Input>
        <TextInput
          placeholderTextColor={Colors.slate[500]}
          inputMode="email"
          placeholder="Email"
          autoComplete="email"
          cursorColor={Colors.rose[600]}
          style={{ flex: 1 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </Input>

      <Input>
        <TextInput
          placeholderTextColor={Colors.slate[500]}
          placeholder="Password"
          cursorColor={Colors.rose[600]}
          secureTextEntry={!isPasswordVisible}
          style={{ flex: 1 }}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {isPasswordVisible ? (
          <Feather name="eye-off" size={24} onPress={togglePasswordVisible} />
        ) : (
          <Feather name="eye" size={24} onPress={togglePasswordVisible} />
        )}
      </Input>

      <View
        style={{
          gap: 10,
        }}>
        <Button
          onPress={handleLogin}
          style={{
            backgroundColor: Colors.violet[500],
          }}>
          Login
        </Button>

        <Description>
          Don't have an account?{" "}
          <Link href="/register">
            <Text style={{ fontFamily: "inter-extrabold" }}>Register.</Text>
          </Link>
        </Description>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.violet[200],
    padding: 25,
    gap: 30,
  },
});
