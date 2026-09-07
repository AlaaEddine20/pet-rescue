import NoAuthPage from "@/pages/noAuth";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

const safeArea = { flex: 1 };

const Index = () => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={safeArea}>
          <NoAuthPage />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default Index;
