import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenContainer = ({ children, style, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
      className=" bg-background"
    >
      <View
        style={[{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }, style]}
        {...props}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenContainer;
