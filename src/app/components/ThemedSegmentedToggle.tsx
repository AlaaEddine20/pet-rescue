import React from "react";
import { Pressable, Text, View } from "react-native";

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
    <View className="flex-row self-stretch rounded-full bg-secondary p-1">
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={`flex-1 items-center justify-center rounded-full py-[10px] ${
              isSelected ? "bg-background shadow-sm" : ""
            }`}
          >
            <Text
              className={
                isSelected
                  ? "font-pet-bold text-sm text-foreground"
                  : "font-pet-medium text-sm text-blue-600"
              }
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
