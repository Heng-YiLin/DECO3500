import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import styles from "./signinScreen.style";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here (e.g., API call)

    // Reset navigation and switch to MainTabs after login
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      })
    );
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Sign in to {"\n"}your account</Text>
    <Text style={styles.subTitle}>Sign in or create your account</Text>
    <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    <View style={styles.body}>
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <Text style={styles.bottomText}>Don’t have an account? Register</Text>
    </View>

  </View>
  );
}
