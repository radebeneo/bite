import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {Category} from "@/type";
import {useLocalSearchParams} from "expo-router";

const FilterComponent = ({categories}: {categories: Category[]}) => {

    const searchParams = useLocalSearchParams()

    const [active, setActive] = useState(searchParams.category || '')

    const handlePress = (id: string) => {}

    const filterData: (Category | {$id: string; name: string})[] = categories ? [{$id: 'all', name: 'All'}, ...categories] : [{ $id: 'all', name: 'All'}]

    return (
        <FlatList
        data={filterData}
        keyExtractor={item => item.$id}
        renderItem={({item}) => (
            <TouchableOpacity>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )}

        />

    )
}
export default FilterComponent
