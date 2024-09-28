import React from 'react';
import { Card, Checkbox, IconButton } from 'react-native-paper';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewImage from '../../components/ViewImage';
import moment from 'moment';
import ReminderModal from './ReminderModel';
import { useTheme } from 'react-native-paper';
import { todo } from '../../services';
const RenderItem = ({ setOpenModel,item,setEditTodoId,  setIsVisible, isVisible, refresh,setRefresh, showRemiderModel, setShowReminderModel }) => {
    const { colors } = useTheme();
    const handleDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => todo.deleteTodo(item._id) },
            ],
            { cancelable: false }
        );
    };

    const handleStatus = () => {
        // setStatus(item._id);
        const todoid = item._id;
        todo.update({todoid,status:true}).then((res)=>{
            setRefresh(!refresh);
        })
    };

    const formattedTime = moment(item.time).format('MMMM Do, h:mm A');


    const handleEdit = () => {
        setOpenModel(true);
        setEditTodoId(item._id);
    }

    return (
        <>
            <Card style={{
                ...styles.card,
                backgroundColor: item.status ? '#80ed99' : '#fff'
            }}>
                <View style={styles.row}>
                    <Checkbox
                        status={item.status ? 'checked' : 'unchecked'}
                        onPress={handleStatus}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        {
                            !item.status && <TouchableOpacity
                                onPress={() => setShowReminderModel(!showRemiderModel)}
                            >
                                <IconButton
                                    icon={() => <Ionicons name="notifications-outline" size={24} color={item.reminder ? colors.primary : colors.text} />}
                                    onPress={() => { }}
                                    style={{ ...styles.bellIcon }}
                                />
                            </TouchableOpacity>
                        }

                    </View>
                </View>
                <Card.Content>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.time}>{formattedTime}</Text>
                        <View style={styles.iconContainer}>
                            {
                                !item.status && <TouchableOpacity onPress={handleEdit}>
                                    <Ionicons name="create-outline" size={24} color="#000" style={styles.icon} />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                                <Ionicons name='attach-outline' size={24} color='black' style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete}>
                                <Ionicons name="trash-outline" size={24} color="#ef233c" />
                            </TouchableOpacity>
                            {/* edit icon here  */}

                        </View>
                    </View>
                </Card.Content>
            </Card>
            {showRemiderModel && <ReminderModal showRemiderModel={showRemiderModel} onCloseReminderModal={() => setShowReminderModel(false)} id={item.id} />}
            {isVisible && <ViewImage isVisible={isVisible} imageUrl={item.image} onClose={() => setIsVisible(false)} />}
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        flex: 1,
        color: '#000',
    },
    bellIcon: {
        marginRight: 0,

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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
});

export default RenderItem;
