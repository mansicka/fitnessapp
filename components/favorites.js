import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';

const Favorites = ({ route, navigation }) => {
    const db = SQLite.openDatabase('favorites.db');
    const [favorites, setFavorites] = useState([]);

    const updateFavorites = () => {
        db.transaction(tx => {
            tx.executeSql('select* from favorite;', [], (_, { rows }) => setFavorites(rows._array));
        });
        console.log(favorites)
    }

    const deleteItem = (id) => {
        db.transaction(tx => { tx.executeSql(`delete from favorite where id = ?;`, [id]); }, null, updateFavorites)
    }

    useEffect(() => {
        db.transaction(tx => { tx.executeSql('create table if not exists favorite(id integer not null auto_increment, exerciseid int, title text, category text, primary key (id));'); }, null,
            updateFavorites);
        console.log(favorites)
    }, []);

    return (
        favorites.length > 0 ?
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Favorites</Text>
                </View>
                <View style={styles.divider} />
                <View>
                    {favorites.map((favorite, i) => {
                        console.log(favorite)
                        return (

                            <View style={styles.cardContainer} key={i} >
                                <TouchableOpacity key={i} onPress={() => navigation.navigate('View exercise', { screen: "View exercise", params: favorite.exerciseid })}>
                                    <View style={styles.content}>
                                        <Text style={styles.eTitle}>{favorite.name}</Text>
                                        <Text>
                                            Category: {favorite.category}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Delete from favorites button */}
                                <View style={styles.deleteContainer}>
                                    <TouchableOpacity onPress={() => { deleteItem(favorite.id) }}>
                                        <Text style={styles.deleteButtonText}>
                                            REMOVE
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>




                        )
                    })
                    }
                </View>
            </ScrollView>

            : <View style={styles.titleContainer}>
                <Text style={styles.eitle}>No favorites added. Add some!</Text>
            </View>
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
        marginTop: 10,
        marginBottom: 10,
        height: 55,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    deleteButtonText: {
        color: 'red',
        textAlign: 'right',
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
export default Favorites