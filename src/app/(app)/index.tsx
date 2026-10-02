import { Redirect } from "expo-router";

import { useAuthContext } from "@/hooks/useAuthContext";

export default function AppIndex() {
  const { profile } = useAuthContext();

  if (profile?.role === "organization") {
    return <Redirect href="/(app)/OrganizationHomeScreen" />;
  }

  // commented out for now, since we don't have a volunteer home screen yet
  /*  if (profile?.role === "volunteer") {
    return <Redirect href="/(app)/VolunteerHomeScreen" />;
  } */

  return <Redirect href="/(app)/CitizenHomeScreen" />;
}
