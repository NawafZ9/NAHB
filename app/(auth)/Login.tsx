import { login } from "@/api/auth";
import { storeToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login({ username, password }),
    onSuccess: async (data) => {
      const token = data.token;

      console.log("the token is", token);
      await storeToken(token);
      setIsAuthenticated(true);
      router.replace(`/(protected)/Account/Home`);
    },
    onError: () => {
      alert("Login failed. Check your email or password.");
    },
  });
  return (
    <View style={{ backgroundColor: "white", alignItems: "center", flex: 1 }}>
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

      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#0a3f77",
            textAlign: "center",
          }}
        >
          Welcome to your{" "}
          <Text style={{ color: "#0070c9", fontWeight: "700" }}>
            Digital Wallet
          </Text>
        </Text>
      </View>

      <View>
        <View
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#777"
            onChangeText={setUserName}
            autoCapitalize="none"
            style={{
              fontSize: 17,
              borderWidth: 2,
              borderColor: "#0a3f77",
              borderRadius: 10,
              width: 330,
              padding: 12,
              color: "#0a3f77",
            }}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#777"
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
            style={{
              fontSize: 17,
              borderWidth: 2,
              borderColor: "#0a3f77",
              borderRadius: 10,
              width: 330,
              padding: 12,
              marginTop: 20,
              color: "#0a3f77",
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => mutate()}
            style={{
              borderWidth: 2,
              borderColor: "#0070c9",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#0070c9",
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

          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            style={{
              borderWidth: 2,
              borderColor: "#0a3f77",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#0a3f77",
                fontWeight: "600",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingTop: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(theme)")}
            style={{
              borderWidth: 2,
              borderColor: "#0070c9",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#0070c9",
              justifyContent: "center",

              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: "600",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Theme
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
