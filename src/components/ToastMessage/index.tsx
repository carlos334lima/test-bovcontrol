import React from "react";
import { View, Text, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";

import { COLORS } from "../../utils/colors";

export default {
  success: ({ text1 }: { text1?: string }) => (
    <View style={[styles.container, styles.successContainer]}>
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require("../../utils/lottie/check.json")}
          style={styles.lottie}
          autoPlay
          loop
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text1}</Text>
      </View>
    </View>
  ),

  error: ({ text1 }: { text1?: string }) => (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require("../../utils/lottie/error.json")}
          style={styles.lottie}
          autoPlay
          loop
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text1}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    height: 55,
    zIndex: 9999,
    justifyContent: "space-evenly",
  },
  successContainer: {
    backgroundColor: "#18B738",
  },
  errorContainer: {
    backgroundColor: "#E54848",
  },
  lottieWrapper: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    width: "65%",
    justifyContent: "center",
    zIndex: 9999,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.COLOR_WHITE,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});
