
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const ViewExercise = (exerciseid) => {

    const [results, setResults] = useState([]);

    //get exerciseinfo from wger
    const getExerciseData = async () => {
        let id = exerciseid.exerciseid.toString()
        try {
            const response = await fetch('https://wger.de/api/v2/exerciseinfo/' +
                id + '/?format=json');
            const json = await response.json();
            console.log(JSON.stringify(response.json))
            setResults(json);
        }
        catch (error) {
            console.log(error);
            setImageuris([]);

        }
    }

    useEffect(() => {
        getExerciseData(exerciseid);
    }, [])

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{results.name}</Text>
            </View>
            {/* <View style={styles.muscleContainer}>
                <Text>Affected muscle: {results.muscles[0].name}</Text>
            </View>

            <View style={styles.imgContainer}>
                {results.images.map((uri, i) => {

                    return (
                        <Image resizeMode='contain' style={styles.image}
                            key={i} source={{ uri: uri.image }} />
                    )

                })
                }

            </View> */}
        </View >

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
        marginTop: 20,
        height: 300,
        width: '100%',
        flexDirection: 'row',
        padding: 5,

    },
    muscleContainer: {
        marginTop: 5,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 10,
        height: 55,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    image: {
        height: '100%',
        flex: 0.35

    },
    content: {
        flex: 0.65,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
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

export default ViewExercise;