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
