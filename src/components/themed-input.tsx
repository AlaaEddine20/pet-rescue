import { Spacing, themes, Typography } from "@/constants/theme";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder?: string;
  id?: string;
  error?: string;
}

const ThemedInput = ({
  onChangeText,
  placeholder,
  id,
  error,
  ...rest
}: ThemedInputProps) => {
  return (
    <>
      <TextInput
        id={id}
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize="none"
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </>
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
    fontSize: Typography.fontSize.xs,
    color: themes.light.textSecondary,
    fontFamily: Typography.fontFamily.medium,
    margin: 0,
    width: "100%",
  },
  error: {
    color: themes.light.error,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
  },
});

export default ThemedInput;
