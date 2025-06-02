import { DepositFunction } from "@/api/Data";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    setAmount("");
    router.back();
  };

  const { mutate } = useMutation({
    mutationKey: ["Deposit"],
    mutationFn: () => DepositFunction(Number(amount)),

    onSuccess: async (data) => {
      alert(`Success! You deposited $${amount}`);
      setAmount("");
      router.back();
    },
    onError: () => {
      alert("Error, Deposit failed. Please try again.");
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <View
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 20,
          padding: 30,
          width: "100%",
          maxWidth: 400,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Deposit Funds
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: 10,
          }}
        >
          Amount to Deposit
        </Text>

        <TextInput
          placeholder="Enter amount (e.g., 100)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          onChangeText={setAmount}
          style={{
            fontSize: 18,
            borderWidth: 1,
            borderColor: "#444",
            borderRadius: 12,
            width: "100%",
            padding: 15,
            color: "#ffffff",
            backgroundColor: "#1e1e1e",
            marginBottom: 30,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              flex: 1,
              marginRight: 10,
              backgroundColor: "#555",
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (!amount || Number(amount) <= 0) {
                alert("Invalid Input,Please enter a valid amount.");
                return;
              }
              mutate();
            }}
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: "#27ae60",
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Deposit Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
