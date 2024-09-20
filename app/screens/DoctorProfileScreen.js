// screens/DoctorProfileScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DoctorProfileScreen = ({ route, navigation }) => {
    const { doctorName, doctorImage, doctorSpecialist, rating, experience } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={doctorImage} style={styles.profileImage} />
                <Text style={styles.name}>{doctorName}</Text>
                <Text style={styles.specialist}>{doctorSpecialist}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Doctor Details</Text>
                <Text style={styles.detail}>Rating: {rating}</Text>
                <Text style={styles.detail}>Experience: {experience}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('chat', { doctorName, doctorImage })}
            >
                <Text style={styles.buttonText}>Chat with Doctor</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f6f8' },
    header: { alignItems: 'center', padding: 20 },
    profileImage: { width: 120, height: 120, borderRadius: 60 },
    name: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
    specialist: { fontSize: 16, color: 'gray' },
    detailsContainer: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    detail: { fontSize: 16, marginBottom: 5 },
    button: { backgroundColor: '#3f51b5', padding: 15, borderRadius: 10, margin: 20 },
    buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});

export default DoctorProfileScreen;
