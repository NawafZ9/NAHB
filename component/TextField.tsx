import React from "react";
import { TextInput, View } from "react-native";

const TextField = () => {
  return (
    <View
      style={{
        //backgroundColor: "yellow",
        height: 300,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        placeholder="Your UserName"
        style={{ fontSize: 17, borderWidth: 2, borderRadius: 8, width: 330 }}
      />
      <TextInput
        placeholder="Your Password"
        style={{
          fontSize: 17,
          borderWidth: 2,
          borderRadius: 8,
          width: 330,
          marginTop: 20,
        }}
      />
    </View>
  );
};

export default TextField;
