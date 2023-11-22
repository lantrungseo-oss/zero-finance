import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {goBack} from '../../utils/navigationUtils';
import useThemeColors from '../../hooks/useThemeColors';
import AppHeader from '../../components/AppHeader';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import Icon from '../../components/Icons';
import addTransactionStyles from '../AddTransactionsScreen/style';
import allIcons from '../../../assets/categoryIcons.json';
import {createCategory} from '../../services/CategoryService';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserId} from '../../redux/slice/userIdSlice';
import {FETCH_ALL_CATEGORY_DATA} from '../../redux/actionTypes';
import styles from './style';

const AddCategoryScreen = () => {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('null');
  const [searchText, setSearchText] = useState('');
  const userId = useSelector(selectUserId);

  const handleAddCategory = () => {
    try {
      createCategory(
        categoryName,
        Realm.BSON.ObjectID.createFromHexString(userId),
        selectedIcon,
      );
      dispatch({type: FETCH_ALL_CATEGORY_DATA});
      goBack();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleIconModalClose = () => {
    setIsIconModalVisible(false);
  };

  console.log('this is the selectedicon', selectedIcon);

  const renderIcons = () => {
    const handleSelectIcon = iconName => {
      setSelectedIcon(iconName);
      setIsIconModalVisible(false);
    };

    const screenWidth = Dimensions.get('window').width;
    const iconsPerRow = 6;
    const iconSize = (screenWidth * 0.7) / iconsPerRow;

    return Object.keys(allIcons).map((iconName, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.iconItem,
          {
            width: iconSize,
            height: iconSize,
            backgroundColor:
              selectedIcon === iconName ? colors.primaryText : undefined,
          },
        ]}
        onPress={() => handleSelectIcon(iconName)}>
        <Icon
          name={iconName}
          size={30}
          color={
            selectedIcon === iconName
              ? colors.containerColor
              : colors.secondaryText
          }
          type={'MaterialCommunityIcons'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: colors.primaryBackground},
      ]}>
      <View style={styles.headerContainer}>
        <AppHeader onPress={goBack} colors={colors} text="Add Category" />
      </View>

      <CustomInput
        colors={colors}
        input={categoryName}
        setInput={setCategoryName}
        placeholder="eg. Stationary"
        label="Category Name"
      />

      <Text
        style={[
          styles.subtitleText,
          {color: colors.primaryText, marginBottom: 10},
        ]}>
        Pick your own icon
      </Text>
      <View style={addTransactionStyles.dateContainer}>
        <TouchableOpacity
          style={[
            addTransactionStyles.dateButtonContainer,
            {
              backgroundColor: colors.primaryText,
              borderColor: colors.secondaryText,
            },
          ]}
          onPress={() => setIsIconModalVisible(true)}>
          {selectedIcon === 'null' ? (
            <Icon
              name={'dots-horizontal-circle'}
              size={25}
              color={colors.buttonText}
              type={'MaterialCommunityIcons'}
            />
          ) : (
            <Icon
              name={selectedIcon}
              size={25}
              color={colors.buttonText}
              type={'MaterialCommunityIcons'}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsIconModalVisible(true)}>
          <Text
            style={[
              addTransactionStyles.dateText,
              {color: colors.primaryText, fontSize: 14},
            ]}>
            Tap to select icon
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: '125%'}}>
        <PrimaryButton
          onPress={handleAddCategory}
          colors={colors}
          buttonTitle="Add"
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isIconModalVisible}
        onRequestClose={handleIconModalClose}>
        <View style={[styles.modalContainer]}>
          <View
            style={[styles.modal, {backgroundColor: colors.containerColor}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={[
                  styles.subtitleText,
                  {
                    color: colors.primaryText,
                    fontSize: 17,
                    marginTop: 10,
                    marginBottom: 30,
                    fontFamily: 'FiraCode-SemiBold',
                  },
                ]}>
                Select Icon
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: colors.primaryText,
                    color: colors.primaryText,
                    backgroundColor: colors.secondaryBackground,
                  },
                ]}
                placeholder="Search Icons"
                value={searchText}
                onChangeText={setSearchText}
              />

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {renderIcons()}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddCategoryScreen;
