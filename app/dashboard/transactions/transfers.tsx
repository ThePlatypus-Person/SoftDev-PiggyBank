import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { transfers, transferIcon } from "@/utils/dummy";
import { Colors } from "@/utils/Colors";
import dayjs, { Dayjs } from 'dayjs';

import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/firebaseConfig";
const categoryCollection = collection(db, 'categories');

export default function Transfers() {
    return (
    <FlatList
      data={transfers}
      renderItem={(data) => (
        <View>
          <Pressable
            style={styles.pressableContainer}
            android_ripple={{
                color: Colors.violet[100],
            }}
            >
                { transferIcon }

            <View
              style={styles.dataContainer}>
                <Text style={{
                    fontFamily: 'inter-semibold',
                    fontSize: 14,
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
                >{data.item.from} -> {data.item.to} </Text>
              <Text style={styles.nameText}>{data.item.name}</Text>
            </View>

            <View
              style={styles.amountContainer}>
              <Text style={styles.amountText} 
                ellipsizeMode="tail"
                numberOfLines={1}
              >Rp {data.item.amount}</Text>
              <Text style={styles.timeText}>{dayjs(data.item.timestamp).format("D MMM YYYY")}</Text>
            </View>
          </Pressable>
        </View>
      )}
    />
    )

}

const styles = StyleSheet.create({
    pressableContainer: {
              flexDirection: "row",
              flex: 1,
              paddingVertical: 15,
              paddingHorizontal: 20,
            },
            dataContainer: {
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: "auto",
                width: '50%',
                overflow: 'hidden',
              },
              nameText: {
                fontFamily: 'inter-regular',
                fontSize: 13,
                color: Colors.slate[600],
              },
              amountContainer: {
                justifyContent: "space-between",
                width: '30%',
              },
              amountText: {
                fontFamily: 'inter-semibold',
                fontSize: 14,
                textAlign: 'right',
              },
              timeText: {
                fontFamily: 'inter-regular',
                fontSize: 13,
                color: Colors.slate[600],
                textAlign: 'right',
              },
});
