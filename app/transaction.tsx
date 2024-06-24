import { StyleSheet, Text, View, Alert } from "react-native";
import { router } from "expo-router";
import Button from "@/components/Button";
import { user } from "@/utils/dummy";
import { Colors } from "@/utils/Colors";

export default function Transaction() {
    function handleDelete() {
        Alert.alert(
            'Warning',
            'Are you sure you want to delete this transaction?',
            [{
                text: 'Cancel',
                style: 'default',
            }, {
                text: 'Ok',
                style: 'destructive',
                onPress: () => console.log('deleted'),
            }]
        );
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}>
        <View style={{
          backgroundColor: Colors.violet[700],
          flexDirection: 'row',
          justifyContent: 'space-between',
          elevation: 10,
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'inter-medium',
            fontSize: 30,
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}>Rp</Text>

          <Text style={{
            color: '#fff',
            fontFamily: 'inter-medium',
            fontSize: 30,
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}>8,200</Text>
        </View>

        <Text>1231231232</Text>
    </View>
  );
}