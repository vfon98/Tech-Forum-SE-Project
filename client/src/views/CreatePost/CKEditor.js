import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const loadScript = require('load-script');

var defaultScriptUrl = 'https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js';

class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    //Bindings
    this.onLoad = this.onLoad.bind(this);
    this.passData = this.passData.bind(this);

    //State initialization
    this.state = {
      isScriptLoaded: props.isScriptLoaded
    };
  }

  //load ckeditor script as soon as component mounts if not already loaded
  componentDidMount() {
    if (!this.state.isScriptLoaded) {
      loadScript(this.props.scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  }

  componentWillReceiveProps(props) {
    const editor = this.editorInstance;
    if (editor && editor.getData() !== props.content) {
      editor.setData(props.content);
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  passData(editor) {
    editor.on('change', e => {
      this.props.getData(e.editor.getData());
    })
  }

  onLoad() {
    const { height } = this.props;
    let editor = window.CKEDITOR.replace('editor');
    this.passData(editor);
    window.CKEDITOR.config.uiColor = '#9AB8F3';
    // window.CKEDITOR.config.width = '1000px';
    window.CKEDITOR.config.height = height || '400px';
    if (this.unmounting) return;
    this.setState({
      isScriptLoaded: true
    });

    if (!window.CKEDITOR) {
      console.error('CKEditor not found');
      return;
    }

    // this.editorInstance = window.CKEDITOR.appendTo(
    //   ReactDOM.findDOMNode(this),
    //   this.props.config,
    //   this.props.content
    // );

    //Register listener for custom events if any
    for (var event in this.props.events) {
      var eventHandler = this.props.events[event];

      this.editorInstance.on(event, eventHandler);
    }
  }
//className={this.props.activeClass} id="CKEditor"

  render() {
    return (
      <div> 
        <textarea name="editor" id="editor" rows="10" cols="80" required>
        </textarea>
      </div>
    );
  }
}

CKEditor.defaultProps = {
  content: '',
  config: {},
  isScriptLoaded: false,
  scriptUrl: defaultScriptUrl,
  activeClass: '',
  events: {}
};

CKEditor.propTypes = {
  content: PropTypes.any,
  config: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  scriptUrl: PropTypes.string,
  activeClass: PropTypes.string,
  events: PropTypes.object
};

export default CKEditor;