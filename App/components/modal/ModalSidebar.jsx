import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableWithoutFeedback, Image, Text } from 'react-native';
import icono from '../../resources/IconoSubCoffee.png';

const ModalSide = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-300));

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.imageContainer}>
                <Image 
                  source={icono}  
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.text}>Contenido de la slidebar</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: 270,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImage: {
    width: 120,
    height: 120,
    margin:10
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default ModalSide;
