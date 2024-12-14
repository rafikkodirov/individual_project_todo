import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";

import CreditInfoIcon from "../assets/images/CreditInfoIcon.svg"
import globalStyles from "@/styles/globalStyles";
import i18n from "@/i18n/i18n";
interface CardProps {
  element: any;

  onDetailsPress: (element: any) => void;
  onApplyPress: (element: any) => void;
}
const styles = Platform.OS === 'android'
  ? require('../styles_fin2/styles.android').default
  : require('../styles_fin2/styles.android').default;


const LoanCardV2: React.FC<CardProps> = ({
  element,
  onDetailsPress,
  onApplyPress,
}) => {
  return (
    <View>
      <View style={styles.card}>

        <View style={styles.topSection}>
          <Image
            source={{ uri: element.image }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.title}>{element.name}</Text>
            <Text style={styles.ratingText}>⭐ {element.rate}</Text>
          </View>
        </View>
        <Text style={styles.subtitleLoanV2} >{element.offer_short}</Text>
        
        <View style={styles.rowStyle}>
          <Text style={styles.lineName}>{i18n.t('sum')}:</Text>
          <Text style={styles.lineValue}>{element.offer_short_sum}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.lineName}>{i18n.t('srok')}:</Text>
          <Text style={styles.lineValue}>{element.srok}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.lineName}>{i18n.t('approval')}:</Text>
          <Text style={styles.lineValue}>{element.approval}</Text>
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.detailsIcon} onPress={() => onDetailsPress(element)}>
            <CreditInfoIcon width={30} height={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButtonLoanV2} onPress={() => onApplyPress(element)}>
            <Text style={styles.applyText}>{i18n.t('submit_application')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const styles = ScaledStyleSheet.create({

//   boldUpperCaseText20: {
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     fontSize: 20,
//     textAlign: 'left',
//     marginLeft: 16,
//     marginTop: 16,
//     flexShrink: 1, // Allows text to shrink if necessary to prevent overflow
//     flexWrap: 'wrap', // Wrap text if needed
//   },
//   lineName: {
//     fontWeight: '500',
//     fontSize: 16,
//   },
//   lineValue: {
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//   },
//   subtitle: {
//     color: "#231F20",
//     fontSize: 12,
//     textAlign: "left",
//     borderRadius: 20,
//     borderColor: "#000",
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 10,
//     marginBottom: 10,
//     alignSelf: "flex-start", // Ensures the width fits the content
//   },
//   applyButtonCARD: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 8,
//     marginLeft: "2%",
//     width: "80%",
//     alignItems: "center",
//   },
//   card: {
//     borderWidth: 0.5,
//     borderColor: "#000000",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 14,
//     marginHorizontal: 16,
//     marginTop: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//   }, 
//   topSection: {
//     flexDirection: "row",
//     alignItems: "stretch",
//   }, 
//   rowStyle: {
//     justifyContent: "space-between", // Distributes space between elements
//     marginBottom: 5, // Adds some vertical spacing between rows
//     flexDirection: "row",
//   },
//   logo: {
//     width: 45,
//     height: 45,
//     marginRight: 10,
//   },
//   ratingText: {
//     fontSize: 16,
//     marginRight: 5,
//   },
//   detailsButton: {
//     backgroundColor: "#F0F0F0",
//     padding: 10,
//     marginStart: "-1%",
//     borderRadius: 5,
//     width: "15%",
//     alignItems: "center",
//   },
//   applyText: {
//     fontSize: 14,
//     color: "#fff",
//   },
// });

export default LoanCardV2;
