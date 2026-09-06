import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.13", (api) => {
    function clarion_language_definition() {

        // A quote inside a string literal is escaped by doubling it: 'it''s'
        const ESCAPED_QUOTE = {
            begin: "''"
        };

        // Embedded code point inside a Unicode literal: U'<1F4A9h>'
        const UNICODE_CODEPOINT = {
            className: 'unicode-escape',
            begin: '<[0-9A-Fa-f]+[hH]?>'
        };

        const STRING_LITERAL = {
            className: 'string',
            variants: [
                {
                    // Unicode literal (C12 Unicode beta): U'Ω α β', u'Αθήνα', U'<1F4A9h>'
                    begin: "(?<![A-Za-z0-9_])[uU]'",
                    end: "'",
                    contains: [ESCAPED_QUOTE, UNICODE_CODEPOINT]
                },
                {
                    begin: "'",
                    end: "'",
                    contains: [ESCAPED_QUOTE]
                }
            ]
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
            begin: '\\b(?i:ANY|ASTRING|BFLOAT4|BFLOAT8|BLOB|BOOL|BSTRING|BYTE|CSTRING|DATE|DECIMAL|LIKE|LONG|MEMO|PDECIMAL|PSTRING|REAL|SHORT|SIGNED|SREAL|STRING|TIME|ULONG|UNSIGNED|USHORT)\\b'
        };

        const SPECIAL_TYPES = {
            className: 'type',
            begin: '\\b(?i:FILE|QUEUE|GROUP)\\b'
        };

        // --- Clarion 12 Unicode beta (USTRING) -----------------------------
        // Kept as separate blocks so they stay cheap to revise as beta builds
        // land. See https://clarionsharp.com/blog

        const UNICODE_TYPES = {
            className: 'type',
            begin: '\\b(?i:USTRING)\\b'
        };

        // UNICODE: the REPORT opt-in attribute (un-opted reports raise error
        // 546 on wide data). RTF: TEXT,...,RTF bound to a USTRING USE variable.
        const UNICODE_ATTRIBUTES = {
            className: 'attribute',
            begin: '\\b(?i:UNICODE|RTF)\\b'
        };

        // UCHR(code) is the one-argument form of CHR(code,1);
        // UVAL() is its inverse — the code point at a unit position.
        // TOANSI/TOUNICODE convert between encodings, with an optional codepage.
        // All four are declared in libsrc\win\builtins.clw on 12.0.14204:
        //   TOANSI(STRING expr, UNSIGNED cp=-1),STRING,NAME('Cla$StackTOANSI')
        //   TOUNICODE(STRING expr, UNSIGNED cp=-1),STRING,NAME('Cla$StackTOUNICODE')
        //   UVAL(STRING str, UNSIGNED pos=1),LONG,NAME('Cla$StackUVAL')
        const UNICODE_FUNCTIONS = {
            className: 'function',
            begin: '\\b(?i:UCHR|UVAL|TOANSI|TOUNICODE)\\b'
        };

        // --- End Unicode beta blocks ---------------------------------------

        const ATTRIBUTES = {
            className: 'attribute',
            begin: '\\b(?i:AT|AUTO|BINDABLE|BOXED|CENTER|COLOR|COLUMN|DEFAULT|DIM|DLL|DOUBLE|DRIVER|DROP|EXTERNAL|ICON|INNER|LENGTH|MASK|NAME|ORDER|OVER|PAGE|PRIVATE|PROTECTED|PUBLIC|REQ|SCROLL|STATIC|THREAD|TIP|USE|VALUE|VERTICAL|WIDTH)\\b'
        };

        // Runtime properties: PROP:Text, PROP:Use, PROP:Picture, PROP:ClipEntry,
        // PROPLIST:Picture, SYSTEM{PROP:Codepage}, SYSTEM{PROP:Locale}
        const PROPERTIES = {
            className: 'attribute',
            begin: '\\b(?i:PROPLIST|PROPPRINT|PROPSTYLE|PROP):[A-Za-z_][A-Za-z0-9_]*\\b'
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

        // Conditional compilation: #IF(%CWVersion >= 12026) ... #ENDIF
        const CONDITIONAL_DIRECTIVES = {
            className: 'meta',
            begin: '#(?i:IFDEF|IFNDEF|IF|ELSIF|ELSE|ENDIF|DEFINE|UNDEF|EQUATE|ERROR)\\b'
        };

        // OMIT('***', _USTRING_) / COMPILE('***', _USTRING_)
        const DIRECTIVE_STATEMENTS = {
            className: 'meta',
            begin: '\\b(?i:OMIT|COMPILE)\\b'
        };

        // Predefined compile flags — _USTRING_ gates the wide code paths and is
        // undefined on older compilers.
        const COMPILE_FLAGS = {
            className: 'meta',
            begin: '\\b_[A-Za-z][A-Za-z0-9]*_\\b'
        };

        // Template symbols, e.g. %CWVersion (12026 on the Unicode-era builds)
        const TEMPLATE_SYMBOLS = {
            className: 'meta',
            begin: '%[A-Za-z_][A-Za-z0-9_]*\\b'
        };

        const HARD_RESERVED_KEYWORDS = {
            className: 'keyword-hard',
            begin: '\\b(?i:ACCEPT|AND|BREAK|BY|CASE|CHOOSE|CYCLE|DO|ELSE|ELSIF|END|EXECUTE|EXIT|FUNCTION|GOTO|IF|LOOP|MEMBER|NEW|NOT|OF|OR|OROF|PARENT|PROCEDURE|PROGRAM|RETURN|ROUTINE|SELF|THEN|TIMES|TO|UNTIL|WHILE)\\b'
        };

        const SOFT_RESERVED_KEYWORDS = {
            className: 'keyword-soft',
            begin: '\\b(?i:APPLICATION|CLASS|CODE|DATA|DETAIL|ENUM|FILE|FOOTER|FORM|GROUP|HEADER|INLINE|ITEM|JOIN|MAP|MENU|MENUBAR|MODULE|OLECONTROL|OPTION|QUEUE|RECORD|REPORT|ROW|SHEET|TAB|TABLE|TOOLBAR|VIEW|WINDOW|PROPERTY|INDEXER)\\b'
        };

        // Words that are both an attribute and a function: only the call form
        // (followed by an opening parenthesis) is highlighted as a function.
        const AMBIGUOUS_FUNCTIONS = {
            className: 'function',
            begin: '\\b(?i:CENTER)(?=\\s*\\()'
        };

        const LANG_FUNCTIONS = {
            className: 'function',
            begin: '\\b(?i:ABS|ADD|ADDRESS|ALL|CHR|CLEAR|CLIPBOARD|CLOSE|COPY|DAY|DEFORMAT|DIRECTORY|DISPOSE|ERROR|EVALUATE|EXISTS|FILEDIALOG|FILEERROR|FILEERRORCODE|FORMAT|FREE|GET|GETINI|GETREG|INSTRING|INT|LEFT|LEN|LOCK|LOWER|MATCH|MESSAGE|MONTH|NUMERIC|OPEN|POPUP|POST|PUT|PUTINI|PUTREG|RANDOM|REMOVE|RENAME|RIGHT|SEND|SET|SETCLIPBOARD|SIZE|STRPOS|SUB|TODAY|UNLOCK|UPPER|YEAR)\\b'
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
            COMPILE_FLAGS,
            TEMPLATE_SYMBOLS,
            PROPERTIES,
            LABELS,
            CLASS_LABELS,
            UNICODE_TYPES,
            BASE_TYPES,
            SPECIAL_TYPES,
            AMBIGUOUS_FUNCTIONS,
            UNICODE_ATTRIBUTES,
            ATTRIBUTES,
            HARD_RESERVED_KEYWORDS,
            SOFT_RESERVED_KEYWORDS,
            UNICODE_FUNCTIONS,
            LANG_FUNCTIONS,
            PROCEDURE_KEYWORD,
            CONDITIONAL_DIRECTIVES,
            DIRECTIVE_STATEMENTS,
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

    api.decorateCookedElement(
        (element) => {
            element.querySelectorAll("code").forEach((codeEl) => {
                if (![...codeEl.classList].some(c => /^lang-grid\d*$/.test(c))) {
                    return;
                }

                const preEl = codeEl.parentElement;
                if (!preEl || preEl.tagName !== "PRE") return;

                const lines = codeEl.textContent
                    .trim()
                    .split("\n")
                    .filter(l => l.trim());
                if (lines.length === 0) return;

                const rows = lines.map(line =>
                    line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim())
                );

                const colCount = rows[0].length;
                const table = document.createElement("table");
                table.className = "clarion-grid";

                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");
                rows[0].forEach(cell => {
                    const th = document.createElement("th");
                    th.textContent = cell;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                if (rows.length > 1) {
                    const tbody = document.createElement("tbody");
                    rows.slice(1).forEach(rowData => {
                        const tr = document.createElement("tr");
                        const cells = rowData.slice(0, colCount);
                        while (cells.length < colCount) cells.push("");
                        cells.forEach(cell => {
                            const td = document.createElement("td");
                            td.textContent = cell;
                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);
                }

                const wrapper = document.createElement("div");
                wrapper.className = "clarion-grid-wrapper";
                wrapper.appendChild(table);
                preEl.replaceWith(wrapper);
            });
        },
        { id: "clarion-grid-decorator" }
    );
});
