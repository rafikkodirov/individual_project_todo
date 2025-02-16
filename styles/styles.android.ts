import { ScaledStyleSheet } from '@/Common/ScaledStyleSheet';
 
export default ScaledStyleSheet.create({
  applyTextFirst: {
    fontSize: 30,
    marginTop: "4%",
    marginBottom: "40%",
    color: "black",
    textAlign: "center",
  },
  titleInSettings: {
    fontSize: 30,
    fontWeight: 'bold', 
  },  
  safeArea: {
    flexGrow: 1,
    paddingHorizontal: 4,
    paddingBottom: 24,
    backgroundColor: '#E0E0E0',  
  }, 
  TextTitle: {
    fontSize: 24,  
    fontWeight: 'bold',  
    color: '#333333',  
    marginBottom: 10, 
    textAlign: 'center', 
  }, 
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  detailsButton: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 10,
    width: "60%",

    // marginStart: "-1%",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  rowContainer: {
    flexDirection: 'row', // Align elements horizontally
    justifyContent: 'space-between', // Space between title and button
    alignItems: 'center', // Align elements vertically in the center
    marginTop: 10,
  },
  cardContainerGroup: {
    padding: 10,
    marginHorizontal:10, 
    borderWidth: 1, 
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff',
  }, 
  colorOption: { 
    width: 40,
    height: 40,
    margin: 8,
    borderRadius: 5,
  },
  cardContainer: {
    padding: 16, 
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff',
    shadowColor: '#000', // Цвет тени
    shadowOffset: { width: 1, height: 5 }, // Смещение тени
    shadowOpacity: 0.5, // Прозрачность тени
    shadowRadius: 8, // Радиус тени
    elevation: 8, // Для Android
  },  
  title: {
    fontSize: 15,
    marginVertical: -1,
    fontWeight: "bold",
  },
  contentTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
  square: {
    width: 20,
    height: 20, 
    borderWidth:1,
    borderColor:'black',
    // borderRadius: 10,  // Для округленных углов
  },
  circle: {
    width: 25,                 
    height: 25,                
    borderRadius: 25,          
    position: 'absolute',      
    top: -20,                  
    right: 0,                 
  },
  timeContainerGroup: {
    flex: 1,               
    justifyContent: 'flex-start',  
    alignItems: 'flex-start',   
    marginTop: 20,             
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
  buttonTask: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  }, 
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    marginLeft: "2%",
    width: "50%",
    alignItems: "center",
  },    
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },   
  applyText: {
    fontSize: 20,
    color: "#fff",
    alignSelf:"center"
  }, 
  rowStyle: {
    justifyContent: "space-between", 
    marginBottom: 5,
    flexDirection: "row",
  },    
  containerSignUp: {
    height: "100%",
    flex: 1,
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff',
  },
  content:{
    justifyContent: 'center',
    alignItems: 'center',  
  },
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
    backgroundColor: '#E0E0E0', // Серый фон для Android
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonContainerInDetails: {
    flexGrow: 1, 
    justifyContent: 'flex-end',  
    padding:8,
  },
  Button: {
    width: '100%',
    marginTop:'5%',
    backgroundColor: '#fff',
    borderRadius: 10,
   
    alignItems: 'center',
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
  inputDescription: {
    height: 100,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Выравнивание текста сверху
  },
  searchInput:{
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  buttonInDetails: {
    marginHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007BFF', // Цвет фона кнопки
    textAlign: "center",
    alignItems: 'center', // Центрирование по горизонтали
    borderRadius: 10,
    color: 'white',
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

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  }, 
  groupItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupText: {
    fontSize: 16,
  },   
  containerSignIn: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  }, 
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  error: { color: "red", marginBottom: 10 },
});
