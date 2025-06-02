import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getProfile, getTransaction } from "@/api/Data";
import { deleteToken } from "@/api/storage";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export default function Home() {
  const { data: profile } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });

  const { data: transaction } = useQuery({
    queryKey: ["Transaction"],
    queryFn: getTransaction,
  });

  const transactions = transaction?.data || [];
  const balance = profile?.data.balance;
  const username = profile?.data.username;
  const userImage = profile?.data.image;

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Simple function to filter transactions
  const getFilteredTransactions = () => {
    let filtered = transactions;

    // Filter by type
    if (filterType === "All") {
      filtered;
    } else if (filterType !== "All") {
      filtered = filtered.filter(
        (txn: any) => txn.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchText === "") {
      filtered;
    } else if (searchText !== "") {
      filtered = filtered.filter(
        (txn: any) =>
          txn.createdAt.slice(0, 10).includes(searchText) ||
          txn.amount.toString().includes(searchText)
      );
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const handleLogout = async () => {
    try {
      await deleteToken();
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
      }}
    >
      {/* Welcome Message */}

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "",
          gap: 20,
        }}
      >
        <View>
          <Image
            source={{ uri: userImage }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 3,
              borderColor: "#0070c9",
              marginBottom: 12,
            }}
          />
          {/* <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#0a3f77",
            marginTop: -10,
            marginBottom: 10,
          }}
        >
          {username}
        </Text> */}
        </View>
        <View style={{ marginTop: 7 }}>
          <Image
            source={require("@/assets/images/newNahb.png")}
            style={{
              width: 220,
              height: 80,

              borderColor: "#0070c9",
            }}
          />
        </View>
      </View>

      {/* Main Horizontal Layout */}
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Left Section */}
        <View style={{ flex: 2, paddingRight: 15 }}>
          {/* Balance Card */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 15,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#666", marginBottom: 5 }}>
              Your Balance
            </Text>
            <Text
              style={{
                fontSize: 36,
                color: "#0a3f77",
                fontWeight: "bold",
              }}
            >
              ${balance}
            </Text>
          </View>

          {/* Search Bar */}
          <TextInput
            placeholder="Search by date (2024-01-15) or amount (100)..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            style={{
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
              backgroundColor: "#ffffff",
              color: "#0a3f77",
            }}
          />

          {/* Filter Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            {["All", "Transfer", "Withdraw", "Deposit"].map((filter) => (
              <TouchableOpacity
                onPress={() => setFilterType(filter)}
                style={{
                  flex: 1,
                  marginHorizontal: 3,
                  paddingVertical: 12,
                  borderRadius: 10,
                  // backgroundColor:
                  //   filterType === filter ? "#0070c9" : "#ffffff",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#0070c9",
                }}
              >
                <Text
                  style={{
                    color: "#0a3f77",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Transaction Cards */}
          <ScrollView style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#0a3f77",
                marginBottom: 15,
              }}
            >
              Recent Transactions ({filteredTransactions.length})
            </Text>

            {filteredTransactions.length === 0 ? (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  padding: 30,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#999", fontSize: 16 }}>
                  No transactions found
                </Text>
              </View>
            ) : (
              filteredTransactions.map((txn: any) => (
                <View
                  key={txn._id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    padding: 15,
                    marginBottom: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#0a3f77",
                          marginBottom: 4,
                        }}
                      >
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "c",
                        }}
                      >
                        {txn.createdAt.slice(0, 10)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color:
                          txn.type === "withdraw"
                            ? "#e74c3c"
                            : txn.type === "deposit"
                            ? "green"
                            : txn.type === "transfer"
                            ? "orange"
                            : "black",
                      }}
                    >
                      {txn.type === "withdraw" || txn.type === "transfer"
                        ? "-"
                        : "+"}
                      ${txn.amount}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            {/* Profile Card */}

            {/* Action Buttons */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 20,

                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("./Transfer")}
                style={{
                  width: "30%",
                  marginVertical: 8,
                  paddingVertical: 15,
                  borderRadius: 12,
                  backgroundColor: "#0070c9",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 14 }}
                >
                  Transfer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("./Withdraw")}
                style={{
                  width: "30%",
                  marginVertical: 8,
                  paddingVertical: 15,
                  borderRadius: 12,
                  backgroundColor: "#e74c3c",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 14 }}
                >
                  Withdraw
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("./Deposit")}
                style={{
                  width: "30%",
                  marginVertical: 8,
                  paddingVertical: 15,
                  borderRadius: 12,
                  backgroundColor: "#27ae60",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 14 }}
                >
                  Deposit
                </Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => router.push("./UsersList")}
              style={{
                width: "100%",
                marginVertical: 8,
                paddingVertical: 15,
                borderRadius: 12,
                backgroundColor: "#9b59b6",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                View Users
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                width: "100%",
                marginVertical: 8,
                paddingVertical: 15,
                borderRadius: 12,
                backgroundColor: "#95a5a6",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Section - Profile & Actions */}
      </View>
    </View>
  );
}
