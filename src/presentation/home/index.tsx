
import { useAuthService } from "@/domain/auth/useAuthService";
import { Task } from "@/infra/database/model";
import { CardProgress } from "@/shared/components/CardProgress";
import { CardTask } from "@/shared/components/CardTask";
import { GoogleKeep } from "@/shared/components/GoogleKeep";
import { Search } from "@/shared/components/Search";
import { ROUTES_PRIVATE } from "@/shared/utils/router";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContextHomeProvider } from "./context/ContextHome";
import { s } from "./styles";
import { useHome } from "./useHome";

export default function Home() {
  const home = useHome();
  const { logout } = useAuthService();
  const { tomorrowTasks, todayTasks, toggleCompleteTask } = home;

  const renderItem = useCallback(
    ({ item, index }: { item: Task; index: number }) => (
      <CardTask
        updateCompleteTask={toggleCompleteTask}
        data={item}
        index={index}
      />
    ),
    [toggleCompleteTask]
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle='dark-content'/>
      <ContextHomeProvider methods={home}>
        <View style={{ paddingVertical: 15 }}>
          <Text style={s.titleHeader}>
            Você tem {todayTasks.length} tarefas{"\n"}para completar hoje
          </Text>
        </View>

        <Search
          placeholder="Tarefa de pesquisa aqui"
          placeholderTextColor="#FFF"
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Text style={s.title}>Progresso</Text>
          <CardProgress />
          
          <Text style={s.title}>Tarefas de hoje</Text>

          <FlatList
          data={todayTasks}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false}

            contentContainerStyle={{ gap: 10 }}
            />

          {tomorrowTasks.length > 0 && (
            <>
              <Text style={s.title}>Tarefas futuras</Text>
              <FlatList
                data={tomorrowTasks}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 10 }}
              />
            </>
          )}
        </ScrollView>

        <GoogleKeep onPress={() => router.navigate(ROUTES_PRIVATE.TASK_FORM)} />
      </ContextHomeProvider>
    </SafeAreaView>
  );
}
