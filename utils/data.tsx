import { Feather } from "@expo/vector-icons";
import { Colors } from "./Colors";

export const navigations = [
  {
    title: "Transactions",
    icon: <Feather name="shopping-cart" size={24} color={Colors.slate[400]} />,
    path: '/dashboard/transactions',
  },
  {
    title: "Categories",
    icon: <Feather name="grid" size={24} color={Colors.slate[400]} />,
    path: '/dashboard/categories',
  },
  {
    title: "Overview",
    icon: <Feather name="pie-chart" size={24} color={Colors.slate[400]} />,
    path: '/dashboard/overview',
  },
  {
    title: "Account",
    icon: <Feather name="user" size={24} color={Colors.slate[400]} />,
    path: '/account',
  },
  {
    title: "Leaderboard",
    icon: <Feather name="award" size={24} color={Colors.slate[400]} />,
    path: '/leaderboard',
  },
];


export const walletSettings = [{
    title: 'New Wallet',
    icon: <Feather name='plus' size={24} color={Colors.slate[500]}/>,
    path: 'addWallet',
}, {
    title: 'Manage Wallets',
    icon: <Feather name='settings' size={24} color={Colors.slate[500]}/>,
    path: 'login',
}];
