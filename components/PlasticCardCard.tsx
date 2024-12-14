import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import i18n from "@/i18n/i18n";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Platform } from 'react-native';

const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.ios').default; 
interface CardProps {
  card: any;  // URL or image source

  onDetailsPress: (card: any) => void;
  onApplyPress: (card: any) => void;
}

const PlasticCardCard: React.FC<CardProps> = ({
  card,
  onDetailsPress,
  onApplyPress,
}) => {

  // console.log(loan.name);
  return (
    <View style={styles.card}>

      <View style={styles.topSection}>
        <Image
          source={{ uri: card.image }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.rowStyleContainer}>
          <View style={styles.rowStyle}>
            <Text style={styles.title}>{card.name}</Text>
            <Text style={styles.amount}>{card.offer_short_sum}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{card.offer_short}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {card.rate}</Text>
              <Text style={styles.reviews}>({card.views})</Text>
            </View>
          </View>
        </View>
      </View>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => onDetailsPress(card)}>
          <Text style={styles.detailsText}>{i18n.t('more')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={() => onApplyPress(card)}>
          <Text style={styles.applyText}>{i18n.t('submit_application')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = ScaledStyleSheet.create({
//   applyButtonCARD: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 8,
//     marginLeft: "2%",
//     width: "50%",
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
//   rowStyleContainer: {
//     flex: 1, // Ensures the rowStyleContainer takes up remaining space
//     alignItems: "stretch",
//   },
//   rowStyle: {
//     justifyContent: "space-between", // Distributes space between elements
//     marginBottom: 5, // Adds some vertical spacing between rows
//     flexDirection: "row",
//   },

// //   logo: {
// //     width: 45,
// //     height: 45,
// //     marginRight: 10,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   subtitle: {
// //     color: "#231F20",
// //     fontSize: 12,
// //     textAlign: "left",
// //     flex: 1,
// //   }, 
// //   amount: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginLeft: "auto",
// //   },
// //   ratingContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginLeft: "auto",
// //   },
// //   ratingText: {
// //     fontSize: 16,
// //     marginRight: 5,
// //   },
// //   reviews: {
// //     color: "#888",
// //     fontSize: 14,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 4,
// //   },
// //   detailsButton: {
// //     backgroundColor: "#F0F0F0",
// //     padding: 10,
// //     marginStart: "-1%",
// //     borderRadius: 5,
// //     width: "50%",
// //     alignItems: "center",
// //   },
// //   detailsText: {
// //     fontSize: 14,
// //     color: "#333",
// //   },
// //   applyButton: {
// //     backgroundColor: "#007AFF",
// //     padding: 10,
// //     marginLeft: "25%",
// //     borderRadius: 5,
// //     width: "48%",
// //     alignItems: "center",
// //   },
// //   applyText: {
// //     fontSize: 14,
// //     color: "#fff",
// //   },
// // });
// });

export default PlasticCardCard;
