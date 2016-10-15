import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// const aceEditorTypes = [{value:"abap",text:"ABAP"},{value:"abc",text:"ABC"},{value:"actionscript",text:"ActionScript"},{value:"ada",text:"ADA"},{value:"apache_conf",text:"Apache Conf"},{value:"asciidoc",text:"AsciiDoc"},
//                      {value:"assembly_x86",text:"Assembly x86"},{value:"autohotkey",text:"AutoHotKey"},{value:"batchfile",text:"BatchFile"},{value:"c_cpp",text:"C and C++"},{value:"c9search",text:"C9Search"},
//                      {value:"cirru",text:"Cirru"},{value:"clojure",text:"Clojure"},{value:"cobol",text:"Cobol"},{value:"coffee",text:"CoffeeScript"},{value:"coldfusion",text:"ColdFusion"},{value:"csharp",text:"C#"},
//                      {value:"css",text:"CSS"},{value:"curly",text:"Curly"},{value:"d",text:"D"},{value:"dart",text:"Dart"},{value:"diff",text:"Diff"},{value:"dockerfile",text:"Dockerfile"},{value:"dot",text:"Dot"},
//                      {value:"dummy",text:"Dummy"},{value:"dummysyntax",text:"DummySyntax"},{value:"eiffel",text:"Eiffel"},{value:"ejs",text:"EJS"},{value:"elixir",text:"Elixir"},{value:"elm",text:"Elm"},{value:"erlang",text:"Erlang"},
//                      {value:"forth",text:"Forth"},{value:"ftl",text:"FreeMarker"},{value:"gcode",text:"Gcode"},{value:"gherkin",text:"Gherkin"},{value:"gitignore",text:"Gitignore"},{value:"glsl",text:"Glsl"},{value:"gobstones",text:"Gobstones"},
//                      {value:"golang",text:"Go"},{value:"groovy",text:"Groovy"},{value:"haml",text:"HAML"},{value:"handlebars",text:"Handlebars"},{value:"haskell",text:"Haskell"},{value:"haxe",text:"haXe"},{value:"html",text:"HTML"},
//                      {value:"html_elixir",text:"HTML (Elixir)"},{value:"html_ruby",text:"HTML (Ruby)"},{value:"ini",text:"INI"},{value:"io",text:"Io"},{value:"jack",text:"Jack"},{value:"jade",text:"Jade"},{value:"java",text:"Java"},
//                      {value:"javascript",text:"JavaScript"},{value:"json",text:"JSON"},{value:"jsoniq",text:"JSONiq"},{value:"jsp",text:"JSP"},{value:"jsx",text:"JSX"},{value:"julia",text:"Julia"},{value:"latex",text:"LaTeX"},
//                      {value:"lean",text:"Lean"},{value:"less",text:"LESS"},{value:"liquid",text:"Liquid"},{value:"lisp",text:"Lisp"},{value:"livescript",text:"LiveScript"},{value:"logiql",text:"LogiQL"},{value:"lsl",text:"LSL"},
//                      {value:"lua",text:"Lua"},{value:"luapage",text:"LuaPage"},{value:"lucene",text:"Lucene"},{value:"makefile",text:"Makefile"},{value:"markdown",text:"Markdown"},{value:"mask",text:"Mask"},{value:"matlab",text:"MATLAB"},
//                      {value:"maze",text:"Maze"},{value:"mel",text:"MEL"},{value:"mushcode",text:"MUSHCode"},{value:"mysql",text:"MySQL"},{value:"nix",text:"Nix"},{value:"nsis",text:"NSIS"},{value:"objectivec",text:"Objective-C"},
//                      {value:"ocaml",text:"OCaml"},{value:"pascal",text:"Pascal"},{value:"perl",text:"Perl"},{value:"pgsql",text:"pgSQL"},{value:"php",text:"PHP"},{value:"powershell",text:"Powershell"},{value:"praat",text:"Praat"},
//                      {value:"prolog",text:"Prolog"},{value:"properties",text:"Properties"},{value:"protobuf",text:"Protobuf"},{value:"python",text:"Python"},{value:"r",text:"R"},{value:"razor",text:"Razor"},{value:"rdoc",text:"RDoc"},
//                      {value:"rhtml",text:"RHTML"},{value:"rst",text:"RST"},{value:"ruby",text:"Ruby"},{value:"rust",text:"Rust"},{value:"sass",text:"SASS"},{value:"scad",text:"SCAD"},{value:"scala",text:"Scala"},
//                      {value:"scheme",text:"Scheme"},{value:"scss",text:"SCSS"},{value:"sh",text:"SH"},{value:"sjs",text:"SJS"},{value:"smarty",text:"Smarty"},{value:"snippets",text:"snippets"},{value:"soy_template",text:"Soy Template"},
//                      {value:"space",text:"Space"},{value:"sql",text:"SQL"},{value:"sqlserver",text:"SQLServer"},{value:"stylus",text:"Stylus"},{value:"svg",text:"SVG"},{value:"swift",text:"Swift"},{value:"tcl",text:"Tcl"},
//                      {value:"tex",text:"Tex"},{value:"text",text:"Text"},{value:"textile",text:"Textile"},{value:"toml",text:"Toml"},{value:"twig",text:"Twig"},{value:"typescript",text:"Typescript"},{value:"vala",text:"Vala"},
//                      {value:"vbscript",text:"VBScript"},{value:"velocity",text:"Velocity"},{value:"verilog",text:"Verilog"},{value:"vhdl",text:"VHDL"},{value:"wollok",text:"Wollok"},{value:"xml",text:"XML"},{value:"xquery",text:"XQuery"},
//                      {value:"yaml",text:"YAML"},{value:"django",text:"Django"}];

