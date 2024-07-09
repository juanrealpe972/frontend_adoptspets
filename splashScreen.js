import {View, StyleSheet, Image} from 'react-native';
import IconoSubcoffe from './App/resources/logo_adoptpets.jpg';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={IconoSubcoffe} style={styles.Image} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Image: {
        width: 350,
        height: 350,
        resizeMode: 'cover',
    },
});
