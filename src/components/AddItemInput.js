import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'

class AddItemInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  updateText (text) {
    this.setState({ text })
  }

  submit (text) {
    this.props.onAdd(this.state.text)
    this.updateText('')
  }

  render () {
    return (
      <TextInput
        style={[this.props.style, styles.listItemText ]}
        placeholder='Add item'
        placeholderTextColor={'#8c8c89'}
        value={this.state.text}
        onChangeText={text => { this.updateText(text) }}
        onSubmitEditing={text => { this.submit(text) }}
        blurOnSubmit={false}
        autoFocus
      />
    )
  }
}

const styles = StyleSheet.create({
  listItemText: {
    fontSize: 22,
    paddingLeft: 5,
    paddingBottom: 10
  }
})

export default AddItemInput