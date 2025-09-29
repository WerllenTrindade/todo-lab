import { CardProgress } from "@/components/CardProgress";
import { CardTask } from "@/components/CardTask";
import { GoogleKeep } from "@/components/GoogleKeep";
import { Search } from "@/components/Search";
import { tasksToday } from "@/mock";
import { ROUTERS } from "@/router";
import { TaskCardType } from "@/types/task";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "./styles";

export default function Home() {
  const renderItem = useCallback(
    ({ item }: { item: TaskCardType }) => <CardTask data={item} />,
    []
  );

  return (
    <SafeAreaView style={s.container}>
      <Search
        placeholder="Tarefa de pesquisa aqui"
        placeholderTextColor="#FFF"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={s.title}>Progresso</Text>
        <CardProgress />

        <Text style={s.title}>A tarefa de hoje</Text>
        <FlatList
          data={tasksToday}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
        />

        <Text style={s.title}>Tarefa de amanhã</Text>
        <FlatList
          data={tasksToday}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
        />
      </ScrollView>

      <GoogleKeep onPress={() => router.navigate(ROUTERS.TASK_FORM)} />
    </SafeAreaView>
  );
}
