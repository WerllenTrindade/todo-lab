import { ProgressBar } from "@/components/ProgressBar";
import { Text, View } from "react-native";
import { s } from "./styles";

export function CardProgress() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Tarefa Diária</Text>
      <Text style={s.subtitle}>2/3 Tarefa Concluída</Text>

      <View>
        <View style={s.row}>
          <Text style={s.message}>Você está quase terminando, vá em frente</Text>
          <Text style={s.percentage}>66%</Text>
        </View>
        <ProgressBar testID="progress-bar" height={18} progress={0.4} />
      </View>
    </View>
  );
}
