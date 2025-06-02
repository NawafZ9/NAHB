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

  const { mutate, isPending } = useMutation({
    mutationKey: ["Transfer"],
    mutationFn: ({ username, amount }: { username: string; amount: number }) =>
      Transfer(username, amount),
    onSuccess: async () => {
      alert(`Success You transferred $${amount} to ${username}!`);
      // router.replace("/Account");
    },
    onError: async () => {
      alert("Error, Transfer failed. Please try again.");
    },
  });

  const handleTransfer = () => {
    if (amount) {
      if (Number(amount) <= 0) {
        alert("Invalid Amount ");
        setAmount("");
      } else if (Number(amount) > 5000) {
        alert("exceeded the daily limit ");
        setAmount("");
      } else {
        alert("ok");
        mutate({ username, amount: Number(amount) });
      }
    }
  };

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = usersData?.data || [];

  console.log(users);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa", padding: 20 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
            marginRight: 15,
          }}
        >
          <Text style={{ fontSize: 18, color: "#0070c9", fontWeight: "600" }}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#0a3f77",
            flex: 1,
            textAlign: "center",
          }}
        >
          Transfer Money
        </Text>
      </View>

      {/* Amount Input */}
      <View style={cardStyle}>
        <Text style={labelStyle}>Amount to Transfer</Text>
        <TextInput
          placeholder="Enter amount (e.g., 100)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={inputStyle}
        />
      </View>

      {/* Username Input */}
      <View style={cardStyle}>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={[inputStyle]}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View>
          {users.map((user: any) => (
            <View
              key={user._id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 15,
                padding: 20,
                marginBottom: 15,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                {/* Profile Image */}
                <Image
                  // source={{ uri: user.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: "#0070c9",
                    marginRight: 15,
                  }}
                />

                {/* User Info */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#0a3f77",
                      marginBottom: 4,
                    }}
                  >
                    {user.username || "Unknown User"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#27ae60",
                      fontWeight: "600",
                    }}
                  >
                    Balance: ${user.balance || 0}
                  </Text>
                </View>

                {/* Transfer Button */}
                <TouchableOpacity
                  // onPress={handleTransfer}
                  onPress={() => {
                    setUsername(user.username);
                  }}
                  style={{
                    backgroundColor: "#0070c9",
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 8,
                  }}
                  disabled={!user.username} // Disable if no username
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    Choose
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Account Details */}
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          //backgroundColor: "red",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleTransfer()}
          style={{
            backgroundColor: "#0070c9",
            borderRadius: 12,
            paddingVertical: 12,
            width: "70%",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
      {/* Action Buttons */}
    </View>
  );
}

// Styles
const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: 15,
  padding: 20,
  marginBottom: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

const labelStyle = {
  fontSize: 16,
  fontWeight: "600" as const,
  color: "#0a3f77",
  marginBottom: 10,
};

const inputStyle = {
  fontSize: 18,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 15,
  color: "#0a3f77",
  backgroundColor: "#f8f9fa",
};

const buttonText = {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600" as const,
};
