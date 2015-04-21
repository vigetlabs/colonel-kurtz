module.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{"default":t}};e.__esModule=!0;var o=n(4),a=r(o),u=n(5),i=r(u),s=n(6),l=r(s),c=n(1),f=r(c),d=f["default"].createClass({displayName:"YouTube",getDefaultProps:function(){return{baseUrl:"https://www.youtube.com/embed/",content:{video_id:""}}},getSrc:function(t){var e=this.props.baseUrl;return t?e+t:null},render:function(){var t=this.props.content.video_id;return f["default"].createElement("div",{className:"col-youtube"},f["default"].createElement(a["default"],{label:"YouTube Video ID",value:t,name:"youtube_video_id",onChange:this._onChange,autofocus:!0}),f["default"].createElement(i["default"],{open:t},f["default"].createElement(l["default"],{element:"iframe",src:this.getSrc(t)})))},_onChange:function(t){this.props.onChange({video_id:t.currentTarget.value})}});e["default"]=d,t.exports=e["default"]},function(t,e,n){t.exports=require("react")},function(t,e,n){t.exports=require("classnames")},,function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{"default":t}},o=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.__esModule=!0;var u=n(1),i=r(u);n(8),e["default"]=i["default"].createClass({displayName:"field",getDefaultProps:function(){return{type:"text"}},render:function(){var t=this.props,e=t.label,n=t.name,r=t.type,u=o(t,["label","name","type"]);return i["default"].createElement("div",{className:"col-field"},i["default"].createElement("label",{className:"col-field-label",htmlFor:n||this.props.id},e),i["default"].createElement("input",a({className:"col-field-input",type:r},u,{name:n||this.props.id})))}}),t.exports=e["default"]},function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{"default":t}},o=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.__esModule=!0;var u=n(1),i=r(u),s=n(2),l=r(s),c=i["default"].createClass({displayName:"Frame",getDefaultProps:function(){return{element:"figure"}},render:function(){var t=this.props,e=t.element,n=t.children,r=t.open,u=o(t,["element","children","open"]),s=l["default"]("col-frame",{"col-frame-open":r});return i["default"].createElement(e,a({className:s},u),n)}});e["default"]=c,t.exports=e["default"]},function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{"default":t}},o=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n};e.__esModule=!0;var a=n(1),u=r(a),i=n(2),s=(r(i),u["default"].createClass({displayName:"Graphic",getDefaultProps:function(){return{className:"col-graphic",element:"img",src:null}},render:function(){var t=this.props,e=t.element,n=o(t,["element"]);return u["default"].createElement(e,n)}}));e["default"]=s,t.exports=e["default"]},,function(t,e,n){}]);
//# sourceMappingURL=youtube.js.map