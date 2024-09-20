import React from 'react'
import {
    View, Text,
    StatusBar,
    StyleSheet,
    Image, TextInput,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import userIcon from '../../assets/user.jpg';

const Topbar = () => {

    const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <StatusBar hidden={true} />
            <View style={Styles.topContainer}>
                <View style={Styles.leftcontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("member")}>
                        <Image
                            source={userIcon}
                            style={Styles.user} type='link'
                        />
                    </TouchableOpacity>
                    <View style={Styles.textContainer}>
                        <Text style={Styles.wel}>Welcome</Text>
                        <Text style={Styles.userName}>Hey, Singh</Text>
                    </View>
                </View>
                <View style={Styles.rhtcontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                        <FontAwesome name="shopping-bag" size={16} color="#EF5030" style={Styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("No New Notification")}>
                        <FontAwesome name="bell" size={17} color="#EF5030" style={Styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                        <FontAwesome name="shopping-cart" size={20} color="#EF5030" style={Styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 11,
        paddingBottom: 0,
        backgroundColor: "#EF5030",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems : "center",
    },
    leftcontainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    user: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        marginRight: 6,
    },
    textContainer: {
        justifyContent: 'center',
    },
    wel: {
        fontSize: 12,
        color: "#fff",
        letterSpacing: 0.5,
    },
    userName: {
        fontSize: 16,
        letterSpacing: 0.2,
        fontWeight: '600'
    },
    rhtcontainer: {
        gap: 5,
        flexDirection: "row",
        alignItems: 'center',
    },
    icon:{
        width: 45,
        height: 45,
        padding: 14,
        borderRadius: 45/2,
        alignItems: "center",
        backgroundColor : "#fff",
        justifyContent: "center",
    },
    searchContainer: {
        paddingTop: 10,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    searchBar: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    searchIcon: {
        padding: 10,
    },
})

export default Topbar