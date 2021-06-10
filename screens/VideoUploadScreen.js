import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Platform,Linking
} from "react-native";
import { ListItem } from "react-native-elements";
import { WebView } from 'react-native-webview';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from '../config'
import MyHeader from '../components/MyHeader'

// const VideoUploadScreen=()=>{
  export default class VideoUploadScreen extends Component{
// const[imageUrl,setImageUrl] =useState("#");
// const[videoLinksList,setVideoLinksList] =useState([]);
constructor(){
  super();
  this.state={
    userId : firebase.auth().currentUser.email,
    videoName:"",
    description:"",
    uri:"#",
    videoLinksList:[]
  }
  this.requestRef = null;
}

getVideoLinksList = () => {
  console.log("getVideoLinksList")
  this.requestRef = db
    .collection("videoNamesUploaded")
    .onSnapshot((snapshot) => {
      var videoLinksList = snapshot.docs.map((doc) => doc.data());
      this.setState({
        videoLinksList: videoLinksList,
      });
    });
    
};

componentDidMount() {
  this.getVideoLinksList();
}

componentWillUnmount() {
// this.requestRef();
}

selectPicture = async () => {
    const { cancelled, uri } =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
        console.log("not cancelled")
        var randomRequestId = this.createUniqueId()
        this.uploadImage(uri, randomRequestId);
    }
  };
  
  createUniqueId=()=>{
    return Math.random().toString(36).substring(7);
  }

  uploadImage = async (uri, imageName) => {
    console.log("uploadImage: "+imageName)
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    console.log("fetchImage: "+imageName)
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ uri: url });
        console.log("url: "+imageName)
        // setImageUrl(url)
        this.writeToDB(imageName)
      })
      .catch((error) => {
        // this.setState({ image: "#" });
      });
      return Alert.alert("video link uploaded Successfully")
  };
  writeToDB=(videoLink)=>{
    console.log("writing to db")
    db.collection("videoNamesUploaded").add({"video_link":videoLink})
    console.log("writing to db done")
    this.getVideoLinksList();
    console.log("this.state.videoLinksList: "+this.state.videoLinksList)
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

    return Alert.alert("video link submitted Successfully")
  }
  
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    console.log(item)
    return (
      <ListItem
        key={i}
        //linkId
        title={item.video_link}
        // subtitle={item.description}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };
  
 render(){
  return(
    <View style={styles.screen}>
   <MyHeader title="Upload Video" navigation ={this.props.navigation}/>

  <View>
  <TextInput
                // style ={[styles.formTextInput,{height:300}]}
                style ={styles.formTextInput}
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
              <Text>click to upload video</Text>
    <TouchableOpacity style={styles.button}
     onPress={()=>{this.selectPicture()}}
     >
      <Text style={styles.buttonText}>Upload</Text>
    </TouchableOpacity>

    <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.uri,this.state.description)}}
                >
                <Text>Submit</Text>
              </TouchableOpacity>
    
  </View>
  <View style={{ flex: 1 }}>
      {this.state.videoLinksList.length === 0 ? (
        <View style={styles.subContainer}>
          <Text style={{ fontSize: 20 }}>List Of All Videos</Text>
        </View>
      ) : (
        <View style={styles.subContainer}>
        <Text>{this.state.videoLinksList.length}</Text>
        <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.videoLinksList}
              renderItem={this.renderItem}
            />
            </View>
      )}
    </View>
    <View>
    <WebView source={{ uri: this.state.uri }} />
    </View>
</View>
)
 }

   
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 35,
      marginVertical: 40,
    },
    formTextInput:{
      width:"105%",
      // width: this.state.testWidth,
      height:200,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button: {
      backgroundColor: '#47477b',
      color: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 50,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
    },
    mediaButton: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 50,
      width: 300,
    },
  });
// export default VideoUploadScreen;