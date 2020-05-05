Vue.component('todo-item', {
  props: ['item'],
  template: '<li>{{ item.text }}\
               <button class="btn btn-sm btn-danger" v-on:click="$emit(\'remove\')">Remove</button>\
            </li>'
})

var todolistLocalStorage = window.localStorage.getItem('todolist')
var savedTodoList = []
var nextItemId = 1;
if (todolistLocalStorage != null) {
  savedTodoList = JSON.parse(todolistLocalStorage)
  nextItemId = savedTodoList.length + 1;
}

var todos = new Vue({
  el: '#todos',
  data: {
    newTodoText: '',
    todoList: savedTodoList,
    nextTodoId: nextItemId
  },
  methods: {
    saveList: function() {
      const data = JSON.stringify(this.todoList)
      window.localStorage.setItem('todolist', data)
      console.log(JSON.parse(window.localStorage.getItem('todolist')))
    },
    addNewTodo: function() {
      this.todoList.push({
        id: this.nextTodoId++,
        text: this.newTodoText
      })

      this.saveList()
      this.newTodoText = ''
    },
    removeItem: function(index) {
      this.todoList.splice(index, 1)

      this.saveList()
      this.newTodoText = ''
    }
  }
})
