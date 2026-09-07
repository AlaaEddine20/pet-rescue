import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { StyleSheet, TextInput } from "react-native";

interface ThemedInputProps {
  onChange: (e: { nativeEvent: { text: string } }) => void;
  placeholder?: string;
}

const ThemedInput = ({ onChange, placeholder }: ThemedInputProps) => {
  return (
    <ThemedView style={styles.inputContainer}>
      <TextInput onChange={onChange} placeholder={placeholder} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: Spacing.m,
    marginVertical: Spacing.s,
  },
});

export default ThemedInput;
