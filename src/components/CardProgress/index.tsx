import { useContextHome } from "@/screens/Home/context/ContextHome";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { s } from "./styles";

export function CardProgress() {
  const { todayTasksCount, completedTasksCount, progress } = useContextHome();

  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={s.container}>
      <Text style={s.title}>Tarefa Diária</Text>
      <Text style={s.subtitle}>
        {completedTasksCount}/{todayTasksCount} Tarefas Concluídas
      </Text>

      <View>
        <View style={s.row}>
          <Text style={s.message}>
            {progress === 1
              ? "Você concluiu todas as tarefas 🎉"
              : "Você está quase terminando, vá em frente"}
          </Text>
          <Text style={s.percentage}>{Math.round(progress * 100)}%</Text>
        </View>

       <View style={s.progressBackground}>
  <Animated.View
    style={[s.progressFill, { width: widthInterpolated }]}
  />
</View>
      </View>
    </View>
  );
}
