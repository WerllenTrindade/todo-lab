import { PriorityOption } from "@/shared/constants/priorities";
import theme from "@/shared/theme";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { s } from "./styles";

interface CardPriorityProps<T extends FieldValues>
  extends TouchableOpacityProps {
  data: PriorityOption;
  control: Control<T>;
  name: Path<T>;
}

export function CardPriority<T extends FieldValues>({
  data,
  control,
  name,
  ...rest
}: CardPriorityProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const selected = value === data.value;

        return (
          <TouchableOpacity
            {...rest}
            onPress={() => onChange(data.value)}
            style={[
              s.container,
              {
                borderColor: selected
                  ? theme.colors.buttonAccent
                  : theme.colors.borderGray,
                backgroundColor: selected
                  ? theme.colors.buttonAccent
                  : "#FFF",
              },
            ]}
          >
            <Text
              style={[
                s.text,
                {
                  color: selected
                    ? theme.colors.white
                    : theme.colors.textPrimary,
                  fontFamily: selected
                    ? theme.fonts.interMedium_500
                    : theme.fonts.interRegular_400,
                },
              ]}
            >
              {data.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
