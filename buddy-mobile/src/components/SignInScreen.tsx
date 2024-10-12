import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUserEmail } from "../api/api"; // Import the email check API function
import styles from "../styles/signinScreen.style";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Although password doesn't matter
  const [loginFailed, setLoginFailed] = useState(false); // To control modal visibility

  const handleLogin = async () => {
    const user = await checkUserEmail(email); // Check if the email exists
    if (user) {
      // Email exists, store the logged-in user info in AsyncStorage
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

      // Navigate to MainTabs after login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      );
    } else {
      // Email doesn't exist, show login failed modal
      setLoginFailed(true);
    }
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
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.bottomText}>
            Don’t have an account? <Text style={styles.linkText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for login failure */}
      <Modal
        visible={loginFailed}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLoginFailed(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login failed, please try again.</Text>
            <TouchableOpacity onPress={() => setLoginFailed(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
