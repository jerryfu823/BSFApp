import React from 'react';
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors'

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'BSF课程',
    },
  };

  goToLesson(lesson) {
    this.props.navigation.getNavigator('root').push('lesson', { lesson });
  }

  render() {
    mainUI = null
    if (this.props.booklist != undefined) {
      mainUI = <Accordion
        initiallyActiveSection={0}
        sections={this.props.booklist}
        renderHeader={this._renderHeader.bind(this)}
        renderContent={this._renderContent.bind(this)} />
    }
    else {
      mainUI = <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 22 }}>正在加载</Text>
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.booksContainer}>
            {mainUI}
          </View>
        </ScrollView>
      </View>
    )
  }

  _renderHeader(content, index, isActive) {
    return (
      <View style={styles.bookHeader} >
        {/* <View style={styles.bookHeaderIcon}> */}
        {/*   <FontAwesome */}
        {/*     name={ isActive ? 'minus' : 'plus'} */}
        {/*     size={ 18 } */}
        {/*   /> */}
        {/* </View> */}
        <Text style={styles.bookHeaderText}> {content.title} </Text>
      </View>
    )
  }

  _renderContent(content, index, isActive) {
    return (
      <View>
        {content.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            goToLesson={() => this.goToLesson(lesson)}
            lesson={lesson}
          />))}
      </View>
    )
  }

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const Lesson = (props) => {
  return (
    <TouchableOpacity style={styles.lessonContainer} onPress={() => props.goToLesson()}>
      <View>
        <View style={styles.lessonMetadata}>
          <Text style={styles.lessonMetadataText}>
            {props.lesson.proposedDate} {props.lesson.order}
          </Text>
        </View>
        <Text style={styles.lessonText}>
          {props.lesson.name}
        </Text>
      </View>
      <View style={styles.lessonChevron}>
        <FontAwesome
          name='chevron-right'
          color='grey'
          size={16}
        />
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => {
  return {
    booklist: state.books,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
  },
  booksContainer: {
  },
  bookHeader: {
    flexDirection: 'row',
    paddingVertical: 2,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingLeft: 15,
  },
  bookHeaderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookHeaderText: {
    fontSize: 20,
    marginVertical: 6,
    fontWeight: '400',
  },

  lessonContainer: {
    paddingLeft: 25,
    paddingVertical: 5,
    backgroundColor: 'white',
    height: 60,
  },
  lessonChevron: {
    position: 'absolute',
    right: 15,
    top: 25,
  },
  lessonMetadata: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  lessonMetadataText: {
    color: 'grey',
  },
  lessonText: {
    fontSize: 18,
  },
});
