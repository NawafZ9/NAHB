import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register({ username, password, image }),
    onSuccess: () => {
      alert("Registered successfully!");
      router.replace("/login");
    },
    onError: () => {
      alert("Registration failed.");
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ marginTop: 40 }}>
        <Image
          source={require("@/assets/images/newNahb.png")}
          style={{ width: 350, height: 150 }}
        />
      </View>

      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#ffffff",
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        Create Your{" "}
        <Text style={{ color: "#00bfff", fontWeight: "700" }}>
          NAHB Account
        </Text>
      </Text>

      {/* Profile Image Picker */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          borderWidth: 2,
          borderColor: "#00bfff",
          borderRadius: 10,
          width: 180,
          height: 180,
          backgroundColor: "#1e1e1e",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 30,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        ) : (
          <Text
            style={{
              color: "#00bfff",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Tap to Upload{"\n"}Profile Picture
          </Text>
        )}
      </TouchableOpacity>

      {/* Username Input */}
      <TextInput
        placeholder="Your Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{
          fontSize: 17,
          borderWidth: 2,
          borderColor: "#00bfff",
          borderRadius: 10,
          width: "100%",
          padding: 12,
          color: "#ffffff",
          backgroundColor: "#1e1e1e",
          marginBottom: 20,
        }}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Your Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{
          fontSize: 17,
          borderWidth: 2,
          borderColor: "#00bfff",
          borderRadius: 10,
          width: "100%",
          padding: 12,
          color: "#ffffff",
          backgroundColor: "#1e1e1e",
          marginBottom: 20,
        }}
      />

      {/* Register Button */}
      <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
        {/* Login Button */}
        <TouchableOpacity
          onPress={() => mutate()}
          style={{
            borderWidth: 2,
            borderColor: "#00bfff",
            backgroundColor: "#00bfff",
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            alignItems: "center",
            width: 330,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#121212",
              fontWeight: "600",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          onPress={() => router.replace("/loginDark")}
          style={{
            borderWidth: 2,
            borderColor: "#00bfff",
            backgroundColor: "#121212",
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            alignItems: "center",
            width: 330,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#00bfff",
              fontWeight: "600",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
