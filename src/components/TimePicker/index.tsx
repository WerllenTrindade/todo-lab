import theme from "@/theme";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { forwardRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { s } from "./styles";
import { useTimePicker } from "./useTimePicker";

interface TimeInputProps<T extends FieldValues> {
  title?: string;
  control: Control<T>;
  name: Path<T>;
}

function TimeInputInner<T extends FieldValues>(
  { title, control, name }: TimeInputProps<T>,
  ref: any
) {
        
  const { parseTime } = useTimePicker();
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {

     const currentTime = parseTime(value);

      const handleChange = (_: any, selectedTime?: Date) => {
        setShow(Platform.OS === "ios");
        if (selectedTime) {
          const hours = String(selectedTime.getHours()).padStart(2, '0');
          const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
          onChange(`${hours}:${minutes}`);
        }
      };
        return (
          <View style={s.container} ref={ref}>
            {title && <Text style={s.label}>{title}</Text>}

            <TouchableOpacity style={s.input} onPress={() => setShow(true)}>
              <Feather name="clock" size={24} color={theme.colors.primary} />
              <Text style={s.text}>
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={currentTime}
                mode="time"
                display="spinner"
                onChange={handleChange}
              />
            )}
          </View>
        );
      }}
    />
  );
}

export const TimeInput = forwardRef(TimeInputInner) as <T extends FieldValues>(
  props: TimeInputProps<T> & { ref?: any }
) => React.ReactElement;

