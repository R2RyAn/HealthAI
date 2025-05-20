
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import App from './src/App.tsx';

// Set up any native-specific configurations here
if (Platform.OS !== 'web') {
  // Native platform specific initialization
  console.log('Running on native platform:', Platform.OS);
}

// Export the component for Expo and native platforms
export default App;

// Register the main component
registerRootComponent(App);
