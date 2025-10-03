import theme from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

interface WeekPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}
dayjs.locale("pt-br");
export function WeekPicker<T extends FieldValues>({
  control,
  name,
}: WeekPickerProps<T>) {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  );

  const getWeekDays = (start: dayjs.Dayjs | Date) => {
    const base = dayjs(start);
    return Array.from({ length: 7 }).map((_, i) => base.add(i, "day"));
  };
  const days = getWeekDays(startDate);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const selectedDate = value ? dayjs(value) : dayjs();
        const renderItem = (item: dayjs.Dayjs) => {
          const isSelected = item.isSame(selectedDate, "day");
          const weekday = item.format("ddd");

          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item)
                if (item.isBefore(dayjs(), "day")) {
                  Toast.show({
                    type: "info",
                    text1: "Data não pode ser inferior ao dia atual",
                    position: "bottom",
                  });
                  return;
                }
                onChange(item.toISOString());
              }}
              style={[
                styles.dayContainer,
                { borderColor: isSelected ? "#A78BFA" : "transparent" },
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: isSelected ? "#A78BFA" : theme.colors.white + "60" },
                ]}
              >
                {weekday}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  { color: isSelected ? "#A78BFA" : theme.colors.white + "60" },
                ]}
              >
                {item.format("DD")}
              </Text>
            </TouchableOpacity>
          );
        };

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setStartDate((prev) => prev.subtract(7, "day"))}
              >
                <Entypo name="chevron-thin-left" size={20} color="#A78BFA" />
              </TouchableOpacity>

              <Text style={styles.headerText}>
                {selectedDate.format("DD [de] MMMM")}
              </Text>

              <TouchableOpacity
                onPress={() => setStartDate((prev) => prev.add(7, "day"))}
              >
                <Entypo name="chevron-thin-right" size={20} color="#A78BFA" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={days}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item.format("YYYY-MM-DD")}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ justifyContent: "center" }}
            />
          </View>
        );
      }}
    />
  );
}
