function De(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var W={exports:{}},a={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q;function Ne(){if(Q)return a;Q=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),x=Symbol.for("react.consumer"),R=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),M=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),j=Symbol.for("react.activity"),$=Symbol.for("react.view_transition"),E=Symbol.iterator;function h(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,A={};function _(e,t,o){this.props=e,this.context=t,this.refs=A,this.updater=o||v}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function P(){}P.prototype=_.prototype;function D(e,t,o){this.props=e,this.context=t,this.refs=A,this.updater=o||v}var N=D.prototype=new P;N.constructor=D,w(N,_.prototype),N.isPureReactComponent=!0;var L=Array.isArray;function H(){}var l={H:null,A:null,T:null,S:null},V=Object.prototype.hasOwnProperty;function I(e,t,o){var r=o.ref;return{$$typeof:s,type:e,key:t,ref:r!==void 0?r:null,props:o}}function ze(e,t){return I(e.type,t,e.props)}function q(e){return typeof e=="object"&&e!==null&&e.$$typeof===s}function Me(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var K=/\/+/g;function Y(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Me(""+e.key):t.toString(36)}function Se(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(H,H):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function b(e,t,o,r,c){var f=typeof e;(f==="undefined"||f==="boolean")&&(e=null);var d=!1;if(e===null)d=!0;else switch(f){case"bigint":case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case s:case n:d=!0;break;case S:return d=e._init,b(d(e._payload),t,o,r,c)}}if(d)return c=c(e),d=r===""?"."+Y(e,0):r,L(c)?(o="",d!=null&&(o=d.replace(K,"$&/")+"/"),b(c,t,o,"",function(je){return je})):c!=null&&(q(c)&&(c=ze(c,o+(c.key==null||e&&e.key===c.key?"":(""+c.key).replace(K,"$&/")+"/")+d)),t.push(c)),1;d=0;var k=r===""?".":r+":";if(L(e))for(var y=0;y<e.length;y++)r=e[y],f=k+Y(r,y),d+=b(r,t,o,f,c);else if(y=h(e),typeof y=="function")for(e=y.call(e),y=0;!(r=e.next()).done;)r=r.value,f=k+Y(r,y++),d+=b(r,t,o,f,c);else if(f==="object"){if(typeof e.then=="function")return b(Se(e),t,o,r,c);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return d}function O(e,t,o){if(e==null)return e;var r=[],c=0;return b(e,r,"","",function(f){return t.call(o,f,c++)}),r}function $e(e){if(e._status===-1){var t=e._result,o=t();o.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r,o.status===void 0&&(o.status="fulfilled",o.value=r))},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r,o.status===void 0&&(o.status="rejected",o.reason=r))}),e._status===-1&&(e._status=0,e._result=o)}if(e._status===1)return e._result.default;throw e._result}var G=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function X(e){var t=l.T,o={};o.types=t!==null?t.types:null,l.T=o;try{var r=e(),c=l.S;c!==null&&c(o,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(H,G)}catch(f){G(f)}finally{t!==null&&o.types!==null&&(t.types=o.types),l.T=t}}function Z(e){var t=l.T;if(t!==null){var o=t.types;o===null?t.types=[e]:o.indexOf(e)===-1&&o.push(e)}else X(Z.bind(null,e))}var be={map:O,forEach:function(e,t,o){O(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(t){return t})||[]},only:function(e){if(!q(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};return a.Activity=j,a.Children=be,a.Component=_,a.Fragment=p,a.Profiler=g,a.PureComponent=D,a.StrictMode=i,a.Suspense=m,a.ViewTransition=$,a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,a.__COMPILER_RUNTIME={__proto__:null,c:function(e){return l.H.useMemoCache(e)}},a.addTransitionType=Z,a.cache=function(e){return function(){return e.apply(null,arguments)}},a.cacheSignal=function(){return null},a.cloneElement=function(e,t,o){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=w({},e.props),c=e.key;if(t!=null)for(f in t.key!==void 0&&(c=""+t.key),t)!V.call(t,f)||f==="key"||f==="__self"||f==="__source"||f==="ref"&&t.ref===void 0||(r[f]=t[f]);var f=arguments.length-2;if(f===1)r.children=o;else if(1<f){for(var d=Array(f),k=0;k<f;k++)d[k]=arguments[k+2];r.children=d}return I(e.type,c,r)},a.createContext=function(e){return e={$$typeof:R,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:x,_context:e},e},a.createElement=function(e,t,o){var r,c={},f=null;if(t!=null)for(r in t.key!==void 0&&(f=""+t.key),t)V.call(t,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(c[r]=t[r]);var d=arguments.length-2;if(d===1)c.children=o;else if(1<d){for(var k=Array(d),y=0;y<d;y++)k[y]=arguments[y+2];c.children=k}if(e&&e.defaultProps)for(r in d=e.defaultProps,d)c[r]===void 0&&(c[r]=d[r]);return I(e,f,c)},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:T,render:e}},a.isValidElement=q,a.lazy=function(e){return{$$typeof:S,_payload:{_status:-1,_result:e},_init:$e}},a.memo=function(e,t){return{$$typeof:M,type:e,compare:t===void 0?null:t}},a.startTransition=X,a.unstable_useCacheRefresh=function(){return l.H.useCacheRefresh()},a.use=function(e){return l.H.use(e)},a.useActionState=function(e,t,o){return l.H.useActionState(e,t,o)},a.useCallback=function(e,t){return l.H.useCallback(e,t)},a.useContext=function(e){return l.H.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e,t){return l.H.useDeferredValue(e,t)},a.useEffect=function(e,t){return l.H.useEffect(e,t)},a.useEffectEvent=function(e){return l.H.useEffectEvent(e)},a.useId=function(){return l.H.useId()},a.useImperativeHandle=function(e,t,o){return l.H.useImperativeHandle(e,t,o)},a.useInsertionEffect=function(e,t){return l.H.useInsertionEffect(e,t)},a.useLayoutEffect=function(e,t){return l.H.useLayoutEffect(e,t)},a.useMemo=function(e,t){return l.H.useMemo(e,t)},a.useOptimistic=function(e,t){return l.H.useOptimistic(e,t)},a.useReducer=function(e,t,o){return l.H.useReducer(e,t,o)},a.useRef=function(e){return l.H.useRef(e)},a.useState=function(e){return l.H.useState(e)},a.useSyncExternalStore=function(e,t,o){return l.H.useSyncExternalStore(e,t,o)},a.useTransition=function(){return l.H.useTransition()},a.version="19.3.1",a}var F;function He(){return F||(F=1,W.exports=Ne()),W.exports}var C=He();const Ke=De(C);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=s=>(s.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase();/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Le(s,n,p=[]){if(n==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Pe(s),size:24,node:n,...p.length>0?{aliases:p}:{}}}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=s=>{let n="",p=!1;for(const i of s){if(i==="-"||i==="_"||i<=" "){p=n.length>0;continue}n.length===0?n+=i.toLowerCase():n+=p?i.toUpperCase():i,p=!1}return n};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=s=>{const n=Oe(s);return n.charAt(0).toUpperCase()+n.slice(1)};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=(...s)=>{const n=new Set;for(const p of s)if(typeof p=="string")for(const i of p.split(/\s+/))i&&n.add(i);return[...n].join(" ")};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function B(s){return s!=null}function qe(s,n={}){var $,E;const p=n.attributeNames??{},i=h=>p[h]??h,g=s.size??s.width??z.width,x=s.size??s.height??z.height,R=(($=s.aliases)==null?void 0:$.filter(h=>typeof h=="string"&&h.trim()!=="").map(h=>`lucide-${h}`))??[],T=[...s.name?[`lucide-${s.name}`]:[],...R],m=((E=n.className)==null?void 0:E.split(" ").filter(Boolean))??[],M=n.includeDefaultClasses===!1?U(...m):U("lucide",...T,...m),S=n.absoluteStrokeWidth?Number(n.strokeWidth??z["stroke-width"])*Number(s.size??s.width??z.width)/Number(n.size??n.width??z.width):n.strokeWidth??z["stroke-width"];return["svg",{...Object.entries(z).reduce((h,[v,w])=>(h[i(v)]=w,h),{}),..."color"in n&&n.color&&{[i("stroke")]:n.color},..."size"in n&&B(n.size)&&{[i("width")]:n.size,[i("height")]:n.size},..."width"in n&&B(n.width)&&{[i("width")]:n.width},..."height"in n&&B(n.height)&&{[i("height")]:n.height},[i("stroke-width")]:S,...M&&{[i("class")]:M},[i("viewBox")]:`0 0 ${g} ${x}`,...n.hasA11yProp===!1?{[i("aria-hidden")]:"true"}:{},..."attributes"in n&&n.attributes},s.node.map(h=>{const[v,w,A]=h,_=n.nonScalingStroke?{[i("vector-effect")]:"non-scaling-stroke",...w}:w;return A?[v,_,A]:[v,_]})]}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Ye(s,n={}){return qe(s,{...n,attributeNames:{...n.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=s=>{if(s==null||typeof s!="object")return!1;for(const n in s)if(Object.prototype.hasOwnProperty.call(s,n)&&(n.startsWith("aria-")||n==="role"||n==="title")&&s[n]!=null)return!0;return!1},Be=C.createContext({}),Ue=()=>C.useContext(Be),Ve=C.forwardRef(({color:s,size:n,width:p,height:i,strokeWidth:g,absoluteStrokeWidth:x,nonScalingStroke:R,className:T="",children:m,iconNode:M=[],icon:S={node:M,aliases:[],size:24},...j},$)=>{const{size:E=24,strokeWidth:h=2,absoluteStrokeWidth:v=!1,nonScalingStroke:w=!1,color:A="currentColor",className:_=""}=Ue()??{},P=!!m||We(j),[D,N,L=[]]=Ye(S,{color:s??A,width:p??n??E,height:i??n??E,strokeWidth:g??h,absoluteStrokeWidth:x??v,nonScalingStroke:R??w,className:U(_,T),hasA11yProp:P,attributes:j});return C.createElement(D,{ref:$,...N},[...L.map(([H,l])=>C.createElement(H,l)),...Array.isArray(m)?m:[m]])});/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function u(s,n=[],p=[]){const i=typeof s=="string"?Le(s,n,p):s,g=C.forwardRef(({className:x,...R},T)=>C.createElement(Ve,{ref:T,icon:i,className:x,...R}));return i.name&&(g.displayName=Ie(i.name)),g}/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};J.node;const Ge=u(J);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};ee.node;const Xe=u(ee);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={name:"book-bookmark",size:24,node:[["path",{d:"M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2",key:"x9x4jl"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20",key:"1889un"}]],aliases:["book-marked"]};te.node;const Ze=u(te);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};ne.node;const Qe=u(ne);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"calculator",size:24,node:[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]};oe.node;const Fe=u(oe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};re.node;const Je=u(re);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};se.node;const et=u(se);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};ae.node;const tt=u(ae);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};ce.node;const nt=u(ce);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"circle-check-big",size:24,node:[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],aliases:["check-circle"]};ie.node;const ot=u(ie);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};ue.node;const rt=u(ue);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5",key:"1awbb0"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};le.node;const st=u(le);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};fe.node;const at=u(fe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"code",size:24,node:[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]]};de.node;const ct=u(de);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};pe.node;const it=u(pe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};he.node;const ut=u(he);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};ye.node;const lt=u(ye);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"file-code",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]]};_e.node;const ft=u(_e);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};ke.node;const dt=u(ke);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};me.node;const pt=u(me);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};ve.node;const ht=u(ve);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we={name:"presentation",size:24,node:[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]]};we.node;const yt=u(we);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};ge.node;const _t=u(ge);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};Ee.node;const kt=u(Ee);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Ce.node;const mt=u(Ce);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe={name:"target",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]};xe.node;const vt=u(xe);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};Re.node;const wt=u(Re);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={name:"triangle-exclamation-point",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle","triangle-alert"]};Te.node;const gt=u(Te);/**
 * @license lucide-react v1.77.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Ae.node;const Et=u(Ae);export{Xe as A,Qe as B,it as C,lt as D,dt as F,pt as L,yt as P,Ke as R,kt as S,wt as T,Et as X,rt as a,C as b,et as c,nt as d,mt as e,Je as f,De as g,tt as h,at as i,ot as j,_t as k,ct as l,gt as m,st as n,Ze as o,Ge as p,vt as q,He as r,ht as s,Fe as t,ft as u,ut as v};
