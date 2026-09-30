import ScreenContainer from "@/components/ScreenContainer";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { SegmentedToggle } from "@/components/ThemedSegmentedToggle";
import { LOGO_SOURCES } from "@/lib/constants";
import { labels } from "@/locales";
import { AuthMode } from "@/types/AuthType";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoAuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <ScreenContainer>
            <View className="self-center">
              <Image
                source={LOGO_SOURCES.light}
                resizeMode="contain"
                style={{
                  width: 213,
                  height: 213,
                }}
              />
            </View>

            <Text className="my-4 text-center font-pet-sm leading-normal text-base leading-5 text-muted-foreground">
              {labels.noAuthScreen.intro}
            </Text>

            <View className="mt-5 w-full justify-center">
              <SegmentedToggle
                value={mode}
                onChange={setMode}
                options={[
                  { label: labels.noAuthScreen.tabs.login, value: "signin" },
                  { label: labels.noAuthScreen.tabs.signup, value: "signup" },
                ]}
              />
            </View>

            <View className="mt-5 w-full">
              {mode === "signin" ? <SignInForm /> : <SignUpForm />}
            </View>
          </ScreenContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoAuthScreen;
