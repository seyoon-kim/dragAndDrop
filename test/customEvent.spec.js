var customEvents = require('../util/customEvents');

describe('customEvents', function() {
    var myObj = {};
    customEvents.mixin(myObj);

    function onDeleted(eventData) {
        console.log(eventData.message);
    }

    it('mixin함수를 이용하여 해당 객체를 customEventObjects에 넣어둔다.', function() {
        expect(customEvents.customEventObjects[0]).toEqual(myObj);
    });

    it('on함수를 이용하여 mixin함수에 의해 등록된 객체에 on함수의 인자로 받은 이벤트핸들러를 등록하였는지 확인', function() {
        myObj.on('deleted', onDeleted);
        expect(myObj.getCustomEventList().deleted[0]).toEqual(onDeleted);
    });

    it('off함수를 이용하여 mixin함수에 의해 등록된 객체에 on함수의 인자로 받은 이벤트핸들러를 해제 하였는지 확인', function() {
        myObj.off('deleted', onDeleted);
        expect(myObj.getCustomEventList().deleted[0]).toEqual(undefined);
    });
});
