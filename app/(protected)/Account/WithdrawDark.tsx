import { getProfile, Withdraw } from "@/api/Data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function WithdrawAmount() {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const handleCancel = () => {
    setAmount("");
    router.back();
  };

  const { mutate } = useMutation({
    mutationKey: ["Withdraw"],
    mutationFn: () => Withdraw(Number(amount)),
    onSuccess: async (data) => {
      alert(`You have withdrawn $${amount}`);
      setAmount("");
      router.back();
    },
    onError: () => {
      alert("Error, Withdrawal failed. Try again.");
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });
  const balance = profile?.data.balance;
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
          shadowOffset: { width: 0, height: 1 },
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
          Withdraw Funds
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: 10,
          }}
        >
          Amount to Withdraw
        </Text>

        <TextInput
          placeholder="Enter amount (e.g., 100)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
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
              } else if (Number(amount) > 5000) {
                alert("The amount is exceeding the daily limit!!");
              } else if (Number(amount) > balance) {
                alert("The amount is above the limit");
              } else {
                mutate();
              }
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Withdraw Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
