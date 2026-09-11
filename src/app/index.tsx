import NoAuthPage from "@/pages/noAuth";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <NoAuthPage />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;
