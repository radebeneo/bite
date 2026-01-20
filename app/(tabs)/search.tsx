import {View, Text, Button} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import seed from "@/lib/seed";
import useAppwrite from "@/lib/useAppwrite";
import {getCategories, getMenu} from "@/lib/appwrite";
import {useEffect} from "react";




const Search = () => {

    const {category, query} = useLocalSearchParams<{query: string, category: string}> ()

    const { data, refetch, loading } = useAppwrite({fn: getMenu, params: { category,  query, limit: 6,}})

    const {data: categories} = useAppwrite({fn: getCategories})

    useEffect(() => {
        refetch({category, query, limit: 6})
    }, [category, query]);


    return (
        <SafeAreaView>
            <Text>Search</Text>

        </SafeAreaView>
    )
}
export default Search
