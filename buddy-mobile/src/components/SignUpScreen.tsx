import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { postUserToDecoUsers } from "../api/api"; // Ensure the correct path
import styles from "../styles/signupScreen.style";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [background, setBackground] = useState("");
  const [languages, setLanguages] = useState("");
  const [interests, setInterests] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Prepare the user data
    const userData = {
      name,
      email,
      password,
      background,
      languages,
      interests,
    };

    try {
      console.log("Attempting to sign up user with data:", userData); // Log user data before sending

      // Post user data to the backend
      const response = await postUserToDecoUsers(userData);
      console.log("Server response after signing up:", response); // Log server response

      // Navigate to the MainTabs screen upon successful sign-up
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      );
    } catch (error) {
      console.error("Sign-up failed. Error details:", error); // Log error details
      alert("Sign-up failed. Please try again. Error: " + error.message); // Display specific error to user
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subTitle}>Setup your account below</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Background"
        value={background}
        onChangeText={setBackground}
        autoCapitalize="words"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Languages Spoken"
        value={languages}
        onChangeText={setLanguages}
        autoCapitalize="words"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Interests"
        value={interests}
        onChangeText={setInterests}
        autoCapitalize="words"
        placeholderTextColor="#A9A9A9"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
