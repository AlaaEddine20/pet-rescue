import ScreenContainer from "@/components/ScreenContainer";
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

            <Text className="my-4 text-center font-pet-medium leading-normal text-base leading-5 text-muted-foreground">
              Hai trovato un cane o un gatto disperso o abbandonato? Segnalalo
              con la sua posizione e aiuta volontari e associazioni a metterlo
              in salvo.
            </Text>

            <View className="mt-5 w-full justify-center">
              <SegmentedToggle
                value={mode}
                onChange={setMode}
                options={[
                  { label: "Login", value: "signin" },
                  { label: "Registrati", value: "signup" },
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
