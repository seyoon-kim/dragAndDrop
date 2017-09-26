var Domutil = require('../util/Domutil');
var Eventutil = require('../util/Eventutil');

function draggable(selectorName) {
    var draggableElement = Domutil.querySelector(selectorName);
    draggableElement.setAttribute('draggable', true);
    Eventutil.addHandler(draggableElement, 'dragstart', function(event) {
        event.dataTransfer.setData('dragTarget', event.target);
    });
}

module.exports = {
    draggable : draggable
}
