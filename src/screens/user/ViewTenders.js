import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ViewTenders = ({ navigation }) => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch tenders from backend
  const fetchTenders = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.13:5000/api/tenders"); // Replace with your IP
      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
    const unsubscribe = navigation.addListener("focus", fetchTenders);
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Available Tenders</Text>
          <Text style={styles.subtitle}>Explore and place your bids</Text>
        </View>

        {/* Tenders List */}
        <FlatList
          data={tenders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tenderCard}>
              <View style={styles.tenderDetails}>
                <Text style={styles.tenderTitle}>{item.name}</Text>
                <Text style={styles.tenderDescription}>{item.description}</Text>
                <Text style={styles.tenderTime}>Ends at: {item.endTime}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.bidButton}
                  onPress={() => navigation.navigate("SubmitBid", { tenderId: item.id })}
                >
                  <Text style={styles.buttonText}>Place Bid</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.lowestBidButton}
                  onPress={() => navigation.navigate("ViewLowestBid", { tenderId: item.id })}
                >
                  <Text style={styles.buttonText}>View Lowest Bid</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* Floating Refresh Button */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log("Refresh tenders")}>
      <Text style={{ fontSize: 28, color: "#fff"}}>🔄</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
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
  tenderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tenderDetails: {
    marginBottom: 10,
  },
  tenderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tenderDescription: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  tenderTime: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bidButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  lowestBidButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "grey",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default ViewTenders;
