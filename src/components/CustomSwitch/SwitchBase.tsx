import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { s } from "./styles";

export const SwitchBase = ({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 80,
    }).start();
  }, [value, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#A378FF"],
  });

  return (
    <Pressable
     testID="switch-base-button"
      style={[s.container, disabled && { opacity: 0.5 }]}
      onPress={() => !disabled && onChange(!value)}
    >
      <Animated.View style={[s.track, { backgroundColor }]}>
        <Animated.View style={[s.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
};
