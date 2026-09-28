import { labels } from "@/locales";
import * as Location from "expo-location";
import { useCallback, useState } from "react";

type LocationState = {
  latitude: number;
  longitude: number;
  addressLabel: string | null;
};

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError(labels.locationField.errors.permissionDenied);
      setIsLoading(false);
      return;
    }

    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        addressLabel: place
          ? [place.street, place.city].filter(Boolean).join(", ")
          : null,
      });
    } catch {
      setError(labels.locationField.errors.fetchFailed);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    location,
    isLocationLoading: isLoading,
    locationError: error,
    fetchLocation,
  };
}
