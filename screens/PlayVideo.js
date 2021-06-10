import React, {useState} from 'react';
import {Button, View, Alert,Text} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const PlayVideo = (item) => {
    // console.log(item.linkId.description)
  const [playing, setPlaying] = useState(false);
  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  }
  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={item.linkId.video_link}
        onChangeState={onStateChange}
      />
      <Text>hello:{item.linkId.description}</Text>
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
};
export default PlayVideo;