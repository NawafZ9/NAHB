import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getAllUsers } from "@/api/Data";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function UsersList() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // Get all users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = usersData?.data || [];

  // Filter users based on search with error handling
  const getFilteredUsers = () => {
    try {
      if (!searchText.trim()) {
        return users;
      }
      return users.filter((user: any) => {
        // Add safety checks to prevent crashes
        if (!user || !user.username) return false;
        return user.username.toLowerCase().includes(searchText.toLowerCase());
      });
    } catch (error) {
      console.error("Error filtering users:", error);
      return users; // Return all users if filtering fails
    }
  };

  const filteredUsers = getFilteredUsers();

  const handleTransferToUser = (username: string) => {
    router.push({
      pathname: "./Transfer",
      params: { preselectedUser: username },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
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
          All Users
        </Text>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search users by username..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 15,
          marginBottom: 20,
          backgroundColor: "#ffffff",
          color: "#0a3f77",
        }}
      />

      {/* Users Count */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#0a3f77",
          marginBottom: 15,
        }}
      >
        {filteredUsers.length} Users Found
      </Text>

      {/* Users List */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#999", fontSize: 16 }}>
              Loading users...
            </Text>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#999", fontSize: 16 }}>No users found</Text>
          </View>
        ) : (
          filteredUsers.map((user: any) => (
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
                  source={{ uri: user.image }}
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
                  onPress={() => handleTransferToUser(user.username)}
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
                    Transfer
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Account Details */}
              <View
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: 10,
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#0a3f77",
                    marginBottom: 8,
                  }}
                >
                  Account Information
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#666" }}>Username:</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#0a3f77",
                      fontWeight: "500",
                    }}
                  >
                    {user.username || "N/A"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#666" }}>
                    Account Balance:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#27ae60",
                      fontWeight: "600",
                    }}
                  >
                    ${user.balance || 0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#666" }}>Status:</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#27ae60",
                      fontWeight: "500",
                    }}
                  >
                    Active
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
