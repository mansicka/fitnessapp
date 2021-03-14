import React from 'react';
import { StyleSheet, Text, Container, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Main = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    wger.de Fitness App
          </Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Categories')
                } >
                    <Text style={styles.subTitle}>
                        Exercise categories
          </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Muscles')
                } >
                    <Text style={styles.subTitle}>
                        Exercises by muscle
          </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Search')
                } >
                    <Text style={styles.subTitle}>
                        Search exercises
          </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Favorites')
                } >
                    <Text style={styles.subTitle}>
                        Saved favorites
          </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    mainContainer: {
        height: '80%',
        width: '100%',
        flexDirection: 'column',
        padding: 5,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
    },
    imgContainer: {
        marginTop: 10,
        height: 400,
        width: 'auto',
        flexDirection: 'row',
        padding: 5,

    },
    linkContainer: {
        marginTop: 40,
        marginBottom: 40,
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
        padding: 10,
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 10,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',

    },
    image: {
        height: '100%',
        flex: 0.35

    },
    subtContainer: {
        marginTop: 20,
        marginBottom: 5,
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
        padding: 5,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '50%',
    },
    content: {
        flex: 0.65,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        width: '99%',
        textAlign: 'center',
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 50

    },
    buttonContainer: {
        width: '80%'
    },

})
export default Main;