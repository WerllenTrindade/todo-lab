import { PriorityOption } from "@/constants/priority";
import theme from "@/theme";
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
        console.log("value ", value);
        console.log(" data.value ", data.value);

        const selected = value === data.value;

        return (
          <TouchableOpacity
            {...rest}
            onPress={() => onChange(data.value)}
            style={[
              s.container,
              {
                borderColor: selected ? "#FACBBA" : "#D7F0FF",
                backgroundColor: selected ? "#FACBBA" : "transparent",
              },
            ]}
          >
            <Text
              style={[
                s.text,
                {
                  color: selected ? "transparent" : "white",
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
