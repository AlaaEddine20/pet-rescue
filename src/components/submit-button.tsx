import { Spacing } from "@/constants/theme";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface SubmitButtonProps {
  style?: StyleProp<ViewStyle>;
  onSubmit: () => void;
  children?: React.ReactNode;
}

const SubmitButton = ({ style, onSubmit, children }: SubmitButtonProps) => {
  return (
    <Pressable
      style={[styles.defaultButton, style]}
      onPress={onSubmit}
      accessibilityRole="button"
      accessibilityLabel="Submit Button"
    >
      {children}
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  defaultButton: {
    borderRadius: 8,
    paddingVertical: Spacing.m,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
