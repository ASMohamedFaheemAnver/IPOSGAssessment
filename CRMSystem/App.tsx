import SQLiteProvider from '@providers/SQLiteProvider';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '@redux/store';
import MainStack from '@ui/navigations/MainStack';
import {PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

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
