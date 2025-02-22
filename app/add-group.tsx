import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, ScrollView, Platform, View } from 'react-native';
import { FSUserInfo, useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { debounce } from 'lodash';
import ColorPicker from '@/components/ColorPicker';
import LabeledTextInput, { TextInputType } from '@/Common/LabeledTextInput';

const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

interface AddGroupScreenProps {
  closeModal: () => void;
}

const AddGroupScreen: React.FC<AddGroupScreenProps> = ({ closeModal }) => {
  const [groupName, setGroupName] = useState(''); 
  const { isLoading, setLoading } = useLoading()

  const { addGroups, userData } = useDataContext();
  const [color, setColor] = useState(''); // Состояние для выбранного цвета

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor); // Обновляем выбранный цвет
  };

  const addGroup = debounce(async () => {
    if (!groupName) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const newGroup = {
      groupName,
      color,
      owner: userData.nickname,
      ownerId: userData.id,
    };

    try {
      if (isLoading) return;
      setLoading(true);
      await addGroups(newGroup);
      closeModal()

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Ошибка при добавлении группы:', error);
    }
  }, 500);
  return (
    <SafeAreaView >
      <ScrollView  >

        <LabeledTextInput value={groupName} onChangeText={setGroupName} inputType={TextInputType.group} />

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ ...styles.title, color: color }}>
            Выбранный цвет
          </Text>
        </View>
        <View style={{marginBottom:20}}>
        <ColorPicker  onColorSelect={handleColorSelect} initialColor={color} />
        </View>
        <Button title="Добавить" onPress={addGroup} color="#007bff" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddGroupScreen;