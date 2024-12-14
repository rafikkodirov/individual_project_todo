import { Dimensions } from 'react-native';

const BASE_WIDTH = 360;
const BASE_HEIGHT = 744 ;

let cachedScaleFactor: number | null = null;

const calculateScaleFactor = () => {
  const { width, height } = Dimensions.get('window'); 
  const widthRatio = width / BASE_WIDTH;
  const heightRatio = height / BASE_HEIGHT;
  return (widthRatio + heightRatio) / 2;
};

// Сброс кэша при изменении размеров экрана
Dimensions.addEventListener('change', () => {
  cachedScaleFactor = null;
});

export const getScaleFactor = () => {
  if (cachedScaleFactor === null) {
    cachedScaleFactor = calculateScaleFactor();
  }
  return cachedScaleFactor;
};

export default getScaleFactor;