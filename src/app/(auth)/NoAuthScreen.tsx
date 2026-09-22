import { ScreenContainer } from "@/components/ScreenContainer";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { SegmentedToggle } from "@/components/ThemedSegmentedToggle";
import { LOGO_SOURCES } from "@/lib/constants";
import { useState } from "react";
import { Image, Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const NoAuthScreen = () => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<"signin" | "register">("signin");

  const handleLoginOrRegister = (value: string) => {
    setMode(value === "signin" ? "signin" : "register");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <View className="self-center">
          <Animated.View>
            <Image
              source={
                colorScheme === "dark" ? LOGO_SOURCES.dark : LOGO_SOURCES.light
              }
              resizeMode="contain"
              style={{
                width: 300,
                height: 300,
              }}
            />
          </Animated.View>
        </View>
        <Animated.View>
          <Text className="mb-5 text-center font-pet-medium text-base leading-5 text-muted-foreground">
            Find and rescue abandoned pets near you
          </Text>
        </Animated.View>
        <View className="mt-5 w-full justify-center">
          <Animated.View>
            <SegmentedToggle
              value={mode}
              onChange={handleLoginOrRegister}
              options={[
                { label: "Sign in", value: "signin" },
                { label: "Register", value: "register" },
              ]}
            />
          </Animated.View>
        </View>
        <View className="mt-5 w-full justify-center">
          <Animated.View>
            {mode === "signin" ? <SignInForm /> : <SignUpForm />}
          </Animated.View>
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default NoAuthScreen;
