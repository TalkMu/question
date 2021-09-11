import { Component } from 'react'
import { View} from '@tarojs/components'
import './dialog.scss'

export default class Dialog extends Component {
  render ()
  {
    return (
      <View className='dialog'>{this.props.children}</View>
    )
  }
}
