import React from 'react';
import './App.css';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends React.Component{
  id = 0
  state = {
    input: '',
    todos: [

    ],
    color: '#343a40'
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }
  
  handleCreate = () => {
    const {input, todos, color} = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }
  
  handleKeyPress = (e) => {
    if(e.key ==='Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;
    const index = todos.findIndex(todo=>todo.id===id);
    const selected = todos[index];
    const nextTodos = [...todos];
    
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render(){
    const {input , todos, color} = this.state;
    const{
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;
    return (
      <div>
        <TodoListTemplate form={
            <Form
              value={input}
              onKeyPress={handleKeyPress}  
              onChange={handleChange}
              onCreate={handleCreate}
              color={color}
              
            />
          }
          palette={(
            <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
          )}>
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
        </TodoListTemplate>
      </div>
    )
  }
}

export default App;
