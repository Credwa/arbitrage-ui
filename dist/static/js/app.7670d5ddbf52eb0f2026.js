webpackJsonp([10],{"2Sm+":function(e,t){},"7zck":function(e,t){},"86HS":function(e,t,n){var r=n("Sazm");n("3VHS");var a=n("wtEF").store,o=n("QkNq").init,i={apiKey:o.apiKey,authDomain:o.authDomain,databaseURL:o.databaseURL,storageBucket:o.storageBucket,projectId:o.projectId,messagingSenderId:o.messagingSenderId};r.initializeApp(i);var u=r.firestore(),s=new r.auth.GoogleAuthProvider;r.auth().onAuthStateChanged(function(e){e&&u.collection("users").doc(e.uid).set({displayName:e.displayName,email:e.email,uid:e.uid,photoURL:e.photoURL},{merge:!0}).then(function(){u.collection("users").doc(e.uid).get().then(function(e){e.exists&&a.commit("setCurrentUser",e.data())})})});e.exports={firebase:r,login:function(){r.auth().setPersistence(r.auth.Auth.Persistence.LOCAL).then(function(){return r.auth().signInWithPopup(s)}).catch(function(e){var t=e.code,n=e.message;console.log(t,n)})},getCurrentUser:function(){return r.auth().currentUser},db:u}},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),a=n("3EgV"),o=n.n(a),i=n("hMcO"),u=n.n(i),s=(n("7zck"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("v-app",[t("v-content",[t("router-view")],1),this._v(" "),t("v-footer",{attrs:{fixed:this.fixed,app:""}},[t("span",[this._v("© 2018")])])],1)},staticRenderFns:[]});var c=n("VU/8")({data:function(){return{fixed:!1}},name:"App"},s,!1,function(e){n("2Sm+")},null,null).exports,l=n("/ocq"),p=n("86HS");r.a.use(l.a);var f=new l.a({routes:[{path:"/",name:"LandingPage",component:function(){return n.e(5).then(n.bind(null,"9GHW"))},beforeEnter:function(e,t,n){p.firebase.auth().onAuthStateChanged(function(e){e?n("/home"):n()})},children:[{path:"",component:function(){return n.e(6).then(n.bind(null,"8Cpd"))}},{path:"/pricing",component:function(){return n.e(8).then(n.bind(null,"DtGu"))}}]},{path:"/home",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"QpsU"))},beforeEnter:function(e,t,n){p.firebase.auth().onAuthStateChanged(function(e){e?n():n("/")})},children:[{path:"",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"HXef"))}},{path:"/graphs",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"k/py"))}},{path:"/updates",component:function(){return n.e(4).then(n.bind(null,"1VwM"))}}]},{path:"*",component:function(){return n.e(7).then(n.bind(null,"c5Mg"))}}]}),d=n("wtEF");r.a.use(u.a,"http://ec2-52-55-213-204.compute-1.amazonaws.com:3000"),r.a.prototype.$API_URL="http://ec2-52-55-213-204.compute-1.amazonaws.com:3000",r.a.use(o.a,{theme:{primary:"#1976d2",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),r.a.config.productionTip=!1,new r.a({el:"#app",router:f,components:{App:c},store:d.store,template:"<App/>"})},QkNq:function(e,t){e.exports={init:{apiKey:"AIzaSyCuYPP3JDZ-WfQWpfJLafXNi9QmYR__k-E",authDomain:"arbitrage-d69c2.firebaseapp.com",databaseURL:"https://arbitrage-d69c2.firebaseio.com",projectId:"arbitrage-d69c2",storageBucket:"arbitrage-d69c2.appspot.com",messagingSenderId:"725736837901"}}},wtEF:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"store",function(){return i});var r=n("7+uW"),a=n("NYxO");r.a.use(a.a);var o=function(e){return"Mexican Pesos"===e?"MXN":"Argentine Pesos"===e?"ARS":"AUD"},i=new a.a.Store({state:{ARSRate:null,currentUser:null,AUDRate:null,MXNRate:null,allowAlertCreation:!1,bestArb:{symbol:null,exchange:null,spreadPercentage:0,spread:0},userAlerts:[]},getters:{getCurrentUser:function(e){return e.currentUser},getARSRate:function(e){return e.ARSRate},getAUDRate:function(e){return e.AUDRate},getMXNRate:function(e){return e.MXNRate},getBestArb:function(e){return e.bestArb},getUserAlerts:function(e){return e.userAlerts},getUserAlert:function(e,t){return e.userAlerts.find(function(e){return e.exchange===t})},getAllowAlertCreations:function(e){return e.allowAlertCreation}},mutations:{changeAllowAlertCreation:function(e){e.allowAlertCreation=!0},setCurrentUser:function(e,t){e.currentUser=t},setARSRate:function(e,t){e.ARSRate=t},setAUDRate:function(e,t){e.AUDRate=t},setMXNRate:function(e,t){e.MXNRate=t},setBestArb:function(e,t){(t.spreadPercentage>e.bestArb.spreadPercentage||o(t.foreignCurrency)===e.bestArb.exchange&&t.symbol===e.bestArb.symbol)&&(e.bestArb.symbol=t.symbol,e.bestArb.exchange=o(t.foreignCurrency),e.bestArb.spreadPercentage=t.spreadPercentage.toLocaleString(void 0,{minimumFractionDigits:3}),e.bestArb.spread=t.spread.toLocaleString(void 0,{minimumFractionDigits:3}))},setUserAlert:function(e,t){e.userAlerts.find(function(e){return e.exchange===t.exchange})||e.userAlerts.push(t)},deleteUserAlert:function(e,t){e.userAlerts=e.userAlerts.filter(function(e){return e.exchange!==t})}}})}},["NHnr"]);
//# sourceMappingURL=app.7670d5ddbf52eb0f2026.js.map