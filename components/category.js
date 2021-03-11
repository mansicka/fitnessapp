
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import GetImagesById from './util/getImages'

const Category = (categoryid) => {
    const id = categoryid.categoryid.toString()
    const url = 'https://wger.de/api/v2/exercise/?format=json&language=2&category=';
    const [exercises, setExercises] = useState([])

    const getExercisesFromCategory = async () => {

        try {
            const response = await fetch(url + id);
            const json = await response.json();
            setExercises(json.results);


        }
        catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {
        console.log('category.js- load exercises')
        getExercisesFromCategory(categoryid);
    }, [])
    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Exercises</Text>
            </View>
            <View style={styles.divider} />
            {exercises ?

                exercises.map((exercise, i) => {


                    return (
                        <TouchableOpacity key={i} onPress={() => {
                            console.log('Press');

                        }
                        } >
                            <View style={styles.cardContainer} key={i} >
                                {/* <GetImagesById id={exercise.id} /> */}
                                <View style={styles.content}>
                                    <Text style={styles.subTitle}>{exercise.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                    )
                })
                : <Text>Loading.. </Text>}



        </ScrollView>



    );



}
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

export default Category;