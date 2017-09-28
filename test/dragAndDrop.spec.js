var domutil = require('../util/domutil');
var dnd = require('../src/dragAndDrop');
var arrayutil = require('../util/arrayutil');

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

    it('drag 가능한 객체를 해제한다.', function() {
        var dndElement = document.getElementById('dnd1');
        dnd.undraggable('#dnd1');
        expect(dndElement.getAttribute('draggable')).toEqual(null);
    });

    it('해당하는 복수의 엘리멘트를 drag 가능한 객체로 만든다.', function() {
        var dndElements = domutil.querySelectorAll('.my-dnd');
        dnd.draggable('.my-dnd');
        arrayutil.forEach(dndElements, function(index, value) {
            expect(value.getAttribute('draggable')).toEqual('true');
        });
    });
});
