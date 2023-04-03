import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert} from 'react-native';
import *as React from 'react'
import {Header} from 'react-native-elements'


export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      text: "",
      word: "",
      definition: "",
      lexicalCategory: "",
      totalDefs: 0,
      defNumber: 0,
      searched: false
    }
  
  }

  newDefinition=()=>{
    if(this.state.defNumber < this.state.totalDefs){
      this.setWord(this.state.text,this.state.defNumber)
    }else{
      Alert.alert("No more definitions.")
    }
    
  }
  
  setWord=(word,position)=>{
    var searchword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+ searchword + ".json"

    return fetch(url)
    .then((data)=>{
      if(data.status === 200 ){
        return data.json() 
      }else{
        this.setState({
          word: "Word not found. 😞",
        })
      }
    })
    .then((response)=>{
      var responseObject = response 

      if(responseObject){
        var wordData = responseObject.definitions[position]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype
        var givenWord = this.state.text
        var firstLetter = givenWord.slice(0,1)
        var capitalLetter = firstLetter.toUpperCase()
        var remainingWord = givenWord.substring(1,givenWord.length)
        var finalWord = capitalLetter + remainingWord

        this.setState({
          word: "Word: " + finalWord,
          definition: "Definition: " + definition,
          lexicalCategory: "Word Type: " + lexicalCategory,
          totalDefs: responseObject.definitions.length,
          defNumber: position + 1,
          searched: true
        })
      }
    })
  }
  
render(){
  return (
    <View style={styles.container}>
        <Header
  centerComponent={{ text: 'Dictionary App', style: { color: '#fff', fontSize: 25} }}
  containerStyle={{backgroundColor: '#548752',justifyContent: 'space-around',}}
    />
      <TextInput style={styles.input} onChangeText={(text)=>{this.setState({text: text})}} placeholder = "Enter Your Word..."/>
      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.setWord(this.state.text,0)
      }}
      ><Text style={styles.buttonText}>Find It!</Text></TouchableOpacity>
      <View style={styles.wordView}>
      <Text style={styles.wordText}>{this.state.word}</Text>
      <Text style={styles.wordText}>{this.state.lexicalCategory}</Text>
      <Text style={styles.wordText}>{this.state.definition}</Text>
      </View>
      
        {this.state.searched ?
        <TouchableOpacity style={styles.button}onPress={()=>{this.newDefinition()}}><Text style={styles.buttonText}>Next Definition {this.state.defNumber}/{this.state.totalDefs}</Text></TouchableOpacity>
      :null}
      
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    width: '50%',
    alignItems: "center",
    backgroundColor: "#dff7b5",
    height: 40,
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  input:{
    borderWidth: 2,
    width: '70%',
    paddingLeft: 10,
    height: 50,
    fontSize: 18,
    marginTop: '20%',
  },
  wordText:{
    fontSize: 20,
    padding: 20,
    textAlign: "left"
  },

});
