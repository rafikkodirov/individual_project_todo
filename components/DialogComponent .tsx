import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'; 

import Modal from 'react-native-modal';
interface DialogProps {
  isVisible: boolean;
  onClose: () => void;
  dialogWidth: any;
  scrollable?: boolean;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isVisible, onClose, children, dialogWidth, scrollable = false }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}  
      onBackButtonPress={onClose}  
    >
      <View style={[styles.modalContent, { width: dialogWidth }]}>
        {scrollable ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {children}
          </ScrollView>
        ) : (
          <View>{children}</View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  scrollViewContent: {
    flexGrow: 1,  
    paddingBottom: 20, 
  },
});

export default React.memo(Dialog);
