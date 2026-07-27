import NoAuthPage from "@/pages/noAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaProvider>
      <NoAuthPage />
    </SafeAreaProvider>
  );
};

export default Index;
