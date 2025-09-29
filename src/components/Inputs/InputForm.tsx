import theme from "@/theme";
import { MasksTypes } from "@/utils/masks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native";
import { InputMask } from "./InputMask";

interface InputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  title?: string;
  mask?: MasksTypes;
  loading?: boolean
  clearable?: boolean
  secureTextEntry?: boolean;
  require?: boolean;
}

export function InputForm({ name, control, mask, require = false, title, style, clearable = false, secureTextEntry = false, ...rest }: InputProps) {
  const [eye, setEye] = useState(secureTextEntry)
  return (
    <View style={{  position: "relative" }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => (
          <View>
            <Text numberOfLines={1} style={styles.title}>{title}{require && '*'}</Text>
            <View>
              <InputMask
                placeholderTextColor={theme.colors.white}
                style={[
                  styles.input,
                  style,
                  error && { borderColor: theme.colors.red[500], color: theme.colors.red[500] },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                mask={mask}
                value={value}
                secureTextEntry={eye}
                {...rest}
              />
              <View style={styles.actionContainer}>
                {clearable && !!value ?
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => onChange("")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialIcons name="close" size={18} color="#6a6a6a" />
                  </TouchableOpacity>
                  :
                  null
                }

                {secureTextEntry ?
                  <TouchableOpacity
                    onPress={() => setEye(prev => !prev)}
                    style={styles.secretButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={eye ? "eye-outline" : "eye-off-outline"}
                      size={22}
                      color={'#6a6a6a'}
                    />
                  </TouchableOpacity>
                  :
                  null
                }
              </View>
            </View>
            {error ? <Text style={styles.error}>{error.message}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.interMedium_500,
    fontSize: 14,
    color: "#363636",
    marginBottom: 2,

  },
  actionContainer: {
    position: "absolute",
    height: 50,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  secretButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    borderWidth: 1,
    backgroundColor: '#181818',
    borderColor: "#181818",
    color: theme.colors.white,
    borderRadius: 14,
    paddingLeft: 10,
    paddingRight: 45,
    fontSize: 16,
    fontFamily: theme.fonts.interRegular_400
  },
  error: {
    marginTop: 6,
    fontSize: 10,
    fontFamily: theme.fonts.interMedium_500,
    color: theme.colors.red[500],
  },
});