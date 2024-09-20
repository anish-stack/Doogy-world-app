import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Layout from '../../components/Layout/Layout';
import { memberData } from '../../data/memberData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Member = ({navigation}) => {
    return (
        <Layout>
            <View className="my-1 justify-center items-center">
                <Image source={memberData.profilePic} className="w-24 h-24 my-1 mx-auto" />
                <Text className="mb-1">Hi {memberData.name} 👋</Text>
                <Text className="mb-1">Email: {memberData.email}</Text>
                <Text className="mb-1">Contact: {memberData.contact}</Text>
            </View>
            <View className="bg-white justify-center m-2 p-2 drop-shadow-md rounded-md">
                <Text className="text-center text-xl font-semibold tracking-wide border-b-2  border-gray-300 mb-2 pb-1">Account Setting</Text>
                <TouchableOpacity className="flex-row space-x-3 ml-2 mb-5" onPress={() => navigation.navigate("editProfile")}>
                    <FontAwesome name={"edit"} size={20} />
                    <Text>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row space-x-3 ml-2 mb-5">
                    <FontAwesome name={"list"} size={20} />
                    <Text>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row space-x-3 ml-2 mb-5">
                    <FontAwesome name={"bell"} size={20} />
                    <Text>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row space-x-3 ml-2 mb-5"
                  onPress={() => {alert("Logout Successfully"), navigation.navigate("login")}}
                >
                    <FontAwesome name="sign-out" size={20} />
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

export default Member;
