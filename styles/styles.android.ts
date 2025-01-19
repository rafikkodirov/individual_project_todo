import { ScaledStyleSheet } from '@/app/ScaledStyleSheet';
 

export default ScaledStyleSheet.create({
  applyButtonDetails: {   
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
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
    padding: 16
  },   
  PageTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleDetails: {
    // padding:8,
    fontSize: 11,
    
    marginTop:3,
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
  // container: {
  //   flex: 1, // Ensures it fills the entire screen 
  //   paddingTop: 10, // Padding for top and bottom edges 
  // },

  // Title Text Style
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
  }, 
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
    marginTop: 5,
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
    width: "50%",
    
    marginStart:"-1%",
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
    marginLeft:"2%",
    width: "50%",
    alignItems: "center",
  }, 
  // Body Text Style
  TextBody: {
    fontSize: 14.5, 
    marginBottom:16 ,
    fontWeight: 'normal', 
    color: '#666666',
    lineHeight: 16, 
    textAlign: 'center',  
    marginHorizontal: 16, 
  },

  // Free Height Filler
  freeHeight: {
    flexGrow: 1, // This will fill the remaining vertical space 
  },

  listContent: {
    paddingBottom: 16, // Add padding to ensure the last item isn't cut off
  },
  // container: {
  //   flex: 1,
  //   // flexGrow: 1,
  //   paddingTop: 16,
  //   // backgroundColor: 'red', // Фон для контента
  // },
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
    paddingBottom: 16
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
  // TextTitle: {
  //   textAlign: "center",
  //   fontSize: 24, // Меньше размера текста для Android
  //   fontFamily: "inter_medium",
  //   fontWeight: 'bold',
  //   color: '#000',
  // },
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
    width: 14, // Меньший размер индикаторов
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
  containerSignUp: {
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
    fontSize: 18,
    color: '#FFF',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonSignIn: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
  containerSignIn: {
    flex: 1,
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonDown: {
    width: '100%',
    
    height: 50,
    marginTop: "4%",
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  error: { color: "red", marginBottom: 10 },
});
