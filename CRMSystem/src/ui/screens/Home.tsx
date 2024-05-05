import FAB from '../atoms/FAB';
import {Fragment} from 'react';
import NetworkFlatList from '../components/NetworkFlatList';
import Text from '../atoms/Text';
import {TypographyStyles} from '../../typography';
import {RouteNames} from '../../constants/strings';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

function Home(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <Fragment>
      <NetworkFlatList
        ListHeaderComponent={
          <Text style={[TypographyStyles.title1]}>Registered customers</Text>
        }
        refreshing={true}
        onRefresh={() => {
          console.log({msg: 'pulling'});
        }}
        data={[]}
        renderItem={null}
        emptyMessage="No customers registered."
      />
      <FAB
        onPress={() => navigation.navigate(RouteNames.AddOrEditCustomer.value)}
      />
    </Fragment>
  );
}

export default Home;
