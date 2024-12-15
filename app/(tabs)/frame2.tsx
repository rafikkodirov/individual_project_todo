import { View, Text, Button } from 'react-native'
import React from 'react'
import { addElementToTheFirebase, updateElementToTheFirebase, deleteElementFromFirebase } from '../services/firestore'

const Frame2 = () => {
  return(
<View>
      <Text >Frame1</Text>
      <Button title='Test' onPress={() => addElementToTheFirebase("/tasks", { description: "Do it" })}></Button>
      <View style={{ marginTop: 20 }}>
        <Button title='Test2' onPress={() => updateElementToTheFirebase("/tasks",
          {
            key: '39F8uPN0w3YAsOKwI7As',
            description: "Do it 2"
          }
        )}>

        </Button>

      </View>
      <View style={{ marginTop: 20 }}>
        <Button title='Test3' onPress={() => deleteElementFromFirebase("/tasks",
          {
            key: 'PsVyfgK9V0b6y38YZJew',
          }
        )}>

        </Button>
        
      </View>
    </View>
  )
}

export default Frame2