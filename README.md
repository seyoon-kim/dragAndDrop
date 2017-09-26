Drag & Drop 기능 개발
===============

# 소개

- 드래그엔 드랍을 구현하고 리뷰한다.
- 선행과제: 앞서 개발한 유틸리티가 커스텀 이벤트를 관리할 수 있도록 기능을 확장한다.

## 유틸리티에 커스텀 이벤트 관리 기능 추가

### 요구사항

- 객체 간 커스텀 이벤트를 등록, 발생시킬 수 있는 기능을 제공
- CustomEvents.mixin(targetObject) 처럼 믹스인 형태로 사용 가능하도록 작성
- targetObject 에는 on(), off(), fire() 메소드가 추가되어야 함
- 객체가 이벤트를 발생시키면(fire) 등록된(on) 커스텀 이벤트 핸들러들이 호출되어야 함.
- 이벤트 핸들러는 첫 번째 인자에 이벤트 발생 시 전달된 인자를 그대로 전달받음.
- 등록된 이벤트는 해제도(off) 가능해야 함.

## 예제 코드

~~~

var myObj = {};

function onDeleted(eventData) {
    console.log(eventData.message);
}

CustomEvents.mixin(myObj);

myObj.on('deleted', onDeleted);
myObj.fire('deleted', { message: 'test' });    // 콘솔에 test가 출력됨.
myObj.off('deleted', onDeleted);

~~~

## Drag & Drop 기능 개발

### 요구사항

- 특정 DOM엘리먼트에 사용해 Drag & Drop기능을 부여하는 라이브러리
- 특정 DOM엘리먼트에 사용해 Dropzone으로 설정할 수 있는 기능.
- 하나의 DOM엘리먼가 Drag & Drop, Dropzone 두 기능을 적용할 수 있다.
- 같은 기능을 두 번 이상 적용할 수 없다 (Drag & Drop을 같은 엘리먼트에 적용 불가 처리)
- 엘리먼트가 Dropzone에 드롭되면 커스텀 이벤트가 발생한다.
- Drag가능 엘리먼트와 Dropzone은 동적으로 추가/제거가 가능해야 한다.
- (option) Dropzone에 드롭될 때 커스텀 이벤트에 겹친 상태인지 완전히 포함된 상태인지 데이터를 제공한다.

## 서비스 코드 예제

~~~

<div id="dnd1"></div>
<div id="dnd2"></div>
<div class="my-dnd"></div>
<div class="my-dnd"></div>
<div id="drop1"></div>
<div id="drop2"></div>

<script>
(function() {
    dnd.draggable('#dnd1');
    dnd.draggable('.my-dnd');    // 2개 엘리먼트 처리
    var dropzone1 = dnd.dropzone('#drop1');    // Dropzone은 인스턴스를 반환하고 한번에 하나의 dropzone을 생성할 수 있다.
    var dropzone2 = dnd.dropzone('#drop2');

    dropzone1.on('drop', function(eventData) {
        console.log(eventData.target);    // 드롭 된 엘리먼트
        console.log(eventData.isContain);    // 완전 포함 여부
    });
})();
</script>

~~~
