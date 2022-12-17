/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/context.js":
/*!************************!*\
  !*** ./lib/context.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthUserProvider\": () => (/* binding */ AuthUserProvider),\n/* harmony export */   \"useAuth\": () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./firebase */ \"./lib/firebase.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase__WEBPACK_IMPORTED_MODULE_2__]);\n_firebase__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst authUserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    authUser: null,\n    loading: true,\n    firebaseEmailPassSignIn: async ()=>{},\n    firebaseCreateUserEmailPass: async ()=>{},\n    firebaseSignOut: async ()=>{}\n});\nfunction AuthUserProvider({ children  }) {\n    const auth = (0,_firebase__WEBPACK_IMPORTED_MODULE_2__.useFirebaseAuth)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(authUserContext.Provider, {\n        value: auth,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Legion\\\\OneDrive\\\\Desktop\\\\dogfriendly\\\\lib\\\\context.js\",\n        lineNumber: 15,\n        columnNumber: 9\n    }, this);\n}\nconst useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(authUserContext);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvY29udGV4dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBa0Q7QUFDTDtBQUU3QyxNQUFNRyxnQ0FBa0JILG9EQUFhQSxDQUFDO0lBQ2xDSSxVQUFVLElBQUk7SUFDZEMsU0FBUyxJQUFJO0lBQ2JDLHlCQUF5QixVQUFZLENBQUM7SUFDdENDLDZCQUE2QixVQUFZLENBQUM7SUFDMUNDLGlCQUFpQixVQUFZLENBQUM7QUFDbEM7QUFFTyxTQUFTQyxpQkFBaUIsRUFBRUMsU0FBUSxFQUFFLEVBQUU7SUFDM0MsTUFBTUMsT0FBT1QsMERBQWVBO0lBQzVCLHFCQUNJLDhEQUFDQyxnQkFBZ0JTLFFBQVE7UUFBQ0MsT0FBT0Y7a0JBQzVCRDs7Ozs7O0FBR2IsQ0FBQztBQUVNLE1BQU1JLFVBQVUsSUFBTWIsaURBQVVBLENBQUNFLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL2RvZ2ZyaWVuZGx5Ly4vbGliL2NvbnRleHQuanM/N2QyZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VGaXJlYmFzZUF1dGggfSBmcm9tICcuL2ZpcmViYXNlJztcclxuXHJcbmNvbnN0IGF1dGhVc2VyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xyXG4gICAgYXV0aFVzZXI6IG51bGwsXHJcbiAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgZmlyZWJhc2VFbWFpbFBhc3NTaWduSW46IGFzeW5jICgpID0+IHt9LFxyXG4gICAgZmlyZWJhc2VDcmVhdGVVc2VyRW1haWxQYXNzOiBhc3luYyAoKSA9PiB7fSxcclxuICAgIGZpcmViYXNlU2lnbk91dDogYXN5bmMgKCkgPT4ge30sXHJcbn0pXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXV0aFVzZXJQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcclxuICAgIGNvbnN0IGF1dGggPSB1c2VGaXJlYmFzZUF1dGgoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGF1dGhVc2VyQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17YXV0aH0+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L2F1dGhVc2VyQ29udGV4dC5Qcm92aWRlcj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChhdXRoVXNlckNvbnRleHQpOyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUZpcmViYXNlQXV0aCIsImF1dGhVc2VyQ29udGV4dCIsImF1dGhVc2VyIiwibG9hZGluZyIsImZpcmViYXNlRW1haWxQYXNzU2lnbkluIiwiZmlyZWJhc2VDcmVhdGVVc2VyRW1haWxQYXNzIiwiZmlyZWJhc2VTaWduT3V0IiwiQXV0aFVzZXJQcm92aWRlciIsImNoaWxkcmVuIiwiYXV0aCIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/context.js\n");

/***/ }),

