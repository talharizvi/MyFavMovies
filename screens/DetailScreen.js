
 import React,{useState,useEffect} from 'react';
 import {
   Text,
   View,Image,ScrollView
 } from 'react-native';
 import ProgressCircle from 'react-native-progress-circle';
 
 const DetailScreen= (props) => {
   
     //console.log('props',props.route.params.itemDetail)
    const[item, setItem] = useState(props.route.params.itemDetail)
   
    return (
    <ScrollView style={{ flex: 1,backgroundColor:'#121111',}} contentContainerStyle={{flex:1}}>
        <Image
        style={{height:'70%',resizeMode:'stretch'}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
        />
      <View style={{marginHorizontal:5}}>
        <Text style={{marginVertical:5,fontWeight:'bold',color:'#fff'}}>{item.original_title}</Text>
        <Text style={{color:'#94928e',marginBottom:5}}>{item.overview}</Text>
        <ProgressCircle
            percent={item.vote_average * 10}
            radius={18}
            borderWidth={4}
            color="#ffb700"
            shadowColor="#999"
            bgColor="#121111"
        >
            <Text style={{ fontSize: 10 }}>{(item.vote_average)}</Text>
        </ProgressCircle>
        <Text style={{color:'#94928e',marginTop:5}}>Release Date : {item.release_date}</Text>
      </View> 
    </ScrollView>
   );
 };
 
 export default DetailScreen;
 