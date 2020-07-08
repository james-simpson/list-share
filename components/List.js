import React from 'react'
import ListItem from './ListItem'

List = ({ items, onCompletedChange, onTextChange, onDelete }) =>
  items.map((item, i) => (
    <ListItem
      text={item.name}
      completed={item.completed}
      onCompletedChange={() => onCompletedChange(item.id)}
      onTextChange={text => onTextChange(item.id, text)}
      onDelete={() => onDelete(item.id)}
      key={item.id}
    />
  )
)

export default List