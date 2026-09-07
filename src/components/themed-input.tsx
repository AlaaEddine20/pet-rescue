import { Spacing, themes } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const ThemedInput = ({
  onChangeText,
  placeholder,
  ...rest
}: ThemedInputProps) => {
  return (
    <TextInput
      id={"themed-input"}
      style={styles.input}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: themes.light.backgroundElement,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
    borderWidth: 0,
    borderRadius: 8,
    padding: Spacing.s,
    marginVertical: Spacing.xs,
    fontSize: 12,
    color: themes.light.textSecondary,
    margin: 0,
    width: "100%",
  },
});

export default ThemedInput;