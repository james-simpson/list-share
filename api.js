import axios from 'axios'

const BASE_URL = 'https://infinite-garden-68271.herokuapp.com/items'

export default {
  // get all items
  getAll: () => axios.get(BASE_URL),

  // add a new item
  add: itemName =>
    axios.post(BASE_URL, { name: itemName })
      .then(response => response.data.id),

  // delete an item
  delete: id => axios.delete(`${BASE_URL}/${id}`)
}