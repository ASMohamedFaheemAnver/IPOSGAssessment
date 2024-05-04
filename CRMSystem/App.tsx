import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/ui/navigations/MainStack';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <ReduxProvider store={store}>
      {/* We are using paper ui to create basic components */}
      <PaperProvider>
        <NavigationContainer>
          {/* Main stack navigation */}
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
