import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const url = 'https://wger.de/api/v2/exercise/search/?format=json&term=';

const Search = () => {
    const [results, setResults] = useState([]);
    const [searchterm, setSearchterm] = useState('');


    //get search results from wger
    const Submit = async () => {
        console.log(searchterm)
        if (searchterm.length > 0) {
            try {
                const response = await fetch(url + searchterm);
                const json = await response.json();
                setResults(json.suggestions);
                console.log(results);

            }
            catch (error) {
                console.log(error);

            }
        }
        else {
            alert('Please input a search term!')
            setResults([]);
        }
    }






    //return content
    return (

        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Search</Text>
            </View>
            <View style={styles.divider} />
            <TextInput style={styles.input}
                onChangeText={searchterm => setSearchterm(searchterm)} value={searchterm} placeholder='Search for an exercise...' />
            <TouchableOpacity onPress={Submit}>
                <View style={styles.buttonView}>
                    <Text style={styles.buttonText}>SEARCH</Text>
                </View>
            </TouchableOpacity>

            {/* map exercise data if array is not empty */}
            <ScrollView >
                {results.map((exerciseDetail, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => {
                            console.log('Press');
                        }
                        } >
                            <View style={styles.cardContainer} key={i} >
                                <ImageLoad key={i} source={{ uri: 'https://wger.de/' + exerciseDetail.data.image }} style={styles.image}
                                    placeholderSource={require('../img/no_image.jpg')} />
                                <View style={styles.content}>
                                    <Text style={styles.title}>{exerciseDetail.data.name}</Text>
                                    <Text>
                                        Category: {exerciseDetail.data.category}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                })
                }
            </ScrollView>
        </View>
    );

}


const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 40,
        height: 140,
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
    buttonView: {
        margintop: 10,
        marginBottom: 5,
        heigth: 5,
        alignItems: 'center',
        backgroundColor: '#D1D1D1'

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
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#D1D1D1'
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
export default Search;