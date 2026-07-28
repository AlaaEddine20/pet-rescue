import { StyleProp, View, ViewStyle } from "react-native";

interface ThemedViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View {...otherProps} style={style} />;
}
