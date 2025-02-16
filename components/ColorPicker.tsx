import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';

interface ColorPickerProps {
  onColorSelect: (color: string) => void; // Функция для отправки выбранного цвета
  initialColor?: string; // Начальный цвет (по умолчанию будет черный)
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect, initialColor = '#000000' }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor); // Цвет, который выбран пользователем
  const [numColumns, setNumColumns] = useState(7);
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#000000',
    '#FF00FF', '#FFFF00', '#00FFFF', '#800080', 
    '#FFC0CB', '#FFD700', '#8B4513', '#D2691E', '#2E8B57', '#B22222',
    '#9932CC', '#A52A2A', '#008080', '#4682B4', '#4B0082', '#FF6347',
    '#FF1493', '#F08080', '#32CD32', '#8A2BE2' , 'red',
    '#ADFF2F', '#98FB98', '#8B0000', '#2F4F4F',  
    '#7FFF00'
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // Обновляем выбранный цвет
    onColorSelect(color); // Отправляем цвет в родительский компонент
  };
  return (
    <ScrollView style={{ maxHeight: 200 }}>
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
  <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
    {colors.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.colorOption, { backgroundColor: item, width: `${100 / numColumns}%` }]}
        onPress={() => handleColorSelect(item)}
      />
    ))}
  </View>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  colorList: {
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight:200,
  },
  colorOption: { 
    width: 40,
    height: 40,
    margin: 8,
    borderRadius: 5,
  },
});

export default ColorPicker;
