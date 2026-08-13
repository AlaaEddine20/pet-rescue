import ThemedForm from "@/components/themed-form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  FORM_FADE_DURATION,
  LOGO_ANIMATION_DURATION,
  LOGO_SOURCES,
  Spacing,
} from "@/constants/theme";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const NoAuthPage = () => {
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
    <ThemedView style={styles.container}>
      <Animated.View style={[logoAnimatedStyle, styles.logoContainer]}>
        <Image
          source={LOGO_SOURCES["light"]}
          resizeMode="contain"
          style={{
            width: "100%",
            aspectRatio: 1.5,
            position: "relative",
            height: "100%",
          }}
        />
      </Animated.View>
      <ThemedText variant="title">
        Find and rescue abandoned pets near you
      </ThemedText>
      <Animated.View style={[formAnimatedStyle, styles.formContainer]}>
        <ThemedForm />
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.m,
  },
  image: {
    width: "100%",
    height: "auto",
    position: "relative",
  },
  logoContainer: {
    alignSelf: "center",
  },
  formContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: "center",
  },
});

export default NoAuthPage;
