import { Button } from "@/components/Button";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { View } from "react-native";
import { taskTypes } from "../../types";
import { s } from "./styles";

interface TaskActionsProps {
  isLoading: boolean;
  onRemove?: () => void;
  handleSubmit: UseFormHandleSubmit<taskTypes>;
  onSubmit: SubmitHandler<taskTypes>;
  taskId?: number;
}

export function TaskActions({
  isLoading,
  onSubmit,
  onRemove,
  handleSubmit,
  taskId,
}: TaskActionsProps) {

  return (
    <View style={s.container}>
      {taskId ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            description="Edit Task"
            style={{ flex: 1 }}
             onPress={handleSubmit(onSubmit)}
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            description="Delete Task"
            style={{
              backgroundColor: "#4F4F4F",
              borderColor: "#4F4F4F",
              flex: 1,
            }}
            onPress={onRemove}
          />
        </View>
      ) : (
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          description="Criar Task"
          onPress={() => handleSubmit(onSubmit)()}
        />
      )}
    </View>
  );
}
