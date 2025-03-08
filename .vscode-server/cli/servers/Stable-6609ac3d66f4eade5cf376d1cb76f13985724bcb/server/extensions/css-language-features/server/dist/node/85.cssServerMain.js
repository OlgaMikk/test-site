"use strict";exports.id=85,exports.ids=[85],exports.modules={3015:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.startServer=function(e,t){const n=new o.TextDocuments(i.TextDocument);n.listen(e);const g=(0,s.getLanguageModelCache)(10,60,(e=>x(e).parseStylesheet(e)));n.onDidClose((e=>{g.onDocumentRemoved(e.document)})),e.onShutdown((()=>{g.dispose()}));let p,y,D=!1,h=Number.MAX_VALUE,v=Number.MAX_VALUE,S=Promise.resolve();const w={},P=()=>Promise.reject("Not Ready");let R={getContent:P,stat:P,readDirectory:P};function x(t){let n=w[t.languageId];return n||(e.console.log("Document type is "+t.languageId+", using css instead."),n=w.css),n}e.onInitialize((s=>{const c=s.initializationOptions||{};function a(e,t){const n=e.split(".");let o=s.capabilities;for(let e=0;o&&e<n.length;e++){if(!o.hasOwnProperty(n[e]))return t;o=o[n[e]]}return o}p=s.workspaceFolders,Array.isArray(p)||(p=[],s.rootPath&&p.push({name:"",uri:r.URI.file(s.rootPath).toString(!0)})),R=(0,d.getRequestService)(c?.handledSchemas||["file"],e,t);const l=!!a("textDocument.completion.completionItem.snippetSupport",!1);D=!!a("workspace.configuration",!1),h=a("textDocument.foldingRange.rangeLimit",Number.MAX_VALUE),v=c?.customCapabilities?.rangeFormatting?.editLimit||Number.MAX_VALUE,w.css=(0,i.getCSSLanguageService)({fileSystemProvider:R,clientCapabilities:s.capabilities}),w.scss=(0,i.getSCSSLanguageService)({fileSystemProvider:R,clientCapabilities:s.capabilities}),w.less=(0,i.getLESSLanguageService)({fileSystemProvider:R,clientCapabilities:s.capabilities});const f=a("textDocument.diagnostic",void 0);return y=void 0===f?(0,u.registerDiagnosticsPushSupport)(n,e,t,F):(0,u.registerDiagnosticsPullSupport)(n,e,t,F),{capabilities:{textDocumentSync:o.TextDocumentSyncKind.Incremental,completionProvider:l?{resolveProvider:!1,triggerCharacters:["/","-",":"]}:void 0,hoverProvider:!0,documentSymbolProvider:!0,referencesProvider:!0,definitionProvider:!0,documentHighlightProvider:!0,documentLinkProvider:{resolveProvider:!1},codeActionProvider:!0,renameProvider:!0,colorProvider:{},foldingRangeProvider:!0,selectionRangeProvider:!0,diagnosticProvider:{documentSelector:null,interFileDependencies:!1,workspaceDiagnostics:!1},documentRangeFormattingProvider:!0===c?.provideFormatter,documentFormattingProvider:!0===c?.provideFormatter}}}));let b={};function C(t){if(D){let n=b[t.uri];if(!n){const r={items:[{scopeUri:t.uri,section:t.languageId}]};n=e.sendRequest(o.ConfigurationRequest.type,r).then((e=>e[0])),b[t.uri]=n}return n}return Promise.resolve(void 0)}async function F(e){const t=C(e),[n]=await Promise.all([t,S]),o=g.get(e);return x(e).doValidation(e,o,n)}async function E(e,t,r){const s=n.get(e.uri);if(s){const e=x(s).format(s,t??m(s),r);if(e.length>v){const t=i.TextDocument.applyEdits(s,e);return[o.TextEdit.replace(m(s),t)]}return e}return[]}n.onDidClose((e=>{delete b[e.document.uri]})),e.onDidChangeConfiguration((e=>{!function(e){for(const t in w)w[t].configure(e[t]);b={},y?.requestRefresh()}(e.settings)})),e.onCompletion(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){const[n]=await Promise.all([C(t),S]),o=g.get(t),r=(0,a.getDocumentContext)(t.uri,p);return x(t).doComplete2(t,e.position,o,r,n?.completion)}return null}),null,`Error while computing completions for ${e.textDocument.uri}`,o))),e.onHover(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){const[n]=await Promise.all([C(t),S]),o=g.get(t);return x(t).doHover(t,e.position,o,n?.hover)}return null}),null,`Error while computing hover for ${e.textDocument.uri}`,o))),e.onDocumentSymbol(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const e=g.get(t);return x(t).findDocumentSymbols2(t,e)}return[]}),[],`Error while computing document symbols for ${e.textDocument.uri}`,o))),e.onDefinition(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).findDefinition(t,e.position,n)}return null}),null,`Error while computing definitions for ${e.textDocument.uri}`,o))),e.onDocumentHighlight(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).findDocumentHighlights(t,e.position,n)}return[]}),[],`Error while computing document highlights for ${e.textDocument.uri}`,o))),e.onDocumentLinks((async(e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const e=(0,a.getDocumentContext)(t.uri,p),n=g.get(t);return x(t).findDocumentLinks2(t,n,e)}return[]}),[],`Error while computing document links for ${e.textDocument.uri}`,o))),e.onReferences(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).findReferences(t,e.position,n)}return[]}),[],`Error while computing references for ${e.textDocument.uri}`,o))),e.onCodeAction(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).doCodeActions(t,e.range,e.context,n)}return[]}),[],`Error while computing code actions for ${e.textDocument.uri}`,o))),e.onDocumentColor(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const e=g.get(t);return x(t).findDocumentColors(t,e)}return[]}),[],`Error while computing document colors for ${e.textDocument.uri}`,o))),e.onColorPresentation(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).getColorPresentations(t,n,e.color,e.range)}return[]}),[],`Error while computing color presentations for ${e.textDocument.uri}`,o))),e.onRenameRequest(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);if(t){await S;const n=g.get(t);return x(t).doRename(t,e.position,e.newName,n)}return null}),null,`Error while computing renames for ${e.textDocument.uri}`,o))),e.onFoldingRanges(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri);return t?(await S,x(t).getFoldingRanges(t,{rangeLimit:h})):null}),null,`Error while computing folding ranges for ${e.textDocument.uri}`,o))),e.onSelectionRanges(((e,o)=>(0,c.runSafeAsync)(t,(async()=>{const t=n.get(e.textDocument.uri),o=e.positions;if(t){await S;const e=g.get(t);return x(t).getSelectionRanges(t,o,e)}return[]}),[],`Error while computing selection ranges for ${e.textDocument.uri}`,o))),e.onDocumentRangeFormatting(((e,n)=>(0,c.runSafeAsync)(t,(()=>E(e.textDocument,e.range,e.options)),[],`Error while formatting range for ${e.textDocument.uri}`,n))),e.onDocumentFormatting(((e,n)=>(0,c.runSafeAsync)(t,(()=>E(e.textDocument,void 0,e.options)),[],`Error while formatting ${e.textDocument.uri}`,n))),e.onNotification(f.type,(function(e){S=(0,l.fetchDataProviders)(e,R).then((e=>{for(const t in w)w[t].setDataProviders(!0,e)}))})),e.listen()};const o=n(2861),r=n(7608),i=n(866),s=n(5908),c=n(211),u=n(9178),a=n(6529),l=n(7904),d=n(6149);var f;function m(e){return o.Range.create(i.Position.create(0,0),e.positionAt(e.getText().length))}!function(e){e.type=new o.NotificationType("css/customDataChanged")}(f||(f={}))},7904:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fetchDataProviders=function(e,t){const n=e.map((async e=>{try{return function(e){let t;try{t=JSON.parse(e)}catch(e){return(0,o.newCSSDataProvider)({version:1})}return(0,o.newCSSDataProvider)({version:t.version||1,properties:t.properties||[],atDirectives:t.atDirectives||[],pseudoClasses:t.pseudoClasses||[],pseudoElements:t.pseudoElements||[]})}(await t.getContent(e))}catch(e){return(0,o.newCSSDataProvider)({version:1})}}));return Promise.all(n)};const o=n(866)},5908:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getLanguageModelCache=function(e,t,n){let o,r={},i=0;return t>0&&(o=setInterval((()=>{const e=Date.now()-1e3*t,n=Object.keys(r);for(const t of n)r[t].cTime<e&&(delete r[t],i--)}),1e3*t)),{get(t){const o=t.version,s=t.languageId,c=r[t.uri];if(c&&c.version===o&&c.languageId===s)return c.cTime=Date.now(),c.languageModel;const u=n(t);if(r[t.uri]={languageModel:u,version:o,languageId:s,cTime:Date.now()},c||i++,i===e){let e=Number.MAX_VALUE,t=null;for(const n in r){const o=r[n];o.cTime<e&&(t=n,e=o.cTime)}t&&(delete r[t],i--)}return u},onDocumentRemoved(e){const t=e.uri;r[t]&&(delete r[t],i--)},dispose(){void 0!==o&&(clearInterval(o),o=void 0,r={},i=0)}}}},9085:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=n(1327),r=n(211),i=n(3015),s=n(613),c=(0,o.createConnection)();console.log=c.console.log.bind(c.console),console.error=c.console.error.bind(c.console),process.on("unhandledRejection",(e=>{c.console.error((0,r.formatError)("Unhandled exception",e))}));const u={timer:{setImmediate(e,...t){const n=setImmediate(e,...t);return{dispose:()=>clearImmediate(n)}},setTimeout(e,t,...n){const o=setTimeout(e,t,...n);return{dispose:()=>clearTimeout(o)}}},file:(0,s.getNodeFSRequestService)()};(0,i.startServer)(c,u)},613:function(e,t,n){var o,r=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||(o=function(e){return o=Object.getOwnPropertyNames||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[t.length]=n);return t},o(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n=o(e),s=0;s<n.length;s++)"default"!==n[s]&&r(t,e,n[s]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0}),t.getNodeFSRequestService=function(){function e(e){if(!e.startsWith("file://"))throw new Error("fileRequestService can only handle file URLs")}return{getContent:(t,n)=>(e(t),new Promise(((e,o)=>{const r=c.URI.parse(t);u.readFile(r.fsPath,n,((t,n)=>{if(t)return o(t);e(n.toString())}))}))),stat:t=>(e(t),new Promise(((e,n)=>{const o=c.URI.parse(t);u.stat(o.fsPath,((t,o)=>{if(t)return"ENOENT"===t.code?e({type:a.FileType.Unknown,ctime:-1,mtime:-1,size:-1}):n(t);let r=a.FileType.Unknown;o.isFile()?r=a.FileType.File:o.isDirectory()?r=a.FileType.Directory:o.isSymbolicLink()&&(r=a.FileType.SymbolicLink),e({type:r,ctime:o.ctime.getTime(),mtime:o.mtime.getTime(),size:o.size})}))}))),readDirectory:t=>(e(t),new Promise(((e,n)=>{const o=c.URI.parse(t).fsPath;u.readdir(o,{withFileTypes:!0},((t,o)=>{if(t)return n(t);e(o.map((e=>e.isSymbolicLink()?[e.name,a.FileType.SymbolicLink]:e.isDirectory()?[e.name,a.FileType.Directory]:e.isFile()?[e.name,a.FileType.File]:[e.name,a.FileType.Unknown])))}))})))}};const c=n(7608),u=s(n(9896)),a=n(866)},6149:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FileType=t.FsReadDirRequest=t.FsStatRequest=t.FsContentRequest=void 0,t.getRequestService=function(e,t,n){const o={};for(const t of e)"file"===t?o[t]=n.file:"http"!==t&&"https"!==t||(o[t]=n.http);return{async stat(e){const n=o[u(e)];return n?n.stat(e):await t.sendRequest(i.type,e.toString())},readDirectory(e){const n=o[u(e)];return n?n.readDirectory(e):t.sendRequest(s.type,e.toString())},getContent(e,n){const i=o[u(e)];return i?i.getContent(e,n):t.sendRequest(r.type,{uri:e.toString(),encoding:n})}}};const o=n(2861);var r,i,s,c;function u(e){return e.substr(0,e.indexOf(":"))}!function(e){e.type=new o.RequestType("fs/content")}(r||(t.FsContentRequest=r={})),function(e){e.type=new o.RequestType("fs/stat")}(i||(t.FsStatRequest=i={})),function(e){e.type=new o.RequestType("fs/readDir")}(s||(t.FsReadDirRequest=s={})),function(e){e[e.Unknown=0]="Unknown",e[e.File=1]="File",e[e.Directory=2]="Directory",e[e.SymbolicLink=64]="SymbolicLink"}(c||(t.FileType=c={}))},6529:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDocumentContext=function(e,t){return{resolveReference:(n,i=e)=>{if("/"===n[0]){const r=function(){for(const n of t){let t=n.uri;if((0,o.endsWith)(t,"/")||(t+="/"),(0,o.startsWith)(e,t))return t}}();if(r)return r+n.substring(1)}const s=r.URI.parse(i),c=s.path.endsWith("/")?s:r.Utils.dirname(s);return r.Utils.resolvePath(c,n).toString(!0)}}};const o=n(247),r=n(7608)},211:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formatError=r,t.runSafeAsync=function(e,t,n,o,s){return new Promise((c=>{e.timer.setImmediate((()=>{if(!s.isCancellationRequested)return t().then((e=>{s.isCancellationRequested?c(i()):c(e)}),(e=>{console.error(r(o,e)),c(n)}));c(i())}))}))};const o=n(2861);function r(e,t){if(t instanceof Error){const n=t;return`${e}: ${n.message}\n${n.stack}`}return"string"==typeof t?`${e}: ${t}`:t?`${e}: ${t.toString()}`:e}function i(){return new o.ResponseError(o.LSPErrorCodes.RequestCancelled,"Request cancelled")}},247:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.startsWith=function(e,t){if(e.length<t.length)return!1;for(let n=0;n<t.length;n++)if(e[n]!==t[n])return!1;return!0},t.endsWith=function(e,t){const n=e.length-t.length;return n>0?e.lastIndexOf(t)===n:0===n&&e===t}},9178:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerDiagnosticsPushSupport=function(e,t,n,o){const i={},s=[];function c(e){const t=i[e.uri];t&&(t.dispose(),delete i[e.uri])}function u(e){c(e);const s=i[e.uri]=n.timer.setTimeout((async()=>{if(s===i[e.uri])try{const n=await o(e);s===i[e.uri]&&t.sendDiagnostics({uri:e.uri,diagnostics:n}),delete i[e.uri]}catch(n){t.console.error((0,r.formatError)(`Error while validating ${e.uri}`,n))}}),500)}return e.onDidChangeContent((e=>{u(e.document)}),void 0,s),e.onDidClose((e=>{c(e.document),t.sendDiagnostics({uri:e.document.uri,diagnostics:[]})}),void 0,s),{requestRefresh:()=>{e.all().forEach(u)},dispose:()=>{s.forEach((e=>e.dispose())),s.length=0;const e=Object.keys(i);for(const t of e)i[t].dispose(),delete i[t]}}},t.registerDiagnosticsPullSupport=function(e,t,n,i){function s(e){return{kind:o.DocumentDiagnosticReportKind.Full,items:e}}const c=t.languages.diagnostics.on((async(t,o)=>(0,r.runSafeAsync)(n,(async()=>{const n=e.get(t.textDocument.uri);return s(n?await i(n):[])}),s([]),`Error while computing diagnostics for ${t.textDocument.uri}`,o)));return{requestRefresh:function(){t.languages.diagnostics.refresh()},dispose:()=>{c.dispose()}}};const o=n(2861),r=n(211)}};
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/6609ac3d66f4eade5cf376d1cb76f13985724bcb/extensions/css-language-features/server/dist/node/85.cssServerMain.js.map