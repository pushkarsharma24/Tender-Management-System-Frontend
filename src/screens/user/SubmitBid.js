import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SubmitBid = ({ route, navigation }) => {
  const { tenderId } = route.params;
  const [companyName, setCompanyName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitBid = async () => {
    if (!companyName || !bidAmount) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.13:5000/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenderId,
          companyName,
          bidAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Bid Submitted Successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to submit bid");
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        

        <View style={styles.header}>
          <Text style={styles.title}>Submit Your Bid</Text>
          <Text style={styles.subtitle}>Enter your company details below</Text>
        </View>

       
        <View style={styles.infoContainer}>
        <Text style={{ fontSize: 28, color: "#fff"}}>📄</Text>
          <Text style={styles.tenderText}>Tender ID: {tenderId}</Text>
        </View>

        
        <TextInput
          label="Company Name"
          mode="outlined"
          value={companyName}
          onChangeText={setCompanyName}
          style={styles.input}
          left={<TextInput.Icon name="office-building" />}
        />

        <TextInput
          label="Bid Amount "
          mode="outlined"
          value={bidAmount}
          onChangeText={setBidAmount}
          keyboardType="numeric"
          style={styles.input}
          left={<TextInput.Icon name="currency-usd" />}
        />

        
        <TouchableOpacity style={styles.fab} onPress={handleSubmitBid}>
          <LinearGradient colors={["#ff6f61", "#ff4f4f"]} style={styles.buttonGradient}>
          <Text style={{ fontSize: 24, color: "#fff", marginRight: 8 }}>✅</Text>
            <Text style={styles.buttonText}>Submit Bid</Text>
          </LinearGradient>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  tenderText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  fab: {
    width: "100%",
    marginTop: 20,
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

export default SubmitBid;
