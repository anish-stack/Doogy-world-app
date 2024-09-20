import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Animated, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import ProductTopBar from '../../components/Topbar/ProductTopBar';

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const [childImage, setChildImage] = useState([]);
    const [loader, setLoader] = useState(false);
    const [imageTranslateX] = useState(new Animated.Value(0)); 
    const [prevImageTranslateX] = useState(new Animated.Value(0)); 

    const route = useRoute();
    const { title } = route.params;

    const handleFetchDataById = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`http://192.168.1.12:7000/api/v1/Product/Get-Single-Product/${title}`);
            if (response.data) {
                setProduct(response.data.data);
                setRelatedProduct(response.data.relatedProducts);
            }
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        handleFetchDataById();
    }, [title]);

    useEffect(() => {
        if (product.ProductImages && product.ProductImages.length > 0) {
            setMainImage(product.ProductImages[0].ImageUrl);
            setChildImage(product.ProductImages);
        }
    }, [product]);

    const handleChangeMainImage = (index) => {
        // Slide out the previous image
        Animated.timing(prevImageTranslateX, {
            toValue: -300, // Adjust according to your layout
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Slide in the new image
        Animated.timing(imageTranslateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setMainImage(product.ProductImages[index].ImageUrl);
            Animated.timing(imageTranslateX, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }).start();
        });
    };

    if (loader) {
        return <Loader />;
    }

    const renderThumbnail = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleChangeMainImage(index)}>
            <Image source={{ uri: item.ImageUrl }} style={styles.thumbnail} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ProductTopBar isShow={false} />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                {/* Image Slider */}
                <View style={styles.sliderContainer}>
                    <Animated.Image
                        source={{ uri: mainImage }}
                        style={[styles.mainImage, { transform: [{ translateX: imageTranslateX }] }]}
                    />
                    <View style={styles.thumbnailWrapper}>
                        <FlatList
                            data={childImage}
                            horizontal
                            keyExtractor={(item) => item.ImageUrl}
                            renderItem={renderThumbnail}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.thumbnailContainer}
                        />
                    </View>
                </View>
                {/* Related Products Section (Add more UI here) */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    sliderContainer: {
        marginTop: 10,
    },
    mainImage: {
        width: '100%',
        height: 300,

        borderRadius: 10,
        resizeMode: 'cover',
    },
    thumbnailWrapper: {
        marginTop: 10,
    },
    thumbnailContainer: {
        paddingHorizontal: 10,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default SingleProduct;
