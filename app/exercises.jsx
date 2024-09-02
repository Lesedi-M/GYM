import { View, Text , Image} from 'react-native'
import React, { useEffect , useState} from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import { fetchExerciseByBodypart } from '../api/exerciseDB';
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ExerciseList from '../components/ExerciseList';
import { ScrollView } from 'react-native-virtualized-view';



const exercises = () => {
    const router = useRouter();
    const [exercises, setExcercises] = useState([]);
    const item = useLocalSearchParams();

    useEffect(()=>{
       if(item) getExercises(item.name);
    },[item]);

    const getExercises = async (bodyPart)=>{
        let data = await fetchExerciseByBodypart(bodyPart);
        //console.log("DP",data)
        setExcercises(data);
    }


  return (
    <ScrollView>
        <StatusBar style='light'/>
        <Image 
            source={item.image}
            style={{width: wp(100), height:hp(45)}}
            className="rounded-b-[40px]"
        />
        <TouchableOpacity
        onPress={()=> router.back()}
          className="bg-rose-500 flex justify-center items-center pr-1 mx-4 absolute rounded-full"
          style={{height:hp(5.5), width:hp(5.5), marginTop:hp(7)}}
        >
         <Ionicons name='caret-back-outline' size={hp(4)} color="white"/>
        </TouchableOpacity>


        <View className="mx-4 space-y-3 mt-4">
          <Text 
            style={{fontSize:hp(3)}}
            className="font-semibold text-neutral-700 capitalize"
          > 
            {item.name} exercises
          </Text>
          <View className="mb-10">
            <ExerciseList data={exercises}/>
          </View>
        </View>
    </ScrollView>
  )
}

export default exercises