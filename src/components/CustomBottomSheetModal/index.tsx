import theme from "@/theme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { BackdropPressBehavior } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { forwardRef, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { s } from "./styles";

export interface CustomBottomSheetModalProps extends BottomSheetModalProps {
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
  showBackdrop?: boolean;
  header?: React.ReactNode;
  scrollStyle?: StyleProp<ViewStyle>;
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
  backdropAppearsOnIndex?: number;
  backdropDisappearsOnIndex?: number;
  backgroundHeader?: string;
  useScroll?: boolean;
  useBottomSheetModal?: boolean;
  backdropPressBehavior?: BackdropPressBehavior;
  custom?: boolean;
}

export const CustomBottomSheetModal = forwardRef<
  BottomSheetModal | BottomSheet | null,
  CustomBottomSheetModalProps
>(
  (
    {
      onClose,
      children,
      useScroll = true,
      showBackdrop = true,
      custom = true,
      useBottomSheetModal = true,
      header,
      style,
      scrollStyle,
      scrollContentContainerStyle,
      backdropAppearsOnIndex = 0,
      backdropDisappearsOnIndex = -1,
      backgroundHeader = theme.colors.darkGray,
      backdropPressBehavior,
      ...rest
    },
    ref
  ) => {

    const BottomSheetModalComponent = useMemo(
      () => (useBottomSheetModal ? BottomSheetModal : BottomSheet),
      [useBottomSheetModal]
    );

    const containerStyle = StyleSheet.flatten(rest.containerStyle);

    return (
      <BottomSheetModalComponent
        ref={ref as React.RefObject<BottomSheetModal | null>}
        onDismiss={onClose}
        index={0}
        style={[style]}
        handleIndicatorStyle={s.indicator}
        backgroundStyle={{ backgroundColor: backgroundHeader }}
        enableHandlePanningGesture
        enablePanDownToClose={true}
        keyboardBehavior="extend"
        backdropComponent={
          showBackdrop
            ? (props) => (
                <BottomSheetBackdrop
                  {...props}
                  pressBehavior={backdropPressBehavior}
                  style={
                    
                    containerStyle?.zIndex
                      ? { zIndex: containerStyle.zIndex - 1 }
                      : undefined
                  }
                  disappearsOnIndex={backdropDisappearsOnIndex}
                  appearsOnIndex={backdropAppearsOnIndex}
                  opacity={0.5}
                />
              )
            : undefined
        }
        {...rest}
      >
          <View style={{ flex: 1,backgroundColor: theme.colors.background, borderRadius: 10 }}>
            {useScroll ? (
              <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[
                  {
                    flex: 1,
                    minHeight: "100%",
                  },
                  scrollStyle,
                ]}
                contentContainerStyle={scrollContentContainerStyle}
              >
                {children}
              </BottomSheetScrollView>
            ) : (
              children
            )}
          </View>
       
      </BottomSheetModalComponent>
    );
  }
);


CustomBottomSheetModal.displayName = "CustomBottomSheetModal";