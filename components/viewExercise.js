
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';



const Stack = createStackNavigator();
const ViewExercise = ({ route, navigation }) => {


    const db = SQLite.openDatabase('favorites.db');

    const id = route.params.params;
    const [results, setResults] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const updateFavorites = () => {
        db.transaction(tx => {
            tx.executeSql('select* from favorite;', [], (_, { rows }) => setFavorites(rows._array));
        });
    }


    //get exerciseinfo from wger
    const getExerciseData = async () => {
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

    const saveItem = () => {
        var img = ''
        if (results.images.length == 0) {
            img = '../img/no_image.jpg'
        }
        else {
            img = results.images[0].image.toString()
        }
        db.transaction(tx => {

            tx.executeSql('INSERT INTO favorite (exerciseid, title, imageurl, category) VALUES (?,?,?,?);',
                [results.id, results.name, img, results.category.name]);
        }, (error => console.log(error)), updateFavorites)
        console.log('added item')
    }

    const deleteItem = (id) => {
        db.transaction(tx => { tx.executeSql('DELETE FROM favorite WHERE exerciseid = ?', [id]); }, null, updateFavorites)
        console.log('deleted item')
        console.log(favorites)

    }

    useEffect(() => {
        getExerciseData(route.params);
        db.transaction(tx => {
            tx.executeSql('create table if not exists favorite(exerciseid int, title text, category text, imageurl text, primary key (exerciseid));');
        }, null, updateFavorites()
        );


    }, [])

    return (results.id ?
        <ScrollView>
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{results.name}</Text>
                </View>
                <View style={styles.divider} />
                {favorites.some(e => e.title === results.name) ?

                    <View>

                        <TouchableOpacity onPress={() => deleteItem(results.id)}>
                            <View style={styles.deleteContainer}>
                                <Text style={styles.deleteButtonText}>DELETE FROM FAVORITES</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    : <View>

                        <TouchableOpacity onPress={() => saveItem()}>
                            <View style={styles.deleteContainer}>
                                <Text style={styles.addButtonText}>ADD TO FAVORITES</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                }
                <View style={styles.subtContainer}><Text style={styles.subTitle}>Category</Text>
                    <Text>&#9679; {results.category.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text>&#9679;Affected muscle(s): </Text>
                    {
                        results.muscles.map((muscle, i) => {
                            return (
                                <Text key={i}>{muscle.name}</Text>
                            )
                        })}
                </View>
                <View style={styles.subtContainer}>
                    <Text style={styles.subTitle}>Description:</Text></View>
                <View style={styles.textContainer}>
                    <Text>{cleanString(results.description)}</Text>

                    <Text style={styles.noteTitle}>Notes: </Text>
                    {results.comments.map((comment, i) => {
                        return (
                            <Text key={i}>{comment.comment}</Text>
                        )
                    })}
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
        : <Text>Loading...</Text>

    );

};
const styles = StyleSheet.create({
    deleteButtonText: {
        color: 'red',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButtonText: {
        color: 'green',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteContainer: {
        marginTop: 10,
        marginBottom: 10,
        height: 55,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
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
        marginTop: 10,
        marginBottom: 10,
        height: 'auto',
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