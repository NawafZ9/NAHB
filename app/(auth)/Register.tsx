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
        backgroundColor: "#ffffff",
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "",
          marginTop: 40,
        }}
      >
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
          color: "#0a3f77",
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        Create Your{" "}
        <Text style={{ color: "#0070c9", fontWeight: "700" }}>
          NAHB Account
        </Text>
      </Text>
      {/* Profile Image Picker */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          borderWidth: 2,
          borderColor: "#0070c9",
          borderRadius: 10,
          width: 180,
          height: 180,
          backgroundColor: "#f5f9ff",
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
              color: "#0070c9",
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
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{
          fontSize: 17,
          borderWidth: 2,
          borderColor: "#0a3f77",
          borderRadius: 10,
          width: "100%",
          padding: 12,
          color: "#0a3f77",
          marginBottom: 20,
        }}
      />
      {/* Password Input */}
      <TextInput
        placeholder="Your Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{
          fontSize: 17,
          borderWidth: 2,
          borderColor: "#0a3f77",
          borderRadius: 10,
          width: "100%",
          padding: 12,
          color: "#0a3f77",
          marginBottom: 20,
        }}
      />
      {/* Register Button */}

      <TouchableOpacity
        onPress={() => {
          console.log("hiii");
          mutate();
        }}
        style={{
          marginTop: 10,
          borderWidth: 2,
          borderColor: "#0070c9",
          backgroundColor: "#0070c9",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={{
          marginTop: 15,
          borderWidth: 2,
          borderColor: "#0070c9",
          backgroundColor: "#0070c9",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
