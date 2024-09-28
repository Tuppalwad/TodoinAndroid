import React from 'react';
import { StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useStore } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddButton = () => {
    const setOpenModel = useStore(state => state.setOpenModel);
    const openModel = useStore(state => state.openModel);
    const handlePress = () => {
        setOpenModel(!openModel);
    };

    return (
        <FloatingAction
            position='right'
            distanceToEdge={20}
            floatingIcon={<AntDesign name="plus" size={20} color="white" />}
            onPressMain={handlePress} // Use onPressMain to handle the press event
            overlayColor="transparent" // Set overlay color to transparent
        />
    );
};

export default AddButton;

const styles = StyleSheet.create({});
