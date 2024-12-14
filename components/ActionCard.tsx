import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
const styles = Platform.OS === 'android'
  ? require('../styles_fin2/styles.android').default
  : require('../styles_fin2/styles.android').default;


interface ActionProps {
  actionContent: any;
  onPress: () => void;
}
interface PicturesProps {
  actionContent: any;
}

import PromotionAd1 from "../assets/images/PromotionAd1.svg"
import PromotionAd2 from "../assets/images/PromotionAd2.svg"
import PromotionAd3 from "../assets/images/PromotionAd3.svg"
import PromotionAd4 from "../assets/images/PromotionAd4.svg"
import PromotionAd5 from "../assets/images/PromotionAd5.svg"
import PromotionAd6 from "../assets/images/PromotionAd6.svg"
import PromotionAd7 from "../assets/images/PromotionAd7.svg"
import PromotionAd8 from "../assets/images/PromotionAd8.svg"
import DiscountTag from "../assets/images/DiscountTag.svg"
import { router } from "expo-router";
import globalStyles from "@/styles/globalStyles";


const PromotionPicture: React.FC<PicturesProps> = ({
  actionContent 
}) => {
  switch (actionContent.themeIndex) {
    case 1:
      return (
        <>
          <PromotionAd1 style={styles.styleOneImage} width={100} height={150} />
        </>) ;     
    case 2:
      return (
        <>
          <PromotionAd2 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 3:
      return (
        <>
          <PromotionAd3 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 4:
      return (
        <>
          <PromotionAd4 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 5:
      return (
        <>
          <PromotionAd5 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 6:
      return (
        <>
          <PromotionAd6 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 7:
      return (
        <>
          <PromotionAd7 style={styles.styleOneImage} width={100} height={150} />
        </>);
    case 8:
      return (
        <>
          <PromotionAd8 style={styles.styleOneImage} width={100} height={150} />
        </>);
    default:
      return (
        <>
          <PromotionAd1 style={styles.styleOneImage} width={100} height={150} />
        </>);
  } 
};
  
const screenWidth = Dimensions.get('window').width; // Screen width
export const itemWidth = screenWidth / 2 - 10; // Adjust item width (subtract margin)

const ActionCard: React.FC<ActionProps> = ({
  actionContent,
  onPress,
}) => {  
  switch (actionContent.themeIndex) {
    case 1:
      return styleOne(actionContent, onPress)
    case 2:
      return styleTwo(actionContent, onPress)
    case 3:
      return styleThree(actionContent, onPress)
    case 4:
      return styleFour(actionContent, onPress)
    case 5:
      return styleFive(actionContent, onPress)
    case 6:
      return styleSix(actionContent, onPress)
    case 7:
      return styleSeven(actionContent, onPress)
    case 8:
      return styleEight(actionContent, onPress)
    default:
      return styleOne(actionContent, onPress)
  }

};

const styleOne = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#fff"
        }}>
        <PromotionPicture actionContent={actionContent }   />


        <View style={styles.rowStyle}>
          <View style={styles.titleContainer}>
            <Text style={globalStyles.boldUpperCaseText16}>{actionContent.title}</Text>
          </View>
        </View>

      </TouchableOpacity>
    </>
  );
}

 
const styleTwo = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#E8E9EC"
        }}>
        <PromotionPicture actionContent={actionContent} />

        <View style={styles.rowStyle}>
          <View style={styles.titleContainer}>
            <Text style={globalStyles.boldUpperCaseText16}>{actionContent.title}</Text>
          </View>
        </View>

      </TouchableOpacity>
    </>
  );
}


const styleThree = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.itemContainer3}>



        <View >
          <Text style={{ ...globalStyles.boldUpperCaseText16, color: "#fff" }}>{actionContent.title}</Text>
          <Text style={{ ...globalStyles.boldUpperCaseText16, color: "#fff" }}>{actionContent.subTitle}</Text>
        </View>
        <DiscountTag style={styles.styleSecondImage} width={40} height={60} />
        <PromotionAd3 style={styles.styleOneImage} width={100} height={120} />

      </TouchableOpacity>
    </>
  );
}


