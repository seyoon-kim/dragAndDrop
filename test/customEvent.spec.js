//var customEvents = require('../util/customEvent');
describe('CustomEvents', function() {
    var CustomEvents = (function() {
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

        return {
            mixin : mixin,
            customEventObjects : customEventObjects
        }
    })();

    var myObj = {};
    CustomEvents.mixin(myObj);

    it('mixin함수를 이용하여 해당 객체를 customEventObjects에 넣어둔다.', function() {
        expect(CustomEvents.customEventObjects[0]).toEqual(myObj);
    });

    it('on함수를 이용하여 mixin함수에 의해 등록된 객체에 on함수의 인자로 받은 이벤트핸들러를 등록하였는지 확인', function() {
        function onDeleted(eventData) {
          console.log(eventData.message);
        }

        myObj.on('deleted', onDeleted)
        expect(myObj.getCustomEventList().deleted).toEqual(onDeleted);
    });

    it('fire함수를 이용하여 mixin함수에 의해 등록된 객체에 on함수의 인자로 받은 이벤트핸들러를 호출하였는지 확인', function() {
        var myObjCustomEventList = myObj.getCustomEventList();

        function onDeleted(eventData) {
          console.log(eventData.message);
        }

        spyOn(myObjCustomEventList, 'deleted');

        myObj.on('deleted', onDeleted);
        myObj.fire('deleted', { message: 'test' });

        expect(myObjCustomEventList.deleted).toHaveBeenCalled();
    });

    it('off함수를 이용하여 mixin함수에 의해 등록된 객체에 on함수의 인자로 받은 이벤트핸들러를 해제 하였는지 확인', function() {
        function onDeleted(eventData) {
          console.log(eventData.message);
        }

        myObj.on('deleted', onDeleted);
        myObj.off('deleted', onDeleted);
        myObj.fire('deleted', { message: 'test' });

        expect(myObj.getCustomEventList().deleted).toEqual(undefined);
    });
});
