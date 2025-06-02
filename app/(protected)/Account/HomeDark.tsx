import React, { useState } from "react";
import {
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

  const getFilteredTransactions = () => {
    let filtered = transactions;

    if (filterType !== "All") {
      filtered = filtered.filter(
        (txn) => txn.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchText !== "") {
      filtered = filtered.filter(
        (txn) =>
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
      router.replace("/(auth)/loginDark");
    } catch (error) {
      alert("Error Failed to logout");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", gap: 20 }}>
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
        <Image
          source={require("@/assets/images/newNahb.png")}
          style={{ width: 220, height: 80 }}
        />
      </View>

      {/* Balance Card */}
      <View
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#ccc", marginBottom: 5 }}>
          Your Balance
        </Text>
        <Text style={{ fontSize: 36, color: "#00bfff", fontWeight: "bold" }}>
          ${balance}
        </Text>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search by date (2024-01-15) or amount (100)..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#333",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
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
            key={filter}
            onPress={() => setFilterType(filter)}
            style={{
              flex: 1,
              marginHorizontal: 3,
              paddingVertical: 12,
              borderRadius: 10,
              backgroundColor: filterType === filter ? "#0070c9" : "#1e1e1e",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#0070c9",
            }}
          >
            <Text
              style={{
                color: filterType === filter ? "#fff" : "#00bfff",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions Scroll Area */}
      <View style={{ maxHeight: 300, marginBottom: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: 15,
            }}
          >
            Recent Transactions ({filteredTransactions.length})
          </Text>

          {filteredTransactions.length === 0 ? (
            <View
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: 12,
                padding: 30,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#888", fontSize: 16 }}>
                No transactions found
              </Text>
            </View>
          ) : (
            filteredTransactions.map((txn) => (
              <View
                key={txn._id}
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: 12,
                  padding: 15,
                  marginBottom: 10,
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
                        color: "#ffffff",
                        marginBottom: 4,
                      }}
                    >
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#aaa" }}>
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
                          ? "#27ae60"
                          : txn.type === "transfer"
                          ? "orange"
                          : "#fff",
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
      </View>

      {/* Action Buttons */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("./TransferDark")}
            style={{
              width: "30%",
              paddingVertical: 15,
              borderRadius: 12,
              backgroundColor: "#0070c9",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              Transfer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("./WithdrawDark")}
            style={{
              width: "30%",
              paddingVertical: 15,
              borderRadius: 12,
              backgroundColor: "#e74c3c",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              Withdraw
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("./DepositDark")}
            style={{
              width: "30%",
              paddingVertical: 15,
              borderRadius: 12,
              backgroundColor: "#27ae60",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              Deposit
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            width: "100%",
            marginTop: 30,
            paddingVertical: 15,
            borderRadius: 12,
            backgroundColor: "#555",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
