const searchEl = document.querySelector('.search')
const searchInputEl = searchEl.querySelector('input')

// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener('click', function () {
  searchInputEl.focus()
})
//포커스 되면 통합검색 예시
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});
// 포커스가 해제(blur)되면 통합검색 예시 삭제
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});

//배지 움직이면 사라지게 하기
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle( function() {
  if(window.scrollY > 500){
    //배지 숨기기
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl,.6, {
      opacity:0,
      display:'none'
    });
    //버튼 보이기 !
    gsap.to(toTopEl, .2, {
      x:0
    });
  }
  else{
    //배지 보이기
    gsap.to(badgeEl,.6, {
      opacity:1,
      display:'block'
    });
    //버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x:100
    });
  }
}, 300));
//_.throttle(함수, 시간(m/s)) -> 0.3초에 한번씩 스크롤실행

// 버튼 클릭시 맨위로 스크롤
toTopEl.addEventListener('click',function() {
  gsap.to(window, .7, {
    scrollTo : 0
  });
});


//이미지 하나씩 순차적으로 등장
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl,index) {
    // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay : (index+1) * .7, //0.7, 1.4, 2.1, 2.7초 뒤에
    opacity:1 
  });
});

//슬라이드 new 생성자(클래스)  1 선택자  2 옵션
new Swiper('.notice-line .swiper-container', {
  direction:'vertical',  //수직
  autoplay:true,    //자동재생
  loop:true,   //반복재생 4번째 슬라이드 다음으로 첫번째 반복재생 
});

//이미지 수평 슬라이드
new Swiper('.promotion .swiper-container', {
  //direction: 'horizontal',
  slidesPerView: 3,           //한번에 보여줄 슬라이드 개수  
  spaceBetween: 10,          //슬라이드 사이 여백
  centeredSlides: true,     // 1번 슬라이드가 가운데 보이기
  loop:true,               //반복
  autoplay :{
    delay:5000
  },
  pagination:{
    el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable : true //사용자 페이지 번호 요소 제어 가능 여부
  },
  navigation:{
    prevEl: '.promotion .swiper-prev',         //왼쪽화살표 버튼
    nextEl: '.promotion .swiper-next',         //오른쪽 화살표 버튼
  }
});

// 슬라이드 2

new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})


//날짜 자동 계산

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();   //2021



/**
 * Promotion 슬라이드 토글 기능
 */
const promotionEl = document.querySelector('.promotion');                  // 슬라이드 영역 요소 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion');      // 슬라이드 영역를 토글하는 버튼 검색!
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion
  if(isHidePromotion){
    //숨김 처리!
     promotionEl.classList.add('hide');
  } else{
    //보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 에니매이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작시간
    {              //옵션
      y:size,
      repeat:-1,             //-1은 무한반복
      yoyo : true,            //한번 재생된게 다시 돌아가서 재생
      ease: Power1.easeOut,   // gsap easing 이미지 움직이는걸 자연스럽게
      delay:random(0, delay)
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})