import { login } from "@/api/auth";
import { storeToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";

import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
      router.replace(`/(protected)/Account/HackerHome`);
    },
    onError: () => {
      alert("Login failed. Check your email or password.");
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#000000", // Hacker black
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ marginTop: 40 }}>
          <Image
            resizeMode="contain"
            source={require("@/assets/images/Hacker.png")}
            style={{ width: 360, height: 190, marginTop: 30, marginBottom: 30 }}
          />
        </View>

        <View
          style={{
            backgroundColor: "#1a1a1a", // Terminal-like box
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#00ff00", // Neon green
              textAlign: "center",
              fontFamily: "Courier", // Optional monospace for hacker feel
            }}
          >
            ACCESS YOUR{" "}
            <Text style={{ color: "#00ff00", fontWeight: "700" }}>
              DIGITAL VAULT
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
              placeholder="Username"
              placeholderTextColor="#00ff00"
              onChangeText={setUserName}
              autoCapitalize="none"
              style={{
                fontSize: 17,
                borderWidth: 2,
                borderColor: "#00ff00",
                borderRadius: 10,
                width: 330,
                padding: 12,
                color: "#00ff00",
                backgroundColor: "#1a1a1a",
                fontFamily: "Courier",
              }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#00ff00"
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
              style={{
                fontSize: 17,
                borderWidth: 2,
                borderColor: "#00ff00",
                borderRadius: 10,
                width: 330,
                padding: 12,
                marginTop: 20,
                color: "#00ff00",
                backgroundColor: "#1a1a1a",
                fontFamily: "Courier",
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
                borderColor: "#00ff00",
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 8,
                backgroundColor: "#00ff00", // Neon button
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000000",
                  fontWeight: "600",
                  fontFamily: "Courier",
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                alert(
                  "Sorry, Hackers should know how to login without registeration"
                )
              }
              style={{
                borderWidth: 2,
                borderColor: "#00ff00",
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 8,
                backgroundColor: "#000000", // Match page
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#00ff00",
                  fontWeight: "600",
                  fontFamily: "Courier",
                }}
              >
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(theme)")}
              style={{
                borderWidth: 2,
                borderColor: "#00ff00",
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 8,
                backgroundColor: "#000000",
                justifyContent: "center",

                // paddingTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#00ff00",
                  fontWeight: "600",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Courier",
                  textAlign: "center",
                }}
              >
                Theme
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
