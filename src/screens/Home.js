//import liraries
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';

// create a component
const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const {width} = useWindowDimensions();

  const getNews = async () => {
    try {
      let response = await fetch(
        'https://webapp.eventedge.com/test_data_api.json',
      );
      let data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  //handling onPress action
  const getListViewItem = async (item) => {
    await Linking.openURL(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextView}>
        <Text style={styles.titleText}>{newsData.title}</Text>
      </View>
      <FlatList
        data={newsData.items}
        contentContainerStyle={{padding: 16}}
        renderItem={({item}) => (
          <View style={styles.itemView}>
            <Text style={styles.item} onPress={() => getListViewItem(item.url)}>
              {item.title}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={{html: item.summary}}
              tagsStyles={mixedStyle}
            />
            <View style={styles.authorView}>
              <Image
                style={styles.userImage}
                source={require('../images/user.jpeg')}
              />
              <Text style={styles.authorName}>{item.author.name}</Text>
              <Text style={styles.date}>
                {'  |  '}
                {moment(item.date_published).format('LL')}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.guid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    backgroundColor: '#2e2f41',
  },
  titleText: {
    color: '#e14b75',
    fontSize: 24,
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#CCD0D5',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  userImage: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
  },
  date: {
    color: 'grey',
  },
  itemView: {
    borderRadius: 8,
    borderWidth: 0.3,
    marginVertical: 5,
  },
  authorView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

const mixedStyle = {
  body: {
    whiteSpace: 'normal',
    color: '#aaa',
  },
  p: {
    color: 'black',
    marginHorizontal: 10,
  },
};

//make this component available to the app
export default Home;
