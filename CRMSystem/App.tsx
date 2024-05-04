import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/ui/navigations/MainStack';

function App(): React.JSX.Element {
  return (
    // We are using paper ui to create basic components
    <PaperProvider>
      <NavigationContainer>
        {/* Main stack navigation */}
        <MainStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
