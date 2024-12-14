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
  footerContainer: {
    display: "flex",
    flexGrow: 2,
    minHeight: 80,
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end',
    paddingBottom: 16
  },
  backButton: {
    padding: 16,
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
    backgroundColor: '#F0F0F0', // Светлый фон для iOS
  },
  bannerCard: {
    borderRadius: 30,
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
  TextTitle: {
    textAlign: "center",
    fontSize: 20, // Немного крупнее для iOS
    fontFamily: "inter_semi_bold",
    fontWeight: '600',
    color: '#000',
  },
  // container: {
  //   flex: 1, // Ensures it fills the entire screen 
  //   paddingTop: 10, // Padding for top and bottom edges 
  // },

  // Title Text Style
  // TextTitle: {
  //   fontSize: 24, // Adjust for a prominent title size
  //   fontWeight: 'bold', // Make the title bold
  //   color: '#333333', // Dark text color
  //   marginBottom: 10, // Add spacing after the title
  //   textAlign: 'center', // Center the title horizontally
  // },
  card: {
    borderWidth: 0.5,
    borderColor:"#000000",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14, 
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, 
  }, 
  topSection: {
    flexDirection: "row",
    alignItems: "stretch", 
  },
  rowStyleContainer: { 
    flex: 1, // Ensures the rowStyleContainer takes up remaining space
    alignItems: "stretch",
  },
  rowStyle: {
    flexDirection: "row",  
  },
  
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold", 
    
  },
  PageTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleDetails: {
    // padding:8,
    fontSize: 9,
    
    marginTop:10,
    fontWeight: "bold", 
  },  
  subtitleDetails: {
    color: "#231F20",
    fontSize: 11,
    textAlign:"left",
    flex: 1,
    marginTop:8,
  },
  subtitle: {
    color: "#231F20",
    fontSize: 11,
    textAlign:"left",
    flex: 1,
    marginTop:8,
  },
  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  amount: { 
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  ratingText: {
    fontSize: 12,
    marginRight: 5,
  },
  reviews: {
    color: "#888",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    
    marginStart:"-1%",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 11,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginLeft:"2%",
    width: "50%",
    alignItems: "center",
  },
  applyText: {
    fontSize: 11,
    color: "#fff",
  },
  // Body Text Style
  TextBody: {
    fontSize: 14, // Slightly smaller than the title
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
    paddingBottom: 16, // Add padding to ensure the last item isn't cut off
  },
  TextAfterTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "inter_regular",
    color: '#666', // Более мягкий оттенок текста
  },
  ROW: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "-15%",
  },
  miniButton: {
    width: 16,
    height: 16,
    backgroundColor: "#C4C4C4", // Другой оттенок серого для iOS
    borderRadius: 8, // Более плавные края
  },
  miniActiveButton: {
    width: 16,
    height: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#F8F8F8',
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
    marginTop: 85,
    marginBottom: 20,
    backgroundColor: '#007AFF', // Используем стандартный синий для iOS
    padding: 15,
    textAlign: "center",
    width: 300,
    borderRadius: 20,
  },
});
