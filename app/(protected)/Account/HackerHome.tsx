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
      router.replace("/(auth)/loginHacker");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000", padding: 20 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Image
          source={{ uri: userImage }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 2,
            borderColor: "#00ff00",
            marginBottom: 12,
          }}
        />
        <Text
          style={{
            color: "#00ff00",
            fontSize: 22,
            fontFamily: "Courier",
            marginTop: 20,
          }}
        >
          Hello, {username}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#00ff00",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#00ff00", fontFamily: "Courier", fontSize: 18 }}>
          Your Balance
        </Text>
        <Text
          style={{
            color: "#00ff00",
            fontFamily: "Courier",
            fontSize: 36,
            fontWeight: "bold",
          }}
        >
          ${balance}
        </Text>
      </View>

      <TextInput
        placeholder="Search date or amount"
        placeholderTextColor="#00ff00"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#00ff00",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
          backgroundColor: "#1a1a1a",
          color: "#00ff00",
          fontFamily: "Courier",
        }}
      />

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
              backgroundColor:
                filterType === filter ? "#00ff00" : "transparent",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#00ff00",
            }}
          >
            <Text
              style={{
                color: filterType === filter ? "#000000" : "#00ff00",
                fontWeight: "600",
                fontSize: 12,
                fontFamily: "Courier",
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        <Text
          style={{
            color: "#00ff00",
            fontSize: 18,
            fontFamily: "Courier",
            marginBottom: 10,
          }}
        >
          Recent Transactions ({filteredTransactions.length})
        </Text>

        {filteredTransactions.length === 0 ? (
          <View
            style={{
              backgroundColor: "#1a1a1a",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#00ff00", fontFamily: "Courier" }}>
              No transactions found
            </Text>
          </View>
        ) : (
          filteredTransactions.map((txn) => (
            <View
              key={txn._id}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: 12,
                padding: 15,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: "#00ff00",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#00ff00",
                      fontFamily: "Courier",
                      fontWeight: "bold",
                    }}
                  >
                    {txn.type.toUpperCase()}
                  </Text>
                  <Text style={{ color: "#00ff00", fontFamily: "Courier" }}>
                    {txn.createdAt.slice(0, 10)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#00ff00",
                    fontSize: 18,
                    fontFamily: "Courier",
                    fontWeight: "bold",
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
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("./TransferHacker")}
          style={{
            backgroundColor: "#00ff00",
            borderRadius: 12,
            paddingVertical: 12,
            width: "30%",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Courier",
            }}
          >
            STEAL 💀
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("./WithdrawHacker")}
          style={{
            backgroundColor: "#00ff00",
            borderRadius: 12,
            paddingVertical: 12,
            width: "30%",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Courier",
            }}
          >
            Withdraw
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("./DepositHacker")}
          style={{
            backgroundColor: "#00ff00",
            borderRadius: 12,
            paddingVertical: 12,
            width: "30%",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Courier",
            }}
          >
            Deposit
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          borderWidth: 1,
          borderColor: "#00ff00",
          borderRadius: 12,
          paddingVertical: 15,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#00ff00",
            fontWeight: "600",
            fontSize: 16,
            fontFamily: "Courier",
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
