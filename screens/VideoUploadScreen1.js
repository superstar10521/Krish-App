import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class VideoUploadScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      videoName:"",
      description:"",
      text: '', testWidth: '99%' 
    }
  }
  componentDidMount() {

    setTimeout(() => {
      this.setState({ testWidth: '100%' })
    }, 100)
  }
  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(videoName,description)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('uploaded_video_links').add({
        "user_id": userId,
        "video_link":videoName,
        "description":description,
        "request_id"  : randomRequestId,
    })

    this.setState({
        videoName :'',
        description : ''
    })

    return Alert.alert("video link uploaded Successfully")
  }


  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Upload Video" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
              // width: this.state.testWidth,
              style ={[styles.formTextInput,{width: this.state.testWidth}]}
                // style ={styles.formTextInput}
                placeholder={"enter video name"}
                onChangeText={(text)=>{
                    this.setState({
                        videoName:text
                    })
                }}
                selectTextOnFocus={true}
                value={this.state.videoName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300,width: this.state.testWidth}]}
                multiline
                numberOfLines ={8}
                placeholder={"About video"}
                onChangeText ={(text)=>{
                    this.setState({
                        description:text
                    })
                }}
                value ={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.videoName,this.state.description)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    // width: this.state.testWidth,
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
