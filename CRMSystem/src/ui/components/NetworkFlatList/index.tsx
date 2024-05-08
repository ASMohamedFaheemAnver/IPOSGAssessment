import {EmptySvg} from '@assets/svgs';
import {Opacities, Widths} from '@constants/numbers';
import {CommonStyles} from '@src/styles';
import {TypographyStyles} from '@src/typography';
import Text from '@ui/atoms/Text';
import React from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  FlatList as RnFlatList,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import SubLoading from '../SubLoading';

type Props = {
  isPageLoading?: boolean;
  refreshing?: boolean;
  data: any;
  renderItem: ListRenderItem<any>;
  ListHeaderComponent?: React.JSX.Element;
  onRefresh?: () => void;
  onEndReached?: () => void;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  emptyMessage?: string | undefined;
};

const NetworkFlatList = (props: Props): React.JSX.Element => {
  const {
    ListHeaderComponent,
    isPageLoading,
    refreshing,
    data,
    onRefresh,
    renderItem,
    onEndReached,
    contentContainerStyle,
    emptyMessage,
    ...rest
  } = props;

  return (
    <RnFlatList
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      refreshing={refreshing && !!data?.length} // If no data, we are showing SubLoading component, If data exist, we show this
      // If user pull to refresh
      onRefresh={onRefresh}
      renderItem={renderItem}
      // Common paddings and styling for list
      contentContainerStyle={[
        CommonStyles.bigPaddingTop,
        CommonStyles.bigPaddingHorizontal,
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => (
        <View style={[CommonStyles.bigMarginBottom]}></View>
      )}
      ListEmptyComponent={() => {
        // If refreshing no need to show empty message
        if (refreshing) {
          return <SubLoading />;
        }
        // If list is empty show empty svg
        return (
          <View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <EmptySvg width={Widths.emptyImage} height={Widths.emptyImage} />
            <Text style={[TypographyStyles.body1, {opacity: Opacities.half}]}>
              {emptyMessage}
            </Text>
          </View>
        );
      }}
      ListFooterComponent={
        <>
          {/* When user reached the end of the list, need to show loading indicator if we are getting more elements by fetching next page */}
          {isPageLoading && !refreshing && <ActivityIndicator size={'large'} />}
          {/* If we have more items to fille whole phone screen, Fab icon will be on top of some list items, Adding bottom space will let us scroll it and see whole item  */}
          <View style={[CommonStyles.scrollViewBottomSpace]}></View>
        </>
      }
      // Can trigger pagination logic here
      onEndReached={onEndReached}
      {...rest}
    />
  );
};

export default NetworkFlatList;
