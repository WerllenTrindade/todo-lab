import theme from '@/theme';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';

interface WeekPickerProps {
  control: any; // Controller do react-hook-form
  name: string;
}

export function WeekPicker({ control, name }: WeekPickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));

  function getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    return start;
  }

  function getWeekDays(start: Date) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  }

  const days = getWeekDays(startDate);

  const renderItem = ({ item }: { item: Date }, onChange: (date: Date) => void) => {
    const isSelected = item.toDateString() === selectedDate.toDateString();
    const weekday = item.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(item);
          onChange(item); // atualiza o valor no form
        }}
        style={[styles.dayContainer, { borderColor: isSelected ? "#A78BFA" : "transparent" }]}
      >
        <Text style={[styles.dayText, { color: isSelected ? "#A78BFA" : theme.colors.white + "60" }]}>
          {weekday}
        </Text>
        <Text style={[styles.dateText, { color: isSelected ? "#A78BFA" : theme.colors.white + "60" }]}>
          {item.getDate().toString().padStart(2, "0")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={selectedDate}
      render={({ field: { value, onChange } }) => {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setStartDate(prev => new Date(prev.setDate(prev.getDate() - 7)))}>
                <Entypo name="chevron-thin-left" size={20} color="#A78BFA" />
              </TouchableOpacity>

              <Text style={styles.headerText}>
                {selectedDate.toLocaleString("default", { day: "2-digit", month: "long" })}
              </Text>

              <TouchableOpacity onPress={() => setStartDate(prev => new Date(prev.setDate(prev.getDate() + 7)))}>
                <Entypo name="chevron-thin-right" size={20} color="#A78BFA" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={days}
              renderItem={({ item }) => renderItem({ item }, onChange)}
              keyExtractor={(item) => item.toDateString()}
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
