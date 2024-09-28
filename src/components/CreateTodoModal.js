import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { useStore } from '../store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { todo } from '../services';


const InputBox = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const openModel = useStore(state => state.openModel);
  const setOpenModel = useStore(state => state.setOpenModel);
  const todoList = useStore(state => state.todoList);
  // const setTodoList = useStore(state => state.setTodoList);
  const editTodoId = useStore(state => state.editTodoId);
  const setRefresh = useStore(state=> state.setRefresh)
  const refresh = useStore(state=>state.refresh)


  useEffect(() => {

    if (editTodoId) {
      const todo = todoList.find(todo => todo.id === editTodoId);
      setTitle(todo.title);
      setDescription(todo.description);
      setImage(todo.image);
    }

  }, [editTodoId]);



  const OpenImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.5
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        setImage(response.assets[0]?.uri);
      }
    });
  };


  const handleAddTodo = () => {

    if (editTodoId) {
      
      try {
        todo.update({ editTodoId,title, description, imageUrl: image }).then(res => {
          ToastAndroid.BOTTOM('Update successfully')
          setRefresh(!refresh)
        })
      } catch (error) {
        console.log(error)
      }
      // setTodoList(updatedTodoList);

    } else {

      // setTodoList([...todoList, newTodo]);
      try {
        todo.setTodo({ title, description, imageUrl: image, status: false, reminder: null }).then((res) => {
          // console.log(res, 'tklalkkl');
          setRefresh(!refresh)
        })
      } catch (error) {
        console.log(error)
      }

    }
    setOpenModel(false);
    setDescription('');
    setTitle('');
    setImage(null);

  }






  return (
    <Modal
      isVisible={openModel}
      onBackdropPress={() => setOpenModel(false)}
      onBackButtonPress={() => setOpenModel(false)}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor={'#000'}
        />
        <TextInput
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity onPress={OpenImagePicker}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: '#000', marginBottom: 10 }}>Attach file</Text>
            <Ionicons name='attach-outline' size={24} color='black' style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
        <View>

          {image && (
            <>
              <Ionicons name='close-circle' size={24} color='red'
                onPress={() => setImage(null)}
                style={{ position: 'absolute', right: 10, top: 10 }}
              />
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginBottom: 10 }}
              />
            </>
          )}
        </View>

        <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    color: '#000',
  },
  button: {
    backgroundColor: '#2e64e5',
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
