import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import SQLiteProvider from './src/providers/SQLiteProvider';
import {store} from './src/redux/store';
import MainStack from './src/ui/navigations/MainStack';

function App(): React.JSX.Element {
  return (
    <SQLiteProvider>
      <ReduxProvider store={store}>
        {/* We are using paper ui to create basic components */}
        <PaperProvider>
          <NavigationContainer>
            {/* Main stack navigation */}
            <MainStack />
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </SQLiteProvider>
  );
}

export default App;
