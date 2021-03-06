import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Share,
  Platform,
  ActionSheetIOS
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { loadAsync } from '../dataStorage/storage';
import { Models } from '../dataStorage/models';

export default class ExportAnswer extends React.Component {

  getAnswer(answers, questionId) {
    for (var id in answers) {
      if (id == questionId) {
        return '>>' + answers[id].answerText + '\n';
      }
    }

    return '';
  }

  getContent(day, answers) {
    let result = day.title + '\n';
    for (var i in day.questions) {
      result += (day.questions[i].questionText + '\n');
      result += (this.getAnswer(answers, day.questions[i].id) + '\n');
    }
    result += '\n';
    return result;
  }

  async onClick() {
    console.log("Save " + this.props.lessonId);
    try {
      const answerContent = await loadAsync(Models.Answer, null, false);
      console.log(JSON.stringify(answerContent));
      let answers = '';
      if (answerContent && answerContent.answers) {
        answers = answerContent.answers;
      }

      const lessonContent = await loadAsync(Models.Lesson, this.props.lessonId, false);
      if (!lessonContent) {
        Alert.alert("Error", "Network error");
        return;
      }

      for (var dayQuestion in lessonContent.dayQuestions) {
          content += this.getContent(dayQuestion, answers);
      }

      const shareData = { title: lessonContent.name, subject: lessonContent.name, message: content };
      console.log(shareData);

      Share.share(shareData);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error);
      return;
    }
  }

  render() {
   return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onClick.bind(this)}>
          <FontAwesome
            name='save'
            size={40}
            color='#fff' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 54,
    marginTop: 4
  }
});
