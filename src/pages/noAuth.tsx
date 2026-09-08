import { RegisterForm } from "@/components/register";
import { SignInForm } from "@/components/signIn";
import { SegmentedToggle } from "@/components/themed-auth-toggler";
import { ThemedText } from "@/components/themed-text";
import {
  FORM_FADE_DURATION,
  LOGO_ANIMATION_DURATION,
  LOGO_SOURCES,
  Spacing,
  SUBMIT_BUTTON_SLIDE_DURATION,
} from "@/constants/theme";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const NoAuthPage = () => {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const logoSize = useSharedValue(100);
  const formOpacity = useSharedValue(0);
  const captionOpacity = useSharedValue(0);
  const submitButtonSlide = useSharedValue(0);

  useEffect(() => {
    logoSize.value = withTiming(40, {
      duration: LOGO_ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    formOpacity.value = withDelay(
      LOGO_ANIMATION_DURATION,
      withTiming(1, { duration: FORM_FADE_DURATION }),
    );
    captionOpacity.value = withDelay(
      LOGO_ANIMATION_DURATION,
      withTiming(1, { duration: FORM_FADE_DURATION }),
    );
    submitButtonSlide.value = withDelay(
      SUBMIT_BUTTON_SLIDE_DURATION,
      withTiming(1, { duration: SUBMIT_BUTTON_SLIDE_DURATION }),
    );
  }, [logoSize, formOpacity, captionOpacity, submitButtonSlide]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    width: `${logoSize.value}%`,
  }));

  const captionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: captionOpacity.value,
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const handleLoginOrRegister = (value: string) => {
    setMode(value === "signin" ? "signin" : "register");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[logoAnimatedStyle, styles.logoContainer]}>
        <Image
          source={LOGO_SOURCES["light"]}
          resizeMode="contain"
          style={{
            width: "100%",
            aspectRatio: 1.5,
            position: "relative",
            height: 300,
          }}
        />
      </Animated.View>
      <Animated.View style={captionAnimatedStyle}>
        <ThemedText variant="caption">
          Find and rescue abandoned pets near you
        </ThemedText>
      </Animated.View>
      <Animated.View style={[formAnimatedStyle, styles.formContainer]}>
        <SegmentedToggle
          value={mode}
          onChange={(v) => handleLoginOrRegister(v)}
          options={[
            { label: "Sign in", value: "signin" },
            { label: "Register", value: "register" },
          ]}
        />
      </Animated.View>
      <Animated.View style={[formAnimatedStyle, styles.formContainer]}>
        {mode === "signin" ? (
          <SignInForm submitButtonSlide={submitButtonSlide} />
        ) : (
          <RegisterForm submitButtonSlide={submitButtonSlide} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.m,
    overflow: "scroll",
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
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
});

export default NoAuthPage;
