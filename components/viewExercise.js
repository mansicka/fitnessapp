
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
            setResults(json);

        }
        catch (error) {
            console.log(error);

        }
    }
    //a function to clean up description string of html
    const cleanString = (string) => {
        const regex = /(<([^>]+)>)/ig;
        const result = string.replace(regex, '');
        return (result)
    }

    useEffect(() => {
        getExerciseData(exerciseid);
    }, [])

    return (results.id ?
        <ScrollView>
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{results.name}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.subtContainer}><Text style={styles.subTitle}>Category</Text>
                    <Text>&#9679; {results.category.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text>&#9679;Affected muscle: {results.muscles[0].name}</Text></View>
                <View style={styles.subtContainer}>
                    <Text style={styles.subTitle}>Description:</Text></View>
                <View style={styles.textContainer}>
                    <Text>{cleanString(results.description)}</Text>
                    <Text style={styles.noteTitle}>Notes: </Text>
                    <Text>{results.comments[0].comment}</Text>
                </View>
                <View style={styles.subtContainer}>
                    <Text style={styles.subTitle}>Images</Text></View>
                <View style={styles.imgContainer}>

                    {results.images.map((uri, i) => {

                        return (
                            <ImageLoad resizeMode='contain' style={styles.image}
                                key={i} source={{ uri: uri.image }} placeholderSource={require('../img/no_image.jpg')} />
                        )

                    })
                    }

                </View>


            </View >
        </ScrollView>
        : <Text>Loading..</Text>

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
    textContainer: {
        marginTop: 1,
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
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

export default ViewExercise;