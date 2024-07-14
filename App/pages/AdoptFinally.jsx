import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomModal from '../components/modal/modal'

const AdoptFinally = ({visible, onClose}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={{ flex:1 }}>
            <CustomModal visible={visible} onClose={onClose}>
                <Text>AdoptFinally</Text>
            </CustomModal>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}
                onRequestClose={() => {}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color="#39A800" />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default AdoptFinally