import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewImage = ({ imageUrl, isVisible, onClose }) => {

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text
            
              style={{ fontSize: 18, color: '#666', justifyContent: 'center' }}
            >No Image</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
