/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function forEach(arr, func) {
    var i = 0;
    var arrLength = arr.length;
    for (; i < arrLength; i += 1) {
        func.call(this, i, arr[i]);
    }
}

module.exports = {
    forEach : forEach
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var dnd = __webpack_require__(2);

dnd.draggable('#dnd1');
dnd.draggable('.my-dnd'); // 2개 엘리먼트 처리

var dropzoneDrop1 = dnd.dropzone('#drop1'); // Dropzone은 인스턴스를 반환하고 한번에 하나의 dropzone을 생성할 수 있다.
dropzoneDrop1.on('drop', function(eventData) {
    console.log(eventData)
    console.log('drop1-1');
    console.log(eventData.target); // 드롭 된 엘리먼트
});

dropzoneDrop1.on('drop', function(eventData) {
    console.log(eventData)
    console.log('drop1-2');
    console.log(eventData.target);
});

var dropzoneDrop2 = dnd.dropzone('#drop2');
dropzoneDrop2.on('drop', function(eventData) {
    console.log(eventData)
    console.log('drop2-1');
    console.log(eventData.target);
});


dnd.draggable('#dnd2');
var dropzoneDnd2 = dnd.dropzone('#dnd2');
dropzoneDnd2.on('drop', function(eventData) {
    console.log(eventData)
    console.log('dnd2');
    console.log(eventData.target);
});

dnd.undraggable('#dnd1');
dnd.undropzone('#drop1');


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var domutil = __webpack_require__(3);
var eventutil = __webpack_require__(4);
var customEvents = __webpack_require__(5);
var arrayutil = __webpack_require__(0);

/**
 * 인자로 받은 selectorName에 해당하는 엘리멘트가 drag 가능하게 만들어 주는 함수
 * @param {string} selectorName drag가능 하게 만들고자 하는 엘리멘트의 selectorName
 */
function draggable(selectorName) {
    var draggableElement = domutil.querySelectorAll(selectorName);

    if (draggableElement[0].getAttribute('draggable')) {
        return;
    }

    arrayutil.forEach(draggableElement, function(index, value) {
        value.setAttribute('draggable', true);
    });

    eventutil.addHandler(document, 'dragstart', _dragStart);
    eventutil.addHandler(document, 'dragover', _dragOver);
}

/**
 * 인자로 받은 selectorName에 해당하는 엘리멘트가 drag 가능하다면 다시 해제해주는 함수
 * @param {string} selectorName drag를 해제 하게 만들고자 하는 엘리멘트의 selectorName
 */
function undraggable(selectorName) {
    var draggableElement = domutil.querySelectorAll(selectorName);

    if (!draggableElement[0].getAttribute('draggable')) {
        return;
    }

    arrayutil.forEach(draggableElement, function(index, draggableElementItem) {
        draggableElementItem.removeAttribute('draggable');
    });
}

/**
 * drag한 엘리멘트의 정보를 담는 함수
 * @param {obejct} event drag한 객체의 이벤트 정보
 */
function _dragStart(event) {
    var eventTarget = event.target;
    var dragTargetId = eventTarget.id;
    var uniqueId = 'drag' + (new Date()).getTime();

    if (dragTargetId) {
        event.dataTransfer.setData('text', dragTargetId);
    } else {
        eventTarget.setAttribute('id', uniqueId);
        event.dataTransfer.setData('text', eventTarget.id);
    }
}

/**
 * 엘리멘트를 drag 하는 중에 해당하는 함수
 * @param {obejct} event drag한 객체의 이벤트 정보
 */
function _dragOver(event) {
    event.preventDefault();
}

/**
 * 인자로 받은 selectorName에 해당하는 엘리멘트를 drop가능하게 만들어 주는 함수
 * @param {string} selectorName drop 가능하게 만들고자 하는 엘리멘트의 selectorName
 * @return {object}
 */
function dropzone(selectorName) {
    var dropElement = domutil.querySelector(selectorName);

    eventutil.addHandler(dropElement, 'drop', _drop);
    customEvents.mixin(dropElement);

    return dropElement;
}

/**
 * 인자로 받은 selectorName에 해당하는 엘리멘트의 drop기능을 해제하고자 하는 함수
 * @param {string} selectorName drop 해제하게 만들고자 하는 엘리멘트의 selectorName
 */
function undropzone(selectorName) {
    var dropElement = domutil.querySelector(selectorName);
    eventutil.removeHandler(dropElement, 'drop', _drop);
}

/**
 * 엘리멘트를 drop할 경우 drop 엘리멘트가 가지고 있는 커스텀 이벤트를 호출하는 함수
 * @param {obejct} event drop당하는 객체의 이벤트 정보
 */
function _drop(event) {
    event.preventDefault();
    var dropTarget = event.target;
    var dragTargetId = event.dataTransfer.getData('text');
    var dragTargetElement = document.getElementById(dragTargetId);
    dropTarget.fire('drop', {target : dragTargetElement});
}

module.exports = {
    draggable : draggable,
    dropzone : dropzone,
    undraggable : undraggable,
    undropzone : undropzone
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var _toArray = function(likeArray) {
    var result = [];
    var i = 0;
    var likeArrayLength = likeArray.length;

    for (; i < likeArrayLength; i += 1) {
        result.push(likeArray[i]);
    }

    return result;
};

var _indexOf = function(arr, obj) {
    var i = 0;
    var arrLength = arr.length;

    for (; i < arrLength; i += 1) {
        if (arr[i] === obj) {
            return i;
        }
    }

    return -1;
};

// getElementsByClassName*() IE 8 이하 버전 호환
var _getElementsByClassNamePolyfill = function(rootEle, selector) {
    var result = [];
    var allElements;
    var testClassName;
    var i;
    var allElementsLength;

    if (document.getElementsByClassName) {
        return _toArray(rootEle.getElementsByClassName(selector));
    }

    allElements = rootEle.getElementsByTagName('*');
    testClassName = new RegExp(selector);

    i = 0;
    allElementsLength = allElements.length;
    for (; i < allElementsLength; i += 1) {
        if (testClassName.test(allElements[i].className)) {
            result.push(allElements[i]);
        }
    }

    return result;
};

/**
 * selector의 앞에 문자열에 따라 id, class, tagName을 구별하여 해당하는 엘리멘트들의 배열을 반환하는 함수
 * @param {object} rootEle 는 이전에 받은 결과값으로서 해당 값으로 다시 다음번째의 selector 값을 이용하여 값을 찾을때 사용한다.
 * @param {string} selectors 검색해야하는 selector 값
 * @returns {array} result 는 해당 selector에 의해 검색되어진 결과값 배열
 */
var _findElementsOfMatchingSelector = function(rootEle, selectors) {
    var result = [];
    var rMatchedClassName = /^\./g;
    var rMatchedIdName = /^#/g;

    if (rMatchedClassName.test(selectors)) {
        selectors = selectors.replace(rMatchedClassName, '');
        result = _getElementsByClassNamePolyfill(rootEle, selectors);
    } else if (rMatchedIdName.test(selectors)) {
        selectors = selectors.replace(rMatchedIdName, '');
        result = document.getElementById(selectors);
        result = (result === null) ? [] : [result];
    } else {
        result = rootEle.getElementsByTagName(selectors);
        result = _toArray(result);
    }

    return result;
};

// from에 있는 요소 중에 중복되어 있는 요소를 제거한 배열을 반환
var _removeSameElement = function(from) {
    var temp = [];
    var numFrom = 0;
    var fromLength = from.length;

    for (; numFrom < fromLength; numFrom += 1) {
        if (numFrom === 0) {
            temp.push(from[0]);
        } else if (_indexOf(temp, from[numFrom]) > -1) {
            break;
        } else {
            temp.push(from[numFrom]);
        }
    }

    return temp;
};

// selector를 만족 시키는 요소들을 담은 배열을 생성하여 반환
var _makeArrayMatchingToSelctor = function(selectors) {
    var founded = []; // founded, from 중에서 arrSeletor의 원소에 해당하는 결과를 저장하는 값
    var from = [document]; // from, 찾아야 하는 대상이 되는 엘리멘트
    var result = [];
    var arrSeletor;
    var numArrSelector;
    var numFrom;
    var arrSeletorLength;
    var fromLength;

    if (!selectors) {
        return [];
    }

    arrSeletor = selectors.split(/\s+/);
    numArrSelector = 0;
    arrSeletorLength = arrSeletor.length;
    for (; numArrSelector < arrSeletorLength; numArrSelector += 1) {
        numFrom = 0;
        fromLength = from.length;
        for (; numFrom < fromLength; numFrom += 1) {
            founded = founded.concat(_findElementsOfMatchingSelector(from[numFrom], arrSeletor[numArrSelector]));
        }

        from = founded;
        founded = [];
    }

    result = _removeSameElement(from);

    return result;
};

var querySelector = function(selectors) {
    var from = [];
    var result = [];

    from = _makeArrayMatchingToSelctor(selectors);

    if (from.length < 1) {
        result = null;
    } else {
        result = from[0];
    }

    return result;
};

var querySelectorAll = function(selectors) {
    var from = [];
    var result = [];

    from = _makeArrayMatchingToSelctor(selectors);

    if (from.length < 1) {
        result = [];
    } else {
        result = from;
    }

    return result;
};

module.exports = {
    querySelector: querySelector,
    querySelectorAll: querySelectorAll
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// JavaScript for Web Developers 참고
var addHandler = function(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
};

var removeHandler = function(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
};

module.exports = {
    addHandler: addHandler,
    removeHandler: removeHandler
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var arrayutil = __webpack_require__(0);

var customEventObjects = [];

function mixin(object) {
    object.customEventList = {};
    customEventObjects.push(object);

    /**
     * customEventName에 해당하는 이벤트를 만든 후 customEventHandler 바인딩 한다.
     * @param {string} customEventName 커스텀 이벤트 이름
     * @param {function} customEventHandler 커스텀 이벤트에 연결해줄 함수
     */
    object.on = function(customEventName, customEventHandler) {
        var isEqualHandler = false;

        if (!this.customEventList[customEventName]) {
            this.customEventList[customEventName] = [];
        }

        arrayutil.forEach(this.customEventList[customEventName], function(index, customEventListItem) {
            if (customEventListItem === customEventHandler) {
                isEqualHandler = true;
                return;
            }
        });

        if (isEqualHandler === false) {
            this.customEventList[customEventName].push(customEventHandler);
        }
    }

    /**
     * customEventName에 해당하는 이벤트에 argumentObject인자를 받아 호출한다.
     * @param {string} customEventName 커스텀 이벤트 이름
     * @param {object} argumentObject 커스텀 이벤트에 들어갈 인자
     */
    object.fire = function(customEventName, argumentObject) {
        var objectContext = this;
        var customEventOfCustomEventList = this.customEventList[customEventName];

        if (!customEventOfCustomEventList) {
            return;
        }

        arrayutil.forEach(customEventOfCustomEventList, function(index, value) {
            value.call(objectContext, argumentObject);
        });
    }

    /**
     * customEventName에 해당하는 이벤트 중 해당하는 customEventHandler를 삭제한다.
     * @param {string} customEventName 커스텀 이벤트 이름
     * @param {function} customEventHandler 커스텀 이벤트연결된 핸들러 중 해제할 함수
     */
    object.off = function(customEventName, customEventHandler) {
        var customEventHandlerIndex;
        var customEventOfCustomEventList = this.customEventList[customEventName];

        if (!customEventOfCustomEventList) {
            return;
        }

        arrayutil.forEach(customEventOfCustomEventList, function(index, customEventListItem) {
            if (customEventListItem === customEventHandler) {
                customEventHandlerIndex = index;
                return;
            }
        });

        customEventOfCustomEventList.splice(customEventHandlerIndex, 1);
    }

    /**
     * customEventList를 갖고있는 객체를 반환한다.
     * @return {string} customEventList를 담고 있는 객체
     */
    object.getCustomEventList = function() {
        return this.customEventList;
    }
}

module.exports = {
    mixin : mixin,
    customEventObjects : customEventObjects
}


/***/ })
/******/ ]);