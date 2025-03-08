import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput, Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateTender = ({ navigation }) => {
  const [tenderName, setTenderName] = useState("");
  const [tenderDescription, setTenderDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bufferTime, setBufferTime] = useState("");

  const handleCreateTender = async () => {
    if (!tenderName || !tenderDescription || !startTime || !endTime || !bufferTime) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    const newTender = { tenderName, tenderDescription, startTime, endTime, bufferTime };
  
    try {
      const response = await fetch("http://192.168.1.13:5000/api/tenders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTender),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", "Tender Created Successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error creating tender:", error);
      Alert.alert("Error", "Failed to create tender.");
    }
  };
  
  

  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Create New Tender</Text>
          <Text style={styles.subtitle}>Fill in the details below</Text>
        </View>

        <TextInput
          label="Tender Name"
          mode="outlined"
          value={tenderName}
          onChangeText={setTenderName}
          style={styles.input}
        />
        <TextInput
          label="Description"
          mode="outlined"
          value={tenderDescription}
          onChangeText={setTenderDescription}
          multiline
          style={[styles.input, styles.textArea]}
        />
        <TextInput
          label="Start Time (e.g. 10:00 AM)"
          mode="outlined"
          value={startTime}
          onChangeText={setStartTime}
          style={styles.input}
        />
        <TextInput
          label="End Time (e.g. 5:00 PM)"
          mode="outlined"
          value={endTime}
          onChangeText={setEndTime}
          style={styles.input}
        />
        <TextInput
          label="Buffer Time (minutes)"
          mode="outlined"
          value={bufferTime}
          onChangeText={setBufferTime}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity style={styles.fab} onPress={handleCreateTender}>
          <LinearGradient colors={["#ff6f61", "#ff4f4f"]} style={styles.buttonGradient}>
          <Text style={{ fontSize: 24, color: "#fff", marginRight: 8 }}>✅</Text>
            <Text style={styles.buttonText}>Create Tender</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
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
    paddingTop: 50,
    paddingBottom: 100, 
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
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  textArea: {
    height: 100,
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

export default CreateTender;
