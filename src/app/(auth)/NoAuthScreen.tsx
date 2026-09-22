import { ScreenContainer } from "@/components/ScreenContainer";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { SegmentedToggle } from "@/components/ThemedSegmentedToggle";
import { LOGO_SOURCES } from "@/lib/constants";
import { AuthMode } from "@/types/Auth";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoAuthScreen = () => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenContainer>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="self-center">
              <Image
                source={
                  colorScheme === "dark"
                    ? LOGO_SOURCES.dark
                    : LOGO_SOURCES.light
                }
                resizeMode="contain"
                style={{
                  width: 213,
                  height: 273,
                }}
              />
            </View>
            <Text className="mb-5 text-center font-pet-medium text-base leading-5 text-muted-foreground">
              Find and rescue abandoned pets near you
            </Text>
            <View className="mt-5 w-full justify-center">
              <SegmentedToggle
                value={mode}
                onChange={setMode}
                options={[
                  { label: "Sign in", value: "signin" },
                  { label: "Sign up", value: "signup" },
                ]}
              />
            </View>
            <View className="mt-5 w-full justify-center">
              {mode === "signin" ? <SignInForm /> : <SignUpForm />}
            </View>
          </ScrollView>
        </ScreenContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoAuthScreen;
