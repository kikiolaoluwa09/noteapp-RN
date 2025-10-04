import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { Redirect, Slot } from "expo-router";
import { images } from "@/Constants";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {

  const {isAuthenticated}= useAuthStore()
  if(isAuthenticated)return <Redirect href='/'/>

  const topHeight = Dimensions.get("screen").height / 2.25;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="bg-gray-800"
      >
        {/* TOP IMAGE AREA */}
        <View style={{ height: topHeight }} className="w-full relative">
          <ImageBackground
            source={images.loginGraphic}
            resizeMode="cover"
            className="w-full h-full"
            imageStyle={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
          />

          {/* logo circle overlapping bottom center of image */}
          {/* <Image
            source={images.logo}
            className="w-24 h-24 rounded-full absolute self-center bottom-[-48px] z-10 shadow-lg"
            accessible
            accessibilityLabel="App logo"
          /> */}
        </View>

      
        <View className="flex-1 bg-white rounded-t-3xl -mt-12 shadow-lg">
          <View className="px-6 pt-6 pb-12">
            {/* optional small subtitle to match screenshot (remove if your Slot already supplies it) */}

            <Slot />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
