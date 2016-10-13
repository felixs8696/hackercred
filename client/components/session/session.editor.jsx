import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const editorTypes = [ { value: 'abap', text: 'ABAP' },
  { value: 'abc', text: 'ABC' },
  { value: 'actionscript', text: 'ActionScript' },
  { value: 'ada', text: 'ADA' },
  { value: 'apache_conf', text: 'Apache Conf' },
  { value: 'asciidoc', text: 'AsciiDoc' },
  { value: 'assembly_x86', text: 'Assembly x86' },
  { value: 'autohotkey', text: 'AutoHotKey' },
  { value: 'batchfile', text: 'BatchFile' },
  { value: 'c_cpp', text: 'C and C++' },
  { value: 'c9search', text: 'C9Search' },
  { value: 'cirru', text: 'Cirru' },
  { value: 'clojure', text: 'Clojure' },
  { value: 'cobol', text: 'Cobol' },
  { value: 'coffee', text: 'CoffeeScript' },
  { value: 'coldfusion', text: 'ColdFusion' },
  { value: 'csharp', text: 'C#' },
  { value: 'css', text: 'CSS' },
  { value: 'curly', text: 'Curly' },
  { value: 'd', text: 'D' },
  { value: 'dart', text: 'Dart' },
  { value: 'diff', text: 'Diff' },
  { value: 'dockerfile', text: 'Dockerfile' },
  { value: 'dot', text: 'Dot' },
  { value: 'dummy', text: 'Dummy' },
  { value: 'dummysyntax', text: 'DummySyntax' },
  { value: 'eiffel', text: 'Eiffel' },
  { value: 'ejs', text: 'EJS' },
  { value: 'elixir', text: 'Elixir' },
  { value: 'elm', text: 'Elm' },
  { value: 'erlang', text: 'Erlang' },
  { value: 'forth', text: 'Forth' },
  { value: 'ftl', text: 'FreeMarker' },
  { value: 'gcode', text: 'Gcode' },
  { value: 'gherkin', text: 'Gherkin' },
  { value: 'gitignore', text: 'Gitignore' },
  { value: 'glsl', text: 'Glsl' },
  { value: 'gobstones', text: 'Gobstones' },
  { value: 'golang', text: 'Go' },
  { value: 'groovy', text: 'Groovy' },
  { value: 'haml', text: 'HAML' },
  { value: 'handlebars', text: 'Handlebars' },
  { value: 'haskell', text: 'Haskell' },
  { value: 'haxe', text: 'haXe' },
  { value: 'html', text: 'HTML' },
  { value: 'html_elixir', text: 'HTML (Elixir)' },
  { value: 'html_ruby', text: 'HTML (Ruby)' },
  { value: 'ini', text: 'INI' },
  { value: 'io', text: 'Io' },
  { value: 'jack', text: 'Jack' },
  { value: 'jade', text: 'Jade' },
  { value: 'java', text: 'Java' },
  { value: 'javascript', text: 'JavaScript' },
  { value: 'json', text: 'JSON' },
  { value: 'jsoniq', text: 'JSONiq' },
  { value: 'jsp', text: 'JSP' },
  { value: 'jsx', text: 'JSX' },
  { value: 'julia', text: 'Julia' },
  { value: 'latex', text: 'LaTeX' },
  { value: 'lean', text: 'Lean' },
  { value: 'less', text: 'LESS' },
  { value: 'liquid', text: 'Liquid' },
  { value: 'lisp', text: 'Lisp' },
  { value: 'livescript', text: 'LiveScript' },
  { value: 'logiql', text: 'LogiQL' },
  { value: 'lsl', text: 'LSL' },
  { value: 'lua', text: 'Lua' },
  { value: 'luapage', text: 'LuaPage' },
  { value: 'lucene', text: 'Lucene' },
  { value: 'makefile', text: 'Makefile' },
  { value: 'markdown', text: 'Markdown' },
  { value: 'mask', text: 'Mask' },
  { value: 'matlab', text: 'MATLAB' },
  { value: 'maze', text: 'Maze' },
  { value: 'mel', text: 'MEL' },
  { value: 'mushcode', text: 'MUSHCode' },
  { value: 'mysql', text: 'MySQL' },
  { value: 'nix', text: 'Nix' },
  { value: 'nsis', text: 'NSIS' },
  { value: 'objectivec', text: 'Objective-C' },
  { value: 'ocaml', text: 'OCaml' },
  { value: 'pascal', text: 'Pascal' },
  { value: 'perl', text: 'Perl' },
  { value: 'pgsql', text: 'pgSQL' },
  { value: 'php', text: 'PHP' },
  { value: 'powershell', text: 'Powershell' },
  { value: 'praat', text: 'Praat' },
  { value: 'prolog', text: 'Prolog' },
  { value: 'properties', text: 'Properties' },
  { value: 'protobuf', text: 'Protobuf' },
  { value: 'python', text: 'Python' },
  { value: 'r', text: 'R' },
  { value: 'razor', text: 'Razor' },
  { value: 'rdoc', text: 'RDoc' },
  { value: 'rhtml', text: 'RHTML' },
  { value: 'rst', text: 'RST' },
  { value: 'ruby', text: 'Ruby' },
  { value: 'rust', text: 'Rust' },
  { value: 'sass', text: 'SASS' },
  { value: 'scad', text: 'SCAD' },
  { value: 'scala', text: 'Scala' },
  { value: 'scheme', text: 'Scheme' },
  { value: 'scss', text: 'SCSS' },
  { value: 'sh', text: 'SH' },
  { value: 'sjs', text: 'SJS' },
  { value: 'smarty', text: 'Smarty' },
  { value: 'snippets', text: 'snippets' },
  { value: 'soy_template', text: 'Soy Template' },
  { value: 'space', text: 'Space' },
  { value: 'sql', text: 'SQL' },
  { value: 'sqlserver', text: 'SQLServer' },
  { value: 'stylus', text: 'Stylus' },
  { value: 'svg', text: 'SVG' },
  { value: 'swift', text: 'Swift' },
  { value: 'tcl', text: 'Tcl' },
  { value: 'tex', text: 'Tex' },
  { value: 'text', text: 'Text' },
  { value: 'textile', text: 'Textile' },
  { value: 'toml', text: 'Toml' },
  { value: 'twig', text: 'Twig' },
  { value: 'typescript', text: 'Typescript' },
  { value: 'vala', text: 'Vala' },
  { value: 'vbscript', text: 'VBScript' },
  { value: 'velocity', text: 'Velocity' },
  { value: 'verilog', text: 'Verilog' },
  { value: 'vhdl', text: 'VHDL' },
  { value: 'wollok', text: 'Wollok' },
  { value: 'xml', text: 'XML' },
  { value: 'xquery', text: 'XQuery' },
  { value: 'yaml', text: 'YAML' },
  { value: 'django', text: 'Django' } ]

var editorOptions = editorTypes.map(function(type) {
 return ( <option key={type.value} value={type.value}>{type.text}</option> );
});

export default class SessionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editor_mode: "java",
      editor: AceEditor.instance("editor",{
          theme:"tomorrow_night",
          mode:"java"
      })
    }
    this._setEditorMode = this._setEditorMode.bind(this);
  }

  _setEditorMode(event) {
    var mode = event.target.value;
    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/" + mode);
    this.setState({editor_mode: mode});
  }

  render() {
    return (
      <div>
        <div className="sesh-editor">
          <div className="editor-container">
            <select className="editor-dropdown" defaultValue={this.state.editor_mode} onChange={this._setEditorMode} >
              {editorOptions}
            </select>
            <div id="editor" className="editor"></div>
          </div>
        </div>
        <div className="sesh-compiler">
          <div className="compiler-container">

          </div>
        </div>
      </div>
    )
  }
}
