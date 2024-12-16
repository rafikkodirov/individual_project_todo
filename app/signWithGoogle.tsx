// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import firestore from './services/firestore';

// const GoogleSignInScreen: React.FC = () => {
//   const handleGoogleSignIn = async () => {
//     try {
//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign in the user with the credential
//       const userCredential = await auth().signInWithCredential(googleCredential);

//       // Log user info for debugging
//       console.log('User Signed In:', userCredential.user);

//       // Save user info to Firestore or your database if needed
//       saveUserToFirestore(userCredential.user);
//     } catch (error) {
//       console.error('Error with Google Sign-In:', error);
//     }
//   };

//   const saveUserToFirestore = async (user: any) => {
//     const { uid, email, displayName } = user;

//     try {
//       const userRef = firestore().collection('auth').doc(uid);
//       const doc = await userRef.get();

//       if (!doc.exists) {
//         await userRef.set({
//           email,
//           displayName,
//           createdAt: new Date(),
//         });
//         console.log('User saved to Firestore');
//       }
//     } catch (error) {
//       console.error('Error saving user to Firestore:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign In with Google</Text>
//       <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
//         <Text style={styles.buttonText}>Sign In with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#DB4437', // Google red color
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default GoogleSignInScreen;
