import { StyleSheet } from 'react-native'; 
import { getScaleFactor } from './get_scale_coef';
const scaleFactor = getScaleFactor();
const excludedProperties = ['opacity', 'zIndex', 'elevation'];  
const isPercentage = (value: any) => typeof value === 'string' && value.includes('%');
 
const scaleValue = (value: any, propertyName: string | null = null): any => {
  if (propertyName && excludedProperties.includes(propertyName)) {
    return value;  
  }

  if (isPercentage(value)) {
    return value;  
  }

  if (typeof value === 'number') {
    return value * scaleFactor; 
  }

  if (Array.isArray(value)) {
    return value.map((item) => scaleValue(item)); 
  }

  if (typeof value === 'object' && value !== null) {
    const scaledObject: any = {};
    for (const key in value) {
      scaledObject[key] = scaleValue(value[key], key);  
    }
    return scaledObject;
  }

  return value;  
};
export const ScaledStyleSheet = {
  create: (styles: any) => {
    const scaledStyles = scaleValue(styles);
    return StyleSheet.create(scaledStyles);
  },
};
