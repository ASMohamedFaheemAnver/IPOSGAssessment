import FAB from '../atoms/FAB';
import {Fragment} from 'react';
import NetworkFlatList from '../components/NetworkFlatList';
import Text from '../atoms/Text';
import {TypographyStyles} from '../../typography';

function Home(): React.JSX.Element {
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
      <FAB onPress={() => {}} />
    </Fragment>
  );
}

export default Home;