const editorTypes = [{ace: "python", repl:"python3", text:"Python3"}, {ace: "html_ruby", repl:"ruby", text:"Ruby"}, {ace: "php", repl:"php", text:"PHP"},
                        {ace: "java", repl:"java", text:"Java"}, {ace: "golang", repl:"go", text:"Go"}, {ace: "javascript", repl:"nodejs", text:"NodeJS"},
                        {ace: "c_cpp", repl:"csharp", text:"C#"}, {ace: "c_cpp", repl:"cpp", text:"C++"}, {ace: "c_cpp", repl:"c", text:"C"}]

const replToAce = {python3: 'python', ruby: 'html_ruby', php: 'php', java: 'java', go: 'golang', nodejs: 'javascript', csharp: 'c_cpp', cpp: 'c_cpp', c: 'c_cpp'}

var editorOptions = editorTypes.map(function(type) {
return ( <option key={type.repl} value={type.repl}>{type.text}</option> );
});

export default class SessionEditor extends React.Component {
  componentWillMount() {
    $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha256.js" )
    .done(function( s, Status ) {
      this.replRequest = $.when(
        $.getScript("https://repl.it/lib/api.js"),
        $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js" ),
        $.Deferred(function( deferred ){
          $( deferred.resolve );
        })
      ).done(function( s1, s2, s3){
        var date = (new Date()).getTime();
        var hash = CryptoJS.HmacSHA256(date.toString(), "njygq22mravcw5tw");
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        var token = { time_created: date, msg_mac: hashInBase64 };
        this.setState({repl: new ReplitClient('api.repl.it', '80', 'python', token)});
        // console.log(this.state.repl);
      }.bind(this)).fail(function( result ) {
        console.log( result.statusText );
      });
    }.bind(this)).fail(function( jqxhr, settings, exception ) {
      console.warn( "Something went wrong " + exception );
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      editor_mode: "python3",
      editor: AceEditor.instance("editor",{
          theme:"tomorrow_night",
          mode:"python"
      })
    }
    this._setEditorMode = this._setEditorMode.bind(this);
    this._generateCompileToken = this._generateCompileToken.bind(this);
    this._compileCode = this._compileCode.bind(this);
    this._keyDownCompile = this._keyDownCompile.bind(this);
  }

  _setEditorMode(event) {
    var mode = event.target.value;
    console.log(mode);
    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/" + replToAce[mode]);
    this.setState({editor_mode: mode});
    this._setCompilerType(mode);
  }

  _generateCompileToken() {
    var date = (new Date()).getTime();
    var hash = CryptoJS.HmacSHA256(date.toString(), "njygq22mravcw5tw");
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return { time_created: date, msg_mac: hashInBase64 };
  }

  _setCompilerType(type) {
    this.state.repl = new ReplitClient('api.repl.it', '80', type, this._generateCompileToken());
    this.state.repl.connect().then(
      function() {
        console.log('Compiler connected');
      },
      function() {
        console.log('Compiler connection failed');
      }
    );
  }

  _keyDownCompile(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
      this._compileCode();
    }
  }

  _compileCode() {
    var output = {stdout: false, result: false};
    var editor = ace.edit("editor");
    var out = document.getElementById('compile-output');
    var compiler = document.getElementById('compiler');
    this.state.repl.evaluate(editor.getValue(),
      {
        stdout: function(str) {
          if (/\S/.test(str)) {
            out.innerHTML += str;
            output.stdout = true;
          }
          console.log(str);
        }
      }
    ).then(
      function(result) {
        if (result.data != "None" || /\S/.test(result.error)) {
          if (output.stdout) out.innerHTML += '\n';
          out.innerHTML += (result.error || result.data);
          output.result = true;
        }
        if (output.stdout || output.result) out.innerHTML += '\n>> ';
        compiler.scrollTop = compiler.scrollHeight;
        console.log(result);
      },
      function(err) {
          console.error(err);
      }
    );
  }

  render() {
    return (
      <div>
        <div className="sesh-editor">
          <div className="editor-container">
            <select className="editor-dropdown" defaultValue={this.state.editor_mode} onChange={this._setEditorMode} >
              {editorOptions}
            </select>
            <div id="editor" className="editor" onKeyDown={this._keyDownCompile}></div>
          </div>
        </div>
        <div className="sesh-compiler">
          <div className="compiler-container">
            <div className="compiler" id="compiler">
              <pre className="out" id="compile-output">>> </pre>
            </div>
            <button className="compile-button" onClick={this._compileCode}>Compile</button>
          </div>
        </div>
      </div>
    )
  }
}
