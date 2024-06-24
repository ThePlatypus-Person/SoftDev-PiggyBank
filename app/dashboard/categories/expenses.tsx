import CategoryList from "@/components/CategoryList";
import { CategoryItem } from "@/utils/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { View } from "react-native";
const categoryCollection = collection(db, "categories");

export default function Expenses() {
  const [expenseList, setExpenseList] = useState<null | CategoryItem[]>(null);

  useEffect(() => {
    async function fetchExpenses() {
      const data = await getDocs(categoryCollection);
      const list: CategoryItem[] = [];

      data.forEach((item) => {
        const itemData = item.data();
        if (itemData.type === "Expense") {
          list.push({
            name: itemData.name,
            iconName: itemData.iconName,
            type: itemData.type,
          });
        }
      });

      setExpenseList(list);
    }

    fetchExpenses();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {expenseList && <CategoryList list={expenseList} />}
    </View>
  );
}
