import {View, Text, Button} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";



const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>
            <Button title="Seed" onPress={() => seed().catch((error) => console.log('Failed to seed database', error))}/>
        </SafeAreaView>
    )
}
export default Search
