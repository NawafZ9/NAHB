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
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 20,
          padding: 30,
          width: "100%",
          maxWidth: 400,
          shadowColor: "#39ff14",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 10,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#39ff14",
            marginBottom: 30,
            textAlign: "center",
            fontFamily: "Courier",
          }}
        >
          Withdraw Funds
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#39ff14",
            marginBottom: 10,
            fontFamily: "Courier",
          }}
        >
          Amount to Withdraw
        </Text>

        <TextInput
          placeholder="e.g. 404"
          placeholderTextColor="#39ff1499"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{
            fontSize: 18,
            borderWidth: 1,
            borderColor: "#39ff14",
            borderRadius: 12,
            width: "100%",
            padding: 15,
            color: "#39ff14",
            backgroundColor: "#000000",
            marginBottom: 30,
            fontFamily: "Courier",
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
              backgroundColor: "#000000",
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#39ff14",
            }}
          >
            <Text
              style={{
                color: "#39ff14",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Courier",
              }}
            >
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
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: "#39ff14",
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
                fontWeight: "700",
                fontFamily: "Courier",
              }}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
