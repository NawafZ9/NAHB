import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ThemeSelectionScreen() {
  const { setTheme } = useTheme();

  const handleTransferToHackerkPage = () => {
    router.push("/(auth)/loginHacker");
  };

  const handleTransferToLightPage = () => {
    router.push("/(auth)/login");
  };

  const handleTransferToDarkPage = () => {
    router.push("/(auth)/loginDark");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F4F6F8",
        justifyContent: "space-between",
      }}
    >
      {/* Top Bar */}
      <View
        style={{
          backgroundColor: "#0070c9",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Welcome to NAHB
        </Text>
      </View>

      {/* Main Content */}

      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/newNahb.png")}
            style={{ width: 250, height: 160 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "650",
              marginTop: -25,
              marginBottom: 15,
              color: "#1c1c1c",
              textAlign: "center",
            }}
          >
            Select Your Theme
          </Text>

          <View style={{ gap: 24, alignItems: "center" }}>
            {/* Light Mode */}
            <TouchableOpacity
              onPress={handleTransferToLightPage}
              style={{
                width: 250,
                height: 130,
                borderRadius: 24,
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                shadowColor: "#ccc",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              <Image
                source={require("@/assets/images/mode-light-icon-512x512-yuubs6qt.png")}
                style={{ width: 70, height: 70, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#0070c9",
                }}
              >
                Light Mode
              </Text>
            </TouchableOpacity>

            {/* Dark Mode */}
            <TouchableOpacity
              onPress={handleTransferToDarkPage}
              style={{
                width: 250,
                height: 130,
                borderRadius: 24,
                backgroundColor: "#1e1e1e",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              <Image
                source={require("@/assets/images/12747440.png")}
                style={{ width: 70, height: 70, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Dark Mode
              </Text>
            </TouchableOpacity>

            {/* Hacker Mode */}
            <TouchableOpacity
              onPress={handleTransferToHackerkPage}
              style={{
                width: 250,
                height: 130,
                borderRadius: 24,
                backgroundColor: "#000000",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                shadowColor: "#00FF41",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 10,
                elevation: 10,
                borderWidth: 1.5,
                borderColor: "#00FF41",
              }}
            >
              <Image
                source={require("@/assets/images/the-stealth-code-hacker-gaming-logo_10991519.png!w700wp.webp")}
                style={{ width: 70, height: 70, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#00FF41",
                  textShadowColor: "#00FF41",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 6,
                }}
              >
                NAHB Mode
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View
        style={{
          backgroundColor: "#0070c9",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 13 }}>
          © 2025 NAHB • All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  );
}
