import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("Index component rendered");
  return (
    <Stack>
      <Stack.Screen name="index"
      options={{
        headerShown: false,  // This removes the header for the "index" screen
      }} />
       <Stack.Screen name="mapscreen"
      options={{
        headerShown: false,  // This removes the header for the "index" screen
      }} />
       <Stack.Screen name="calendarscreen"
      options={{
        headerShown: false,  // This removes the header for the "index" screen
      }} />
      <Stack.Screen name="wordcloudscreen"
      options={{
        headerShown: false,  // This removes the header for the "index" screen
      }} />
    </Stack>
  );
}
