import React from 'react';



export default class SessionEditor extends React.Component {
  constructor() {
    super()
    this.editor = AceEditor.instance("editor",{
        theme:"tomorrow_night",
        mode:"java"
    });
    this.setEditorMode = this.setEditorMode.bind(this);
  }

  setEditorMode(mode) {
    this.editor.getSession().setMode("ace/mode/javascript");
  }

  render() {
    return (
      <div id="editor" className="editor">

      </div>
    )
  }
}
