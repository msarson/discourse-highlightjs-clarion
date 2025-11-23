import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.13", (api) => {
    function clarion_language_definition() {

        const STRING_LITERAL = {
            className: 'string',
            begin: "'",
            end: "'"
        };

        const COMMENTS = {
            className: 'comment',
            begin: '(\\!|\\|)',
            end: '$'
        };

        const NUMERIC_LITERALS = {
            className: 'number',
            begin: '\\b\\d+(\\.\\d+)?'
        };

        const LABELS = {
            className: 'label',
            begin: '^[A-Za-z_][A-Za-z0-9_]*(?::[A-Za-z0-9_]+)?',
            end: '(?=\\s)',
        };

        const CLASS_LABELS = {
            className: 'class-name',
            begin: '[A-Za-z_][A-Za-z0-9_]*\\.[A-Za-z_][A-Za-z0-9_]*',
            end: '(?=\\s)',
            relevance: 10
        };

        const BASE_TYPES = {
            className: 'type',
            begin: '\\b(?i:ANY|ASTRING|BOOL|BYTE|CSTRING|DATE|DECIMAL|DOUBLE|FLOAT4|LONG|PSTRING|REAL|SHORT|SIGNED|STRING|TIME|ULONG|UNSIGNED|USHORT)\\b'
        };

        const SPECIAL_TYPES = {
            className: 'type',
            begin: '\\b(?i:FILE|QUEUE|GROUP|ARRAY)\\b'
        };

        const ATTRIBUTES = {
            className: 'attribute',
            begin: '\\b(?i:AT|AUTO|BINDABLE|BOXED|CENTER|COLOR|COLUMN|DEFAULT|DIM|DLL|DRIVER|DROP|ICON|INNER|LENGTH|MASK|NAME|ORDER|OVER|PAGE|PRIVATE|PROTECTED|PUBLIC|REQ|SCROLL|STATIC|TIP|USE|VALUE|VERTICAL|WIDTH)\\b'
        };

        const OPERATORS = {
            className: 'operator',
            begin: '(\\+|\\-|\\*|\\/|=|<>|<=|>=|~=|%|\\+=|\\-=|\\*=|\\\\=|:=:|~>|~<|\\^)'
        };

        const PUNCTUATION = {
            className: 'punctuation',
            begin: '[.,;]'
        };

        const CONSTANTS = {
            className: 'constant',
            variants: [
                { begin: '0[xX][0-9a-fA-F]+[hH]?' },
                { begin: '[01]+[bB]' },
                { begin: '[0-7]+[oO]' }
            ]
        };

        const PICTURE_NUMERIC_FORMAT = {
            className: 'picture-numeric-format',
            begin: '@[Nn][\\-]?[0-9\\.]*\\~',
            end: '\\~'
        };

        const PREPROCESSOR_DIRECTIVES = {
            className: 'meta',
            begin: '#(pragma|include)',
            end: '$'
        };

        const HARD_RESERVED_KEYWORDS = {
            className: 'keyword-hard',
            begin: '\\b(?i:ACCEPT|AND|BREAK|BY|CASE|CHOOSE|CYCLE|DO|ELSE|ELSIF|END|EXECUTE|EXIT|FUNCTION|GOTO|IF|LOOP|MEMBER|NEW|NOT|OF|OR|OROF|PARENT|PROCEDURE|PROGRAM|RETURN|ROUTINE|SELF|THEN|TIMES|TO|UNTIL|WHILE)\\b'
        };

        const SOFT_RESERVED_KEYWORDS = {
            className: 'keyword-soft',
            begin: '\\b(?i:APPLICATION|CLASS|CODE|DATA|DETAIL|ENUM|FILE|FOOTER|FORM|GROUP|HEADER|INLINE|ITEM|JOIN|MAP|MENU|MENUBAR|MODULE|OLECONTROL|OPTION|QUEUE|RECORD|REPORT|ROW|SHEET|TAB|TABLE|TOOLBAR|VIEW|WINDOW|PROPERTY|INDEXER)\\b'
        };

        const LANG_FUNCTIONS = {
            className: 'function',
            begin: '\\b(?i:ADD|DISPOSE|ADDRESS|GET|PUT|OPEN|CLOSE|LOCK|UNLOCK|MESSAGE|CLEAR|FREE|SET|SEND|POST|FILEERROR|FILEERRORCODE|RANDOM|DAY|YEAR|MONTH|INSTRING|MATCH|LEN|UPPER|LOWER|LEFT|RIGHT|SUB|TODAY|FORMAT|INT|ABS)\\b'
        };

        const PROCEDURE_KEYWORD = {
            className: 'function',
            begin: '\\bPROCEDURE\\b'
        };

        const CLARION_RULES = [
            STRING_LITERAL,
            COMMENTS,
            NUMERIC_LITERALS,
            CONSTANTS,
            LABELS,
            CLASS_LABELS,
            BASE_TYPES,
            SPECIAL_TYPES,
            ATTRIBUTES,
            HARD_RESERVED_KEYWORDS,
            SOFT_RESERVED_KEYWORDS,
            LANG_FUNCTIONS,
            PROCEDURE_KEYWORD,
            OPERATORS,
            PUNCTUATION,
            PREPROCESSOR_DIRECTIVES,
            PICTURE_NUMERIC_FORMAT
        ];

        return {
            name: 'Clarion',
            aliases: ['clarion', 'Clarion', 'CLARION'],
            case_insensitive: true,
            contains: CLARION_RULES
        };
    }

    api.registerHighlightJSLanguage("clarion", clarion_language_definition);
});
