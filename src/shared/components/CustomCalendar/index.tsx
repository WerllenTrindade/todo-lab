import theme from "@/shared/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button } from "../Button";
import { CustomBottomSheetModal } from "../CustomBottomSheetModal";
import { s } from "./styles";

export type BottomSheetSelectHandles = {
  open: () => void;
  close: () => void;
};

interface BottomSheetSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const CustomCalendar = forwardRef(function CustomCalendar<
  T extends FieldValues
>(
  { control, name }: BottomSheetSelectProps<T>,
  ref: React.Ref<BottomSheetSelectHandles>
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedDateTemp, setSelectedDateTemp] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleConfirm = () => {
          if (selectedDateTemp) {
            onChange(selectedDateTemp);
          }
          bottomSheetRef.current?.dismiss();
        };

        const handleCancel = () => {
          setSelectedDateTemp(null);
          bottomSheetRef.current?.dismiss();
        };

        return (
          <CustomBottomSheetModal
            ref={bottomSheetRef}
            enableDynamicSizing
            style={{
              backgroundColor: theme.colors.darkGray,
              borderRadius: 20,
            }}
          >
            <View style={s.container}>
              <Calendar
                markedDates={{
                  ...(value
                    ? {
                        [value]: {
                          selected: true,
                          selectedColor: theme.colors.primary,
                        },
                      }
                    : {}),
                  ...(selectedDateTemp && selectedDateTemp !== value
                    ? {
                        [selectedDateTemp]: {
                          selected: true,
                          selectedColor: theme.colors.gray[300],
                        },
                      }
                    : {}),
                }}
                onDayPress={(day) => setSelectedDateTemp(day.dateString)}
                theme={{
                  backgroundColor: theme.colors.darkGray,
                  calendarBackground: theme.colors.darkGray,
                  textSectionTitleColor: theme.colors.white + "60",
                  dayTextColor: theme.colors.white,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: theme.colors.white,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <Button
                  style={{
                    backgroundColor: theme.colors.gray[400],
                    borderColor: theme.colors.gray[400],
                    flex: 1,
                  }}
                  description="Cancelar"
                  onPress={handleCancel}
                />
                <Button
                  description="Confirmar"
                  onPress={handleConfirm}
                  style={{ flex: 2 }}
                />
              </View>
            </View>
          </CustomBottomSheetModal>
        );
      }}
    />
  );
});

CustomCalendar.displayName = "CustomCalendar";
