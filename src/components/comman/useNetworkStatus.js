import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';

const useNetworkStatus = (onConnect, onDisconnect) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {  
        onConnect();
      } else {
        onDisconnect();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};