/***/ "./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"auth\": () => (/* binding */ auth),\n/* harmony export */   \"db\": () => (/* binding */ db),\n/* harmony export */   \"useFirebaseAuth\": () => (/* binding */ useFirebaseAuth)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// konfiguracija za firebase, copy/paste iz firebase konzole\nconst firebaseConfig = {\n    apiKey: \"AIzaSyDwMl6K77eBRbb6s876n50kjRc_xIp4pDY\",\n    authDomain: \"dogfriendly-progi.firebaseapp.com\",\n    projectId: \"dogfriendly-progi\",\n    storageBucket: \"dogfriendly-progi.appspot.com\",\n    messagingSenderId: \"775486989290\",\n    appId: \"1:775486989290:web:b20befe287cbbaab538893\",\n    measurementId: \"G-ZL0FDW0P45\"\n};\n// inicijalizacija firebase-a\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n// inicializacija firestore-a i dohvat reference na servis\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);\n// dohvat servia za autentikaciju\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);\n// formatiranje podataka o autentificiranom korisnikom - miču se sva nepotrebna polja\nconst formatAuthUser = (user)=>({\n        uid: user.uid,\n        email: user.email\n    });\n// hook koji vraća podatke o autentificiranom korisniku i funkcije za autentifikaciju\nfunction useFirebaseAuth() {\n    const [authUser, setAuthUser] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);\n    const authStateChanged = async (authState)=>{\n        if (!authState) {\n            setAuthUser(null);\n            setLoading(false);\n            return;\n        }\n        setLoading(true);\n        var formattedUser = formatAuthUser(authState);\n        setAuthUser(formattedUser);\n        setLoading(false);\n    };\n    const clear = ()=>{\n        setAuthUser(null);\n        setLoading(true);\n    };\n    const firebaseEmailPassSignIn = async (email, password)=>{\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(auth, email, password);\n    };\n    const firebaseCreateUserEmailPass = async (username, email, password)=>{\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, email, password).then(async (userCredential)=>{\n            // Signed in\n            var user = userCredential.user;\n            console.log(\"registered\", user.uid);\n            try {\n                console.log(\"setting doc\");\n                await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(db, \"users\", user.uid), {\n                    username: username,\n                    email: email\n                });\n            } catch (e) {\n                console.error(\"Error adding document: \", e);\n            }\n        // ...\n        });\n    };\n    const firebaseSignOut = async ()=>{\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(auth).then(clear);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(auth, authStateChanged);\n        return ()=>unsubscribe();\n    }, []);\n    return {\n        authUser,\n        loading,\n        firebaseEmailPassSignIn,\n        firebaseCreateUserEmailPass,\n        firebaseSignOut\n    };\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZmlyZWJhc2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNkM7QUFDa0I7QUFPeEM7QUFDcUI7QUFFNUMsNERBQTREO0FBQzVELE1BQU1XLGlCQUFpQjtJQUN0QkMsUUFBUTtJQUNSQyxZQUFZO0lBQ1pDLFdBQVc7SUFDWEMsZUFBZTtJQUNmQyxtQkFBbUI7SUFDbkJDLE9BQU87SUFDUEMsZUFBZTtBQUNoQjtBQUVBLDZCQUE2QjtBQUM3QixNQUFNQyxNQUFNbkIsMkRBQWFBLENBQUNXO0FBRTFCLDBEQUEwRDtBQUNuRCxNQUFNUyxLQUFLbEIsZ0VBQVlBLENBQUNpQixLQUFLO0FBRXBDLGlDQUFpQztBQUMxQixNQUFNRSxPQUFPakIsc0RBQU9BLENBQUNlLEtBQUs7QUFFakMscUZBQXFGO0FBQ3JGLE1BQU1HLGlCQUFpQixDQUFDQyxPQUFVO1FBQ2pDQyxLQUFLRCxLQUFLQyxHQUFHO1FBQ2JDLE9BQU9GLEtBQUtFLEtBQUs7SUFDbEI7QUFFQSxxRkFBcUY7QUFDOUUsU0FBU0Msa0JBQWtCO0lBQ2pDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHbEIsK0NBQVFBLENBQUMsSUFBSTtJQUM3QyxNQUFNLENBQUNtQixTQUFTQyxXQUFXLEdBQUdwQiwrQ0FBUUEsQ0FBQyxJQUFJO0lBRTNDLE1BQU1xQixtQkFBbUIsT0FBT0MsWUFBYztRQUM3QyxJQUFJLENBQUNBLFdBQVc7WUFDZkosWUFBWSxJQUFJO1lBQ2hCRSxXQUFXLEtBQUs7WUFDaEI7UUFDRCxDQUFDO1FBRURBLFdBQVcsSUFBSTtRQUNmLElBQUlHLGdCQUFnQlgsZUFBZVU7UUFDbkNKLFlBQVlLO1FBQ1pILFdBQVcsS0FBSztJQUNqQjtJQUVBLE1BQU1JLFFBQVEsSUFBTTtRQUNuQk4sWUFBWSxJQUFJO1FBQ2hCRSxXQUFXLElBQUk7SUFDaEI7SUFFQSxNQUFNSywwQkFBMEIsT0FBT1YsT0FBT1csV0FBYTtRQUMxRDlCLHlFQUEwQkEsQ0FBQ2UsTUFBTUksT0FBT1c7SUFDekM7SUFFQSxNQUFNQyw4QkFBOEIsT0FBT0MsVUFBVWIsT0FBT1csV0FBYTtRQUN4RTdCLDZFQUE4QkEsQ0FBQ2MsTUFBTUksT0FBT1csVUFBVUcsSUFBSSxDQUFDLE9BQU9DLGlCQUFtQjtZQUNwRixZQUFZO1lBQ1osSUFBSWpCLE9BQU9pQixlQUFlakIsSUFBSTtZQUM5QmtCLFFBQVFDLEdBQUcsQ0FBQyxjQUFjbkIsS0FBS0MsR0FBRztZQUNqQyxJQUFJO2dCQUNIaUIsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLE1BQU12QywwREFBTUEsQ0FBQ0YsdURBQUdBLENBQUNtQixJQUFJLFNBQVNHLEtBQUtDLEdBQUcsR0FBRztvQkFDeENjLFVBQVVBO29CQUNWYixPQUFPQTtnQkFDUjtZQUNELEVBQUUsT0FBT2tCLEdBQUc7Z0JBQ1hGLFFBQVFHLEtBQUssQ0FBQywyQkFBMkJEO1lBQzFDO1FBQ0QsTUFBTTtRQUNOO0lBQ0Y7SUFFQSxNQUFNRSxrQkFBa0IsVUFBWTtRQUNuQ3JDLHNEQUFPQSxDQUFDYSxNQUFNa0IsSUFBSSxDQUFDTDtJQUNwQjtJQUVBekIsZ0RBQVNBLENBQUMsSUFBTTtRQUNmLE1BQU1xQyxjQUFjekMsaUVBQWtCQSxDQUFDZ0IsTUFBTVU7UUFDN0MsT0FBTyxJQUFNZTtJQUNkLEdBQUcsRUFBRTtJQUVMLE9BQU87UUFDTm5CO1FBQ0FFO1FBQ0FNO1FBQ0FFO1FBQ0FRO0lBQ0Q7QUFDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9nZnJpZW5kbHkvLi9saWIvZmlyZWJhc2UuanM/YWI0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xyXG5pbXBvcnQgeyBkb2MsIGdldEZpcmVzdG9yZSwgc2V0RG9jIH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xyXG5pbXBvcnQge1xyXG5cdGdldEF1dGgsXHJcblx0b25BdXRoU3RhdGVDaGFuZ2VkLFxyXG5cdHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkLFxyXG5cdGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCxcclxuXHRzaWduT3V0LFxyXG59IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbi8vIGtvbmZpZ3VyYWNpamEgemEgZmlyZWJhc2UsIGNvcHkvcGFzdGUgaXogZmlyZWJhc2Uga29uem9sZVxyXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcclxuXHRhcGlLZXk6IFwiQUl6YVN5RHdNbDZLNzdlQlJiYjZzODc2bjUwa2pSY194SXA0cERZXCIsXHJcblx0YXV0aERvbWFpbjogXCJkb2dmcmllbmRseS1wcm9naS5maXJlYmFzZWFwcC5jb21cIixcclxuXHRwcm9qZWN0SWQ6IFwiZG9nZnJpZW5kbHktcHJvZ2lcIixcclxuXHRzdG9yYWdlQnVja2V0OiBcImRvZ2ZyaWVuZGx5LXByb2dpLmFwcHNwb3QuY29tXCIsXHJcblx0bWVzc2FnaW5nU2VuZGVySWQ6IFwiNzc1NDg2OTg5MjkwXCIsXHJcblx0YXBwSWQ6IFwiMTo3NzU0ODY5ODkyOTA6d2ViOmIyMGJlZmUyODdjYmJhYWI1Mzg4OTNcIixcclxuXHRtZWFzdXJlbWVudElkOiBcIkctWkwwRkRXMFA0NVwiLFxyXG59O1xyXG5cclxuLy8gaW5pY2lqYWxpemFjaWphIGZpcmViYXNlLWFcclxuY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcblxyXG4vLyBpbmljaWFsaXphY2lqYSBmaXJlc3RvcmUtYSBpIGRvaHZhdCByZWZlcmVuY2UgbmEgc2VydmlzXHJcbmV4cG9ydCBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG5cclxuLy8gZG9odmF0IHNlcnZpYSB6YSBhdXRlbnRpa2FjaWp1XHJcbmV4cG9ydCBjb25zdCBhdXRoID0gZ2V0QXV0aChhcHApO1xyXG5cclxuLy8gZm9ybWF0aXJhbmplIHBvZGF0YWthIG8gYXV0ZW50aWZpY2lyYW5vbSBrb3Jpc25pa29tIC0gbWnEjXUgc2Ugc3ZhIG5lcG90cmVibmEgcG9samFcclxuY29uc3QgZm9ybWF0QXV0aFVzZXIgPSAodXNlcikgPT4gKHtcclxuXHR1aWQ6IHVzZXIudWlkLFxyXG5cdGVtYWlsOiB1c2VyLmVtYWlsLFxyXG59KTtcclxuXHJcbi8vIGhvb2sga29qaSB2cmHEh2EgcG9kYXRrZSBvIGF1dGVudGlmaWNpcmFub20ga29yaXNuaWt1IGkgZnVua2NpamUgemEgYXV0ZW50aWZpa2FjaWp1XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VGaXJlYmFzZUF1dGgoKSB7XHJcblx0Y29uc3QgW2F1dGhVc2VyLCBzZXRBdXRoVXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHRjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcblx0Y29uc3QgYXV0aFN0YXRlQ2hhbmdlZCA9IGFzeW5jIChhdXRoU3RhdGUpID0+IHtcclxuXHRcdGlmICghYXV0aFN0YXRlKSB7XHJcblx0XHRcdHNldEF1dGhVc2VyKG51bGwpO1xyXG5cdFx0XHRzZXRMb2FkaW5nKGZhbHNlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldExvYWRpbmcodHJ1ZSk7XHJcblx0XHR2YXIgZm9ybWF0dGVkVXNlciA9IGZvcm1hdEF1dGhVc2VyKGF1dGhTdGF0ZSk7XHJcblx0XHRzZXRBdXRoVXNlcihmb3JtYXR0ZWRVc2VyKTtcclxuXHRcdHNldExvYWRpbmcoZmFsc2UpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNsZWFyID0gKCkgPT4ge1xyXG5cdFx0c2V0QXV0aFVzZXIobnVsbCk7XHJcblx0XHRzZXRMb2FkaW5nKHRydWUpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGZpcmViYXNlRW1haWxQYXNzU2lnbkluID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG5cdFx0c2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBmaXJlYmFzZUNyZWF0ZVVzZXJFbWFpbFBhc3MgPSBhc3luYyAodXNlcm5hbWUsIGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG5cdFx0Y3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCkudGhlbihhc3luYyAodXNlckNyZWRlbnRpYWwpID0+IHtcclxuXHRcdFx0Ly8gU2lnbmVkIGluXHJcblx0XHRcdHZhciB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJyZWdpc3RlcmVkXCIsIHVzZXIudWlkKTtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXR0aW5nIGRvY1wiKTtcclxuXHRcdFx0XHRcdGF3YWl0IHNldERvYyhkb2MoZGIsIFwidXNlcnNcIiwgdXNlci51aWQpLCB7XHJcblx0XHRcdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSxcclxuXHRcdFx0XHRcdFx0ZW1haWw6IGVtYWlsLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyBkb2N1bWVudDogXCIsIGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0Ly8gLi4uXHJcblx0XHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGZpcmViYXNlU2lnbk91dCA9IGFzeW5jICgpID0+IHtcclxuXHRcdHNpZ25PdXQoYXV0aCkudGhlbihjbGVhcik7XHJcblx0fTtcclxuXHJcblx0dXNlRWZmZWN0KCgpID0+IHtcclxuXHRcdGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsIGF1dGhTdGF0ZUNoYW5nZWQpO1xyXG5cdFx0cmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XHJcblx0fSwgW10pO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0YXV0aFVzZXIsXHJcblx0XHRsb2FkaW5nLFxyXG5cdFx0ZmlyZWJhc2VFbWFpbFBhc3NTaWduSW4sXHJcblx0XHRmaXJlYmFzZUNyZWF0ZVVzZXJFbWFpbFBhc3MsXHJcblx0XHRmaXJlYmFzZVNpZ25PdXQsXHJcblx0fTtcclxufVxyXG4iXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImRvYyIsImdldEZpcmVzdG9yZSIsInNldERvYyIsImdldEF1dGgiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25PdXQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsImFwcCIsImRiIiwiYXV0aCIsImZvcm1hdEF1dGhVc2VyIiwidXNlciIsInVpZCIsImVtYWlsIiwidXNlRmlyZWJhc2VBdXRoIiwiYXV0aFVzZXIiLCJzZXRBdXRoVXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiYXV0aFN0YXRlQ2hhbmdlZCIsImF1dGhTdGF0ZSIsImZvcm1hdHRlZFVzZXIiLCJjbGVhciIsImZpcmViYXNlRW1haWxQYXNzU2lnbkluIiwicGFzc3dvcmQiLCJmaXJlYmFzZUNyZWF0ZVVzZXJFbWFpbFBhc3MiLCJ1c2VybmFtZSIsInRoZW4iLCJ1c2VyQ3JlZGVudGlhbCIsImNvbnNvbGUiLCJsb2ciLCJlIiwiZXJyb3IiLCJmaXJlYmFzZVNpZ25PdXQiLCJ1bnN1YnNjcmliZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/firebase.js\n");

