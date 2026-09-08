import { themes, Typography } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type SegmentedToggleOption = {
  label: string;
  value: string;
};

type SegmentedToggleProps = {
  options: [SegmentedToggleOption, SegmentedToggleOption];
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
            style={[styles.segment, isSelected && styles.selectedSegment]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected
                    ? themes.light.text
                    : themes.light.textSecondary,
                  fontFamily: isSelected
                    ? Typography.fontFamily.bold
                    : Typography.fontFamily.medium,
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
  selectedSegment: {
    backgroundColor: themes.light.background,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
