import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { cartData } from '../data/cartData';
import PriceTable from '../components/Cart/PriceTable';
import CartItem from '../components/Cart/CartItem';

const Cart = ({navigation}) => {

    const [cartItems, setCartItems] = useState(cartData);

    return (
        <Layout>
            <Text className="text-center text-green-700 mt-2.5">
                {
                    cartItems?.length > 0 ? `You Have ${cartItems.length} Item Left In Your Cart` :
                        'OOPS Your Cart Is Empty !'
                }
            </Text>
            {
                cartItems?.length > 0 && (
                    <>
                        <ScrollView>
                            {cartItems.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </ScrollView>
                        <View>
                            <PriceTable title={'Price'} price={999} />
                            <PriceTable title={'Tax'} price={104} />
                            <PriceTable title={'Shippig'} price={32} />
                            <View className="border border-gray-200 bg-white my-2 py-2">
                                <PriceTable title={'Grand Total'} price={1135} className="font-semibold" />
                            </View>
                            <TouchableOpacity className="mt-5 items-center justify-center bg-black mx-4 h-10 rounded-3xl text-white"
                             onPress={() => navigation.navigate("checkout")}
                            >
                                <Text className="text-white font-semibold tracking-wider text-base">CHECKOUT</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </Layout>
    )
}

export default Cart