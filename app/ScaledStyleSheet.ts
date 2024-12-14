import { StyleSheet } from 'react-native'; 
import { getScaleFactor } from './get_scale_coef';

const scaleFactor = getScaleFactor();

// Список исключений
const excludedProperties = ['opacity', 'zIndex', 'elevation']; // Свойства, которые не масштабируем
const isPercentage = (value: any) => typeof value === 'string' && value.includes('%');

// Функция для масштабирования значений
const scaleValue = (value: any, propertyName: string | null = null): any => {
  if (propertyName && excludedProperties.includes(propertyName)) {
    return value; // Пропускаем масштабирование для исключений
  }

  if (isPercentage(value)) {
    return value; // Не масштабируем процентные значения
  }

  if (typeof value === 'number') {
    return value * scaleFactor; // Умножаем только числовые значения
  }

  if (Array.isArray(value)) {
    return value.map((item) => scaleValue(item)); // Рекурсивно обрабатываем массивы
  }

  if (typeof value === 'object' && value !== null) {
    const scaledObject: any = {};
    for (const key in value) {
      scaledObject[key] = scaleValue(value[key], key); // Передаём имя свойства для проверки исключений
    }
    return scaledObject;
  }

  return value; // Возвращаем значения других типов без изменений
};

// Обёртка для StyleSheet.create
export const ScaledStyleSheet = {
  create: (styles: any) => {
    const scaledStyles = scaleValue(styles);
    return StyleSheet.create(scaledStyles);
  },
};

export default ScaledStyleSheet