import React, {Component} from 'react';
import './App.css';
import Textarea from './TextArea.js';
import encoding from './encoding.js'

class App extends Component {

  state = {
    inputValue1: '',
    inputValue2: ''
  }
  
  onTextareaChange = (event) => {

    this.setState({
      inputValue1: encoding(event.target.value),
      inputValue2: `url("data:image/svg+xml,${encoding(event.target.value)}")`
    })
  }

  render() {
    
    // backgroundImage: `url('data:image/svg+xml,${encoding}')`, backgroundRepeat: 'no-repeat' }}
    return (
      <div className="App">
        <h1 style={{textAlign: "center", margin: 0,
          paddingTop: '50px',
          paddingBottom: '50px'}}>URL-encoder for SVG</h1>
        <Textarea inputState={this.state}
                  onChange={this.onTextareaChange}
        />
      </div>
    )
  }
}

export default App;
