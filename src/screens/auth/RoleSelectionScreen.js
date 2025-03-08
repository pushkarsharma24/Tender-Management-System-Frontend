import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../../context/AuthContext";


const RoleSelectionScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const fadeAnim = new Animated.Value(0); 

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        
        
        <Text style={styles.title}>Welcome, {user.username}!</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        
        <TouchableOpacity style={styles.roleButton} onPress={() => navigation.navigate("AdminDashboard")}>
          <LinearGradient colors={["#ff6f61", "#ff4f4f"]} style={styles.buttonGradient}>
          <Text style={{ fontSize: 24, color: "#fff", marginRight: 8 }}>🛡️</Text>
            <Text style={styles.buttonText}>Proceed as Admin</Text>
          </LinearGradient>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.roleButton} onPress={() => navigation.navigate("ViewTenders")}>
          <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.buttonGradient}>
          <Text style={{ fontSize: 24, color: "#fff", marginRight: 8 }}>👤</Text>
            <Text style={styles.buttonText}>Proceed as User</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 30,
  },
  roleButton: {
    width: "100%",
    marginVertical: 10,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 30,
    
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default RoleSelectionScreen;
