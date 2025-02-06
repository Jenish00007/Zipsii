import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import CategoryCard from '../../ui/CategoryCard/CategoryCard';
import { BottomTab, BackHeader, TextError, Spinner } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { categories } from '../../apollo/server';
import { useRoute } from '@react-navigation/native'; // Import useRoute

const CATEGORIES = gql`
  ${categories}
`;

function Category(props) {
  const { data: categoryData, loading, error } = useQuery(CATEGORIES);
  const route = useRoute(); // Access the route object
  const { categoryId, categoryName } = route.params || {}; // Get parameters with fallback

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        <BackHeader
          title={categoryName || 'Categories'} // Use categoryName or fallback to 'Categories'
          backPressed={() => props.navigation.goBack()}
        />
        {error ? (
          <TextError text={error.message} />
        ) : loading ? (
          <Spinner />
        ) : (
          <>
            {/* Display Selected Category Info
            {categoryId && (
              <View style={styles.selectedCategoryInfo}>
                <Text style={styles.selectedCategoryText}>
                  Selected Category: {categoryName} (ID: {categoryId})
                </Text>
              </View>
            )} */}
            {/* Category List */}
            <FlatList
              style={styles.flex}
              contentContainerStyle={styles.categoryContainer}
              data={categoryData ? categoryData.categories : []}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={4} // Set 4 columns
              renderItem={({ item, index }) => (
                <CategoryCard
                  style={styles.spacer}
                  key={index}
                  cardLabel={item.title}
                  id={item._id}
                />
              )}
            />
          </>
        )}
        <BottomTab screen="HOME" />
      </View>
    </SafeAreaView>
  );
}

export default Category;
