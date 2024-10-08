function clarion_language_definition() {

// Define Clarion language constants for better readability
  const STRING_LITERAL = {
    className: 'string',
    begin: "'",
    end: "'"
  };

  const COMMENTS = {
    className: 'comment',
    begin: '(\\!|\\|)',  // Clarion comments start with ! or |
    end: '$',
    relevance: 5
  };

  const IMPLICIT_KEYWORDS = {
    className: 'keyword-implicit',
    begin: '([A-Za-z][A-Za-z0-9_]+)(\\$|#|")',  // Match implicit keywords followed by $, #, or "
    contains: [
      {
        className: 'constant.numeric.implicit.clarion',
        begin: '[A-Za-z][A-Za-z0-9_]+',
      }
    ]
  };

  const CLASS_LABELS = {
    className: 'class-label',
    begin: '^[A-Za-z_][A-Za-z0-9_:]*\\.[A-Za-z_][A-Za-z0-9_]*',  // Match class labels like FilesManager.Construct
    end: '(?=\\s)',  // Stop at the first space
    relevance: 15
  };
  
  const NUMERIC_LITERALS = {
    className: 'number',
    begin: '\\b\\d+(\\.\\d+)?',
    relevance: 0
  };

  
  const BASE_TYPES = {
    className: 'type',
    begin: '\\b(?i:ANY|ASTRING|BFLOAT4|BFLOAT8|BLOB|MEMO|BOOL|BSTRING|BYTE|CSTRING|DATE|DECIMAL|DOUBLE|FLOAT4|LONG|LIKE|PDECIMAL|PSTRING|REAL|SHORT|SIGNED|SREAL|STRING|TIME|ULONG|UNSIGNED|USHORT|VARIANT)\\b',
    relevance: 10
  };

  const SPECIAL_TYPES = {
    className: 'type',
    begin: '\\b(FILE|QUEUE|GROUP|ARRAY)\\b',
    relevance: 10
  };

  const ATTRIBUTES = {
    className: 'attribute',
    begin: '\\b(?i:ABOVE|ABSOLUTE|ALONE|ALRT|ANGLE|AT|AUTO|AUTOSIZE|AVE|BELOW|BEVEL|BINARY|BINDABLE|BITMAP|BOXED|C|CAP|CENTER|CENTERED|CNT|COLOR|COLUMN|COM|COMPATIBILITY|CONST|CURSOR|DEFAULT|DELAY|DERIVED|DIM|DLL|DOCUMENT|DOCK|DOCKED|DOWN|DRAGID|DRIVER|DROP|DROPID|DUP|ENCRYPT|EXPAND|EXTEND|EXTERNAL|FILL|FILTER|FIRST|FIX|FIXED|FLAT|FONT|FROM|FULL|GLOBALCLASS|GRAY|GRID|HIDE|HLP|HSCROLL|HVSCROLL|ICON|ICONIZE|IMM|IMPLEMENTS|INNER|INS|LANDSCAPE|LAST|LATE|LAYOUT|LENGTH|LFT|LINEWIDTH|LINK|LOCATE|MARK|MASK|MAX|MAXIMIZE|MDI|META|MIN|MM|MODAL|MSG|NAME|NOBAR|NOCASE|NOFRAME|NOMEMO|NOMERGE|NOSHEET|OEM|OPT|ORDER|OUTER|OVER|OVR|OWNER|PAGE|PAGEAFTER|PAGEBEFORE|PALETTE|PAPER|PASCAL|PASSWORD|POINTS|PRE|PREVIEW|PRIMARY|PRIVATE|PROC|PROTECTED|RANGE|RAW|READONLY|RECLAIM|REPEAT|REPLACE|REQ|RESIZE|SCROLL|SINGLE|SMOOTH|SPREAD|STATIC|STD|STEP|STRETCH|SUM|SUPPRESS|TALLY|TARGET|THOUS|TILED|TIMER|TIP|TOGETHER|TOOLBOX|TRN|UP|UPR|USE|VALUE|VERTICAL|VCR|VIRTUAL|VSCROLL|WALLPAPER|WIDTH|WITHNEXT|WITHPRIOR|WIZARD|WRAP|ZOOM|CHECK|DOUBLE|SEPARATOR|PAGENO|RTF|SYSTEM|TYPE|COM)\\b',
    relevance: 10
  };

  const OPERATORS = {
    className: 'operator',
    begin: '(\\+|\\-|\\*|\\/|=|<>|<=|>=|~=|%|\\+=|\\-=|\\*=|\\\\=|:=:|~>|~<|\\^)',
    relevance: 5
  };
  

  const DIRECTIVES = {
    className: 'meta',
    begin: '\\b(?i:ASSERT|BEGIN|COMPILE|EQUATE|INCLUDE|ITEMIZE|OMIT|ONCE|SECTION|SIZE)\\b',
    relevance: 5
  };

  const LANG_FUNCTIONS = {
    className: 'keyword-function',  
    begin: '\\b(?i:ADD|DISPOSE|ADDRESS|GET|BAND|BUILD|CLEAR|CLOSE|DELETE|DUPLICATE|FIXFORMAT|FREESTATE|GETNULLS|GETSTATE|HOLD|LOCK|MAXIMUM|OPEN|POINTER|POSITION|PUT|RECORDS|REGET|RESET|RESTORESTATE|SET|SETNULLS|STATUS|UNBIND|UNFIXFORMAT|_PROC|_PROC1|_PROC2|_PROC3|ACCEPTED|ACOS|ALERT|ALIAS|ALL|ARC|ASIN|ASK|ATAN|BEEP|BINDEXPRESSION|BLANK|BOF|BOX|BUFFER|BYTES|CALL|CENTER|CHAIN|CHANGE|CHANGES|CHOICE|CHORD|CLIP|CLIPBOARD|CLOCK|CLONE|COLORDIALOG|COMMAND|COMMIT|COMPRESS|CONVERTANSITOOEM|CONVERTOEMTOANSI|CONTENTS|COPY|COS|DATE|DAY|DEBUGHOOK|DECOMPRESS|DELETEREG|DESTROY|DIRECTORY|DISABLE|DISPLAY|DRAGID|DROPID|ELLIPSE|EMPTY|ENABLE|ENDPAGE|EOF|ERASE|ERROR|ERRORCODE|ERRORFILE|EVALUATE|EXISTS|FIELD|FILEDIALOG|FILEDIALOGA|FILEERROR|FILEERRORCODE|FIRSTFIELD|FLUSH|FOCUS|FONTDIALOG|FONTDIALOGA|FORWARDKEY|FREE|FREEZE|GETEXITCODE|GETFONT|GETGROUP|GETREG|GETREGSUBKEYS|GETREGVALUES|GETINI|GETPOSITION|HALT|HELP|HIDE|HOWMANY|IDLE|IMAGE|INCOMPLETE|INSTANCE|INSTRING|ISALPHA|ISGROUP|ISLOWER|ISUPPER|ISSTRING|KEYBOARD|KEYCHAR|KEYCODE|KEYSTATE|LASTFIELD|LEFT|LEN|LINE|LOCALE|LOCKTHREAD|LOG10|LOGE|LONGPATH|LOWER|MATCH|MESSAGE|MONTH|MOUSEX|MOUSEY|NAME|NEXT|NOMEMO|NOTIFICATION|NOTIFY|NUMERIC|PACK|PATH|PENCOLOR|PENWIDTH|PENSTYLE|PIE|POLYGON|POPBIND|POPERRORS|POPUP|POST|PRESS|PRESSKEY|PREVIOUS|PRINTERDIALOG|PRINTERDIALOGA|PUSHBIND|PUSHERRORS|PUTREG|PUTINI|QUOTE|RANDOM|REGISTER|REGISTEREVENT|EVENT|RELEASE|REMOVE|RESUME|RIGHT|ROLLBACK|ROUNDBOX|RUN|RUNCODE|REJECTCODE|SELECT|SELECTED|SEND|SET3DLOOK|SETCLIPBOARD|SETCLOCK|SETCOMMAND|SETCURSOR|SETDROPID|SETEXITCODE|SETFONT|SETFONT|SETKEYCHAR|SETKEYCODE|SETLAYOUT|SETPATH|SETPENWIDTH|SETPENSTYLE|SETPENCOLOR|SETPOSITION|SETTARGET|SETTODAY|SHARE|SHORTPATH|SHOW|SHUTDOWN|SIN|SKIP|SQRT|START|STATUS|STOP|STREAM|STRPOS|SUB|SUSPEND|TAN|THREAD|THREADLOCKED|TIE|TIED|TODAY|TYPE|UNFREEZE|UNHIDE|UNLOAD|UNLOCK|UNLOCKTHREAD|UNQUOTE|UNREGISTER|UNREGISTEREVENT|UNTIE|UPDATE|UPPER|WATCH|WHAT|WHERE|WHO|YEAR|YIELD|ABS|AFTER|AGE|APPEND|BEFORE|BIND|BINDEXPRESSION|BOR|BSHIFT|BXOR|CHR|COMPRESS|CREATE|DDEACKNOWLEDGE|DDEAPP|DDECHANNEL|DDECLIENT|DDECLOSE|DDEEXECUTE|DDEITEM|DDEPOKE|DDEQUERY|DDEREAD|DDESERVER|DDETOPIC|DDEVALUE|DDEWRITE|DECOMPRESS|DEFORMAT|FILEEXISTS|FORMAT|FULLNAME|INLIST|INRANGE|INT|LOGOUT|OCXLOADIMAGE|OCXREGISTEREVENTPROC|OCXREGISTERPROPCHANGE|OCXREGISTERPROPEDIT|OCXSETPARAM|OCXUNREGISTEREVENTPROC|OCXUNREGISTERPROPCHANGE|OCXUNREGISTERPROPEDIT|OLEDIRECTORY|OMITTED|PEEK|POKE|PRAGMA|PRINT|PRINTER|RENAME|ROUND|SAVEDIALOG|SETNONULL|SETNULL|SHIFT|SORT|VAL|XOR)\\b',  // The list of functions
    relevance: 10
  };

  const PUNCTUATION = {
    className: 'punctuation',
    begin: '[.,;]',
    relevance: 0
  };

  const CONSTANTS = {
    className: 'constant',
    variants: [
      {
        begin: '0[xX][0-9a-fA-F]+[hH]?'  // Match hexadecimal literals ending with h or H
      },
      {
        begin: '[01]+[bB]'  // Match binary literals ending with b or B
      },
      {
        begin: '[0-7]+[oO]'  // Match octal literals ending with o or O
      }
    ],
    relevance: 0
  };
  
  
  const PICTURE_NUMERIC_FORMAT = {
    className: 'picture-numeric-format',  // Simpler class name
    begin: '@[Nn][\\-]?[0-9\\.]*\\~',  // Matches Clarion numeric picture formats
    end: '\\~',
    relevance: 10
  };
  
  
  
  const PREPROCESSOR_DIRECTIVES = {
    className: 'preprocessor',
    begin: '#pragma|#include',
    end: '$',
    relevance: 10
  };
  

  const HARD_RESERVED_KEYWORDS = {
    className: 'keyword-hard',
    begin: '\\b(?i:ACCEPT|AND|BREAK|BY|CASE|CHOOSE|CYCLE|DO|ELSE|ELSIF|END|EXECUTE|EXIT|FUNCTION|GOTO|IF|LOOP|MEMBER|NEW|NOT|OF|OR|OROF|PARENT|PROCEDURE|PROGRAM|RETURN|ROUTINE|SELF|THEN|TIMES|TO|UNTIL|WHILE)\\b',
    relevance: 10
  };

  const SOFT_RESERVED_KEYWORDS = {
    className: 'keyword-soft',  // Use the entity.name.tag.clarion class for soft reserved keywords
    begin: '\\b(?i:APPLICATION|CLASS|CODE|DATA|DETAIL|ENUM|FILE|FOOTER|FORM|GROUP|HEADER|INLINE|ITEM|JOIN|MAP|MENU|MENUBAR|MODULE|OLECONTROL|OPTION|QUEUE|RECORD|REPORT|ROW|SHEET|STRUCT|TAB|TABLE|TOOLBAR|VIEW|WINDOW|PROPERTY|INDEXER)\\b',
    relevance: 5
  };
  
  const PROCEDURE_KEYWORD = {
    className: 'function',  // Highlight PROCEDURE as a function keyword
    begin: '\\sPROCEDURE\\b',  // Match PROCEDURE with a preceding space
    end: '(?=\\s|\\(|,|$)',  // Stop at a space, parenthesis, comma, or end of line (CRLF)
    relevance: 10
  };
  
  // Combine the two rules for procedures
  const FUNCTIONS_AND_PROCEDURES = [
    PROCEDURE_KEYWORD
  ];
  
  const LABELS = {
    className: 'label',
    begin: '^[A-Za-z_][A-Za-z0-9_]*(?::[A-Za-z0-9_]+)?',  // Match labels with optional colon and valid characters after it
    end: '(?=\\s)',  // Ensure it stops at a space
    relevance: 10
  };
  
  
  

// Define the Clarion language syntax for Highlight.js
const CLARION_DEFAULT_CONTAINS = [
  STRING_LITERAL,
  COMMENTS,
  IMPLICIT_KEYWORDS,
  NUMERIC_LITERALS,
  LANG_FUNCTIONS,
  FUNCTIONS_AND_PROCEDURES,
  BASE_TYPES,
  SPECIAL_TYPES,
  ATTRIBUTES,
  OPERATORS,
  DIRECTIVES,
  HARD_RESERVED_KEYWORDS,
  SOFT_RESERVED_KEYWORDS,
  CLASS_LABELS,
  LABELS,
  PREPROCESSOR_DIRECTIVES,   // Added for preprocessor directives
  CONSTANTS,                 // Added for constants
  PUNCTUATION,               // Added for punctuation
  PICTURE_NUMERIC_FORMAT     // Added for PICTURE
];


  const KEYWORDS =
  "IF THEN ELSE CASE END INCLUDE OMIT SET PROCEDURE CLASS";

  return {
    name: 'Clarion',
    aliases: ['clarion'],
    case_insensitive: true,  // Clarion is case-insensitive
    keywords: {
      keyword: KEYWORDS,
      literal: 'TRUE FALSE NULL'
    },
    contains: CLARION_DEFAULT_CONTAINS,
  };
}

// Register Clarion language with Discourse's HighlightJS
