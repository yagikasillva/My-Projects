
import { Image } from 'react-native';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

function StartScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Loging')}>
        <ImageBackground source={require('./assets/yagi.png')} style={{ width: 430, height: 945 }}>
        </ImageBackground>
      </TouchableOpacity>

    </View>
  );
}


function LogingScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./assets/home.jpg')} style={{ width: 450, height: 945 }}>
        <View style={{ marginTop: 250, position: 'absolute' }} >

          <View style={{ marginTop: 5, marginLeft: 10 }}>
            <Text style={{ color: 'black', fontSize: 50, fontWeight: 800 }}>Loging</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 100 }}>Please Sign in to continue</Text>
          </View>

          <View>
            <View style={{ width: 325, height: 70, marginTop: 45, backgroundColor: 'rgb(255, 230, 154)', borderTopRightRadius: 75 }}>
              <Image source={require('./assets/user.png')} style={{ position: 'absolute', marginTop: 20, marginLeft: 9 }}></Image>
              <TextInput placeholder='User Name' placeholderTextColor={'black'} style={{ marginLeft: 100, marginTop: 20, fontSize: 20 }} ></TextInput>
            </View>

            <View style={{ width: 325, height: 70, backgroundColor: 'rgb(255, 230, 154)', borderBottomRightRadius: 75 }}>
              <Image source={require('./assets/padlock.png')} style={{ position: 'absolute', marginTop: 20, marginLeft: 9 }}></Image>
              <TextInput placeholder='Pasword' placeholderTextColor={'black'} style={{ marginLeft: 100, marginTop: 20, fontSize: 20 }} secureTextEntry={true}></TextInput>
            </View>

            <View style={{ width: 90, height: 90, backgroundColor: 'rgb(248, 105, 56)', borderRadius: 75, marginLeft: 280, marginTop: -120 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={require('./assets/right-arrow.png')} style={{ width: 65, marginLeft: 12, marginTop: 12 }} />
              </TouchableOpacity>
            </View>

            <View style={{ width: 180, height: 70, backgroundColor: 'rgb(248, 105, 56)', borderTopRightRadius: 50, borderBottomRightRadius: 50, marginTop: 100 }}>
              <Text style={{ fontSize: 25, color: 'white', fontWeight: 500, marginTop: 15, marginLeft: 25 }} onPress={() => navigation.navigate('Sign')}>Register</Text>
            </View>
          </View>

        </View>

      </ImageBackground>
    </View>
  );
}



function SignScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./assets/home.jpg')} style={{ width: 450, height: 945 }}>
        <View style={{ marginTop: 250, position: 'absolute' }} >

          <View style={{ marginTop: 5, marginLeft: 10 }}>
            <Text style={{ color: 'black', fontSize: 50, fontWeight: 800 }}>Register</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 100 }}>Please Sign in to continue</Text>
          </View>

          <View>
            <View style={{ width: 325, height: 70, marginTop: 45, backgroundColor: 'rgb(255, 230, 154)', borderTopRightRadius: 75 }}>
              <Image source={require('./assets/user.png')} style={{ position: 'absolute', marginTop: 20, marginLeft: 9 }}></Image>
              <TextInput placeholder='User Name' placeholderTextColor={'black'} style={{ marginLeft: 100, marginTop: 20, fontSize: 20 }} ></TextInput>
            </View>

            <View style={{ width: 325, height: 70, backgroundColor: 'rgb(255, 230, 154)' }}>
              <Image source={require('./assets/padlock.png')} style={{ position: 'absolute', marginTop: 20, marginLeft: 9 }}></Image>
              <TextInput placeholder='Pasword' placeholderTextColor={'black'} style={{ marginLeft: 100, marginTop: 20, fontSize: 20 }} secureTextEntry={true}></TextInput>
            </View>

            <View style={{ width: 325, height: 70, backgroundColor: 'rgb(255, 230, 154)', borderBottomRightRadius: 75, marginTop: -1 }}>
              <Image source={require('./assets/email.png')} style={{ position: 'absolute', marginTop: 20, marginLeft: 9 }}></Image>
              <TextInput keyboardType="email-address" placeholder='Email Address' placeholderTextColor={'black'} style={{ marginLeft: 100, marginTop: 20, fontSize: 20 }} secureTextEntry={true}></TextInput>
            </View>

            <View style={{ width: 90, height: 90, backgroundColor: 'rgb(248, 105, 56)', borderRadius: 75, marginLeft: 280, marginTop: -150 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Loging')}>
                <Image source={require('./assets/right-arrow.png')} style={{ width: 65, marginLeft: 12, marginTop: 12 }} />
              </TouchableOpacity>
            </View>

            <View style={{ width: 180, height: 70, backgroundColor: 'rgb(248, 105, 56)', borderTopLeftRadius: 50, borderBottomLeftRadius: 50, marginTop: 300, position: 'absolute', marginLeft: 240 }}>
              <Text style={{ fontSize: 25, color: 'white', fontWeight: 500, marginTop: 15, marginLeft: 45 }} onPress={() => navigation.navigate('Loging')}>Loging</Text>
            </View>
          </View>

        </View>

      </ImageBackground>
    </View>
  );
}



function HomeScreen() {
  const [note, setNote] = useState({ title: '', description: '' });
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNote = async () => {
    const newNotes = [...notes, note];
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setNotes(newNotes);
    setNote({ title: '', description: '' });
  };

  const deleteNote = async (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setNotes(newNotes);

  };

  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };
  const renderDeleteButton = (index) => {
    return (
      <TouchableOpacity >
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 30, marginLeft: 10, }} onPress={deleteNote}><Image source={require('./assets/delete.png')}  ></Image></Text>

      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => (
    <View >
      <View style={styles.noteContainer}>
        <View>
          <Text style={{ fontWeight: 'bold', marginBottom: 7, fontSize: 18, }}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        {renderDeleteButton(index)}
      </View>
    </View>

  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 50, paddingHorizontal: 10, }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('./assets/left-arrow.png')} style={{ position: 'absolute', marginTop: 5, marginLeft: -190 }}></Image>
      </TouchableOpacity>
      <Text style={{ fontSize: 25 }}>Notes</Text>

      <View style={styles.form}>

        <TouchableOpacity onPress={saveNote}>
          <Image source={require('./assets/diskette.png')} style={{ marginTop: 0, marginLeft: 300, marginBottom: 20 }}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          value={note.description}
          onChangeText={(text) => setNote({ ...note, description: text })}
        />
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.noteList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No notes found</Text>
        )}
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Start'>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Loging" component={LogingScreen} />
        <Stack.Screen name="Sign" component={SignScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  form: {
    width: '90%',
    height: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 25,
    backgroundColor: 'white',
    width: '100%',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  noteList: {
    paddingBottom: 20,
    marginTop: 35,
  },
  noteContainer: {
    backgroundColor: 'white',
    padding: 10,
    width: 350,
    borderRadius: 5,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});