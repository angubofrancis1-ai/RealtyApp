import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Plus, Bell, User } from 'lucide-react-native';
import { View, Text, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#14b8a6' }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Home color={color} size={28} /> }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color }) => <Search color={color} size={28} /> }} />
        <Tab.Screen name="Post" component={PostScreen} options={{ tabBarIcon: ({ color }) => <Plus color={color} size={32} />, tabBarLabel: '' }} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarIcon: ({ color }) => <Bell color={color} size={28} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <User color={color} size={28} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==================== HOME FEED ====================
function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*, author(*)').order('created_at', { ascending: false });
    setPosts(data || []);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      ListHeaderComponent={<Text className="text-3xl font-bold p-6">For You</Text>}
    />
  );
}

// Post Card with Verified Badge
function PostCard({ post }: { post: any }) {
  return (
    <View className="p-5 border-b border-zinc-800">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-12 h-12 bg-teal-500 rounded-full" />
        <View>
          <View className="flex-row items-center gap-1">
            <Text className="font-bold text-lg">{post.author?.full_name}</Text>
            {post.author?.verified && <Text className="text-blue-500 text-xl">✓</Text>}
          </View>
          <Text className="text-zinc-500">@{post.author?.username}</Text>
        </View>
      </View>
      <Text className="text-[17px] mb-3">{post.content}</Text>
      {post.image_url && <View className="h-64 bg-zinc-800 rounded-2xl mb-4" />}
      <View className="flex-row justify-between text-zinc-400">
        <TouchableOpacity><Text>💬</Text></TouchableOpacity>
        <TouchableOpacity><Text>🔁</Text></TouchableOpacity>
        <TouchableOpacity><Text>❤️</Text></TouchableOpacity>
        <TouchableOpacity><Text>🔖</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ==================== POST CREATION ====================
function PostScreen() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const createPost = async () => {
    if (!content) return Alert.alert("Write something");
    const { error } = await supabase.from('posts').insert({ content, image_url: image?.uri });
    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("Posted successfully!");
      setContent('');
      setImage(null);
    }
  };

  return (
    <View className="flex-1 p-6 bg-black">
      <TextInput
        multiline
        value={content}
        onChangeText={setContent}
        placeholder="What’s happening in real estate?"
        className="bg-zinc-900 text-white p-5 rounded-3xl min-h-[200px] text-lg"
      />
      <TouchableOpacity onPress={pickImage} className="mt-6 bg-zinc-800 p-4 rounded-2xl">
        <Text className="text-teal-400">📸 Attach Photo / Document</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={createPost} className="mt-8 bg-teal-600 py-4 rounded-full">
        <Text className="text-center font-semibold text-lg">Post</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==================== OTHER SCREENS (Simple) ====================
function SearchScreen() { return <View className="flex-1 justify-center items-center bg-black"><Text className="text-2xl">Search Properties & Agents</Text></View>; }
function NotificationsScreen() { return <View className="flex-1 justify-center items-center bg-black"><Text className="text-2xl">Notifications</Text></View>; }

function ProfileScreen() {
  return (
    <View className="flex-1 p-6 bg-black items-center pt-20">
      <View className="w-32 h-32 bg-teal-500 rounded-full mb-6" />
      <Text className="text-3xl font-bold">Your Name</Text>
      <Text className="text-teal-400">@username • ✓ Verified</Text>
      <TouchableOpacity className="mt-12 bg-white px-10 py-4 rounded-full">
        <Text className="text-black font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
