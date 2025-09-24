import { ListEmpty } from "@/components/ListEmpty";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem/TodoItem.tsx";
import { TodoListHeader } from "@/components/TodoListHeader";
import { TodoModal } from "@/components/TodoModal";
import { Todo } from "@/service/todosService";
import { useCallback } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "./styles";
import { useTodosListScreen } from "./useTodosListScreen";

export default function TodoListScreen() {
  const {
    todos,
    search,
    setSearch,
    modalRef,
    handleOpenModal,
    handleRemove,
    debouncedSearch,
    fetchTodos,
  } = useTodosListScreen();

  const renderTodoItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem
        title={item.title}
        onPress={() => handleOpenModal(item)}
        removeItem={() => handleRemove(item.id)}
      />
    ),
    [handleOpenModal, handleRemove]
  );

  return (
    <SafeAreaView style={s.container}>
      <TodoInput
        value={search}
        onChangeText={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <TodoListHeader itemCount={todos.length} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        ListEmptyComponent={() =>  
        <ListEmpty emptySearch={debouncedSearch.length > 0 || search.trim().length > 0} />}
        contentContainerStyle={s.listContent}
      />

      <TodoModal ref={modalRef} onSave={fetchTodos} />
    </SafeAreaView>
  );
}
