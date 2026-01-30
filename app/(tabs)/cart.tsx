import {View, Text, FlatList} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader"

const Cart = () => {

    const {items, getTotalItems, getTotalPrice} = useCartStore()

    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()


    return (
        <SafeAreaView className="bg-white h-full ">
            <FlatList
                data={items}
                renderItem={({item}) => <Text>Cart Item</Text>}
                keyExtractor={item => item.$id}
                contentContainerClassName="px-5 pt-5 pb-38"
                ListHeaderComponent={() => <CustomHeader title="YourCart"/>}
                ListEmptyComponent={() => <Text className="text-center">No items in your cart</Text>}
            />
        </SafeAreaView>
    )
}
export default Cart
