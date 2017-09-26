var CustomEvents = require('../util/customEvent');
var Domutil = require('../util/Domutil');
var Eventutil = require('../util/Eventutil');

var dnd = (function() {
    function draggable(selectorName) {
        var draggableElement = Domutil.querySelector(selectorName);

        if (draggableElement.getAttribute('draggable')) {
            return;
        }

        draggableElement.setAttribute('draggable', true);
        Eventutil.addHandler(draggableElement, 'dragstart', _dragStart);
    }

    function _dragStart(event) {
        dragTarget = event.target;
        event.dataTransfer.setData('dragTarget', dragTarget);
    }

    return {
      draggable : draggable
    }
})();


describe('drag and drop', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
        loadFixtures('dragAndDrop.html');
    });

    it('해당 엘리멘트를 drag 가능한 객체로 만든다.', function() {
        var dndElement = document.getElementById('dnd1');
        dnd.draggable('#dnd1');
        expect(dndElement.getAttribute('draggable')).toEqual('true');
    });
});
