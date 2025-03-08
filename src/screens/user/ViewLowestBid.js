import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ViewLowestBid = ({ route, navigation }) => {
  const { tenderId } = route.params; 
  const [lowestBid, setLowestBid] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLowestBid = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.1.13:5000/api/bids/${tenderId}`);
      const bids = await response.json();

      if (bids.length > 0) {
        const lowest = bids.reduce((prev, curr) => (prev.bidAmount < curr.bidAmount ? prev : curr));
        setLowestBid(lowest);
      } else {
        setLowestBid(null);
      }
    } catch (error) {
      console.error("Error fetching lowest bid:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowestBid();
    const unsubscribe = navigation.addListener("focus", fetchLowestBid);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Lowest Bid</Text>
      <Text style={styles.subtitle}>Tender ID: {tenderId}</Text>

      {lowestBid ? (
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: lowestBid.logo }} style={styles.logo} />
          </View>
          <Text style={styles.companyName}>{lowestBid.company}</Text>
          <Text style={styles.bidAmount}>${lowestBid.bidAmount}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>No bids found for this Tender.</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#0C0C35", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20 },

  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 5 },

  subtitle: { 
    fontSize: 16, 
    color: "#aaa", 
    marginBottom: 20 },

  card: { 
    width: "90%", 
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    marginBottom: 20 },

  logoContainer: { 
    width: 60, 
    height: 60, 
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
    borderRadius: 30, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 10 },

  logo: { 
    width: 40, 
    height: 40 },

  companyName: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#fff" },

  bidAmount: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#FFD700", 
    marginTop: 5 },

  noData: { 
    fontSize: 18, 
    color: "#FF6B6B", 
    marginBottom: 20 },

  buttonContainer: { 
    flexDirection: "row", 
    gap: 15 },

  primaryButton: { 
    backgroundColor: "#28A745", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 30 },

  secondaryButton: { 
    backgroundColor: "#DC3545", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 30 },

  buttonText: { 
    fontSize: 18, 
    color: "#fff", 
    fontWeight: "600" },

  backButton: { 
    marginTop: 30, 
    paddingVertical: 10, 
    paddingHorizontal: 50 },

  backButtonText: { 
    fontSize: 18, 
    color: "#FFD700", 
    fontWeight: "600" },
    
});

export default ViewLowestBid;
