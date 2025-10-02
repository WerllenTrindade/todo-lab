import { CardProgress } from "@/components/CardProgress";
import { CardTask } from "@/components/CardTask";
import { GoogleKeep } from "@/components/GoogleKeep";
import { Search } from "@/components/Search";
import { Task } from "@/database/model";
import { ROUTERS } from "@/router";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContextHomeProvider } from "./context/ContextHome";
import { s } from "./styles";
import { useHome } from "./useHome";

export default function Home() {
  const home = useHome();
  const { tomorrowTasks, todayTasks, updateCompleteTask } = home;

  const renderItem = useCallback(({ item, index }: { item: Task, index: number }) => 
    <CardTask updateCompleteTask={updateCompleteTask} data={item} index={index} /> ,[updateCompleteTask]
  );


  return (
    
    <SafeAreaView style={s.container}>
      <ContextHomeProvider methods={home}>

      <View style={{paddingVertical: 15}}>
        <Text style={s.titleHeader}>Você tem {todayTasks.length} tarefas{'\n'}para completar hoje</Text>
      </View>

      <Search
        placeholder="Tarefa de pesquisa aqui"
        placeholderTextColor="#FFF"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={s.title}>Progresso</Text>
        <CardProgress />

        <Text style={s.title}>A tarefa de hoje</Text>

        <FlatList
          data={todayTasks}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
        />

        {
          tomorrowTasks.length > 0 && 
          <>
          <Text style={s.title}>Tarefa de amanhã</Text>
        <FlatList 
          data={tomorrowTasks}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
        />
          </>
        }
     
      </ScrollView>

      <GoogleKeep onPress={() => router.navigate(ROUTERS.TASK_FORM)} />
    </ContextHomeProvider>
    </SafeAreaView>
  );
}
