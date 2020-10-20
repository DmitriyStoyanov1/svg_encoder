import React, { Component } from "react";
import "./App.css";
import Textarea from "../Textarea";
import { encodeSvg, formatForCss, createPreviewUrl } from "../../utils";
import classNames from "classnames";
import { withTranslation } from 'react-i18next';
import i18n from "../../i18n";

class App extends Component {
  state = {
    inputValue: '',
    fileName: '',
    isFileLoaded: false,
    isFileError: false,
    selectedBackground: 'white'
  };

  handleChangeLang(lang) {
    console.log('work')
    i18n.changeLanguage(lang)
  }

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
        return this.props.t('only_svg')
      }

      return this.state.fileName
    }

    return this.props.t('choose')
  }

  copyFunction = (value) => {
    const textArea = document.createElement("textarea")
    document.body.appendChild(textArea)
    textArea.value = value
    textArea.select();
    document.execCommand("copy")
    textArea.style.display = 'none'
    document.body.removeChild(textArea)
  }

  exampleFunction = value => {
    value = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><defs><style>.a{fill:#e82e5f;}.b{fill:none;stroke:#1c4db8;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title/><path class="a" d="M45.437,2.318a1.106,1.106,0,0,0-.83-.684C36.772.59,28.362,5.749,28.424,13.457c-3.415-4-8.963-3.844-11.926-2.4a.657.657,0,0,0-.034,1.164c3.841,2.162,7.335,7.938,13,6.7a10.151,10.151,0,0,1-.632,3.655.75.75,0,0,0,.472.95.74.74,0,0,0,.239.04.751.751,0,0,0,.711-.511,10.935,10.935,0,0,0,.464-6.236c8.652.449,11.777-9.428,14.65-13.42A1.113,1.113,0,0,0,45.437,2.318ZM21.379,12.129c5.688.239,7.98,5.656,7.98,5.656A24.862,24.862,0,0,0,21.379,12.129Zm8.633,3.236s2.242-9.73,11.681-11.8A42.248,42.248,0,0,0,30.012,15.365Z"/><circle class="b" cx="29.999" cy="40.652" r="17.848"/><path class="b" d="M23.5,57.276s4.015-4.87.258-5.918a4.4,4.4,0,0,1-3.28-4.757h1.712A2.38,2.38,0,0,0,24.5,43.644l-1.19-4.759c-.383-1.534-5.326-4.17-10.8-1.8"/><path class="b" d="M44.254,29.943,41.013,32.1a3.686,3.686,0,0,1-3.934.131,3.751,3.751,0,0,0-4.638.615,3.883,3.883,0,0,0-.989,2l-.317,1.659a2.38,2.38,0,0,0,2.309,2.957s5.17-.8,5.5,1.688c.221,1.649-.94,3.112-1.75,3.912a2.706,2.706,0,0,0-.011,3.886l.045.04a2.918,2.918,0,0,0,2.226.652l6.32-.654a17.769,17.769,0,0,0-1.525-19.038Z"/></svg>`

    this.setState({
      inputValue: value
    })
  }

  changeBackgroundColor = (color) => {
    this.setState({ selectedBackground: color })

    // const classesArr = [...background.classList]
    // const newArr = classesArr.filter(currentClass => currentClass.includes("button"))
    // background.classList.remove(newArr[0])
    // background.classList.add(event.target.className)
  }

  render() {
    const encodedSvg = encodeSvg(this.state.inputValue)
    const formattedForCssValue = formatForCss(encodedSvg)
    const previewUrl = createPreviewUrl(encodedSvg)
    
    console.log(this.props.t)
    console.log(this.props)

    return (
      <div className="App">
        <h1 className="mt-4 mb-3 text-center">
          URL-encoder for SVG
        </h1>
        
        <div class="lang-button-wrapper">
          <button className="en" onClick={() => this.handleChangeLang('en')}></button>
          <button className="ru" onClick={() => this.handleChangeLang('ru')}></button>
          <button className="ukr" onClick={() => this.handleChangeLang('ukr')}></button>
        </div>

        <p className="mb-4 text-center">{this.props.t('description')}</p>

        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
            {this.props.t('upload')}
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
            <label>{this.props.t('insert')}</label>
            <button className="action-button" onClick={() => this.exampleFunction(this.state.inputValue)}>{this.props.t('example')}</button>
            <Textarea
              onChange={this.handleTextareaChange}
              value={this.state.inputValue}
            />
          </div>

          <div className="textarea-container">
            <label>{this.props.t('take_encoded')}</label>
            <button className="action-button" onClick={() => this.copyFunction(encodedSvg)}>{this.props.t('copy')}</button>
            <Textarea
              isReadonly
              value={encodedSvg}
            />
          </div>

          <div className="textarea-container">
            <label>{this.props.t('css')}</label>
            <button className="action-button" onClick={() => this.copyFunction(formattedForCssValue)}>{this.props.t('copy')}</button>
            <Textarea
              isReadonly
              onClick={this.copyFunction}
              value={formattedForCssValue}
            />
          </div>

          <div className="textarea-container">
            <label>{this.props.t('preview')}</label>
            <div className="button-wrapper">
              <p>{this.props.t('background')}</p>
              <button onClick={() => this.changeBackgroundColor('white')} className="white-button"></button>
              <button onClick={() => this.changeBackgroundColor('yellow')} className="yellow-button"></button>
              <button onClick={() => this.changeBackgroundColor('black')} className="black-button"></button>
            </div> 
            <div className={classNames(["resultContainer", `${this.state.selectedBackground}-button`])}>
              <div style={{ backgroundImage: previewUrl }} className="image"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(App);
