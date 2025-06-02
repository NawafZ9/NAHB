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
      router.replace(`/(protected)/Account/HomeDark`);
    },
    onError: () => {
      alert("Login failed. Check your email or password.");
    },
  });

  return (
    <View style={{ backgroundColor: "#121212", alignItems: "center", flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <Image
          source={require("@/assets/images/newNahb.png")}
          style={{ width: 350, height: 150 }}
        />
      </View>

      <View
        style={{
          backgroundColor: "#121212",
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Welcome to your{" "}
          <Text style={{ color: "#00bfff", fontWeight: "700" }}>
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
            placeholderTextColor="#aaa"
            onChangeText={setUserName}
            autoCapitalize="none"
            style={{
              fontSize: 17,
              borderWidth: 2,
              borderColor: "#00bfff",
              borderRadius: 10,
              width: 330,
              padding: 12,
              color: "#ffffff",
              backgroundColor: "#1e1e1e",
            }}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#aaa"
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
            style={{
              fontSize: 17,
              borderWidth: 2,
              borderColor: "#00bfff",
              borderRadius: 10,
              width: 330,
              padding: 12,
              marginTop: 20,
              color: "#ffffff",
              backgroundColor: "#1e1e1e",
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
              borderColor: "#00bfff",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#00bfff",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#121212",
                fontWeight: "600",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/registerDark")}
            style={{
              borderWidth: 2,
              borderColor: "#00bfff",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#121212",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#00bfff",
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
              borderColor: "#00bfff",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 8,
              backgroundColor: "#121212",
              justifyContent: "center",

              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#00bfff",
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
