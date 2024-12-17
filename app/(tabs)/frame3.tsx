import { View, Text } from 'react-native'
import React from 'react'
import { ScaledStyleSheet } from '../ScaledStyleSheet';

const Frame3 = () => {
  return (
    <View>
      <Text>Frame3</Text>
      <View
        style={[styles.circle, { backgroundColor: "#FFFFFF" }]} // Используем динамический цвет
      />
    </View>
  )
}
const styles = ScaledStyleSheet.create({
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },

  circle: {
    width: 50,          // Ширина круга
    height: 50,         // Высота круга
    borderRadius: 25,   // Полукруглый радиус (для создания круга)
  },
  timeText: {
    fontSize: 12,
    color: '#555',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  buttonR: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: "1%",
    width: "50%"
  },
  buttonL: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,

    marginRight: "1%",
    width: "50%"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  commentBubble: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginLeft: 8,
  },
  category: {
    fontSize: 12,
    color: '#aaa',
  },
});
export default Frame3