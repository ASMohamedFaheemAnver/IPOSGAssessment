import {PaperProvider} from 'react-native-paper';
import Home from './src/ui/screens/Home';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Home></Home>
    </PaperProvider>
  );
}

export default App;
