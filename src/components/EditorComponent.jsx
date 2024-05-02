import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import ToggleBlock from 'editorjs-toggle-block';
import AIText from '@alkhipce/editorjs-aitext'
import Title from "title-editorjs";
import AceCodeEditorJS from "ace-code-editorjs";
import "ace-builds/esm-resolver";
import ace from "ace-builds";
// import CodeTool from '@editorjs/code';
import RawTool from '@editorjs/raw';
import CodeBox from '@bomdi/codebox';
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import CodeTool from '@rxpm/editor-js-code';

import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);

//TODO: try to Run code mirror

// Best -> Codeflask


const aceConfig = {
  languages: {
    plain: {
      label: "Plain Text",
      mode: "ace/mode/plain_text",
    },
    html: {
      label: "HTML",
      mode: "ace/mode/html",
    },
  },
  options: {
    fontSize: 16,
    minLines: 4,
    theme: "ace/theme/monokai",
  },
};

const tools = {
  header: Header, 
  code: {
    class: AceCodeEditorJS,
    config: aceConfig,
  },
  // code1: CodeTool,
  code2: {
    class: CodeTool,
    config: {
      modes: {
        'js': 'JavaScript',
        'py': 'Python',
        'go': 'Go',
        'cpp': 'C++',
        'cs': 'C#',
        'md': 'Markdown',
      },
      defaultMode: 'javascript'
    }
  },
  codeRaw: RawTool,
  codeBox: {
    class: CodeBox,
    config: {
      themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
      themeName: 'atom-one-dark', // Optional
      useDefaultTheme: 'light' // Optional. This also determines the background color of the language select drop-down
    }
  },
  codeflask : editorjsCodeflask, //sabse best hai can improve it more

  title: Title,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  // quote: Quote,
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: 'Quote\'s author',
    },
  },

  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },


  delimiter: Delimiter,


  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+A',
    config: {
      defaultType: 'primary',
      messagePlaceholder: 'Enter something',
    },
  },


  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },


  aiText: {
    // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
    // type ToolConstructable imported from @editorjs/editorjs package
    class: AIText ,
    config: {
      // here you need to provide your own suggestion provider (e.g., request to your backend)
      // this callback function must accept a string and return a Promise<string>
      callback: (text) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('AI: ' + text)
          }, 1000)
        })
      },
    }
  },
}

const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "level": 1
          }
        },
      ]
  }





const EditorComponent = () => {
  const ejInstance = useRef();

    const initEditor = () => {
       const editor = new EditorJS({
          holder: 'editorjs',
          onReady: () => {
            ejInstance.current = editor;
          },
          autofocus: true,
          data: DEFAULT_INITIAL_DATA,
          onChange: async () => {
            let content = await editor.saver.save();

            console.log(content);
          },
          tools: tools,
        });
      };

      // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return  <><div id='editorjs'></div></>;
}

export default EditorComponent;