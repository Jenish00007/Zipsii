import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors, scale } from '../../../utils';
import { TextDefault } from '../../../components/Text';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MainBtn from '../../../ui/Buttons/MainBtn';
import { useMutation, gql } from '@apollo/client';
import { deleteAddress, selectAddress } from '../../../apollo/server';

// Define GraphQL mutations
const DELETE_ADDRESS = gql`
  ${deleteAddress}
`;

const SELECT_ADDRESS = gql`
  ${selectAddress}
`;

function Card(props) {
  const navigation = useNavigation();
  const { item } = props;
  const isDefault = item.default;

  // Mutation to delete address
  const [mutateDelete, { loading: loadingDelete }] = useMutation(DELETE_ADDRESS, {
    variables: { id: item._id },
    update(cache, { data: { deleteAddress } }) {
      const normalizedId = cache.identify({ id: item._id, __typename: 'Address' });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
    onError(error) {
      console.error('Error deleting address:', error);
      if (error.networkError) {
        console.error('Network error:', error.networkError);
      }
      if (error.graphQLErrors.length) {
        console.error('GraphQL errors:', error.graphQLErrors);
      }
    },
  });

  // Mutation to select address as default
  const [mutateSelect, { loading: loadingSelect }] = useMutation(SELECT_ADDRESS, {
    onError(error) {
      console.log('Error selecting address:', error);
    },
  });

  const handleSelectAddress = (address) => {
    mutateSelect({ variables: { id: address._id } });
  };

  const handleDeleteAddress = () => {
    mutateDelete();
  };

  const renderSelectedButton = () => {
    return (
      <TouchableOpacity activeOpacity={0} style={styles.selectedBtn}>
        <View style={styles.tickImage}>
          <Feather name="check" size={scale(25)} color={colors.selected} />
        </View>
        <TextDefault textColor={colors.fontMainColor} H5>
          {'My Default Address'}
        </TextDefault>
      </TouchableOpacity>
    );
  };

  const renderUnselectedButton = () => {
    return (
      <MainBtn
        loading={loadingSelect}
        onPress={() => handleSelectAddress(item)}
        text="Mark it as Default Address"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {/* Location Icon */}
        <View style={styles.iconWithLabel}>
  <Feather name="map-pin" size={scale(25)} color={colors.greenColor} style={styles.icon} />
  <TextDefault textColor={colors.fontMainColor} H4 style={styles.label}>
    {item.label}
  </TextDefault>
</View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditAddress', { ...item })}
          >
            <Feather name="edit" size={scale(18)} color={colors.fontThirdColor} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loadingDelete}
            style={styles.icon}
            onPress={handleDeleteAddress}
          >
            {!loadingDelete ? (
              <Feather name="trash-2" size={scale(18)} color={colors.fontThirdColor} />
            ) : (
              <MaterialCommunityIcons name="dots-horizontal" size={scale(18)} color={colors.fontThirdColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Details */}
      <View style={styles.address}>
        <TextDefault textColor={colors.fontMainColor}>{item.region}</TextDefault>
        <TextDefault textColor={colors.fontMainColor}>{item.city}</TextDefault>
        <TextDefault textColor={colors.fontMainColor}>
          {item.apartment}, {item.building}
        </TextDefault>
        <TextDefault textColor={colors.fontMainColor}>
          Details: {item.details ?? 'None'}
        </TextDefault>
      </View>

      {/* Action Buttons */}
      <View style={styles.btnContainer}>
        {isDefault ? renderSelectedButton() : renderUnselectedButton()}
      </View>
    </View>
  );
}

export default Card;
