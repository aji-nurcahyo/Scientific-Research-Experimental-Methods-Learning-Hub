var Je=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qe(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var W={exports:{}},a={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q;function Ie(){if(Q)return a;Q=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),x=Symbol.for("react.consumer"),z=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),A=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),j=Symbol.for("react.view_transition"),E=Symbol.iterator;function h(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,T={};function k(e,t,o){this.props=e,this.context=t,this.refs=T,this.updater=o||v}k.prototype.isReactComponent={},k.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},k.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function P(){}P.prototype=k.prototype;function D(e,t,o){this.props=e,this.context=t,this.refs=T,this.updater=o||v}var H=D.prototype=new P;H.constructor=D,w(H,k.prototype),H.isPureReactComponent=!0;var L=Array.isArray;function N(){}var l={H:null,A:null,T:null,S:null},V=Object.prototype.hasOwnProperty;function q(e,t,o){var r=o.ref;return{$$typeof:s,type:e,key:t,ref:r!==void 0?r:null,props:o}}function De(e,t){return q(e.type,t,e.props)}function I(e){return typeof e=="object"&&e!==null&&e.$$typeof===s}function He(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var G=/\/+/g;function Y(e,t){return typeof e=="object"&&e!==null&&e.key!=null?He(""+e.key):t.toString(36)}function Ne(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(N,N):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function $(e,t,o,r,c){var d=typeof e;(d==="undefined"||d==="boolean")&&(e=null);var f=!1;if(e===null)f=!0;else switch(d){case"bigint":case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case s:case n:f=!0;break;case b:return f=e._init,$(f(e._payload),t,o,r,c)}}if(f)return c=c(e),f=r===""?"."+Y(e,0):r,L(c)?(o="",f!=null&&(o=f.replace(G,"$&/")+"/"),$(c,t,o,"",function(Oe){return Oe})):c!=null&&(I(c)&&(c=De(c,o+(c.key==null||e&&e.key===c.key?"":(""+c.key).replace(G,"$&/")+"/")+f)),t.push(c)),1;f=0;var m=r===""?".":r+":";if(L(e))for(var p=0;p<e.length;p++)r=e[p],d=m+Y(r,p),f+=$(r,t,o,d,c);else if(p=h(e),typeof p=="function")for(e=p.call(e),p=0;!(r=e.next()).done;)r=r.value,d=m+Y(r,p++),f+=$(r,t,o,d,c);else if(d==="object"){if(typeof e.then=="function")return $(Ne(e),t,o,r,c);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return f}function O(e,t,o){if(e==null)return e;var r=[],c=0;return $(e,r,"","",function(d){return t.call(o,d,c++)}),r}function Pe(e){if(e._status===-1){var t=e._result,o=t();o.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r,o.status===void 0&&(o.status="fulfilled",o.value=r))},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r,o.status===void 0&&(o.status="rejected",o.reason=r))}),e._status===-1&&(e._status=0,e._result=o)}if(e._status===1)return e._result.default;throw e._result}var K=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function X(e){var t=l.T,o={};o.types=t!==null?t.types:null,l.T=o;try{var r=e(),c=l.S;c!==null&&c(o,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(N,K)}catch(d){K(d)}finally{t!==null&&o.types!==null&&(t.types=o.types),l.T=t}}function Z(e){var t=l.T;if(t!==null){var o=t.types;o===null?t.types=[e]:o.indexOf(e)===-1&&o.push(e)}else X(Z.bind(null,e))}var Le={map:O,forEach:function(e,t,o){O(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(t){return t})||[]},only:function(e){if(!I(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};return a.Activity=S,a.Children=Le,a.Component=k,a.Fragment=y,a.Profiler=g,a.PureComponent=D,a.StrictMode=u,a.Suspense=_,a.ViewTransition=j,a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,a.__COMPILER_RUNTIME={__proto__:null,c:function(e){return l.H.useMemoCache(e)}},a.addTransitionType=Z,a.cache=function(e){return function(){return e.apply(null,arguments)}},a.cacheSignal=function(){return null},a.cloneElement=function(e,t,o){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=w({},e.props),c=e.key;if(t!=null)for(d in t.key!==void 0&&(c=""+t.key),t)!V.call(t,d)||d==="key"||d==="__self"||d==="__source"||d==="ref"&&t.ref===void 0||(r[d]=t[d]);var d=arguments.length-2;if(d===1)r.children=o;else if(1<d){for(var f=Array(d),m=0;m<d;m++)f[m]=arguments[m+2];r.children=f}return q(e.type,c,r)},a.createContext=function(e){return e={$$typeof:z,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:x,_context:e},e},a.createElement=function(e,t,o){var r,c={},d=null;if(t!=null)for(r in t.key!==void 0&&(d=""+t.key),t)V.call(t,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(c[r]=t[r]);var f=arguments.length-2;if(f===1)c.children=o;else if(1<f){for(var m=Array(f),p=0;p<f;p++)m[p]=arguments[p+2];c.children=m}if(e&&e.defaultProps)for(r in f=e.defaultProps,f)c[r]===void 0&&(c[r]=f[r]);return q(e,d,c)},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:M,render:e}},a.isValidElement=I,a.lazy=function(e){return{$$typeof:b,_payload:{_status:-1,_result:e},_init:Pe}},a.memo=function(e,t){return{$$typeof:A,type:e,compare:t===void 0?null:t}},a.startTransition=X,a.unstable_useCacheRefresh=function(){return l.H.useCacheRefresh()},a.use=function(e){return l.H.use(e)},a.useActionState=function(e,t,o){return l.H.useActionState(e,t,o)},a.useCallback=function(e,t){return l.H.useCallback(e,t)},a.useContext=function(e){return l.H.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e,t){return l.H.useDeferredValue(e,t)},a.useEffect=function(e,t){return l.H.useEffect(e,t)},a.useEffectEvent=function(e){return l.H.useEffectEvent(e)},a.useId=function(){return l.H.useId()},a.useImperativeHandle=function(e,t,o){return l.H.useImperativeHandle(e,t,o)},a.useInsertionEffect=function(e,t){return l.H.useInsertionEffect(e,t)},a.useLayoutEffect=function(e,t){return l.H.useLayoutEffect(e,t)},a.useMemo=function(e,t){return l.H.useMemo(e,t)},a.useOptimistic=function(e,t){return l.H.useOptimistic(e,t)},a.useReducer=function(e,t,o){return l.H.useReducer(e,t,o)},a.useRef=function(e){return l.H.useRef(e)},a.useState=function(e){return l.H.useState(e)},a.useSyncExternalStore=function(e,t,o){return l.H.useSyncExternalStore(e,t,o)},a.useTransition=function(){return l.H.useTransition()},a.version="19.3.1",a}var F;function Ye(){return F||(F=1,W.exports=Ie()),W.exports}var C=Ye();const et=qe(C);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=s=>(s.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase();/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Be(s,n,y=[]){if(n==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:We(s),size:24,node:n,...y.length>0?{aliases:y}:{}}}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=s=>{let n="",y=!1;for(const u of s){if(u==="-"||u==="_"||u<=" "){y=n.length>0;continue}n.length===0?n+=u.toLowerCase():n+=y?u.toUpperCase():u,y=!1}return n};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=s=>{const n=Ue(s);return n.charAt(0).toUpperCase()+n.slice(1)};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=(...s)=>{const n=new Set;for(const y of s)if(typeof y=="string")for(const u of y.split(/\s+/))u&&n.add(u);return[...n].join(" ")};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function B(s){return s!=null}function Ge(s,n={}){var j,E;const y=n.attributeNames??{},u=h=>y[h]??h,g=s.size??s.width??R.width,x=s.size??s.height??R.height,z=((j=s.aliases)==null?void 0:j.filter(h=>typeof h=="string"&&h.trim()!=="").map(h=>`lucide-${h}`))??[],M=[...s.name?[`lucide-${s.name}`]:[],...z],_=((E=n.className)==null?void 0:E.split(" ").filter(Boolean))??[],A=n.includeDefaultClasses===!1?U(..._):U("lucide",...M,..._),b=n.absoluteStrokeWidth?Number(n.strokeWidth??R["stroke-width"])*Number(s.size??s.width??R.width)/Number(n.size??n.width??R.width):n.strokeWidth??R["stroke-width"];return["svg",{...Object.entries(R).reduce((h,[v,w])=>(h[u(v)]=w,h),{}),..."color"in n&&n.color&&{[u("stroke")]:n.color},..."size"in n&&B(n.size)&&{[u("width")]:n.size,[u("height")]:n.size},..."width"in n&&B(n.width)&&{[u("width")]:n.width},..."height"in n&&B(n.height)&&{[u("height")]:n.height},[u("stroke-width")]:b,...A&&{[u("class")]:A},[u("viewBox")]:`0 0 ${g} ${x}`,...n.hasA11yProp===!1?{[u("aria-hidden")]:"true"}:{},..."attributes"in n&&n.attributes},s.node.map(h=>{const[v,w,T]=h,k=n.nonScalingStroke?{[u("vector-effect")]:"non-scaling-stroke",...w}:w;return T?[v,k,T]:[v,k]})]}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Ke(s,n={}){return Ge(s,{...n,attributeNames:{...n.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=s=>{if(s==null||typeof s!="object")return!1;for(const n in s)if(Object.prototype.hasOwnProperty.call(s,n)&&(n.startsWith("aria-")||n==="role"||n==="title")&&s[n]!=null)return!0;return!1},Ze=C.createContext({}),Qe=()=>C.useContext(Ze),Fe=C.forwardRef(({color:s,size:n,width:y,height:u,strokeWidth:g,absoluteStrokeWidth:x,nonScalingStroke:z,className:M="",children:_,iconNode:A=[],icon:b={node:A,aliases:[],size:24},...S},j)=>{const{size:E=24,strokeWidth:h=2,absoluteStrokeWidth:v=!1,nonScalingStroke:w=!1,color:T="currentColor",className:k=""}=Qe()??{},P=!!_||Xe(S),[D,H,L=[]]=Ke(b,{color:s??T,width:y??n??E,height:u??n??E,strokeWidth:g??h,absoluteStrokeWidth:x??v,nonScalingStroke:z??w,className:U(k,M),hasA11yProp:P,attributes:S});return C.createElement(D,{ref:j,...H},[...L.map(([N,l])=>C.createElement(N,l)),...Array.isArray(_)?_:[_]])});/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function i(s,n=[],y=[]){const u=typeof s=="string"?Be(s,n,y):s,g=C.forwardRef(({className:x,...z},M)=>C.createElement(Fe,{ref:M,icon:u,className:x,...z}));return u.name&&(g.displayName=Ve(u.name)),g}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};J.node;const tt=i(J);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};ee.node;const nt=i(ee);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={name:"book-bookmark",size:24,node:[["path",{d:"M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2",key:"x9x4jl"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20",key:"1889un"}]],aliases:["book-marked"]};te.node;const ot=i(te);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};ne.node;const rt=i(ne);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"calculator",size:24,node:[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]};oe.node;const st=i(oe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};re.node;const at=i(re);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};se.node;const it=i(se);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};ae.node;const ct=i(ae);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};ie.node;const ut=i(ie);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"circle-check-big",size:24,node:[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],aliases:["check-circle"]};ce.node;const lt=i(ce);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};ue.node;const dt=i(ue);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5",key:"1awbb0"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};le.node;const ft=i(le);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};de.node;const yt=i(de);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"code-xml",size:24,node:[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],aliases:["code-2"]};fe.node;const ht=i(fe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye={name:"code",size:24,node:[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]]};ye.node;const pt=i(ye);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};he.node;const kt=i(he);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};pe.node;const mt=i(pe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};ke.node;const _t=i(ke);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me={name:"file-code",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]]};me.node;const vt=i(me);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};_e.node;const wt=i(_e);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};ve.node;const gt=i(ve);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};we.node;const Et=i(we);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge={name:"minimize-2",size:24,node:[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]]};ge.node;const Ct=i(ge);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};Ee.node;const xt=i(Ee);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Ce.node;const zt=i(Ce);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe={name:"presentation",size:24,node:[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]]};xe.node;const Mt=i(xe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};ze.node;const Tt=i(ze);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};Me.node;const Rt=i(Me);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Te.node;const At=i(Te);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};Re.node;const bt=i(Re);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae={name:"target",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]};Ae.node;const jt=i(Ae);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};be.node;const $t=i(be);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je={name:"triangle-exclamation-point",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle","triangle-alert"]};je.node;const St=i(je);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e={name:"variable",size:24,node:[["path",{d:"M8 21s-4-3-4-9 4-9 4-9",key:"uto9ud"}],["path",{d:"M16 3s4 3 4 9-4 9-4 9",key:"4w2vsq"}],["line",{x1:"15",x2:"9",y1:"9",y2:"15",key:"f7djnv"}],["line",{x1:"9",x2:"15",y1:"9",y2:"15",key:"1shsy8"}]]};$e.node;const Dt=i($e);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Se.node;const Ht=i(Se);export{nt as A,rt as B,dt as C,_t as D,mt as E,wt as F,gt as L,xt as M,Mt as P,et as R,Rt as S,$t as T,Dt as V,Ht as X,kt as a,C as b,it as c,ut as d,At as e,at as f,qe as g,Je as h,bt as i,ft as j,Ct as k,Et as l,ct as m,St as n,ht as o,Tt as p,yt as q,Ye as r,lt as s,pt as t,ot as u,tt as v,jt as w,zt as x,st as y,vt as z};
