import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AdminDashboard = ({ navigation }) => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tenders from the backend API
  const fetchTenders = async () => {
    try {
      const response = await fetch("http://192.168.1.13:5000/api/tenders");
      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTenders);
    return unsubscribe;
  }, [navigation]);


  return (
    <LinearGradient colors={["#192f6a", "#3b5998", "#4c669f"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage your tenders and bids</Text>
        </View>

        {/* Dashboard Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
          <Text style={{ fontSize: 32, color: "#fff" }}>📄</Text>
            <Text style={styles.statNumber}>{tenders.length}</Text>
            <Text style={styles.statLabel}>Total Tenders</Text> 
          </View>
          <View style={styles.statBox}>
          <Text style={{ fontSize: 32, color: "#fff"}}>👥</Text>
            <Text style={styles.statNumber}>{tenders.reduce((sum, item) => sum + item.bids, 0)}</Text>
            <Text style={styles.statLabel}>Total Bids</Text>
          </View>
        </View>

        {/* Tenders List */}
        <FlatList
          data={tenders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tenderCard}>
              <View style={styles.tenderDetails}>
                <Text style={styles.tenderTitle}>{item.name}</Text>
                <Text style={styles.tenderBids}>{item.bids} Bids Received</Text>
                <Text style={[styles.status, item.status === "Open" ? styles.openStatus : styles.closedStatus]}>
                  {item.status}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.viewBidsButton}
                onPress={() => navigation.navigate("ManageBids", { tenderId: item.id })}
              >
                <Text style={styles.viewBidsText}>View Bids</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("CreateTender")}>
      <Text style={{ fontSize: 28, color: "#fff"}}>➕</Text>

      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container: {
    paddingTop: 50,
    paddingBottom: 80, 
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "48%",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#ddd",
  },
  tenderCard: {
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
  tenderDetails: {
    flex: 1,
  },
  tenderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tenderBids: {
    fontSize: 14,
    color: "gray",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  openStatus: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  closedStatus: {
    backgroundColor: "#D32F2F",
    color: "#fff",
  },
  viewBidsButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  viewBidsText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#ff6f61",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    
  },
});

export default AdminDashboard;
