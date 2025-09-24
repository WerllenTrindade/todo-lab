// src/components/TodoModal/TodoModal.tsx
import { Todo } from "@/service/todosService";
import { CustomBottomSheetModal } from "@/ui/custom-bottom-sheet-modal";
import { editTodo, saveTodo } from "@/viewmodels/todosViewModel";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Alert, Keyboard, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export interface TodoModalHandle {
  open: (todo?: Todo) => void;
  close: () => void;
}

interface TodoModalProps {
  onSave?: () => void;
}

export const TodoModal = forwardRef<TodoModalHandle, TodoModalProps>(
  ({ onSave }, ref) => {
    const [title, setTitle] = useState("");
    const [id, setId] = useState<string | null>(null);
    const sheetRef = useRef<any>(null);

    /** Reseta os campos do modal */
    const resetFields = () => {
      setTitle("");
      setId(null);
    };

    /** Salva ou edita o todo */
    const handleSubmit = async () => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return Alert.alert("Campo obrigatório", "Digite um título para salvar.");
      }

      try {
        if (id) {
          await editTodo(id, trimmedTitle);
        } else {
          await saveTodo({ title: trimmedTitle, completed: false });
        }

      Toast.show({
          type: "success",
          text1: `Card ${id ? 'editado' : 'salvo'} com sucesso!`,
          position: "bottom",
        });

        Keyboard.dismiss();
        sheetRef.current?.dismiss?.();
        resetFields();
        onSave?.();
      } catch (error) {
        console.error("Erro ao salvar todo:", error);
        Alert.alert("Erro", "Não foi possível salvar o todo.");
      }
    };

    useImperativeHandle(ref, () => ({
      open: (todo?: Todo) => {
        setTitle(todo?.title ?? "");
        setId(todo?.id ?? null);
        sheetRef.current?.present?.();
      },
      close: () => {
        sheetRef.current?.dismiss?.();
        resetFields();
      },
    }));

    return (
      <CustomBottomSheetModal
        ref={sheetRef}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        onClose={resetFields}
      >
        <BottomSheetView style={styles.container}>
          <BottomSheetTextInput
            placeholder="Título do todo"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>{id ? "Editar" : "Salvar"}</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);

TodoModal.displayName = "TodoModal";