/***/ }),

/***/ "./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/context */ \"./lib/context.js\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_context__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_context__WEBPACK_IMPORTED_MODULE_1__.AuthUserProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Legion\\\\OneDrive\\\\Desktop\\\\dogfriendly\\\\pages\\\\_app.jsx\",\n            lineNumber: 7,\n            columnNumber: 4\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Legion\\\\OneDrive\\\\Desktop\\\\dogfriendly\\\\pages\\\\_app.jsx\",\n        lineNumber: 6,\n        columnNumber: 3\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUFrRDtBQUNsQjtBQUVoQyxTQUFTQyxNQUFNLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUFFLEVBQUU7SUFDeEMscUJBQ0MsOERBQUNILDBEQUFnQkE7a0JBQ2hCLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzNCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2dmcmllbmRseS8uL3BhZ2VzL19hcHAuanN4PzRjYjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aFVzZXJQcm92aWRlciB9IGZyb20gXCIuLi9saWIvY29udGV4dFwiO1xyXG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5zY3NzXCI7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEF1dGhVc2VyUHJvdmlkZXI+XHJcblx0XHRcdDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuXHRcdDwvQXV0aFVzZXJQcm92aWRlcj5cclxuXHQpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sIm5hbWVzIjpbIkF1dGhVc2VyUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.jsx\n");

/***/ }),

/***/ "./styles/globals.scss":
/*!*****************************!*\
  !*** ./styles/globals.scss ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.jsx"));
module.exports = __webpack_exports__;

})();