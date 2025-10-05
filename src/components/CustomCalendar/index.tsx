import { CustomBottomSheetModal } from "@/components/CustomBottomSheetModal";
import theme from "@/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button } from "../Button";
import { s } from "./styles";

export type BottomSheetSelectHandles = {
  open: () => void;
  close: () => void;
};

interface BottomSheetSelectProps {
}

export const CustomCalendar = forwardRef<BottomSheetSelectHandles, BottomSheetSelectProps>(
  (_, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.present();
      },
      close: () => {
        bottomSheetRef.current?.dismiss();
      },
    }));

    return (
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        style={{backgroundColor: theme.colors.darkGray,  borderRadius: 20}}
      >
        <View style={s.container}>
          <Calendar
          theme={{
            backgroundColor: theme.colors.darkGray,
            calendarBackground: theme.colors.darkGray,
            textSectionTitleColor: theme.colors.white + "60",
          }}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10}}>
            <Button 
            style={{
              backgroundColor: theme.colors.gray[400],
              borderColor: theme.colors.gray[400],
flex: 1
            }}
            description="Cancelar" onPress={() => {}} />
            <Button description="Confirmar" onPress={() => {}} style={{flex: 2}}/>
          </View>
        </View>
      </CustomBottomSheetModal>
    );
  }
);

CustomCalendar.displayName = "CustomCalendar";
