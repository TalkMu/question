import { Component } from 'react'
import Taro from '@tarojs/taro'
import {View, Text, Button, Input, Textarea} from '@tarojs/components'
import Dialog from './Dialog'
import './AddQuestions.scss'

export default class AddQuestions extends Component {
  state = {
    title:"",
    des:"",
  }
  btnCancel(){
    this.props.closeQuestion();
  }
  changeTitle(e){
    this.setState({title:e.target.value})
  }
  changeDes(e){
    this.setState({des:e.target.value})
  }
  btnOk(){
    if (this.state.title && this.state.des){
      this.props.receiveQuestion(this.state);
    }else {
      Taro.showToast({
        title:"请输入标题或描述",
        icon:'none'
      })
    }
  }
  render ()
  {
    return (
      <Dialog>
        <View className='add-question'>
          <View className='question-body'>
            <Input placeholder='请输入提问内容' className='question-title' onInput={this.changeTitle.bind(this)} />
            <Textarea placeholder='请输入问题描述' className='question-des' onInput={this.changeDes.bind(this)} />
            <View className='btn-group'>
              <Button className='btn-group-question ok' onClick={this.btnOk.bind(this)}>确定</Button>
              <Button className='btn-group-question cancel' onClick={this.btnCancel.bind(this)}>取消</Button>
            </View>
          </View>
        </View>
      </Dialog>
    );
  }
}
