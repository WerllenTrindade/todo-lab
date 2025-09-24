// CustomBottomSheetModal.tsx
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface SimpleBottomSheetProps extends BottomSheetModalProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
}

export const CustomBottomSheetModal = forwardRef<BottomSheetModal, SimpleBottomSheetProps>(
  ({ children, style, scrollContentContainerStyle, onClose, ...rest }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        onDismiss={onClose}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#fff" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc", width: 40 }}
        style={style}
        enableHandlePanningGesture
        {...rest} // <-- agora vai aceitar keyboardBehavior e keyboardBlurBehavior
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            pressBehavior="close"
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ padding: 16 }, scrollContentContainerStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";
