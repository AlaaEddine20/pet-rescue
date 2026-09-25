import { Icon } from "@/ui/icon";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";
import { Alert, Image, Pressable, Text, View } from "react-native";

type Photo = { uri: string; base64: string };

type PhotoPickerProps = {
  photo: Photo | null;
  onPhotoSelected: (photo: Photo) => void;
};

async function pickFromCamera(): Promise<Photo | null> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") return null;

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.6,
    allowsEditing: true,
    aspect: [4, 3],
    base64: true,
  });

  if (result.canceled || !result.assets[0].base64) return null;
  return { uri: result.assets[0].uri, base64: result.assets[0].base64 };
}

async function pickFromGallery(): Promise<Photo | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.6,
    allowsEditing: true,
    aspect: [4, 3],
    base64: true,
  });

  if (result.canceled || !result.assets[0].base64) return null;
  return { uri: result.assets[0].uri, base64: result.assets[0].base64 };
}

export function PhotoPicker({ photo, onPhotoSelected }: PhotoPickerProps) {
  const handlePress = () => {
    Alert.alert("Aggiungi una foto", undefined, [
      {
        text: "Scatta foto",
        onPress: async () => {
          const result = await pickFromCamera();
          if (result) onPhotoSelected(result);
        },
      },
      {
        text: "Scegli dalla galleria",
        onPress: async () => {
          const result = await pickFromGallery();
          if (result) onPhotoSelected(result);
        },
      },
      { text: "Annulla", style: "cancel" },
    ]);
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Aggiungi foto"
      className="h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary"
    >
      {photo ? (
        <Image
          source={{ uri: photo.uri }}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <View className="items-center gap-2">
          <Icon as={Camera} size="xl" className="text-muted-foreground" />
          <Text className="font-pet-medium text-sm text-muted-foreground">
            Aggiungi una foto
          </Text>
        </View>
      )}
    </Pressable>
  );
}
