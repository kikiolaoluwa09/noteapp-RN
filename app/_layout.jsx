import {  useColorScheme } from "react-native";
import { Colors } from "../Constants/Colors";

import { Stack } from "expo-router";
import { StatusBar } from "react-native-web";
import { UserProvider } from "../context/UserContext";
import { BooksProvider } from "../context/BooksContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <UserProvider>
      <BooksProvider>
                <StatusBar value="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
        }}
      >

        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(dashboard)' options={{ headerShown: false }} />
        <Stack.Screen name="index"options={{ title: "Home", headerShown: false }}/>
      </Stack>
      </BooksProvider>

    </UserProvider>
  );
};

export default RootLayout;


