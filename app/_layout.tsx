import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContextProvider, {
  AuthContext,
} from "@/contexts/AuthContextProvider";
import AddContextProvider from "@/contexts/AddContextProvider";
import { Colors } from "@/utils/Colors";

import HomeScreen from "./index";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import AddWallet from "./addWallet";
import Leaderboard from "./leaderboard";
import Dashboard from "./dashboard/_layout";
import Account from "./account";
import AddTransaction from "./addTransaction";

const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "bebas-neue": require("../assets/fonts/BebasNeue-Regular.ttf"),
    "inter-black": require("../assets/fonts/Inter-Black.ttf"),
    "inter-extrabold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "inter-bold": require("../assets/fonts/Inter-Bold.ttf"),
    "inter-semibold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "inter-medium": require("../assets/fonts/Inter-Medium.ttf"),
    "inter-regular": require("../assets/fonts/Inter-Regular.ttf"),
    "inter-light": require("../assets/fonts/Inter-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <AddContextProvider>
        <StatusBar style="auto" />
        <RootScreen />
      </AddContextProvider>
    </AuthContextProvider>
  );
}

function RootScreen() {
  const authContext = useContext(AuthContext);
  console.log(authContext.isAuthenticated);
  console.log(authContext.token);

  return (
    <>
      {authContext.isAuthenticated ? (
        <AuthenticatedStack />
      ) : (
        <UnauthenticatedStack />
      )}
    </>
  );
}

function UnauthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" component={HomeScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.violet[700],
        },
        headerTintColor: "#fff",
      }}>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen
        name="leaderboard"
        options={{
          headerShown: true,
          title: "Wallet Leaderboard",
          headerStyle: {
            backgroundColor: Colors.violet[700],
            borderEndColor: Colors.violet[700],
            elevation: 0,
          },
        }}
        component={Leaderboard}
      />
      <Stack.Screen
        name="addWallet"
        options={{
          headerShown: true,
          title: "New Wallet",
          headerStyle: {
            backgroundColor: Colors.violet[700],
            borderEndColor: Colors.violet[700],
            elevation: 0,
          },
        }}
        component={AddWallet}
      />
      <Stack.Screen
        name="addTransaction"
        options={{
          headerShown: true,
          title: "Add Transaction",
          headerStyle: {
            backgroundColor: Colors.violet[700],
            borderEndColor: Colors.violet[700],
            elevation: 0,
          },
        }}
        component={AddTransaction}
      />
      <Stack.Screen
        name="account"
        options={{
          headerShown: true,
          title: "Account",
        }}
        component={Account}
      />
    </Stack.Navigator>
  );
}
