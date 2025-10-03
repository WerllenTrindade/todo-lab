import { PRIORITY } from "@/constants/priorities";
import { ROUTERS } from "@/router";
import { useTaskService } from "@/service/taskService";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { taskSchema } from "./schemas";
import { taskTypes } from "./types";

interface useTaskFormProps {
  id: number;
}

export function useTaskForm({ id }: useTaskFormProps) {
  const { addTask, fetchTaskDetails, deleteTask, editTask } = useTaskService();
  const [loading, setLoading] = useState(false);

  const form = useForm<taskTypes>({
    resolver: zodResolver(taskSchema) as unknown as Resolver<taskTypes>,
    mode: "onChange",
    defaultValues: {
      id: undefined,
      alert: false,
      date:  dayjs().toISOString(),
      description: "",
      endTime: dayjs().add(1, "hour").format("HH:mm"),
      priority: PRIORITY.BAIXA,
      startTime: dayjs().format("HH:mm"),
      title: "",
    },
  });

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = form;


  useFocusEffect(
    useCallback(() => {
      if (id) {
        setLoading(true);
        fetchTaskDetails(id)
          .then((task) => {
            if (task) {
              reset({
                id: task.id,
                title: task.title,
                description: task.description ?? "",
                date: task.date,
                startTime: task.startTime,
                endTime: task.endTime,
                priority: task.priority as PRIORITY,
                alert: task.alert ? true : false,
              });
            }
          })
          .finally(() => setLoading(false));
      }
    }, [id])
  );

  const onSubmit = async (data: taskTypes) => {
    console.log('sub')
    try {
      let success: boolean;

      if (id) {
        
        success = await editTask(data);
      } else {
        success = await addTask(data);
      }

      if (success) {
        Toast.show({
          type: "success",
          text1: id
            ? "Task atualizada com sucesso!"
            : "Task criada com sucesso!",
          position: "bottom",
        });
        router.replace(ROUTERS.HOME);
      } else {
        Alert.alert(
          "Atenção",
          id ? "Erro ao atualizar task" : "Erro ao criar task"
        );
      }
    } catch (error) {
      Alert.alert("Erro inesperado", "Tente novamente mais tarde.");
      console.error(error);
    }
  };


  const onRemove = async () => {
    try {
      Alert.alert("Excluir Task", "Tem certeza que deseja excluir esta task?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            const success = await deleteTask(id);
            setLoading(false);

            if (success) {
              Toast.show({
                type: "success",
                text1: "Task excluída com sucesso!",
                position: "bottom",
              });
              router.replace(ROUTERS.HOME);
            } else {
              Alert.alert("Erro", "Não foi possível excluir a task");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao excluir task:", error);
      Alert.alert("Erro", "Algo deu errado ao excluir a task");
    }
  };


  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    getValues,
    errors,
    loading,
    watch,
    onRemove,
  };
}
