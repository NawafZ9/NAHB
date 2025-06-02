import { getAllUsers, Transfer } from "@/api/Data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransferMoney() {
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Transfer"],
    mutationFn: ({ username, amount }: { username: string; amount: number }) =>
      Transfer(username, amount),
    onSuccess: async () => {
      alert(` You have stolen successfully from ${username}`);
    },
  });

  const handleTransfer = () => {
    if (amount) {
      if (Number(amount) >= 0) {
        alert("You number has to be negative to STEAL!!");
        setAmount("");
      } else if (Number(amount) <= -5000) {
        alert("Chill OUT!!, keep something for him!! ");
        setAmount("");
      } else {
        alert("Reasonble amount to STEAL");
        mutate({ username, amount: Number(amount) });
        setAmount("");
      }
    }
  };

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = usersData?.data || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#000000", padding: 20 }}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ padding: 10, marginRight: 15 }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#39ff14",
              fontWeight: "600",
              fontFamily: "Courier",
            }}
          >
            ← BACK
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#39ff14",
            flex: 1,
            textAlign: "center",
            fontFamily: "Courier",
          }}
        >
          TRANSFER
        </Text>
      </View>

      {/* Amount Buttons
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setAmount("-5000")}
          style={amountButtonStyle}
        >
          <Text style={amountTextStyle}>$5,000</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAmount("-10000")}
          style={amountButtonStyle}
        >
          <Text style={amountTextStyle}>$10,000</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAmount("-1000000")}
          style={amountButtonStyle}
        >
          <Text style={amountTextStyle}>$1M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAmount("-5000000")}
          style={amountButtonStyle}
        >
          <Text style={amountTextStyle}>$5M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAmount("-10000000")}
          style={amountButtonStyle}
        >
          <Text style={amountTextStyle}>$10M</Text>
        </TouchableOpacity>
      </View> */}

      {/* Amount Input */}
      <View style={cardStyle}>
        <Text style={labelStyle}>Amount </Text>
        <TextInput
          placeholder="Enter Amount "
          placeholderTextColor="#39ff1499"
          value={amount}
          onChangeText={setAmount}
          style={inputStyle}
        />
      </View>

      {/* Username Input */}
      <View style={cardStyle}>
        <Text style={labelStyle}>Recipient Username</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#39ff1499"
          value={username}
          onChangeText={setUsername}
          style={inputStyle}
        />
      </View>

      {/* Users List */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {users.map((user: any) => (
          <View
            key={user._id}
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
              shadowColor: "#39ff14",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Image
                // source={{ uri: user.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: "#39ff14",
                  marginRight: 15,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={userNameTextStyle}>
                  {user.username || "Unknown"}
                </Text>
                <Text style={balanceTextStyle}>
                  Balance: ${user.balance || 0}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setUsername(user.username);
                }}
                style={{
                  backgroundColor: "#39ff14",
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
                disabled={!user.username}
              >
                <Text style={buttonText}>Choose</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",

          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleTransfer()}
          style={{
            backgroundColor: "#00ff00",
            borderRadius: 12,
            paddingVertical: 12,
            width: "70%",
            marginTop: 50,
            marginBottom: 50,
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
      </View>
    </View>
  );
}

// Shared Styles
const amountButtonStyle = {
  backgroundColor: "#0f0f0f",
  borderColor: "#39ff14",
  borderWidth: 2,
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 18,
  marginVertical: 6,
  width: "30%",
  alignItems: "center" as const,
  shadowColor: "#39ff14",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
};

const amountTextStyle = {
  color: "#39ff14",
  fontFamily: "Courier",
  fontWeight: "600" as const,
  fontSize: 14,
};

const cardStyle = {
  backgroundColor: "#0f0f0f",
  borderRadius: 15,
  padding: 20,
  marginBottom: 20,
  shadowColor: "#39ff14",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
};

const labelStyle = {
  fontSize: 16,
  fontWeight: "600" as const,
  color: "#39ff14",
  marginBottom: 10,
  fontFamily: "Courier",
};

const inputStyle = {
  fontSize: 18,
  borderWidth: 1,
  borderColor: "#39ff14",
  borderRadius: 10,
  padding: 15,
  color: "#39ff14",
  backgroundColor: "#000000",
  fontFamily: "Courier",
};

const userNameTextStyle = {
  fontSize: 18,
  fontWeight: "700" as const,
  color: "#39ff14",
  marginBottom: 4,
  fontFamily: "Courier",
};

const balanceTextStyle = {
  fontSize: 16,
  color: "#39ff14",
  fontWeight: "600" as const,
  fontFamily: "Courier",
};

const buttonText = {
  color: "#000000",
  fontSize: 14,
  fontWeight: "700" as const,
  fontFamily: "Courier",
  textAlign: "center" as const,
};
