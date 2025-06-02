import { getAllUsers, Transfer } from "@/api/Data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransferMoney() {
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [FilterData, setFilterData] = useState<any[]>([]);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["Transfer"],
    mutationFn: ({ username, amount }: { username: string; amount: number }) =>
      Transfer(username, amount),
    onSuccess: async () => {
      alert(`Success! You transferred $${amount} to ${username}.`);
    },
  });

  const handleTransfer = () => {
    // if (!username || !amount || isNaN(Number(amount))) {
    //   alert("Invalid Input, Please enter a username and valid amount.");
    //   return;
    // } else if ( Number(amount) <= 0) {
    //             alert("Invalid Input,Please enter a valid amount.");
    //             return;
    //           } else if (Number(amount) > 5000) {
    //             alert("The amount is exceeding the daily limit!!");
    //           }

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
  const handleSearch = (text: string) => {
    setUsername(text);

    if (text === "") {
      setFilterData([]);
      return;
    }

    const filtered = users.filter((user: any) =>
      user.username?.toLowerCase().includes(text.toLowerCase())
    );

    setFilterData(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
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
          <Text style={{ fontSize: 18, color: "#00bfff", fontWeight: "600" }}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#ffffff",
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
          placeholderTextColor="#aaa"
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
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={handleSearch}
          style={inputStyle}
        />
      </View>
      {/* <ScrollView contentContainerStyle={{ padding: 20 }}> */}
      <FlatList
        data={username === "" ? users : FilterData}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => (
          <View>
            {/* {users.map((user: any) => ( */}
            <View
              key={item._id}
              style={{
                backgroundColor: "#1e1e1e",
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
                  // source={{ uri: item.image }}
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
                      color: "#ffffff",
                      marginBottom: 4,
                    }}
                  >
                    {item.username || "Unknown User"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#27ae60",
                      fontWeight: "600",
                    }}
                  >
                    Balance: ${item.balance || 0}
                  </Text>
                </View>

                {/* Transfer Button */}
                <TouchableOpacity
                  onPress={() => {
                    setUsername(item.username);
                  }}
                  style={{
                    backgroundColor: "#0070c9",
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 8,
                  }}
                  disabled={!item.username}
                >
                  <Text style={buttonText}>Choose</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* ))} */}
          </View>
        )}
      />
      {/* </ScrollView> */}
      ////////////////////
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
    </View>
  );
}

// Styles for Dark Mode
const cardStyle = {
  backgroundColor: "#1e1e1e",
  borderRadius: 15,
  padding: 20,
  marginBottom: 20,
  shadowColor: "",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

const labelStyle = {
  fontSize: 16,
  fontWeight: "600" as const,
  color: "#ffffff",
  marginBottom: 10,
};

const inputStyle = {
  fontSize: 18,
  borderWidth: 1,
  borderColor: "#444",
  borderRadius: 10,
  padding: 15,
  color: "#ffffff",
  backgroundColor: "#1e1e1e",
};

const buttonText = {
  color: "#ffffff",
  fontSize: 14,
  fontWeight: "600" as const,
};
