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

  render() {
    const encodedSvg = encodeSvg(this.state.inputValue)

    const formattedForCssValue = formatForCss(encodedSvg)
    const previewUrl = createPreviewUrl(encodedSvg)

    return (
      <div className="App">
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            paddingTop: "50px",
            paddingBottom: "50px",
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
              onChange={this.handleTextareaChange}
              value={this.state.inputValue}
            />
          </div>

          <div className="textarea-container">
            <Textarea
              isReadonly
              value={encodedSvg}
            />
          </div>

          <div className="textarea-container">
            <Textarea
              isReadonly
              value={formattedForCssValue}
            />
          </div>

          <div className="textarea-container">
            <div style={{ backgroundImage: previewUrl }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
