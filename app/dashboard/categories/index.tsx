import CategoryList from "@/components/CategoryList";
import { CategoryItem } from "@/utils/types";
import { useState, useEffect } from "react";
import { View } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
const categoryCollection = collection(db, "categories");

export default function Incomes() {
  const [incomeList, setIncomeList] = useState<null | CategoryItem[]>(null);

  useEffect(() => {
    async function fetchIncomes() {
      const data = await getDocs(categoryCollection);
      const list: CategoryItem[] = [];

      data.forEach((item) => {
        const itemData = item.data();
        if (itemData.type === "Income") {
          list.push({
            name: itemData.name,
            iconName: itemData.iconName,
            type: itemData.type,
          });
        }
      });

      setIncomeList(list);
    }

    fetchIncomes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {incomeList && <CategoryList list={incomeList} />}
    </View>
  );
}
