import { themes } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// ---- Theme -----------------------------------------------------------
export type SegmentedToggleOption = {
  label: string;
  value: string;
};

type SegmentedToggleProps = {
  options: [SegmentedToggleOption, SegmentedToggleOption]; // exactly two, like the screenshot
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedToggle({
  options,
  value,
  onChange,
}: SegmentedToggleProps) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes.light.backgroundElement },
      ]}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              isSelected && {
                backgroundColor: themes.light.background,
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected
                    ? themes.light.text
                    : themes.light.textSecondary,
                  fontWeight: isSelected ? "700" : "500",
                },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ---- Styles -----------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 999,
    padding: 4,
    alignSelf: "stretch",
  },
  segment: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
  },
});

// ---- Example usage -----------------------------------------------------
//
// const [mode, setMode] = useState("signin");
//
// <SegmentedToggle
//   value={mode}
//   onChange={setMode}
//   options={[
//     { label: "Sign in", value: "signin" },
//     { label: "Register", value: "register" },
//   ]}
// />
