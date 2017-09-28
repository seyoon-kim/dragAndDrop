var domutil = require('../util/domutil');
var eventutil = require('../util/eventutil');
var customEvents = require('../util/customEvents');
var arrayutil = require('../util/arrayutil');

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
