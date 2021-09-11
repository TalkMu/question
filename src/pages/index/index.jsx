import {Component} from 'react'
import Taro from '@tarojs/taro'
import {View, Text, Button, Image} from '@tarojs/components'
import './index.scss'
import AddQuestions from "./AddQuestions";

import icon_up from '../../assets/thumb-up.png';
import icon_down from '../../assets/thumb-down.png';

function getStore(key) {
  let str = Taro.getStorageSync(key);
  if (!str) {
    return [];
  }
  return JSON.parse(str);
}

function setStore(key, obj) {
  let str;
  if (typeof obj === "object") {
    str = JSON.stringify(obj);
  }
  Taro.setStorageSync(key, str);
}

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  state = {
    showQuestionModel: false,
    questionList: getStore("question_data"),
  }

  addQuestion() {
    this.setState({showQuestionModel: true});
  }

  closeQuestion() {
    this.setState({showQuestionModel: false});
  }

  receiveQuestion(options) {
    let {questionList} = this.state;
    questionList.push({id: parseInt(Math.random() * 1000), ...options});
    this.setState({questionList: questionList}, () => {
      setStore("question_data", questionList);
    })

    this.closeQuestion();
  }

  addVote(item) {
    let {questionList} = this.state;
    if (item) {
      item.vote = item.vote ? item.vote + 1 : 1;
    }
    const newList = questionList.map(itemQuestion => {
      if (item.id === itemQuestion.id) {
        itemQuestion = {...item}
      }
      return itemQuestion;
    });
    this.setState({questionList: newList}, ()=>{
      setStore("question_data", newList)
    });
  }

  cutVote(item) {
    let {questionList} = this.state;
    if (item) {
      item.vote = (item.vote && (item.vote - 1)>0)?(item.vote - 1) : 0;
    }
    const newList = questionList.map(itemQuestion => {
      if (item.id === itemQuestion.id) {
        itemQuestion = {...item}
      }
      return itemQuestion;
    });
    this.setState({questionList: newList}, ()=>{
      setStore("question_data", newList)
    });
  }

  render() {
    let {showQuestionModel, questionList} = this.state;
    return (
      <View className='index'>
        <Image className='top-img' src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180" mode="scaleToFill"/>
        <View className='title'>问答模块案例</View>
        <View className='question-list'>
          {
            questionList.map((item, index) => {
              return (
                <View className='question' key={index}>
                  <View className='question-left'>
                    <View className='question-title'>{item.title}</View>
                    <View className='question-des'>{item.des}</View>
                  </View>
                  <View className='question-right'>
                    <Image onClick={this.addVote.bind(this,item)} className='img' src={icon_up} />
                    <Text>{item.vote ? item.vote : 0}</Text>
                    <Image onClick={this.cutVote.bind(this,item)} className='img' src={icon_down} />
                  </View>
                </View>
              );
            })
          }
        </View>
        {showQuestionModel ? <AddQuestions receiveQuestion={this.receiveQuestion.bind(this)}
                                           closeQuestion={this.closeQuestion.bind(this)} /> : null}
        <Button onClick={this.addQuestion.bind(this)} className='btn-questions'>提问</Button>
      </View>
    )
  }
}
