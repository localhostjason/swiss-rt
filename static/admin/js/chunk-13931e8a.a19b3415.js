(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13931e8a"],{"2ce6":function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},"3b80":function(t,e,o){var i=o("2d2c"),n=o("2b11"),r=o("201d"),a=o("2ce6"),l="["+a+"]",s="​",c=RegExp("^"+l+l+"*"),u=RegExp(l+l+"*$"),f=function(t,e,o){var n={},l=r(function(){return!!a[t]()||s[t]()!=s}),c=n[t]=l?e(d):a[t];o&&(n[o]=c),i(i.P+i.F*l,"String",n)},d=f.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},"420d":function(t,e,o){"use strict";o.d(e,"c",function(){return n}),o.d(e,"d",function(){return r}),o.d(e,"a",function(){return a}),o.d(e,"b",function(){return l});var i=o("b775");function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return Object(i["a"])({url:"/room?where=".concat(JSON.stringify(t),"&embedded=").concat(JSON.stringify(e),"&sort=").concat(o),method:"get"})}function r(t,e){return Object(i["a"])({url:"/room/".concat(t),method:"patch",data:e})}function a(t){return Object(i["a"])({url:"/room",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/room/".concat(t),method:"delete"})}},"5f33":function(t,e,o){var i=o("4839"),n=o("d62f"),r=o("694f").f,a=o("62af").f,l=o("d635"),s=o("7fe48"),c=i.RegExp,u=c,f=c.prototype,d=/a/g,m=/a/g,p=new c(d)!==d;if(o("3a0f")&&(!p||o("201d")(function(){return m[o("f3ae")("match")]=!1,c(d)!=d||c(m)==m||"/a/i"!=c(d,"i")}))){c=function(t,e){var o=this instanceof c,i=l(t),r=void 0===e;return!o&&i&&t.constructor===c&&r?t:n(p?new u(i&&!r?t.source:t,e):u((i=t instanceof c)?t.source:t,i&&r?s.call(t):e),o?this:f,c)};for(var g=function(t){t in c||r(c,t,{configurable:!0,get:function(){return u[t]},set:function(e){u[t]=e}})},h=a(u),b=0;h.length>b;)g(h[b++]);f.constructor=c,c.prototype=f,o("7f00")(i,"RegExp",c)}o("4fd1")("RegExp")},6724:function(t,e,o){"use strict";o("8d41");var i={bind:function(t,e){t.addEventListener("click",function(o){var i=Object.assign({},e.value),n=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=n.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var a=r.getBoundingClientRect(),l=r.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(a.width,a.height)+"px",r.appendChild(l)),n.type){case"center":l.style.top=a.height/2-l.offsetHeight/2+"px",l.style.left=a.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(o.pageY-a.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(o.pageX-a.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=n.color,l.className="waves-ripple z-active",!1}},!1)}},n=function(t){t.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(n)),i.install=n;e["a"]=i},"8d41":function(t,e,o){},a1f7:function(t,e,o){var i=o("d753"),n=o("54a3"),r=o("48ed").f;t.exports=function(t){return function(e){var o,a=n(e),l=i(a),s=l.length,c=0,u=[];while(s>c)r.call(a,o=l[c++])&&u.push(t?[o,a[o]]:a[o]);return u}}},b06f:function(t,e,o){"use strict";var i=o("4839"),n=o("3301"),r=o("9b6d"),a=o("d62f"),l=o("1f51"),s=o("201d"),c=o("62af").f,u=o("78de").f,f=o("694f").f,d=o("3b80").trim,m="Number",p=i[m],g=p,h=p.prototype,b=r(o("04ac")(h))==m,v="trim"in String.prototype,_=function(t){var e=l(t,!1);if("string"==typeof e&&e.length>2){e=v?e.trim():d(e,3);var o,i,n,r=e.charCodeAt(0);if(43===r||45===r){if(o=e.charCodeAt(2),88===o||120===o)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+e}for(var a,s=e.slice(2),c=0,u=s.length;c<u;c++)if(a=s.charCodeAt(c),a<48||a>n)return NaN;return parseInt(s,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,o=this;return o instanceof p&&(b?s(function(){h.valueOf.call(o)}):r(o)!=m)?a(new g(_(e)),o,p):_(e)};for(var y,w=o("3a0f")?c(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;w.length>x;x++)n(g,y=w[x])&&!n(p,y)&&f(p,y,u(g,y));p.prototype=h,h.constructor=p,o("7f00")(i,m,p)}},bd70:function(t,e,o){var i=o("2d2c"),n=o("a1f7")(!0);i(i.S,"Object",{entries:function(t){return n(t)}})},cbf5:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{title:"上传图片",visible:t.dialog.visible,width:"60%","close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.dialog,"visible",e)}}},[o("el-row",{staticStyle:{"margin-bottom":"20px","margin-top":"-8px"}},[o("div",{staticClass:"div_title"},[o("span",[t._v("图片信息")])])]),t._v(" "),o("el-row",[o("el-col",{attrs:{span:15,offset:3}},[o("el-upload",{ref:"upload",attrs:{action:t.actionUrl,headers:t.headers,multiple:t.multiple,"file-list":t.fileList,"list-type":"picture-card","auto-upload":!1,"on-success":t.handleSuccess,"on-error":t.handleError,"on-change":t.handleChange,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[o("i",{staticClass:"el-icon-plus"})]),t._v(" "),o("el-dialog",{attrs:{visible:t.dialogVisible,title:"详情","append-to-body":""},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialog.visible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",disabled:t.disabled},on:{click:t.uploadFile}},[t._v("上 传")])],1)],1)},n=[],r=o("5f87"),a={name:"UploadFile",props:["name","type"],data:function(){return{dialog:{visible:!1},multiple:!0,fileList:[],file_id:"",language:this.$store.getters.language,disabled:!0,headers:{Authorization:"Bearer ".concat(Object(r["a"])())},dialogImageUrl:"",dialogVisible:!1}},computed:{actionUrl:function(){var t="/api";return"room"===this.type?"".concat(t,"/import/room/img?id=").concat(this.file_id,"&file_type=room"):"food"===this.type?"".concat(t,"/import/food/img?id=").concat(this.file_id,"&file_type=food"):"news"===this.type?"".concat(t,"/import/news/img?id=").concat(this.file_id,"&file_type=news"):"story"===this.type?"".concat(t,"/import/story/img?id=").concat(this.file_id,"&file_type=story"):"".concat(t,"/import/img?id=").concat(this.file_id,"&language=").concat(this.language)}},methods:{showUploadFileDialog:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],o=arguments.length>1?arguments[1]:void 0;this.dialog.visible=!0,this.fileList=e.map(function(e){return t.$set(e,"url","/"+e.img_url),e}),console.log(this.fileList),this.file_id=o,this.multiple=!o},uploadFile:function(){this.$refs.upload.submit()},handleRemove:function(t,e){this.fileList=e,this.disabled=!e.length},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleChange:function(t,e){this.fileList=this.multiple?e:e.slice(-1),this.disabled=!e.length},handleSuccess:function(t,e,o){this.fileList=o,this.disabled=!o.length,this.dialog.visible=!1,this.$message.success("上传成功"),this.$emit("reload")},handleError:function(t,e,o){this.$message.error(JSON.stringify(t))}}},l=a,s=o("17cc"),c=Object(s["a"])(l,i,n,!1,null,"6c7c2982",null);e["a"]=c.exports},ce76:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("panel-title",{attrs:{title:"房间管理"}}),t._v(" "),o("filter-table",{on:{getRoomList:t.getRoomList,filterRoom:t.filterRoom}}),t._v(" "),o("room-table",{attrs:{data:t.rooms,"list-loading":t.listLoading},on:{getRoomList:t.getRoomList}})],1)},n=[],r=o("3556"),a=(o("4453"),o("a7ca")),l=o("4bde"),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-input",{staticStyle:{width:"166px"},attrs:{placeholder:"名称",clearable:""},model:{value:t.filter.name,callback:function(e){t.$set(t.filter,"name",e)},expression:"filter.name"}}),t._v(" "),o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查 询")])],1)],1),t._v(" "),o("el-row",[o("el-col",[o("el-button",{attrs:{icon:"el-icon-plus",type:"primary"},on:{click:t.createRoomInfo}},[t._v("创 建")])],1)],1),t._v(" "),o("room-dialog",{ref:"roomDialog",on:{getRoomList:t.toGetRoomList}})],1)},c=[],u=o("0c4b"),f=(o("612f"),o("bd70"),o("6724")),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{title:t.dialog.title,visible:t.dialog.visible,width:"40%","close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.dialog,"visible",e)}}},[o("el-row",{staticStyle:{"margin-bottom":"20px","margin-top":"-8px"}},[o("div",{staticClass:"pull-left"},[o("div",{staticClass:"div_title"},[o("span",[t._v("房间信息")])])])]),t._v(" "),o("el-row",[o("el-col",{attrs:{span:18}},[o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"名称:",prop:"name"}},[o("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"起订人数:",prop:"limit_number"}},[o("el-input",{model:{value:t.form.limit_number,callback:function(e){t.$set(t.form,"limit_number",e)},expression:"form.limit_number"}})],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialog.visible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.updateRoomInfo}},[t._v("确 定")])],1)],1)},m=[],p=(o("b06f"),o("4013"),o("3a23"),o("420d")),g=o("c1f9"),h=o.n(g),b={name:"RoomDialog",data:function(){return{dialog:{title:"",visible:!1},form:{limit_number:null,name:null},room_id:null,rules:{limit_number:[{required:!0,message:"请输入起订人数",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{showRoomDialog:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.dialog.visible=!0,this.dialog.title=e?"更新房间【".concat(e.name,"】"):"创建房间",this.$nextTick(function(){t.room_id=e?e.id:null,t.form=h.a.pick(e,Object.keys(t.form))})},updateRoomInfo:function(){var t=this;this.$refs["form"].validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(o){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(o){e.next=2;break}return e.abrupt("return",!1);case 2:if(i=Object(r["a"])({},t.form),i.limit_number&&(i.limit_number=Number(i.limit_number)),i["language"]=t.$store.getters.language,t.room_id){e.next=10;break}return e.next=8,Object(p["a"])(i);case 8:e.next=12;break;case 10:return e.next=12,Object(p["d"])(t.room_id,i);case 12:t.$message.success("更新成功"),t.dialog.visible=!1,t.$emit("getRoomList");case 15:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}}},v=b,_=o("17cc"),y=Object(_["a"])(v,d,m,!1,null,"481c38b4",null),w=y.exports,x={name:"FilterTable",directives:{waves:f["a"]},components:{RoomDialog:w},data:function(){return{filter:{name:null}}},methods:{handleFilter:function(){for(var t={},e=0,o=Object.entries(this.filter);e<o.length;e++){var i=Object(u["a"])(o[e],2),n=i[0],r=i[1];r&&(t[n]='like("%25'.concat(r,'%25")'))}this.$emit("filterRoom",t)},createRoomInfo:function(){this.$refs.roomDialog.showRoomDialog()},toGetRoomList:function(){this.$emit("getRoomList")}}},R=x,k=Object(_["a"])(R,s,c,!1,null,"681aa610",null),S=k.exports,$=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",attrs:{data:t.data,border:"",fit:""},on:{"selection-change":t.handleSelectionChange}},[o("el-table-column",{attrs:{type:"selection",width:"50",align:"center",fixed:"left"}}),t._v(" "),o("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"80"}}),t._v(" "),o("el-table-column",{attrs:{prop:"name",label:"名称",sortable:"",width:"130"}}),t._v(" "),o("el-table-column",{attrs:{prop:"limit_number",label:"起订人数",width:"100"}}),t._v(" "),o("el-table-column",{attrs:{prop:"img_url",label:"图片",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.img_url?o("img",{attrs:{src:t.pre_url+e.row.img_url,width:"35px",height:"25px"}}):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"img_url",label:"图片地址",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.img_url))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",align:"right",width:""},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text"},on:{click:function(o){return t.uploadDash([e.row],e.row.id)}}},[t._v("上次图片")]),t._v(" "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.editRoomDialog(e.row)}}},[t._v("编 辑")]),t._v(" "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.deleteRooms(e.row)}}},[t._v("删 除")])]}}])})],1),t._v(" "),o("table-foot",{ref:"tableFoot",attrs:{"data-length":t.data.length},on:{setSelection:t.setSelection,clearSelection:function(e){return t.$refs.table.clearSelection()},toggleAllSelection:function(e){return t.$refs.table.toggleAllSelection()}}},[o("template",{slot:"foot"},[o("span",[o("el-button",{attrs:{type:"danger",plain:"",disabled:!t.selectedRooms.length},on:{click:function(e){return t.deleteRooms(t.selectedRooms)}}},[t._v("删 除")])],1)])],2)],1),t._v(" "),o("room-dialog",{ref:"roomDialog",on:{getRoomList:t.toGetRoomList}})],1),t._v(" "),o("upload-file",{ref:"uploadFile",attrs:{type:"room"},on:{reload:t.toGetRoomList}})],1)},L=[],O=(o("0bb1"),o("40f8"),o("0769")),j=o("ed08"),E=o("cbf5"),N={name:"RoomTable",components:{RoomDialog:w,TableFoot:O["a"],UploadFile:E["a"]},props:{data:{type:Array,required:!0},listLoading:{type:Boolean,default:!0}},watch:{listLoading:function(t){this.loading=t}},data:function(){return{loading:this.listLoading,selectedRooms:[],pre_url:"/"}},methods:{handleSelectionChange:function(t){this.$refs.tableFoot.selectionChange(t)},setSelection:function(t){this.selectedRooms=Object(j["c"])(t,"id")},deleteRooms:function(t){var e=this;this.$confirm("此操作将永久删除房间, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark(function o(){var i,n,r,a,l,s,c;return regeneratorRuntime.wrap(function(o){while(1)switch(o.prev=o.next){case 0:i=h.a.isArray(t)?t:[t.id],e.loading=!0,n=!0,r=!1,a=void 0,o.prev=5,l=i[Symbol.iterator]();case 7:if(n=(s=l.next()).done){o.next=14;break}return c=s.value,o.next=11,Object(p["b"])(c);case 11:n=!0,o.next=7;break;case 14:o.next=20;break;case 16:o.prev=16,o.t0=o["catch"](5),r=!0,a=o.t0;case 20:o.prev=20,o.prev=21,n||null==l.return||l.return();case 23:if(o.prev=23,!r){o.next=26;break}throw a;case 26:return o.finish(23);case 27:return o.finish(20);case 28:e.loading=!1,e.$message.success("删除成功"),e.$emit("getRoomList");case 31:case"end":return o.stop()}},o,null,[[5,16,20,28],[21,,23,27]])}))).catch(function(){})},editRoomDialog:function(t){this.$refs.roomDialog.showRoomDialog(t)},toGetRoomList:function(){this.$emit("getRoomList")},uploadDash:function(t,e){this.$refs.uploadFile.showUploadFileDialog(t.filter(function(t){return t.img_url}),e)}}},I=N,C=Object(_["a"])(I,$,L,!1,null,"af453fa6",null),F=C.exports,T={name:"index",components:{PanelTitle:l["a"],FilterTable:S,RoomTable:F},data:function(){return{rooms:[],filter:{},listLoading:!0}},created:function(){this.getRoomList()},methods:{getRoomList:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,o,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e="-id",o=Object(r["a"])({},this.filter),o["language"]=this.$store.getters.language,t.next=5,Object(p["c"])(o,{},e);case 5:i=t.sent,this.rooms=i._items,this.listLoading=!1;case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),filterRoom:function(t){this.filter=Object(r["a"])({},t),this.getRoomList()}}},D=T,A=Object(_["a"])(D,i,n,!1,null,"78bbdfec",null);e["default"]=A.exports},d62f:function(t,e,o){var i=o("b429"),n=o("d772").set;t.exports=function(t,e,o){var r,a=e.constructor;return a!==o&&"function"==typeof a&&(r=a.prototype)!==o.prototype&&i(r)&&n&&n(t,r),t}},d772:function(t,e,o){var i=o("b429"),n=o("4d65"),r=function(t,e){if(n(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=o("0709")(Function.call,o("78de").f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(n){e=!0}return function(t,o){return r(t,o),e?t.__proto__=o:i(t,o),t}}({},!1):void 0),check:r}},ed08:function(t,e,o){"use strict";o("4013");function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function n(t){return n="function"===typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)},n(t)}o("0c4b"),o("bd70"),o("5f33"),o("f91a"),o("0bb1"),o("40f8"),o("612f"),o("3556"),o("c1f9");function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id",o=[];if(t&&t.length){var i=!0,n=!1,r=void 0;try{for(var a,l=t[Symbol.iterator]();!(i=(a=l.next()).done);i=!0){var s=a.value;o.push(s[e])}}catch(c){n=!0,r=c}finally{try{i||null==l.return||l.return()}finally{if(n)throw r}}}return o}o.d(e,"c",function(){return r}),o.d(e,"b",function(){return a}),o.d(e,"a",function(){return l}),o.d(e,"d",function(){return s});function a(t){var e=[];if(!e.length)return"";for(var o={},i=0,n=e;i<n.length;i++){var r=n[i];o[r.value]=r.label}return o[t]||""}function l(t){if(!t&&"object"!==n(t))throw new Error("error arguments","deepClone");var e=t.constructor===Array?[]:{};return Object.keys(t).forEach(function(o){t[o]&&"object"===n(t[o])?e[o]=l(t[o]):e[o]=t[o]}),e}var s={disabledDate:function(t){return t.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}},{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]}}}]);