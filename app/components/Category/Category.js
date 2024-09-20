import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Category = () => {
    const [data, setData] = useState([]);

    const navigation = useNavigation();

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://192.168.1.12:7000/api/v1/Product/Get-All-category');

            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {data?.map((item) => (
                    <View key={item._id} style={styles.categoryWrapper}>
                        <TouchableOpacity
                            style={styles.categoriesBox}
                            onPress={() => navigation.navigate('DynamicScreen', { title: item })}
                        >
                            <Image
                                source={{ uri: item.Image.url }} // Correcting the way image source is passed
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text style={styles.catTitle}>{item?.CategoryTitle}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    categoryWrapper: {
        width: '31%',
        alignItems: 'center',
        marginBottom: 14,
    },
    categoriesBox: {
        padding: 5,
        elevation: 5,
        borderRadius: 5,
        shadowRadius: 3.84,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 70,
    },
    catTitle: {
        fontSize: 12,
        marginTop: 8,
    },
});

export default Category;
