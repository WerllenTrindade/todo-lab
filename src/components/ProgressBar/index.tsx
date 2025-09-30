import React from "react";
import { View, ViewProps } from "react-native";
import { s } from "./styles";

interface ProgressBarProps extends ViewProps{
  progress: number;
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
 <View {...rest} testID={rest.testID} style={[s.container, { height, backgroundColor }]}>
      <View
        testID="progress-bar-fill"
        style={[s.fill, { width: `${progress * 100}%`, backgroundColor: fillColor }]}
      />
    </View>
  );
}

