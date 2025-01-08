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
import * as Localization from "expo-localization"; 


export const addElementToTheFirebase = (path: string, element: any) => {
  const tasksCollectionRef = collection(db, path);
  addDoc(tasksCollectionRef, element);
};

export const updateElementToTheFirebase = (docPath: string, element: any) => {
  const tasksCollectionRef = doc(db, docPath, element.key);
  delete element.key;
  updateDoc(tasksCollectionRef, element);
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
 console.log("getFilteredItems222", path, conditions);
  try {
 
    let queryRef = query(collection(db, path));
    // Apply each "where" condition to the query
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

      // if (elements['startDate']) {
      //   elements['startDate'] = elements['startDate'].toDate()
      // }
      // // if (elements['endDate']) {
      // //   elements['endDate'] = elements['endDate'].toDate()
      // // }
      // console.log(elements)
      
      itemsArray.push(elements);
    });

    return itemsArray;
  } catch (error) {
    console.error('Ошибка получения данных из Firestore:', error);
    return [];
  }
};

export default { addElementToTheFirebase, updateElementToTheFirebase, getItems }

// export const getItems = async () => {
//   const path = `/tasks`
//   try {
//     const querySnapshot = await getDocs(collection(db, path));
//     const itemsArray: any[] = [];

//     querySnapshot.forEach((doc) => {
//       const elements = {
//         key: doc.id,
//         ...JSON.parse(JSON.stringify(doc.data())),
//       };
//       itemsArray.push(elements);
//     });
//   }catch (error) {
//     console.error('Ошибка получения данных из Firestore:', error);
// }
// }

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



















// export enum OfferCollection {
//   FAQ = 0,
//   LOANS = 1,
//   CARDS = 2,
// }
// let appVersion = "v1";
// const rootCollection = appVersion === "v1" ? "collection_v1" : "collection_v2";
// const offerCollections = ["faq/articles", "loans", "cards"];

// import testOfferV1 from "./offer_v1.json";
// import testLoanV2 from "./loan_v2.json";



// export const getItems = async (offerCollectionIndex: OfferCollection) => {
//   const path =`/test`
//   //   offerCollectionIndex == 0
//   //     ? `/${rootCollection}/${offerCollections[offerCollectionIndex]}`
//   //     : `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}`;
//   try {
//     const querySnapshot = await getDocs(collection(db, path));
//     const itemsArray: any[] = [];

//     querySnapshot.forEach((doc) => {
//       const elements = {
//         key: doc.id,
//         ...JSON.parse(JSON.stringify(doc.data())),
//       };
//       itemsArray.push(elements);
//     });

//     console.log(itemsArray, "................................");

//     if (itemsArray.length === 0) {
//       addTestOfferToTheFirebase(offerCollectionIndex);
//     }

//     if (appVersion !== "v1" && offerCollectionIndex === OfferCollection.CARDS) {
//       const plCards: any[] = itemsArray.filter(
//         (item: any) => item.isPlastCard === true
//       );
//       const creds: any[] = itemsArray.filter(
//         (item: any) => item.isPlastCard !== true
//       );
//       plCards[0].type = "Кредитные карты";
//       creds[0].type = "Кредиты";
//       const result = [...plCards, ...creds];
//       return result;
//     } else {
//       return itemsArray;
//     }
//   } catch (error) {
//     console.error("Error fetching items: ", error);
//     return [];
//   }
// };

// export const setItemClick = async (
//   offerCollectionIndex: OfferCollection,
//   offer: any
// ) => {
//   try {
//     // Step 1: Get the language code and Firestore path
//     /* The line `// const path = ` is a commented-out line of code in TypeScript. This means that this
//     line is not being executed by the program and is simply there for reference or as a placeholder.
//     In this specific context, it seems like the line was originally intended to define the `path`
//     variable for some purpose, but it is currently commented out and not used in the code. */
//     const path = `/test`
//     // `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}/${offer.key}`;
//     const offerDocRef = doc(db, path);

//     // Step 2: Retrieve the document's current data
//     const offerDocSnapshot = await getDoc(offerDocRef);
//     if (!offerDocSnapshot.exists()) {
//       console.error("Document does not exist:", path);
//       return;
//     }

//     // Step 3: Get the current views field
//     const currentData = offerDocSnapshot.data();
//     const currentViewsCount = currentData?.views || 0;

//     // Step 4: Increment the viewsCount by 1
//     const updatedViewsCount = currentViewsCount + 1;

//     // Step 5: Update the viewsCount in Firestore
//     await updateDoc(offerDocRef, { views: updatedViewsCount });

//     console.log(
//       `Updated viewsCount to ${updatedViewsCount} for document:`,
//       path
//     );
//   } catch (error) {
//     console.error("Error updating viewsCount:", error);
//   }
// };
