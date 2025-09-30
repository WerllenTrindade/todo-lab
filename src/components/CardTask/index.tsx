import { Radio } from "@/components/Radio";
import { Task } from "@/database/model";
import theme from "@/theme";
import { taskBorderColors } from "@/theme/colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface CardTaskProps {
  data: Task;
  index: number;
  updateCompleteTask: (id: number) => void;
}

export function CardTask({ data, index, updateCompleteTask}: CardTaskProps) {
  return (
    <TouchableOpacity 
    onPress={() => router.navigate({
      pathname: '/task_form',
      params: {
        id: data?.id
      } 
    })}
    testID="card-task-container" style={[styles.container, { borderLeftColor: taskBorderColors[index] }]}>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {data.title}
        </Text>

        <View style={styles.dateWrapper}>
          <FontAwesome name="calendar" size={15} color={theme.colors.white + 80} />
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>

        <Radio testID="radio-button" onPress={() => updateCompleteTask(data?.id || 0)} selected={data.completed || false} />
    </TouchableOpacity>
  );
}
