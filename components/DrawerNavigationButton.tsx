import { ReactNode } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Colors } from "@/utils/Colors";
import { useContext } from "react";
import { AddContext } from "@/contexts/AddContextProvider";
import * as Icons from "@/utils/icons";
import { WalletItem } from "@/utils/types";

interface WalletButtonProps {
  item: WalletItem;
}

export function WalletButton({ item }: WalletButtonProps) {
  const addContext = useContext(AddContext);

  return (
    <View>
      <Link push href="/dashboard/transactions" asChild>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 15,
            gap: 20,
            backgroundColor:
              addContext.currentWallet !== null &&
              addContext.currentWallet.name === item.name
                ? Colors.violet[200]
                : "transparent",
          }}
          android_ripple={{
            color: Colors.violet[200],
          }}
          onPress={() => {
            console.log("New Wallet: ", item.name);
            addContext.setWallet(item);
          }}>
          <Image
            source={Icons[item.icon].icon}
            style={{
              width: 45,
              height: 45,
            }}
          />

          <View>
            <Text
              style={{
                fontFamily: "inter-semibold",
                fontSize: 14,
                color: Colors.slate[800],
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                fontFamily: "inter-regular",
                fontSize: 12,
                color: Colors.slate[500],
              }}>
              Rp {String(item.initialAmount)}
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

interface WalletSettingsItem {
  title: String;
  icon: ReactNode;
  path: ExpoRouter.Href;
}

interface WalletSettingsButtonProps {
  item: WalletSettingsItem;
}

export function WalletSettingsButton({ item }: WalletSettingsButtonProps) {
  return (
    <View>
      <Link push href={item.path} asChild>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 15,
            gap: 20,
          }}
          android_ripple={{
            color: Colors.violet[300],
          }}>
          {item.icon}

          <View>
            <Text
              style={{
                fontFamily: "inter-semibold",
                fontSize: 14,
                color: Colors.slate[800],
              }}>
              {item.title}
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

interface NavigationButtonProps {
  item: WalletSettingsItem;
}

export function NavigationButton({ item }: NavigationButtonProps) {
  const addContext = useContext(AddContext);

  return (
    <View>
      <Link href={item.path} asChild>
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 15,
            alignItems: "center",
            gap: 20,
          }}
          android_ripple={{
            color: Colors.violet[200],
            borderless: false,
          }}
          onPress={() => addContext.changePath(String(item.path))}>
          {item.icon}
          <Text
            style={{
              fontFamily: "inter-semibold",
              fontSize: 14,
              color: Colors.slate[800],
            }}>
            {item.title}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