const styleFour = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#fff"
        }}>
        <PromotionAd4 style={styles.styleOneImage} width={80} height={150} />


        <View style={styles.rowStyle}>
          <View style={styles.titleContainer}>
            <Text style={globalStyles.boldUpperCaseText16}>{actionContent.title}</Text>
          </View>
        </View>

      </TouchableOpacity>
    </>
  );
}
const styleFive = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#fff"
        }}>
        <PromotionAd5 style={styles.styleOneImage} width={100} height={150} />


        <View style={styles.rowStyle}>
          <View style={styles.titleContainer}>
            <Text style={globalStyles.boldUpperCaseText16}>{actionContent.title}</Text>
          </View>
        </View>

      </TouchableOpacity>
    </>
  );
}

const styleSix = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <View
        // onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          flexDirection: "row",
          backgroundColor: '#E8E9EC',
          height: 140, // Adjust height for the grid cells
        }}>

        <View style={styles.columnStyle}>
          <View style={styles.titleContainer}>
          <Text style={globalStyles.boldUpperCaseText15}>{actionContent.title}</Text>
          </View>
          <TouchableOpacity style={styles.applyButtonCARD} onPress={onPress}>
            <Text style={{...globalStyles.boldUpperCaseText15,
              color: "#fff",
            }}>получить</Text>
          </TouchableOpacity>
        </View>
        <PromotionAd6 style={{...styles.icon, bottom: 20}} width={180} height={150} />

      </View>
    </>
  );
}


