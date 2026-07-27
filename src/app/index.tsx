import { ThemedForm } from "@/components/themed-form";
import { ThemedView } from "@/components/themed-view";
import {
  FORM_FADE_DURATION,
  LOGO_ANIMATION_DURATION,
  LOGO_SOURCES,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
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
    <SafeAreaProvider>
      <ThemedView style={styles.container} type="background">
        <Animated.View style={[styles.logo, logoAnimatedStyle]}>
          <Image
            source={LOGO_SOURCES[currentTheme]}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View style={[styles.formWrapper, formAnimatedStyle]}>
          <ThemedForm />
        </Animated.View>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  logo: {
    alignSelf: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
    textAlign: "center",
  },
});
