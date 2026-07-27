import { ThemedForm } from "@/components/themed-form";
import { ThemedView } from "@/components/themed-view";
import {
  FORM_FADE_DURATION,
  LOGO_ANIMATION_DURATION,
  LOGO_SOURCES,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useMemo } from "react";
import { Image } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const NoAuthPage = () => {
  const colorScheme = useColorScheme();

  const currentTheme = useMemo(() => {
    return colorScheme === "dark" ? "dark" : "light";
  }, [colorScheme]);

  const logoSize = useSharedValue(100);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    logoSize.value = withTiming(30, {
      duration: LOGO_ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    formOpacity.value = withDelay(
      LOGO_ANIMATION_DURATION,
      withTiming(1, { duration: FORM_FADE_DURATION }),
    );
  }, [logoSize, formOpacity]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    width: `${logoSize.value}%`,
    height: `${logoSize.value}%`,
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  return (
    <ThemedView
      className="flex-1 items-center justify-start px-4 pt-10"
      type="background"
    >
      <Animated.View className="self-center" style={logoAnimatedStyle}>
        <Image
          source={LOGO_SOURCES[currentTheme]}
          className="h-full w-full"
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View
        className="mt-[30px] w-full justify-center"
        style={formAnimatedStyle}
      >
        <ThemedForm />
      </Animated.View>
    </ThemedView>
  );
};

export default NoAuthPage;
