import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment"; 

const ManageBids = ({ route, navigation }) => {
  const { tenderId } = route.params;
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBids = async () => {
    try {
      const response = await fetch(`http://192.168.1.13:5000/api/bids/${tenderId}`); 
      const data = await response.json();
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
    const unsubscribe = navigation.addListener("focus", fetchBids);
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bids for Tender #{tenderId}</Text>
          <Text style={styles.subtitle}>Review submitted bids below</Text>
        </View>

        {bids.length === 0 ? (
          <Text style={styles.noBidsText}>No bids available for this tender.</Text>
        ) : (
          <FlatList
            data={bids}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const formattedTime = moment(item.bidTime).format("hh:mm A");
              return (
                <View style={styles.bidCard}>
                  <View style={styles.bidDetails}>
                    <Text style={styles.companyName}>{item.companyName}</Text>
                    <Text style={styles.bidAmount}>${item.bidAmount}</Text>
                    <Text style={styles.bidTime}>Bid Time: {formattedTime}</Text>
                    {item.isLast5Minutes && (
                      <Text style={styles.lastMinuteWarning}>🚨 Last 5 Minutes Bid!</Text>
                    )}
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
        <LinearGradient colors={["#ff6f61", "#ff4f4f"]} style={styles.buttonGradient}>
        <Text style={{ fontSize: 24, color: "#fff", marginRight: 8 }}>⬅️</Text>
          <Text style={styles.buttonText}>Go Back</Text>
        </LinearGradient>
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
    flex: 1,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
  },
  noBidsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 30,
  },
  bidCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bidDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
  bidTime: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  lastMinuteWarning: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
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
    marginLeft: 10,
  },
});

export default ManageBids;
