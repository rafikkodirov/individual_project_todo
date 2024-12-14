import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import * as Localization from "expo-localization";
// import i18n from "@/i18n/i18n";

export enum OfferCollection {
  FAQ = 0,
  LOANS = 1,
  CARDS = 2,
}
let appVersion = "v1";
const rootCollection = appVersion === "v1" ? "collection_v1" : "collection_v2";
const offerCollections = ["faq/articles", "loans", "cards"];

import testOfferV1 from "./offer_v1.json";
import testLoanV2 from "./loan_v2.json";


export const addTestOfferToTheFirebase = (
  offerCollectionIndex: OfferCollection
) => {
  const langs = ["ru", "en", "es", "vi"];
  langs.forEach((x: any) => {
    // const path = `/${rootCollection}/${x}/${offerCollections[offerCollectionIndex]}`;
    const path = `/test`
    const offerDocRef = collection(db, path);
    if (appVersion === "v1") {
      addDoc(offerDocRef, testLoanV2);
      addDoc(offerDocRef, testLoanV2);
      addDoc(offerDocRef, testLoanV2);
      addDoc(offerDocRef, testLoanV2);
    } else {
      if (offerCollectionIndex === OfferCollection.CARDS) {
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, {...testLoanV2,
          isPlastCard: true,
        });
      } else {
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
        addDoc(offerDocRef, testLoanV2);
      }
    }
  });
};

export const getItems = async (offerCollectionIndex: OfferCollection) => {
  const path =`/test`
  //   offerCollectionIndex == 0
  //     ? `/${rootCollection}/${offerCollections[offerCollectionIndex]}`
  //     : `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}`;
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const itemsArray: any[] = [];

    querySnapshot.forEach((doc) => {
      const elements = {
        key: doc.id,
        ...JSON.parse(JSON.stringify(doc.data())),
      };
      itemsArray.push(elements);
    });

    console.log(itemsArray, "................................");

    if (itemsArray.length === 0) {
      addTestOfferToTheFirebase(offerCollectionIndex);
    }

    if (appVersion !== "v1" && offerCollectionIndex === OfferCollection.CARDS) {
      const plCards: any[] = itemsArray.filter(
        (item: any) => item.isPlastCard === true
      );
      const creds: any[] = itemsArray.filter(
        (item: any) => item.isPlastCard !== true
      );
      plCards[0].type = "Кредитные карты";
      creds[0].type = "Кредиты";
      const result = [...plCards, ...creds];
      return result;
    } else {
      return itemsArray;
    }
  } catch (error) {
    console.error("Error fetching items: ", error);
    return [];
  }
};

export const setItemClick = async (
  offerCollectionIndex: OfferCollection,
  offer: any
) => {
  try {
    // Step 1: Get the language code and Firestore path
    /* The line `// const path = ` is a commented-out line of code in TypeScript. This means that this
    line is not being executed by the program and is simply there for reference or as a placeholder.
    In this specific context, it seems like the line was originally intended to define the `path`
    variable for some purpose, but it is currently commented out and not used in the code. */
    const path = `/test` 
    // `/${rootCollection}/${i18n.locale}/${offerCollections[offerCollectionIndex]}/${offer.key}`;
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

    console.log(
      `Updated viewsCount to ${updatedViewsCount} for document:`,
      path
    );
  } catch (error) {
    console.error("Error updating viewsCount:", error);
  }
};

/*
V2
{
    "name": "ПСБ",
    "rate": 5,
    "offer_short": "Онлайн для новых клиентов",
    "offer_short_sum": "до 30 000 ₽",
    "srok": "15 минут",
    "approval": "Среднее",
    "views": 4525,
    "advantage": "Первый займ под 0%",
    "loan_sum": "3 000₽ - 30 000₽",
    "age": "от 18 лет",
    "docs": "Паспорт, снилс",
    "schedule": "Круглосуточно",
    "license": "№111111",  
    "offer_detail": "ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.  ПСБ - высокий уровень одобрения — мы выдаем более тысячи займов ежедневно. Наша клиентская база состоит из миллионов клиентов, 85% которых рекомендуют нас своим друзьям и близким. Мы предлагаем самые выгодные условия для повторных клиентов — для них действуют сниженные процентные ставки и увеличение срока займов. Новые клиенты могут оформить займ под 0%.",
    "image": "https://firebasestorage.googleapis.com/v0/b/my-poster-b3932.appspot.com/o/credit7.png?alt=media&token=f6967b32-19d8-4252-b46f-05a1df5cd3c0",
    "active": true,
    "site": "https://www.psbank.ru/"
}

*/
