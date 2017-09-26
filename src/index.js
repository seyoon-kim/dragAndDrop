var dnd = require('./dragAndDrop');
console.log(dnd)
dnd.draggable('#dnd1');
// dnd.draggable('.my-dnd');    // 2개 엘리먼트 처리
// var dropzone1 = dnd.dropzone('#drop1');    // Dropzone은 인스턴스를 반환하고 한번에 하나의 dropzone을 생성할 수 있다.
// var dropzone2 = dnd.dropzone('#drop2');
//
// dropzone1.on('drop', function(eventData) {
//     console.log(eventData.target);    // 드롭 된 엘리먼트
//     console.log(eventData.isContain);    // 완전 포함 여부
// });
