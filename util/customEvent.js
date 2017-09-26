var customEventObjects = [];
function mixin(obj) {
    var customEventList = {};

    customEventObjects.push(obj);

    obj.on = function(customEventName, customEventHandler) {
        if (customEventList[customEventName]) {
            return;
        }
        customEventList[customEventName] = customEventHandler;
    }

    obj.fire = function(customEventName, argumentObject) {
        if (!customEventList[customEventName]) {
            return;
        }
        customEventList[customEventName].call(this, argumentObject);
    }

    obj.off = function(customEventName, customEventHandler) {
        if (!customEventList[customEventName]) {
            return;
        }
        delete customEventList[customEventName];
    }

    obj.getCustomEventList = function() {
        return customEventList;
    }
}

module.exports = {
    mixin : mixin,
    customEventObjects : customEventObjects
}
