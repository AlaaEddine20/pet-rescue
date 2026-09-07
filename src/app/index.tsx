import { ThemedView } from "@/components/themed-view";
import NoAuthPage from "@/pages/noAuth";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

const safeArea = { flex: 1 };

const Index = () => {
  return (
    <SafeAreaProvider>
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView style={safeArea}>
          <NoAuthPage />
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
};

export default Index;
