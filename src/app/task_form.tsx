import { TaskForm } from "@/screens/TaskForm";
import { useLocalSearchParams } from "expo-router";

export default function TaskFormPage(){
      const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <TaskForm id={Number(id)}/>
    )
}