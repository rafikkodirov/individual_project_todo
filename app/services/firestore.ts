import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "./firebaseConfig";
import * as Localization from "expo-localization";
import i18n from "@/i18n/i18n";

export enum OfferCollection {
  FAQ = 0,
  LOANS = 1,
  CARDS = 2,
}

export enum AppVersion {
  v1 = 1,
  v2 = 2,
}

const offerCollections = ["faq", "loans", "cards"];

import testOfferV1 from "./loan_v1.json";
import testCardV1 from "./card_v1.json";
import testLoanV2 from "./loan_v2.json";
import testCardV2 from "./card_v2.json";
import faq from "./faq.json";

export const addTestOfferToTheFirebase = (appVersion: AppVersion, offerCollectionIndex: OfferCollection
) => {  
  const rootCollection = appVersion === AppVersion.v1 ? "collection_v1" : "collection_v2";
  const langs = ["ru", "en", "es", "vi"];
  langs.forEach((x: any) => {
    const path = `/${rootCollection}/${x}/${offerCollections[offerCollectionIndex]}`;
    const offerDocRef = collection(db, path);
    if (appVersion === AppVersion.v1) {
      if(offerCollectionIndex === OfferCollection.FAQ){
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
        addDoc(offerDocRef, faq);
      } else if (offerCollectionIndex === OfferCollection.LOANS) {
        addDoc(offerDocRef, testOfferV1);
        addDoc(offerDocRef, testOfferV1);
        addDoc(offerDocRef, testOfferV1);
        addDoc(offerDocRef, testOfferV1);
      } else {
        addDoc(offerDocRef, testCardV1);
        addDoc(offerDocRef, testCardV1);
        addDoc(offerDocRef, testCardV1);
        addDoc(offerDocRef, testCardV1);
      }
    } else {
      if (offerCollectionIndex === OfferCollection.CARDS) {
        addDoc(offerDocRef, {...testCardV2,
          isPlastCard: true,
        });addDoc(offerDocRef, {...testCardV2,
          isPlastCard: true,
        });addDoc(offerDocRef, {...testCardV2,
          isPlastCard: true,
        });
        addDoc(offerDocRef, {...testCardV2,
          isPlastCard: false,
        });
      } else {
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
      }
    }
  });
};

export const getItems = async (appVersion: AppVersion, offerCollectionIndex: OfferCollection) => {
  const rootCollection = appVersion === AppVersion.v1 ? "collection_v1" : "collection_v2";
  const path = `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}`;
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const itemsArray: any[] = [];
    
    querySnapshot.forEach((doc) => {
      const elements = {
        ...doc.data(),
        key: doc.id,
        card_type: "***",
      };
      itemsArray.push(elements);
    });


    if (itemsArray.length === 0) {
      addTestOfferToTheFirebase(appVersion, offerCollectionIndex);
      return []
    }

    if (appVersion === AppVersion.v2 && offerCollectionIndex === OfferCollection.CARDS) {
      const plCards: any[] = [];
      const creds: any[] = []; 
      

      itemsArray.forEach((item: any) => {
        if(item.isPlastCard  === true) {
          plCards.push({...item, card_type: "***"});
        } else {
          creds.push({...item, card_type: "***"});
        }
      }); 
 
      if(plCards && plCards.length > 0)
        plCards[0].card_type = "Кредитные карты";
      if(creds && creds.length > 0)
        creds[0].card_type = "Кредиты"; 
      
      return [...plCards, ...creds];
    } else { 
      return itemsArray;
    }
  } catch (error) {
    console.error("Error fetching items: ", error);
    return [];
  }
};

export const setItemClick = async (appVersion: AppVersion, 
  offerCollectionIndex: OfferCollection,
  offer: any
) => {
  try {
    const rootCollection = appVersion === AppVersion.v1 ? "collection_v1" : "collection_v2";
 // Step 1: Get the language code and Firestore path
    const path = `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}/${offer.key}`;
    const offerDocRef = doc(db, path);

    // Step 2: Retrieve the document's current data
    const offerDocSnapshot = await getDoc(offerDocRef);
    if (!offerDocSnapshot.exists()) {
      console.error("Document does not exist:", path);
      return;
    }

    // Step 3: Get the current views field
    const currentData = offerDocSnapshot.data();
    const currentViewsCount = currentData?.views || 0;

    // Step 4: Increment the viewsCount by 1
    const updatedViewsCount = currentViewsCount + 1;

    // Step 5: Update the viewsCount in Firestore
    await updateDoc(offerDocRef, { views: updatedViewsCount });

    // console.log(
    //   `Updated viewsCount to ${updatedViewsCount} for document:`,
    //   path
    // );
  } catch (error) {
    console.error("Error updating viewsCount:", error);
  }
};

export default {
  getItems,
  setItemClick,
};