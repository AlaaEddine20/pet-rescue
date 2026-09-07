import { ThemedView } from "@/components/themed-view";
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
    <ThemedView style={styles.inputContainer}>
      <TextInput
        id={"themed-input"}
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize="none"
        {...rest}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
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
  },
  input: {
    fontSize: 12,
    color: themes.light.textSecondary,
    padding: 8,
    margin: 0,
    width: "100%",
  },
});

export default ThemedInput;
