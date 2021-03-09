import React from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Container } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const Main = () => {

    return (
        <Grid>
            <Row size={25}>

            </Row>
            <Row size={50}>
                <Text>Ilari</Text>
            </Row>
            <Row size={25}></Row>

        </Grid>




    )
}
export default Main;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: null,
        height: null,

    },
    buttonText: {


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