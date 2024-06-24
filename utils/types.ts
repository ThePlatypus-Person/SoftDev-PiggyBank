import { ReactNode } from "react";

export interface TransactionItem {
    name: String;
    category: String;
    timestamp: number;
    wallet: String;
    amount: String;
    ownerId: String | undefined;
}

export interface TransferItem {
    name: String;
    from: String;
    to: String;
    amount: String;
    timestamp: number;
    category: String;
}

export interface CategoryItem {
    name: String;
    iconName: String;
    type: 'Income' | 'Expense' | 'System';
}

export interface WalletItem {
    name: string;
    icon: string | null;
    initialAmount: Number;
    currency: string;
    ownerId: String | undefined;
}

export interface User {
    email: String;
    uid: String;
    userName: String;
}
