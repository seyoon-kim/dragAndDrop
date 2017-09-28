var dnd = require('./dragAndDrop');

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
