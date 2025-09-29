import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const todoAnim = useRef(new Animated.Value(-200)).current; 
  const listAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(todoAnim, {
        toValue: width / 2 - 60,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(listAnim, {
        toValue: width / 2 - 40,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { left: todoAnim }]}>Todo</Animated.Text>
      <Animated.Text style={[styles.text, { left: listAnim }]}>List</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7A12FF",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
});
