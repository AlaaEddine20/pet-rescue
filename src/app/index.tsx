import { ThemedView } from "@/components/themed-view";
import NoAuthPage from "@/pages/noAuth";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// SafeAreaView reads numeric padding off its style prop to add the insets onto,
// so it cannot be styled with utility classes: on web it flattens them to 0 and
// writes an inline padding that outranks them. It stays style-driven here, and
// the ThemedView behind it paints the background through the inset strip.
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
