
import { CardPriority } from "@/shared/components/CardPriority";
import { CustomSwitch } from "@/shared/components/CustomSwitch";
import { Header } from "@/shared/components/Header";
import { InputForm } from "@/shared/components/Inputs/InputForm";
import { TimeInput } from "@/shared/components/TimePicker";
import { WeekPicker } from "@/shared/components/WeekPicker";
import { PRIORITYS } from "@/shared/constants/priorities";
import { router } from "expo-router";
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
        <Header 
        onBack={() => router.back()}
        title="Criar Task"
        />

        <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
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

                 <TaskActions handleSubmit={handleSubmit}
          taskId={id}
          isLoading={isSubmitting || loading}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
        </KeyboardAwareScrollView>


      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
