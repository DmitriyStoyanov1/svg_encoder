import React, { Component } from "react";
import "./App.css";
import Textarea from "../Textarea";
import { encodeSvg, formatForCss, createPreviewUrl } from "../../utils";

class App extends Component {
  state = {
    inputValue: '',
    fileName: '',
    isFileLoaded: false,
    isFileError: false,
  };

  fileInputRef = React.createRef()

  handleTextareaChange = ({ target }) => {
    const { value } = target

    this.setState({
      inputValue: value,
      isFileLoaded: false,
    })
  };

  fileSelectedHandler = (event) => {
    const file = event.target.files[0]

    if(!file) {
      return;
    }

    if(!file.name.includes(".svg")) {
      this.setState({
        inputValue: '',
        isFileLoaded: true,
        isFileError: true,
      })

      return;
    }

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      const fileContent = reader.result;

      this.fileInputRef.current.value = '';

      this.setState({
        inputValue: fileContent,
        fileName: file.name,
        isFileLoaded: true,
        isFileError: false,
      })
    }
  };

  get fileLabelText() {
    if(this.state.isFileLoaded) {
      if(this.state.isFileError) {
        return 'You can upload only svg file!'
      }

      return this.state.fileName
    }

    return 'Choosen File'
  }

  copyFunction = value => {
    const textArea = document.createElement("textarea")
    document.body.appendChild(textArea)
    textArea.value = value
    textArea.select();
    document.execCommand("copy")
    textArea.style.display = 'none'
    document.body.removeChild(textArea)
  }

  changeBackgroundColor = event => {
    const background = document.querySelector(".resultContainer")

    if(event.target.className === "white-button") {
      background.classList.add(event.target.className)
      background.classList.remove("yellow-button")
      background.classList.remove("black-button")
    }

    if(event.target.className === "black-button") {
      background.classList.add(event.target.className)
      background.classList.remove("yellow-button")
      background.classList.remove("white-button")
    }

    if(event.target.className === "yellow-button") {
      background.classList.add(event.target.className)
      background.classList.remove("black-button")
      background.classList.remove("white-button")
    }
    
    console.log(event.target.className)
    console.log(background)
  }

  render() {
    const encodedSvg = encodeSvg(this.state.inputValue)

    const formattedForCssValue = formatForCss(encodedSvg)
    const previewUrl = createPreviewUrl(encodedSvg)

    const copyButtonName = "Copy"
    const exampleButtonName = "Example"

    const insert = "Insert SVG:"
    const encoded = "Take encoded:"
    const css = "Ready for CSS:"

    return (
      <div className="App">
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          URL-encoder for SVG
        </h1>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
              Upload
            </span>
          </div>
          <div className="custom-file">
            <input
              ref={this.fileInputRef}
              onChange={this.fileSelectedHandler}
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            />

            <label
              style={{ color: this.state.isFileError ? "red" : "inherit" }}
              className="custom-file-label"
              htmlFor="inputGroupFile01"
            >
              {this.fileLabelText}
            </label>
          </div>
        </div>

        <div className="textarea-wrapper">
          <div className="textarea-container">

            <Textarea
              header={insert}
              buttonName={exampleButtonName}
              onChange={this.handleTextareaChange}
              value={this.state.inputValue}
            />
          </div>

          <div className="textarea-container">
            <Textarea
              onClick={this.copyFunction}
              header={encoded}
              buttonName={copyButtonName}
              isReadonly
              value={encodedSvg}
            />
          </div>

          <div className="textarea-container">
            <Textarea
              onClick={this.copyFunction}
              header={css}
              buttonName={copyButtonName}
              isReadonly
              value={formattedForCssValue}
            />
          </div>

          <div className="textarea-container">
            <h4>Preview:</h4>
            <div className="button-wrapper">
              <p>Background:</p>
              <button onClick={this.changeBackgroundColor}className="white-button"></button>
              <button onClick={this.changeBackgroundColor}className="yellow-button"></button>
              <button onClick={this.changeBackgroundColor}className="black-button"></button>
            </div> 
            <div className="resultContainer white-button">
              <div style={{ backgroundImage: previewUrl }} className="image"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
