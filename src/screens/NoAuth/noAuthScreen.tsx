import { SignInForm } from "@/components/SignIn";
import { RegisterForm } from "@/components/SignUp";
import { SegmentedToggle } from "@/components/ThemedSegmentedToggle";
import { LOGO_SOURCES } from "@/lib/constants";
import { useState } from "react";
import { Image, Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";

const NoAuthScreen = () => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<"signin" | "register">("signin");

  const handleLoginOrRegister = (value: string) => {
    setMode(value === "signin" ? "signin" : "register");
  };

  return (
    <View className="flex-1 items-center justify-start bg-background px-2 pb-8 pt-4">
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
          {mode === "signin" ? <SignInForm /> : <RegisterForm />}
        </Animated.View>
      </View>
    </View>
  );
};

export default NoAuthScreen;
