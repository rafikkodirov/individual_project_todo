import { View, Text, Button, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getItems} from '../services/firestore' 

const ActiveTask: React.FC = () => {
  const [items, setItems] = useState<any[]>([]); 
 
  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems("tasks");
      setItems(fetchedItems); 
    };

    fetchItems();
  }, []);
  return (
     <View>
       <FlatList
          
        />
     </View>
  )
}

export default ActiveTask