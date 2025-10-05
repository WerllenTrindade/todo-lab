import { CardPriority } from "@/components/CardPriority";
import { CustomSwitch } from "@/components/CustomSwitch";
import { HeaderCreateTask } from "@/components/HeaderCreateTask";
import { InputForm } from "@/components/Inputs/InputForm";
import { TimeInput } from "@/components/TimePicker";
import { WeekPicker } from "@/components/WeekPicker";
import { PRIORITYS } from "@/constants/priorities";
import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskActions } from "./components/footer/ButtonEdith";
import { s } from "./styles";
import { useTaskForm } from "./useTaskForm";

interface TaskFormProps {
  id: number
}


export function TaskForm({id}: TaskFormProps) {
  const { control, onRemove, handleSubmit, onSubmit, isSubmitting, loading } = useTaskForm({id});

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={20}
      >
        <HeaderCreateTask/>

        <KeyboardAwareScrollView
          contentContainerStyle={s.scrollContainer}
          extraScrollHeight={50}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >

          <WeekPicker control={control} name="date" />

          <View>
            <Text style={s.title}>Agendar</Text>

            <InputForm placeholder="Nome" control={control} name="title" />

            <InputForm
              style={s.descriptionInput}
              placeholderTextColor={"#FFF"}
              placeholder="Descrição"
              control={control}
              name="description"
            />

            <View style={s.timeRow}>
              <View style={s.timeInput}>
                <TimeInput
                  control={control}
                  name="startTime"
                  title="Hora de início"
                />
              </View>
              <View style={s.timeInput}>
                <TimeInput
                  control={control}
                  name="endTime"
                  title="Hora do fim"
                />
              </View>
            </View>

            <View>
              <Text style={s.title}>Prioridade</Text>
              <View style={s.priorityRow}>
                {PRIORITYS.map((priority) => (
                  <CardPriority
                    
                    key={priority.value}
                    control={control}
                    data={priority}
                    name="priority"
                  />
                ))}
              </View>
            </View>

            <View style={s.alertRow}>
              <Text style={s.alertText}>Receba alertas para esta tarefa</Text>
              <CustomSwitch control={control} name="alert" />
            </View>
          </View>
        </KeyboardAwareScrollView>

       <TaskActions handleSubmit={handleSubmit}
          taskId={id}
          isLoading={isSubmitting || loading}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
