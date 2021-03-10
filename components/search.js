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

            <TextInput style={styles.input}
                onChangeText={searchterm => setSearchterm(searchterm)} value={searchterm} placeholder='Search for an exercise...' />
            <Button onPress={Submit} title='Search' />
            {/* map exercise data if array is not empty */}
            <ScrollView >

                {results.map((exerciseDetail, i) => {
                    console.log(exerciseDetail.data.name)
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
        height: 100,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    image: {
        height: '100%',
        flex: 0.35,
    },
    content: {
        flex: 0.65,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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