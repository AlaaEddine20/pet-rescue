import { Pressable, Text, View } from "react-native";

type FilterOption<T extends string> = { label: string; value: T };

type FilterChipsProps<T extends string> = {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const FilterChips = <T extends string>({
  options,
  value,
  onChange,
}: FilterChipsProps<T>) => (
  <View className="flex-row gap-2">
    {options.map((option) => {
      const isSelected = option.value === value;
      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          className={
            isSelected
              ? "rounded-full bg-blue-600 px-3.5 py-1.5"
              : "rounded-full border border-border px-3.5 py-1.5"
          }
        >
          <Text
            className={
              isSelected
                ? "font-pet-medium text-xs text-white"
                : "font-pet-medium text-xs text-muted-foreground"
            }
          >
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
