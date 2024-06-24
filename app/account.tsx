import { StyleSheet, Text, View, Alert } from "react-native";
import Button from "@/components/Button";
import { Colors } from "@/utils/Colors";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";

import { db, FIREBASE_AUTH } from "@/firebaseConfig";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

export default function Account() {
  const authContext = useContext(AuthContext);

  function handleDelete() {
    Alert.alert(
      "Warning",
      "By deleting your account, your data will be lost forever. Are you sure?",
      [
        {
          text: "Yes, delete account",
          style: "destructive",
          onPress: terminate,
        },
        {
          text: "Cancel",
          style: "default",
        },
      ]
    );
  }

  async function terminate() {
    const userRef = doc(db, `users/${authContext.token}`);
    await deleteUser(FIREBASE_AUTH.currentUser);
    await deleteDoc(userRef);
    await logout();
  }

  async function logout() {
    await signOut(FIREBASE_AUTH);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
    });
    authContext.logout();
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
      }}>
      <View
        style={{
          gap: 10,
        }}>
        <View style={styles.boxContainer}>
          <Text style={styles.headingText}>Username</Text>
          <Text style={styles.fieldText}>{authContext.user?.userName}</Text>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.headingText}>Email</Text>
          <Text style={styles.fieldText}>{authContext.user?.email}</Text>
        </View>
      </View>

      <View
        style={{
          gap: 20,
        }}>
        <Button
          onPress={logout}
          style={{
            backgroundColor: Colors.violet[700],
          }}>
          Logout
        </Button>

        <Button
          onPress={handleDelete}
          style={{
            backgroundColor: Colors.rose[700],
          }}
          android_ripple={{
            color: Colors.rose[950],
            borderless: true,
          }}>
          Delete Account
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.violet[200],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 5,
  },
  headingText: {
    fontSize: 12,
    fontFamily: "inter-bold",
    color: Colors.violet[950],
  },
  fieldText: {
    fontSize: 16,
    fontFamily: "inter-medium",
  },
});
