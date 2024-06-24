import { FlatList } from "react-native";
import { CategoryItem } from "@/utils/types";
import CategoryObject from "./CategoryItem";

interface CategoryListProps {
  list: CategoryItem[];
}

export default function CategoryList({ list }: CategoryListProps) {
  return (
    <FlatList
      data={list}
      renderItem={(data) => <CategoryObject data={data.item} />}
    />
  );
}
