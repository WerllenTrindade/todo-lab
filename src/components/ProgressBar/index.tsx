import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface ProgressBarProps extends ViewProps{
  progress: number; // valor entre 0 e 1 (0% a 100%)
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor = "#BA83DE41",
  fillColor = "#BA83DE",
  ...rest
}: ProgressBarProps) {
  return (
    <View {...rest} style={[styles.container, { height, backgroundColor }]}>
      <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 50,
  },
});
