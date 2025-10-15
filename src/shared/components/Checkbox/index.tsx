import theme from '@/shared/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import s from './styles';

export enum ICON_CHECKBOX {
  ALL = 0,
  SINGLE = 1
} 

interface Props extends TouchableOpacityProps {
  label?: string;
  check: boolean;
  type?: ICON_CHECKBOX
}

export const Checkbox = ({ label, type = ICON_CHECKBOX.SINGLE ,check, ...rest }: Props) => {
    return (
        <View style={s.container}>
       <TouchableOpacity
  testID="checkbox-button"
  activeOpacity={0.7}
  style={[
    s.button,
    check && { borderColor: theme.colors.green[600], backgroundColor: theme.colors.green[600] }
  ]}
  {...rest}
>
  {check &&
    (type === ICON_CHECKBOX.SINGLE ? (
      <View testID="icon-check">
        <Feather name="check" size={15} color="#FFF" />
      </View>
    ) : (
      <View testID="icon-minus">
        <Feather name="minus" size={15} color="#FFF" />
      </View>
    ))}
</TouchableOpacity>

        <Text style={s.text}>{label}</Text>
      </View>
    )
}