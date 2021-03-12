
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Muscles = ({ route, navigation }) => {
    const [muscles, setMuscles] = useState([]);
    const imgurl = 'https://wger.de'
    const getMuscles = async () => {

        try {
            const response = await fetch('https://wger.de/api/v2/muscle/?format=json');
            const json = await response.json();
            setMuscles(json);
        }
        catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getMuscles();
    }, [])

    return (muscles.count ?
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Muscles</Text>
            </View>
            <View style={styles.divider} />
            {muscles.results.map((muscle, i) => {
                var url = imgurl + muscle.image_url_main;
                var title = 'Exercises for ' + muscle.name;
                return (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Exercises by muscle', { screen: title, params: muscle.id })}>
                        <View style={styles.categoryContainer}>
                            <Image source={{ uri: url }} />
                            <Text style={styles.subTitle}>{muscle.name}</Text>
                        </View>

                    </TouchableOpacity>
                )
            })}

        </ScrollView>

        : <Text>Loading...</Text>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 40,
        height: 100,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    imgContainer: {
        marginTop: 10,
        height: 400,
        width: 'auto',
        flexDirection: 'row',
        padding: 5,

    },
    categoryContainer: {
        marginTop: 10,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center'

    },
    textContainer: {
        marginTop: 10,
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
        padding: 10,
    },
    titleContainer: {
        marginTop: 10,
        marginBottom: 10,
        height: 60,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left'
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
export default Muscles;