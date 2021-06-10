import React, { Component } from "react";
import {Text,View,StyleSheet,TouchableOpacity} from "react-native"
import MyHeader from '../components/MyHeader'
export default class InformationScreen extends Component {
  render(){
    return(
      // add photos to bg
      <View > 
              <MyHeader title="Information Screen" navigation ={this.props.navigation}/>
        <View>
          
          <TouchableOpacity 
          style={styles.skip} 
          onPress={()=>{this.props.navigation.navigate("MainScreen")}}>
            <Text> SKIP</Text>
          </TouchableOpacity>
        </View>
        
        <View> 
          <Text style={styles.text}>This app has been made for entertainment functions only. </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.skip} onPress={()=>{this.props.navigation.navigate("MainScreen")}}>
            <Text> NEXT</Text> 
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
}
const styles=StyleSheet.create({
  skip:{
    height:40,width:50,backgroundColor:"#21ede9",marginLeft:280,padding:5,
    borderRadius:40,justifyContent:"center"
  },
  next:{
     height:20,width:50,backgroundColor:"#21ede9",marginLeft:280,padding:5,
  },
  text:{
    fontSize:40,
    // color:"red"
  }

})