import NoAuthScreen from "@/screens/NoAuth/NoAuthScreen";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <NoAuthScreen />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;
