import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-navigation/elements";
import { Link, router } from "expo-router";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const submit = async () => {
    const { name, email, password } = form;
    if (!form.name || !form.email || !form.password)
      return Alert.alert("Error", "Please enter valid email address");

    setIsSubmitting(true);
    try {
      //appwrite sign in function
      await createUser({ email, password, name, });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Fullname"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Fullname"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry
      />
      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account
        </Text>
        <Link href="/SignIn" className="base-bold text-primary">
          SignIn
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
