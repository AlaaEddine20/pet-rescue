import { Pressable, Text, View } from "react-native";

export type SegmentedToggleOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedToggleProps<T extends string> = {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <View className="flex-row self-stretch rounded-full bg-secondary p-1">
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={`flex-1 items-center justify-center rounded-full py-[10px] will-change-variable ${
              isSelected ? "bg-background shadow-sm" : ""
            }`}
          >
            <Text
              className={
                isSelected
                  ? "font-pet-bold text-md text-foreground"
                  : "font-pet-medium text-md text-blue-600"
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
