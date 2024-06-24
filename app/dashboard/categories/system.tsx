import CategoryList from "@/components/CategoryList";
import { CategoryItem } from "@/utils/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { View } from "react-native";
const categoryCollection = collection(db, "categories");

export default function System() {
  const [systemList, setSystemList] = useState<null | CategoryItem[]>(null);

  useEffect(() => {
    async function fetchSystems() {
      const data = await getDocs(categoryCollection);
      const list: CategoryItem[] = [];

      data.forEach((item) => {
        const itemData = item.data();
        if (itemData.type === "System") {
          list.push({
            name: itemData.name,
            iconName: itemData.iconName,
            type: itemData.type,
          });
        }
      });

      setSystemList(list);
    }

    fetchSystems();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {systemList && <CategoryList list={systemList} />}
    </View>
  );
}
