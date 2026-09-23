import AppHeader from "@/components/AppHeader";
import ScreenContainer from "@/components/ScreenContainer";
import { Text } from "react-native";

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <AppHeader />
      <Text>Welcome home</Text>
    </ScreenContainer>
  );
};

export default HomeScreen;
