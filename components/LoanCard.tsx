import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import i18n from "@/i18n/i18n";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Platform } from 'react-native';

const styles = Platform.OS === 'ios' 
  ? require('../styles/styles.ios').default 
  : require('../styles/styles.android').default; 

interface LoanCardProps {
  loan: any;  // URL or image source
 
  onDetailsPress: (loan: any) => void;
  onApplyPress: (loan: any) => void;
  }

const LoanCard: React.FC<LoanCardProps> = ({
  loan,
  onDetailsPress,
  onApplyPress,
}) => {

  // console.log(loan.name);
  return (
    <View style={styles.container}>
    <View style={styles.card}>

      <View style={styles.topSection}>
        <Image
          source={{ uri: loan.image }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.rowStyleContainer}>
          <View style={styles.rowStyle}>
            <Text style={styles.title}>{loan.name}</Text>
            <Text style={styles.amount}>{loan.offer_short_sum}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{loan.offer_short}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {loan.rate}</Text>
              <Text style={styles.reviews}>({loan.views})</Text>
            </View>
          </View>
        </View>
      </View>
 
      {/* Buttons with actions */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => onDetailsPress(loan)}>
          {/* (loan) */}
          <Text style={styles.detailsText}>{i18n.t('more')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={() =>onApplyPress(loan)}>
          <Text style={styles.applyText}>{i18n.t('register')}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};
  
export default LoanCard;
