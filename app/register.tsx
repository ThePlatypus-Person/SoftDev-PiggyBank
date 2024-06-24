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

import { FIREBASE_AUTH } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function RegisterScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  function togglePasswordVisible() {
    setIsPasswordVisible((prev) => !prev);
  }

  function toggleConfirmPasswordVisible() {
    setIsConfirmPasswordVisible((prev) => !prev);
  }

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authContext = useContext(AuthContext);

  async function handleRegister() {
    if (password !== confirmPassword) {
      Alert.alert("Failed to Register", "Password does not match.", [
        { text: "Try Again", style: "default" },
      ]);
      return;
    }

    console.log("userName:", userName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirm password:", confirmPassword);

    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      if (response) {
        const user = response.user;
        authContext.authenticate(user.uid);

        const newUserRef = doc(db, `users/${user.uid}`);
        const data = {
          uid: user.uid,
          userName: userName,
          email: email,
        };
        await setDoc(newUserRef, data, { merge: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Title>Register</Title>
        <Description>
          Make an account to store all your wallets and financial data.
        </Description>
      </View>

      <Input>
        <TextInput
          placeholderTextColor={Colors.slate[500]}
          placeholder="Username"
          cursorColor={Colors.rose[600]}
          style={{ flex: 1 }}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </Input>

      <Input>
        <TextInput
          placeholderTextColor={Colors.slate[500]}
          inputMode="email"
          placeholder="Email"
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

      <Input>
        <TextInput
          placeholderTextColor={Colors.slate[500]}
          placeholder="Confirm Password"
          cursorColor={Colors.rose[600]}
          secureTextEntry={!isConfirmPasswordVisible}
          style={{ flex: 1 }}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {isConfirmPasswordVisible ? (
          <Feather
            name="eye-off"
            size={24}
            onPress={toggleConfirmPasswordVisible}
          />
        ) : (
          <Feather
            name="eye"
            size={24}
            onPress={toggleConfirmPasswordVisible}
          />
        )}
      </Input>

      <View style={{ gap: 10 }}>
        <Button
          onPress={handleRegister}
          style={{
            backgroundColor: Colors.violet[500],
          }}>
          Register
        </Button>

        <Description>
          Already have an account?{" "}
          <Link href="/login">
            <Text style={{ fontFamily: "inter-extrabold" }}>Login.</Text>
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
