import React, { useContext } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import Card from './Card/AddressCard';
import { colors, alignment } from '../../utils';
import { TextDefault, BackHeader, BottomTab } from '../../components';
import UserContext from '../../context/User';

function AddressList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile } = useContext(UserContext);
  const cartAddress = route.params?.backScreen ?? null;

  function emptyView() {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.address}>
          <TextDefault
            textColor={colors.fontMainColor}
            bold
            center
            H5
            style={alignment.MBlarge}>
            No Addresses!!
          </TextDefault>
          <TextDefault textColor={colors.fontMainColor} center small>
            {"You don't have any address registered."}
          </TextDefault>
          <TextDefault textColor={colors.fontMainColor} center small>
            Please add a new one.
          </TextDefault>
        </View>
      </View>
    );
  }

  function renderAddNewAddressButton() {
    return (
      <TouchableOpacity
        style={styles.newAddressButton}
        onPress={() => navigation.navigate('NewAddress', { backScreen: cartAddress })}>
        <Ionicons name="add" size={20} color={colors.greenTextColor} />
        <TextDefault textColor={colors.greenTextColor} style={styles.newAddressText}>
          Add New Shipping Address
        </TextDefault>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={styles.container}>
        <View style={styles.header}>
        <BackHeader
        title={'Manage Address'}
        backPressed={() => navigation.goBack()}
      />
        </View>
        <View style={styles.body}>
        <View style={styles.main}>
            <FlatList
              style={styles.flex}
              data={profile.addresses.filter(a => a.isActive)}
              keyExtractor={item => item._id.toString()}
              ListEmptyComponent={emptyView}
              renderItem={({ item }) => (
                <Card item={item} default={item.selected} />
              )}
            />
            {/* Render Add New Address Button Below the FlatList */}
            {renderAddNewAddressButton()}
          </View>
        </View>
        
      </View>
      <BottomTab screen="PROFILE" />
    </SafeAreaView>
  );
}

export default AddressList;
