import { ScaledStyleSheet } from '@/app/ScaledStyleSheet';


export default ScaledStyleSheet.create({
  applyButtonLoanV2: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginLeft: "2%",
    width: "80%",
    alignItems: "center",
  },
  ViewsCardLoanV2: {

  },
  lineName: {
    fontWeight: '250',
    fontSize: 14,
  },
  lineValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  applyButtonDetails: {
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  detailsIcon: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginStart: "-1%",
    borderRadius: 5,
    width: "15%",
    alignItems: "center",
  },
  applyTextDetails: {
    fontSize: 22,
    color: "#fff",
  },
  containerDetails: {
    flex: 1,
    // flexGrow: 1,
    paddingTop: 16,
    // backgroundColor: 'red', // Фон для контента
  },
  backButton: {
    padding: 16,
  },

  PageTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleDetails: {
    // padding:8,
    fontSize: 11,

    marginTop: 3,
    fontWeight: "bold",
  },
  TextTitleDetails: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center", // Vertically align the text (Android only)
    marginRight: 60,
    includeFontPadding: false, // Optional: Remove extra padding for better centering
  },


  scrolledContainerDetails: {
    display: "flex",
    flexGrow: 1,
    overflow: "scroll",
    maxHeight: 200,
  },

  // applyButtonDetails: {   
  //   marginHorizontal: 16,
  //   backgroundColor: "#007AFF",
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  // applyTextDetails: {
  //   fontSize: 22,
  //   color: "#fff", 
  // },



  safeArea: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingBottom: 24,
    backgroundColor: '#E0E0E0', // Оставляем нейтральный фон для Android
  },
  TextTitle: {
    fontSize: 24, // Adjust for a prominent title size
    fontWeight: 'bold', // Make the title bold
    color: '#333333', // Dark text color
    marginBottom: 10, // Add spacing after the title
    textAlign: 'center', // Center the title horizontally
  },
  topSection: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  rowStyleContainer: {
    flex: 1, // Ensures the rowStyleContainer takes up remaining space
    alignItems: "stretch",
  },

  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold", 
  // },

  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  ratingText: {
    fontSize: 13,
    marginRight: 5,
  },
  reviews: {
    color: "#888",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
    width: "50%",

    marginStart: "-1%",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    marginLeft: "2%",
    width: "50%",
    alignItems: "center",
  },
  // Body Text Style
  TextBody: {
    fontSize: 14.5,
    marginBottom: 16,// Slightly smaller than the title
    fontWeight: 'normal', // Regular weight
    color: '#666666', // A lighter gray for body text
    lineHeight: 16, // Spacing between lines for better readability
    textAlign: 'center', // Center-align the body text
    marginHorizontal: 16, // Add some horizontal margins for better readability
  },

  // Free Height Filler
  freeHeight: {
    flexGrow: 1, // This will fill the remaining vertical space 
  },

  listContent: {
    // paddingBottom: 16, // Add padding to ensure the last item isn't cut off
  },
  backRowStyle: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },


  scrolledContainer: {
    display: "flex",
    flexGrow: 1,
    overflow: "scroll",
    maxHeight: 200,
  },
  /// Footer
  footerContainer: {
    display: "flex",
    flexGrow: 2,
    minHeight: 80,
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end',
    paddingBottom: 18
  },

  applyButtonFirstFrame: {
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  applyText: {
    fontSize: 16,
    color: "#fff",
  },

  rowStyle: {
    justifyContent: "space-between", // Distributes space between elements
    marginBottom: 5, // Adds some vertical spacing between rows
    flexDirection: "row",
  },

  title: {
    fontSize: 15,
    marginVertical: -1,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#231F20",
    fontSize: 12,
    flex: 1,
    // backgroundColor:"plum"
    // textAlign:"center",
  },
  subtitleLiteV2: {
    color: "#0163FA",
    fontSize: 12,
    flex: 1,
    // backgroundColor:"plum"
    // textAlign:"center",
  },
  subtitleLoanV2: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 6,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: "#0163FA",
    // marginRight: 50, 
    // textAlign:"center",
    marginTop: 8,

    marginBottom: 16,
  },

  bannerCard: {
    borderRadius: 20, // Меньший радиус углов для Android
    margin: 16,
    alignItems: 'center',
    width: '94%',
    height: "73%",
    padding: 15,
    backgroundColor: '#FFF',
  },
  bannerAdS3: {
    flex: 1,
    zIndex: 0,
    alignItems: 'center',
    width: '100%',
    padding: 6,
  },
  TextAfterTitle: {
    fontSize: 14, // Меньший размер текста для Android
    textAlign: "center",
    fontFamily: "inter_regular",
    color: '#333', // Темнее оттенок текста
  },
  ROW: {
    flexDirection: 'row',
    gap: 8, // Меньше расстояние между элементами
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "-15%",
  },
  miniButton: {
    width: 14, // Меньший размер индикаторовDescribeCard
    height: 14,
    backgroundColor: "#A0A0A0", // Темнее серый цвет
    borderRadius: 7,
  },
  miniActiveButton: {
    width: 14,
    height: 14,
    backgroundColor: 'blue', // Зеленый цвет для активной кнопки
    borderRadius: 7,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E0E0E0', // Серый фон для Android
  },
  banner: {
    flex: 1,
    zIndex: 0,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: '#FFF',
  },
  button: {
    marginTop: 100,
    marginBottom: 20,
    backgroundColor: '#007AFF', // Яркий голубой для Android
    padding: 15,
    textAlign: "center",
    width: 300,
    borderRadius: 15, // Меньший радиус для Android
  },
  itemContainer: {
    flex: 1, // Ensure items fill available space
    margin: 4, // Space between items
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 100, // Adjust height for the grid cells
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between", // Distributes space between elements 
    overflow: "hidden",
  },
  styleOneImage: {
    position: "absolute",
    zIndex: 0,
    right: 0,

  },
  styleSecondImage: {
    position: "absolute",
    zIndex: 0,
    right: 80,

  },
  titleContainer: {
    // zIndex:10,
    marginBottom: 30,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end', // Align items to the bottom 

  },
  titleAction: {
    fontSize: 12,
    // width:2,
    fontWeight: 'bold',
    // textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  itemContainer3: {
    flex: 1, // Ensure items fill available space
    margin: 4, // Space between items
    backgroundColor: '#015CE7',
    borderRadius: 8,

    height: 100, // Adjust height for the grid cells
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between", // Distributes space between elements 
    overflow: "hidden",

  },




  imageMenuCard: {
    marginLeft: "20%"
  },
  imageMenuCard1: {
    marginLeft: "-45%",
    resizeMode: "contain",
  },
  imageMenuCard2: {
    marginLeft: "-55%",

    resizeMode: "contain",
  },
  containerAction: {
    // flex: 1, // Ensures it fills the entire screen 
    // paddingTop: 10, // Padding for top and bottom edges 
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  applyButtonCARD: {
    height: 40,
    padding: 17,

    backgroundColor: "#015CE7", // Dark blue button background
    paddingVertical: 10,
    borderRadius: 8, // Rounded edges for button
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  // Title Text Style
  TextTitleAction: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "start",
    paddingHorizontal: 16,
  },
  applyTextAction: {
    textTransform: "uppercase",
    fontSize: 20,
    // padding:"10",
    textAlign: "center",
    marginTop: -3,
    color: "#fff",
  },

  squareAD: {
    width: "auto",
    height: "20%",
    flexDirection: "row",
    backgroundColor: "#B1D2FF", // Light blue background
    borderRadius: 15, // Rounded corners
    padding: 10,
    marginHorizontal: 16,
    alignItems: "center", // Align vertically
    justifyContent: "space-between", // Space between text and image
    marginTop: 20,
  },
  NoName: {
    height: 60,
    marginTop: 14,
    // borderWidth: 0.5,
    borderColor: "#A9A9A9",
    padding: 8,
    marginHorizontal: 16,
    backgroundColor: "#E8E9EC",
    borderRadius: 10,
    justifyContent: "center"
  },
  miniSquareAD: {
    marginBottom: "-10%",
    marginLeft: 8,
    width: "38%",
    height: "60%",
    marginTop: 14,
    // borderWidth: 0.5,
    borderColor: "#A9A9A9",
    padding: 12,
    backgroundColor: "#E8E9EC",
    borderRadius: 10,
    justifyContent: "center"
  },
  rowStyleCard: {
    height: "60%",
    width: "50%",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  rowStyleAction: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  rowStyleScroll: {
    // flexGrow: 1, 
    // 
    flexDirection: "row",
    paddingLeft: 8,
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icon1: {
  },

  icon: {
    padding: 10,
    resizeMode: "contain",
    // width: 80,
    zIndex: 3,
    // height: "70%",
    // backgroundColor: "#000",
    // marginBottom: 10,
  },



  titleSquare: {
    fontSize: 18,

    marginVertical: -4,
    fontWeight: "bold",
  },
  subtitleAction: {
    textTransform: "lowercase",
    marginTop: 5,
    width: "60%",
    fontSize: 10,
  },
  subtitleSquareAd1: {
    fontWeight: "500",
    textTransform: "uppercase",
    marginTop: 5,
    width: "70%",
    fontSize: 12,
  },
  subtitleSquareAd2: {
    fontWeight: "500",
    textTransform: "uppercase",
    marginTop: 5,
    width: "60%",
    fontSize: 12,
  },

  // Body Text Style
  TextBodyAction: {
    fontSize: 15, // Slightly smaller than the title
    fontWeight: 'normal', // Regular weight
    color: '#666666', // A lighter gray for body text
    lineHeight: 24, // Spacing between lines for better readability
    textAlign: 'center', // Center-align the body text
    marginHorizontal: 16, // Add some horizontal margins for better readability
  },


  containerOfferV2: {
    flex: 1,
    // flexGrow: 1,
    paddingTop: 16,
    // backgroundColor: 'red', // Фон для контента
  },

  ViewsCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#0163FA",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  DescribeCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    height: 200,
    marginBottom: 16,
  },
  // card: {
  //   backgroundColor: "#fff",
  //   borderRadius: 16,
  //   padding: 12,
  //   marginHorizontal: 16,

  //   marginBottom: 16,
  // },


  // scrolledContainer: {
  //   display: "flex",
  //   flexGrow: 1,
  //   overflow: "scroll",
  //   maxHeight: 200,    
  // },
  /// Footer
  // footerContainer: {
  //   display: "flex",
  //   flexGrow: 2,
  //   minHeight: 80,
  //   // backgroundColor: 'green', // Фон для контента
  //   justifyContent: 'flex-end',
  //   paddingBottom: 16
  // },

  applyButtonOfferV2: {
    marginHorizontal: 8,
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  // applyText: {
  //   fontWeight:"bold",
  //   fontSize: 14,
  //   color: "#fff", 
  // },






  // rowStyle: {
  //   justifyContent: "space-between", // Distributes space between elements
  //   marginBottom: 5, // Adds some vertical spacing between rows
  //   flexDirection: "row",
  // },

  titleOfferV2: {
    fontSize: 14,
    marginVertical: -1,
    fontWeight: "bold",
  },
  subtitleOfferV2: {
    color: "#231F20",
    fontSize: 14,
  },


  TopCard: {
    flexDirection: 'row',
    backgroundColor: '#B1D2FF', // Light blue background
    borderRadius: 12, // Rounded corners
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'space-between', // Space between text and image
    marginTop: 16,
    width: '100%', // Fills the entire width of the parent container
  },
  TopCardLeftContent: {
    flex: 1, // Takes all available space on the left side of ManFromMenu
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 8,
    width: "70%",
    alignItems: 'stretch'
  },
  scrolledSection: {
    flexDirection: "row",
    marginTop: 8,
    // backgroundColor: 'gray', // Light blue background   
    // minHeight: 120
  },
  scrolledSectionCard: {
    flexDirection: 'row',
    backgroundColor: '#E8E9EC', // Light blue background
    borderRadius: 15, // Rounded corners
    paddingVertical: 4,
    paddingLeft: 16,
    width: 280, // Fills the entire width of the parent container
    height: 120, // Adjust the height as needed
    alignItems: 'stretch', // Center items vertically
  },
  cardContainer: {
    padding: 24, 
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff',
  },
  bottomOffeer: {
    marginTop: 16,
    // borderWidth: 0.5,
    borderColor: "#A9A9A9",
    padding: 8,
    backgroundColor: "#E8E9EC",
    borderRadius: 10,
    justifyContent: "center"
  },
  rowStyleMainV2: {
    flexDirection: "row",
    alignItems: "center",
  },

  boldUpperCaseText20: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 16,
    flexShrink: 1, // Allows text to shrink if necessary to prevent overflow
    flexWrap: 'wrap', // Wrap text if needed
  },

  // applyButtonCARD: {
  //   backgroundColor: "#007AFF",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginLeft: "2%",
  //   width: "80%",
  //   alignItems: "center",
  // },
  cardLoanV2: {
    // borderWidth: 0.5, 
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",

  },
  header: {
    marginHorizontal: 16,
    marginTop: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  // topSection: {
  // cardContainer: {
  //   padding: 16,
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   borderRadius: 8,
  //   margin: 8,
  //   backgroundColor: '#fff',
  // },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // title: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  timeContainer: {
    flex: 1,                  // Контейнер занимает всю доступную область
    justifyContent: 'flex-start', // Выравнивание по верхнему краю
    alignItems: 'flex-start',    // Выравнивание по левому краю
    marginTop: 20,             // Опционально для отступа сверху
  },

  circle: {
    width: 25,                // Ширина круга
    height: 25,               // Высота круга
    borderRadius: 25,         // Полукруглый радиус (для создания круга)
    position: 'absolute',     // Абсолютное позиционирование
    top: -20,                    // Отступ от верхнего края
    right: 0,                 // Отступ от правого края
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
  // buttonText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   textAlign: 'center',

  // },
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
})