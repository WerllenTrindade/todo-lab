import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { s } from './styles';

export function HeaderCreateTask() {
  return (
    <View style={s.container}>
      <TouchableOpacity
        testID="back-button"
        onPress={() => router.back()}
        style={s.icon}
      >
        <Feather name="arrow-left-circle" size={24} color="white" />
      </TouchableOpacity>

      <Text style={s.title}>Criar nova tarefa</Text>
    </View>
  );
}
