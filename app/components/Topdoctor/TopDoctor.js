import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { doctorData } from '../../data/doctorData';
import { useNavigation } from '@react-navigation/native';

const TopDoctor = () => {
    const navigation = useNavigation();

    return (
        <View className="mt-1 mb-3">
            <View className="mx-3 mb-1 pl-1">
                <Text className="text-lg tracking-wide font-bold">Top Doctor</Text>
            </View>
            <ScrollView horizontal={true} className="ml-3">
                <View className="flex-row">
                    {doctorData?.map((item) => (
                        <View key={item._id} className="mr-3 w-24 rounded-md mb-3" style={styles.shadow}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DoctorProfile', {
                                    doctorName: item.name,
                                    doctorImage: item.imageUrl,
                                    doctorSpecialist: item.doctorSpecialist,
                                    rating: "4.9 (5,380)",  
                                    experience: "4+ Years"
                                })}
                            >
                                <Image source={item.imageUrl} resizeMode={'contain'} className="w-24 h-24 rounded-t-md" />
                                <Text className="mx-auto my-1">{item.name}</Text>
                                <Text className="mx-auto text-gray-400 mb-1">{item.doctorSpecialist}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
    },
});

export default TopDoctor;
