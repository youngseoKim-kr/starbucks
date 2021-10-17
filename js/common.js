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

//날짜 자동 계산

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();   //2021