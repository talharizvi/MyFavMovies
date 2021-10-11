/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState,useEffect,useRef} from 'react';
 import {
   Text,
   View,
   FlatList,Dimensions,Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import ModalDropdown from 'react-native-modal-dropdown';
 import ProgressCircle from 'react-native-progress-circle';
 
 const windowWidth = Dimensions.get('window').width;

 const dropdownData = ['Most Popular', 'Highest Rated'];
 const HomeScreen= () => {
   const flatlistRef = useRef()
   const navigation = useNavigation();
   const [movieList, setMovieList] = useState(null);     //movie list
   const [isFetching, setIsFetching] = useState(false);  //pull to refresh flag
   const [loaderVisible, setLoaderVisible] = useState(false); //loader flag
   const [loadingMore, setLoadingMore] = useState(false);  //flag for load more loader
   const [searchQuery, setSearchQuery] = useState('');    //query
   const [sortDataFlag, setSortDataFlag] = useState(false);  //sort data flag
   const [pageNo, setPageNo] = useState(1);   //page no
   
   const setDefaultList=()=>{
    setLoaderVisible(true)
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5e2086057e5a6e74b46547297536361d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}`)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log('json',json)
                      if(movieList == null || movieList.length ==0){
                        setMovieList(json.results)
                      }else{
                        setMovieList([...movieList,...json.results])
                      }
                      setLoaderVisible(false)
                      setLoadingMore(false)
                  })
                  .catch((error)=>{
                    console.log(error)
                  })
   }
 
   useEffect(() => {
    //fetch initial data
    setDefaultList()
  },[]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={{width:windowWidth/2 - 10, marginHorizontal:5, marginVertical:5}} onPress={()=>navigation.navigate('Detail',{itemDetail:item})}>
      <Image
        style={{height:windowWidth/2,borderRadius:8,resizeMode:'stretch'}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
      />
      <Text numberOfLines={1} style={{marginVertical:5,fontWeight:'bold',color:'#fff'}}>{item.original_title}</Text>
      <Text numberOfLines={4} style={{color:'#94928e',marginBottom:5}}>{item.overview}</Text>
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
      
      <Text numberOfLines={1} style={{color:'#94928e',marginTop:5}}>Release Date : {item.release_date}</Text>
      
    </TouchableOpacity>
  )

  const searchMovie=(query)=>{
    
    setSearchQuery(query)
    setLoaderVisible(true)
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5e2086057e5a6e74b46547297536361d&query=${query}&page=1`)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log('json',json)
                      setMovieList(json.results)
                      setLoaderVisible(false)
                  })
                  .catch((error)=>{
                    console.log(error)
                  })

  }

  const onRefresh=async()=>{
    
    Keyboard.dismiss()
    setMovieList([])
    setSearchQuery('')
    setPageNo(1)
    
    setIsFetching(true)
    setDefaultList()
    setIsFetching(false)
  }

  const sortData=(index)=>{
    let sortedArray = []
    if(index == 1){
      sortedArray = movieList.sort((a,b) => b.vote_average - a.vote_average)
    }else{
      sortedArray = movieList.sort((a,b) => b.popularity - a.popularity)
    }

    
    console.log(sortedArray)
    setMovieList(sortedArray)
    setSortDataFlag(!sortDataFlag)
    flatlistRef.current.scrollToIndex({ animated: true, index: 0 })
  }

  const loadMoreData = () =>{
    if(searchQuery === ''){
      setPageNo(pageNo+1)
      console.log('pageNo',pageNo)
      setLoadingMore(true)
      //fetch api
      setDefaultList()
    }
    
    
    }

   return (
     console.log('inside render',movieList),
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'#121111' }}>
        <TextInput
        style={{width:'100%',paddingHorizontal:5}} 
        onChangeText={query=>searchMovie(query)}
        defaultValue={searchQuery}
        value={searchQuery}
        placeholder = 'Search Movie'
        />

        <ModalDropdown style={{width:'100%',paddingHorizontal:5}} 
        defaultValue={'Sort Results By'}
        textStyle={{fontWeight:'bold',fontSize:14}} 
        dropdownStyle={{backgroundColor:'red',height:'auto'}} 
        options={dropdownData} onSelect={(index)=>{
          sortData(index)
          console.log(dropdownData[index])}}/>

        {loaderVisible && !loadingMore && <View style={{flex: 1, justifyContent: "center",alignItems:'center',height:'100%',position:'absolute',zIndex:5}}>
          <ActivityIndicator size="large" color="#fc0317" />
          </View>  
        }
        
        {movieList !==null && <FlatList
          data={movieList}
          renderItem={renderItem}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={()=><View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No movies found.</Text>
            <Text>You can pull to refresh data</Text>
          </View>}
          refreshing={isFetching}
          onRefresh={onRefresh}
          extraData={sortDataFlag}
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreData}
          ref={flatlistRef}
          ListFooterComponent={()=>loadingMore && <ActivityIndicator size="large" color="#fc0317" />}
        />}
    </View>
   );
 };
 
 export default HomeScreen;
 