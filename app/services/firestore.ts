import { 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "./firebaseConfig"; 


export const addElementToTheFirebase = (path: string, element: any) => {
  const tasksCollectionRef = collection(db, path);
  addDoc(tasksCollectionRef, element);
};

// export const updateElementToTheFirebase = (docPath: string, element: any) => {
//   const tasksCollectionRef = doc(db, docPath, element.key);
//   delete element.key;
//   updateDoc(tasksCollectionRef, element);
// }; 
export const updateElementToTheFirebase = async (docPath: string, element: any) => {
  try {
    const { key, ...updateData } = element; // Деструктурируем key, чтобы не мутировать объект
    const tasksCollectionRef = doc(db, docPath, key);

    await updateDoc(tasksCollectionRef, updateData); // Ждём завершения обновления
  } catch (error) {
    console.error("Ошибка при обновлении документа:", error);
  }
};

  export const deleteElementFromFirebase = async (docPath: string, element: any) => {

    const elementRef = doc(db, docPath, element.key);
    await deleteDoc(elementRef);
  }

  interface Item {
    key: string;
    [key: string]: any;
  }
  
export const getFilteredItems = async (path: string, key: string, optionWhere: any) => {
  console.log("getFilteredItems", path, key, optionWhere);
  try {
    const q = query(collection(db, path), where(key, '==', optionWhere));
    const querySnapshot = await getDocs(q);
    const itemsArray: Item[] = [];

    querySnapshot.forEach((doc) => {
      const elements: Item = {
        key: doc.id,
        ...doc.data(),
      }; 
      itemsArray.push(elements);
    });

    return itemsArray;
  } catch (error) {
    console.error('Ошибка получения данных из Firestore:', error);
    return [];
  }
}


export interface WhereCondition {
  key: string;
  operator: WhereFilterOp; // Use Firestore's WhereFilterOp type for operators
  value: any;
}

export const getFilteredItemsV2 = async (path: string, conditions: WhereCondition[]) => {
//  console.log("getFilteredItems222", path, conditions);
  try {
 
    let queryRef = query(collection(db, path)); 
    conditions.forEach(condition => {
      queryRef = query(queryRef, where(condition.key, condition.operator, condition.value));
    });

    const querySnapshot = await getDocs(queryRef);
    const itemsArray: Item[] = [];

    querySnapshot.forEach((doc) => {
      const elements: Item = {
        key: doc.id,
        ...doc.data(),
      };
      itemsArray.push(elements);
    });

    return itemsArray;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    return [];
  }
};



export const getItems = async (path: string): Promise<Item[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const itemsArray: Item[] = [];

    querySnapshot.forEach((doc) => {
      const elements: Item = {
        key: doc.id,
        ...doc.data(),
      };
 
      itemsArray.push(elements);
    });

    return itemsArray;
  } catch (error) {
    console.error('Ошибка получения данных из Firestore:', error);
    return [];
  }
};

export default { addElementToTheFirebase, updateElementToTheFirebase, getItems }
 

export const getUser = async (email: string): Promise<any> => {
  try { 

  const userRef = doc(db, `/users/${email}`);
  // console.log("getUser 2");

  const docSnapshot = await getDoc(userRef); 
    
  if(!docSnapshot.exists())
    return null;
  const userData = docSnapshot.data();
    
    return userData 
  } catch (error) {
    console.error('Ошибка получения данных из Firestore:', error);
    return null;
  }
};
 