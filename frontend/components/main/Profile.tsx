import React, { useEffect, useState } from 'react';
import { styles } from '../../constants/styles';
import PostComponent from '../profile/Post';
import { Post } from '@/constants/interfaces';
import { useUserStore } from '@/utils/UserStore';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';
import { getSecureToken } from '@/utils/TokenStorage';


export default function Profile() {
  const user = useUserStore(state => state.selectedUser);
  
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState<Post[]>();

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true)
      const postResults = await fetch(`http://192.168.1.65:3000/api/posts/user/${user?.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getSecureToken()}`
        }
      });

      if (!postResults.ok) {
        const errorData = await postResults.json();
        throw new Error(errorData.message || 'Error fetching posts');
      }
      // Store the image name
      const json = await postResults.json();
      setPostsData(json as Post[]);
      setLoading(false);
    }
    fetchPosts();
  }, [])

  return (
    <View style={styles.safeArea}>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 16,
        alignItems: "flex-start",
        flexDirection:'column'
      }}>
        <View style={{flexDirection:'row'}}>
          <Image style={{
            width:150, 
            height:150, 
            borderRadius: 360, 
            marginVertical: 16,
            marginLeft:16
          }} source={
            {
              uri: 
                user?.is_oauth ? 
                    user?.profile_pic 
                  : 
                    `https://f005.backblazeb2.com/file/athletix-profile-pictures/${user?.profile_pic}`}}/>
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>            
            <Text style={[styles.title, {marginBottom: 0, margin:16}]}>{user?.display_name}</Text>
            
            <Text style={[styles.text, {marginBottom: 0}]}>@{user?.username}</Text>            
          </View>
        </View>
        
        <Text style={[styles.text, {marginBottom: 0, marginLeft:16, color:'#fff'}]}>St.Petersburg | UCF Alumni</Text>
        {!loading &&(<ScrollView
          contentContainerStyle={{
            backgroundColor: '#000',
            alignSelf: 'center',
            marginTop: 18,
            flexDirection: 'row',
            flexWrap: 'wrap',    
            justifyContent: 'flex-start',
            padding:0,
            paddingTop:8,
            paddingHorizontal:1,
            height:'auto',
            borderTopColor:'#fff',
            borderTopWidth: 2,
            marginHorizontal: 2
          }}
          horizontal={false}
        >
          {postsData?.map((post, index) => (
            <PostComponent key={index} post={post}/>
          ))}
        </ScrollView>)}
      </View>
    </View>
  );
}
