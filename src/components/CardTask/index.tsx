import { Radio } from "@/components/Radio";
import theme from "@/theme";
import { TaskCardType } from "@/types/task";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from "react-native";
import { styles } from "./styles";

interface CardTaskProps {
  data: TaskCardType;

}

export function CardTask({ data }: CardTaskProps) {
  return (
    <View testID="card-task-container" style={[styles.container, { borderLeftColor: data.color }]}>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {data.title}
        </Text>

        <View style={styles.dateWrapper}>
          <FontAwesome name="calendar" size={15} color={theme.colors.white + 80} />
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>

        <Radio onPress={() => null} selected={data.completed} />
    </View>
  );
}
