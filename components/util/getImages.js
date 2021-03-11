import ImageLoad from 'react-native-image-placeholder';
import React, { useState, useEffect } from 'react';

const GetImagesById = (exerciseid) => {
    const id = exerciseid.id.toString()
    const [pic, setPic] = useState('');
    const url = 'https://wger.de/api/v2/exerciseimage/?format=json&exercise=';

    const imgurl = fetch(url + id)
        .then(res => res.json())

        .then(data => {
            if (data.count == 0) {

                setPic('../../img/no_image.jpg')
                return (pic)
            }
            else {
                let imageArr = []
                data.results.map((imgurl, i) => {
                    imageArr.push(imgurl.image)
                });
                setPic(imageArr[0].toString())
                return (pic)
            }
        })
        .catch(error => {
            console.log(error)
            setPic('../../img/no_image.jpg')
            return (pic)
        })

    const toiminyt = async () => {

        const a = await imgurl;
        console.log(a)

    };
    toiminyt();
    return (<ImageLoad id='img' key={id} source={{ uri: pic }} placeholderSource={require('../../img/no_image.jpg')} height='100%'
        flex={0.35} />)
}
export default GetImagesById