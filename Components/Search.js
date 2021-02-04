import React from 'react'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getLatestfilms } from '../API/TMDBApi'
import {StyleSheet, View, TextInput,Button, FlatList, ActivityIndicator } from 'react-native'
class Search extends React.Component{
     
    constructor(props){
        super(props)
        this.state= { 
            films : [],
            isLoading : false
            
         }
        this.text =""
        this.page=0
        this.totalPages = 0
        this.serchedText =""
    }
    
    _loadFilms(){
        let page = this.page+1
        
        if(this.text.length!=""){
            this.setState({
                isLoading : true
            })
         getFilmsFromApiWithSearchedText(this.text,page).then(data=> {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                films : [...this.state.films,...data.results],
                isLoading : false
            })
            console.log(this.state.films)
         })

        }
        else{
            this.page=0
            this.totalPages = 0
            this.text=""
            this.setState( {
                films : []
            })
        }
        
    }
    componentDidMount(){
        this._loadFilms()
    }
    _dispayLoading(){
        if(this.state.isLoading){
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }
    componentWillUnmount(){
        alert('rado')
    }
    render(){
        return (
            <View style={styles.main_container}>
                    
                        <TextInput placeholder="Rechercher votre film ici" style={styles.text_search} 
                         onChangeText= {(text)=>{
                           this.page=0
                           this.totalPages = 0
                           this.text=text
                           this.setState( {
                               films : []
                           },this._loadFilms())
                           
                        }}/>
                       <Button title="recherche"/>
                
                    <FlatList
                        data = {this.state.films}
                        numColumns = {2}
                        onEndReachedThreshold = {0.5}
                        onEndReached= { ()=> {
                            if(this.state.films.length > 0 && this.page < this.totalPages )
                                 this._loadFilms()
                        }
                    }
                        keyExtractor = {(item)=> item.id.toString()}
                        renderItem = { ({item}) =>  <FilmItem film = {item}/> }
                    />
                   
                { this._dispayLoading() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading : {
            position : 'absolute',
            left :0,
            right:0,
            top: 100,
            bottom : 0,
            alignItems: 'center',
            justifyContent : 'center'
    },
    container_search: {
        backgroundColor : '#fff',
        borderRadius : 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 5,
        margin: 6,
        position :  'sticky',
        top: 3,
        zIndex : 9,

    },
    main_container: {
        flex :1
    },
    text_search:{
        padding: 6
    },
    button_search : {
        with: 5
    },
    flatlist : {
        flex : 1,
        justifyContent: 'space-between',
       
    }
})
export default Search