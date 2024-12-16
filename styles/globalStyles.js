// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,  
        // backgroundColor: 'red', // Фон для контента
    },   
    
    pageTitle: {
        fontSize: 20, 
        fontWeight: "600",
        color: "#333",  
    },
    white14Text: {
        fontSize: 14,
        color: "#fff",
      },
      black12Text: {
          fontSize: 12,
          color: "#000",
        },
      roundedButton: {
        backgroundColor: "#015CE7", // Dark blue button background
        paddingVertical: 10,
        marginRight: 24,
        borderRadius: 24, // Rounded edges for button
        alignItems: "center",
        justifyContent: "center", 
      },
      upperCaseText16: {
          fontWeight: '400',
          textTransform: 'uppercase',
          fontSize: 14,
          textAlign: 'left',
          flexShrink: 1, // Allows text to shrink if necessary to prevent overflow
          flexWrap: 'wrap', // Wrap text if needed
      },
      boldUpperCaseText16: {
          fontWeight: '700',
          textTransform: 'uppercase',
          fontSize: 16,
          textAlign: 'left',
          flexShrink: 1, // Allows text to shrink if necessary to prevent overflow
          flexWrap: 'wrap', // Wrap text if needed
      },
      boldUpperCaseText15: {
          fontWeight: '700',
          textTransform: 'uppercase',
          fontSize: 15,
          textAlign: 'left',
          flexShrink: 1, // Allows text to shrink if necessary to prevent overflow
          flexWrap: 'wrap', // Wrap text if needed
      },


    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Optional: Add a background color if needed
        zIndex: 10
      },
      
    pageTitleV2: {
        fontSize: 22, 
        fontWeight: "bold",
        color: "#333",
        textAlign: 'left'  
    },
});

export default globalStyles