const styleSeven = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#E8E9EC"
        }}>
        <PromotionAd7 style={{
          ...styles.styleOneImage,
          right: -43
        }} width={150} height={110} />

 
        <Text style={globalStyles.boldUpperCaseText15}>{actionContent.title}</Text> 

      </TouchableOpacity>
    </>
  );
}
const styleEight = (actionContent: any, onPress: () => void) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          ...styles.itemContainer,
          backgroundColor: "#fff"
        }}>
        <PromotionAd8 style={styles.styleOneImage} width={70} height={170} />


        {/* <View style={styles.rowStyle}>
          <View style={styles.titleContainer}> */}
        <Text style={globalStyles.boldUpperCaseText15}>{actionContent.title}</Text>
        {/* </View>
        </View> */}

      </TouchableOpacity>
    </>
  );
}
// const styles = ScaledStyleSheet.create({
  // itemContainer: {
  //   flex: 1, // Ensure items fill available space
  //   margin: 4, // Space between items
  //   backgroundColor: '#fff',
  //   borderRadius: 8,
  //   height: 100, // Adjust height for the grid cells
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   elevation: 2, // For Android shadow
  //   padding: 12,
  //   flexDirection: "column",
  //   justifyContent: "space-between", // Distributes space between elements 
  //   overflow: "hidden",
  // }, 
  // styleOneImage: {
  //   position: "absolute",
  //   zIndex: 0,
  //   right: 0,

  // },
  // styleSecondImage: {
  //   position: "absolute",
  //   zIndex: 0,
  //   right: 80,

  // },
  // titleContainer: {
  //   // zIndex:10,
  //   marginBottom: 5,
  //   flex: 1,
  //   flexGrow: 1,
  //   justifyContent: 'flex-end', // Align items to the bottom 

  // },
  // title: {
  //   fontSize: 12,
  //   // width:2,
  //   fontWeight: 'bold',
  //   // textAlign: 'center',
  //   marginBottom: 5,
  //   color: '#000',
  // },
  // itemContainer3: {
  //   flex: 1, // Ensure items fill available space
  //   margin: 4, // Space between items
  //   backgroundColor: '#015CE7',
  //   borderRadius: 8,

  //   height: 100, // Adjust height for the grid cells
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   elevation: 2, // For Android shadow
  //   padding: 12,
  //   flexDirection: "row",
  //   justifyContent: "space-between", // Distributes space between elements 
  //   overflow: "hidden",

  // },




  // imageMenuCard: {
  //   marginLeft: "20%"
  // },
  // imageMenuCard1: {
  //   marginLeft: "-45%",
  //   resizeMode: "contain",
  // },
  // imageMenuCard2: {
  //   marginLeft: "-55%",

  //   resizeMode: "contain",
  // },
  // container: {
  //   // flex: 1, // Ensures it fills the entire screen 
  //   // paddingTop: 10, // Padding for top and bottom edges 
  //   flex: 1,
  //   paddingVertical: 10,
  //   backgroundColor: "#fff",
  // },
  // applyButtonCARD: {
  //   height: 40,
  //   padding: 17,

  //   backgroundColor: "#015CE7", // Dark blue button background
  //   paddingVertical: 10,
  //   borderRadius: 8, // Rounded edges for button
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 10,
  // },
  // // Title Text Style
  // TextTitle: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#333",
  //   marginBottom: 10,
  //   textAlign: "start",
  //   paddingHorizontal: 16,
  // },
  // applyText: {
  //   textTransform: "uppercase",
  //   fontSize: 20,
  //   // padding:"10",
  //   textAlign: "center",
  //   marginTop: -3,
  //   color: "#fff",
  // },

  // squareAD: {
  //   width: "auto",
  //   height: "20%",
  //   flexDirection: "row",
  //   backgroundColor: "#B1D2FF", // Light blue background
  //   borderRadius: 15, // Rounded corners
  //   padding: 10,
  //   marginHorizontal: 16,
  //   alignItems: "center", // Align vertically
  //   justifyContent: "space-between", // Space between text and image
  //   marginTop: 20,
  // },
  // NoName: {
  //   height: 60,
  //   marginTop: 14,
  //   borderWidth: 0.5,
  //   borderColor: "#A9A9A9",
  //   padding: 8,
  //   marginHorizontal: 16,
  //   backgroundColor: "#E8E9EC",
  //   borderRadius: 10,
  //   justifyContent: "center"
  // },
  // miniSquareAD: {
  //   marginBottom: "-10%",
  //   marginLeft: 8,
  //   width: "38%",
  //   height: "60%",
  //   marginTop: 14,
  //   borderWidth: 0.5,
  //   borderColor: "#A9A9A9",
  //   padding: 12,
  //   backgroundColor: "#E8E9EC",
  //   borderRadius: 10,
  //   justifyContent: "center"
  // },
  // rowStyleCard: {
  //   height: "60%",
  //   width: "50%",
  //   flexDirection: "row",
  //   // justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // rowStyle: {
  //   width: "80%",
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // rowStyleScroll: {
  //   // flexGrow: 1, 
  //   // 
  //   flexDirection: "row",
  //   paddingLeft: 8,
  // },
  // columnStyle: {
  //   flexDirection: "column",
  //   justifyContent: "flex-start", 
  // },
  // itemText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#333',
  // },
  // icon1: {
  // },

  // icon: {
  //   padding: 10,
  //   resizeMode: "contain",
  //   // width: 80,
  //   zIndex: 3,
  //   // height: "70%",
  //   // backgroundColor: "#000",
  //   // marginBottom: 10,
  // },



  // titleSquare: {
  //   fontSize: 18,

  //   marginVertical: -4,
  //   fontWeight: "bold",
  // },
  // subtitle: {
  //   textTransform: "lowercase",
  //   marginTop: 5,
  //   width: "60%",
  //   fontSize: 10,
  // },
  // subtitleSquareAd1: {
  //   fontWeight: "500",
  //   textTransform: "uppercase",
  //   marginTop: 5,
  //   width: "70%",
  //   fontSize: 12,
  // },
  // subtitleSquareAd2: {
  //   fontWeight: "500",
  //   textTransform: "uppercase",
  //   marginTop: 5,
  //   width: "60%",
  //   fontSize: 12,
  // },

  // // Body Text Style
  // TextBody: {
  //   fontSize: 15, // Slightly smaller than the title
  //   fontWeight: 'normal', // Regular weight
  //   color: '#666666', // A lighter gray for body text
  //   lineHeight: 24, // Spacing between lines for better readability
  //   textAlign: 'center', // Center-align the body text
  //   marginHorizontal: 16, // Add some horizontal margins for better readability
  // },

  // // Free Height Filler
  // freeHeight: {
  //   flexGrow: 1, // This will fill the remaining vertical space 
  // },

  // listContent: {
  //   paddingBottom: 16, // Add padding to ensure the last item isn't cut off
  // },

// })


export default ActionCard