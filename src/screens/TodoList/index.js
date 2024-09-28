import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddButton } from '../../components';
import InputBox from '../../components/CreateTodoModal';
import { useStore } from '../../store/store';
import Loading from '../../components/Loading';
import RenderItem from './RenderItem';
import { todo } from '../../services';


const TodoList = () => {
  const [showLoading, setShowLoading] = useState(true);
  const todoList = useStore(state => state.todoList);
  // const removeTodo = useStore(state => state.removeTodo);
  const openModel = useStore(state => state.openModel);
  const setOpenModel = useStore(state => state.setOpenModel);
  // const editTodoId = useStore(state => state.editTodoId);
  const setEditTodoId = useStore(state => state.setEditTodoId);
  const [isVisible, setIsVisible] = useState(false);
  const setStatus = useStore(state => state.setStatus);
  const setTodoList = useStore(state => state.setTodoList)
  const [showRemiderModel,setShowReminderModel] =useState(false)
  const refresh = useStore(state => state.refresh)
  const setRefresh = useStore(state =>state.setRefresh);
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);


  useEffect(()=>{
    todo.getTodo().then(res=>{
      setTodoList(res.data);
    })
  },[refresh])


  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {showLoading && <Loading />}
          {!showLoading && !todoList.length === 0(
            <FlatList
              data={todoList} 
              renderItem={({ item }) => <RenderItem refresh={refresh} setRefresh={setRefresh} item={item} setEditTodoId={setEditTodoId} setOpenModel={setOpenModel} setIsVisible = {setIsVisible} isVisible={isVisible} setStatus={setStatus} setShowReminderModel={setShowReminderModel} showRemiderModel={showRemiderModel}/>}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
            />
          )}
          {!showLoading && todoList.length === 0 && (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: '#666',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              No items in the list
            </Text>
          )}
        </View>
        {!showLoading && <InputBox />}
      </View>
      <AddButton />
    </>

  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: '#999',
  },
});
