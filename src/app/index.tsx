import { ThemedForm } from "@/components/themed-form";
import { ThemedView } from "@/components/themed-view";
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

const LOGO_ANIMATION_DURATION = 1000;
const FORM_FADE_DURATION = 400;

const LOGO_SOURCES = {
  light: require("../../assets/images/logo-light-theme.png"),
  dark: require("../../assets/images/logo-dark-theme.png"),
} as const;

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
