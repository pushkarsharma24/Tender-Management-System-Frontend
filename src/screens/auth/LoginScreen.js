import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const scaleAnim = new Animated.Value(1);

  

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.13:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setUser({ username, role: data.role });
        navigation.navigate(data.role === "admin" ? "RoleSelectionScreen" : "ViewTenders");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };
  

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Welcome Back" titleStyle={styles.title} />
          <Card.Content>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
              label="Username"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableWithoutFeedback onPress={handleLogin}>
              <Animated.View style={[styles.animatedButton, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient colors={["#ff6f61", "#ff4f4f"]} style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  animatedButton: {
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
