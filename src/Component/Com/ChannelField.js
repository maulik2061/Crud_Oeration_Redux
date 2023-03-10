import React from 'react'
import Channel from '../Container/Channel';
const ChannelField = () => (
   <div className="row" >
     <Channel channelName="BBC" channelString="bbc-news" />
     <Channel channelName="CNBC" channelString="cnbc" />
     <Channel channelName="CNN" channelString="cnn" />
     <Channel channelName="FT" channelString="financial-times" />
     <Channel channelName="ESPN" channelString="espn" />
     <Channel channelName="GOOGLE" channelString="google-news" />  
   </div> 
 );
export default ChannelField;