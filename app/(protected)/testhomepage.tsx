import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function Home() {
  const { userID } = useLocalSearchParams();
  console.log("the user ID", { userID });
  // const { data, isLoading, error } = useQuery({
  //     queryKey: ["user", userID],
  //     queryFn: () => getUserInfoByID(Number(userID)),
  //   });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
      }}
    >
      {/* Welcome Message */}
      <Text
        style={{
          fontSize: 40,
          fontWeight: "700",
          color: "#0a3f77",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Welcome Back
      </Text>

      {/* Main Horizontal Layout */}
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Left Section */}
        <View style={{ flex: 2, paddingRight: 10 }}>
          {/* Balance Display */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 24, color: "#0a3f77", fontWeight: "700" }}>
              Your Balance
            </Text>
            <Text
              style={{ fontSize: 35, color: "#0070c9", fontWeight: "bold" }}
            >
              $5,250.00
            </Text>
          </View>

          {/* Search Bar */}
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor="#777"
            style={{
              fontSize: 16,
              borderWidth: 2,
              borderColor: "#0a3f77",
              borderRadius: 10,
              padding: 10,
              marginTop: 20,
              marginBottom: 10,
              color: "#0a3f77",
            }}
          />

          {/* 3 Buttons in a row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            {["Transfer", "Withdraw", "Deposit"].map((action) => (
              <TouchableOpacity
                key={action}
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: "#0070c9",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 10 }}
                >
                  {action}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Scrollable Transaction History */}
          <ScrollView style={{ marginTop: 20 }}>
            {[
              { id: 1, title: "Grocery Store", amount: "-$120.00" },
              { id: 2, title: "Salary", amount: "+$3,000.00" },
              { id: 3, title: "Netflix", amount: "-$15.99" },
              { id: 4, title: "Coffee Shop", amount: "-$7.50" },
              { id: 5, title: "Transfer to John", amount: "-$300.00" },
              { id: 6, title: "Deposit", amount: "+$500.00" },
              { id: 7, title: "Electric Bill", amount: "-$60.00" },
            ].map((txn) => (
              <View
                key={txn.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={{ color: "#0a3f77", fontSize: 16 }}>
                  {txn.title}
                </Text>
                <Text
                  style={{
                    color: txn.amount.startsWith("-") ? "#c0392b" : "#27ae60",
                    fontWeight: "600",
                  }}
                >
                  {txn.amount}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Divider Line */}
        <View
          style={{
            width: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 10,
          }}
        />

        {/* Right Section */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingLeft: 10,
            marginTop: 10,
          }}
        >
          {/* Profile Image */}
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#0070c9",
              marginBottom: 10,
            }}
          />

          {/* User Name */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#0a3f77",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            John Doe
          </Text>

          {/* 3 Vertical Buttons */}
          {["Transfer", "Withdraw", "Deposit"].map((action) => (
            <TouchableOpacity
              key={action}
              style={{
                width: "100%",
                marginVertical: 5,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: "#0070c9",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                {action}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
