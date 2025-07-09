import { useRootNavigationState, Redirect } from 'expo-router';

export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={'/(tabs)/login'} />
}
// This component redirects the user to the login screen when the app starts.