var arrayutil = require('./arrayutil');

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
