//import * as validate from './validation.js';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let globalCheckVar = null;
let OldGlobalCheckVar = null;

const mediaScreen = {
  sm: 576,
  md: 768,
  lg: 1000,
  xl: 1440,
  xxl: 1660
};

const body = document.body;
const header = document.getElementById('header');
const btnMobile = document.getElementById('btnMobile');
const gnbItems = document.querySelectorAll('#gnb > li');
const mobileMenuUL = document.querySelector('ul.mobile-menu');
const mobileMenus = document.querySelectorAll('ul.mobile-menu .menuitem');
const dropdownButtons = document.querySelectorAll(".dropdownButton");

const checkScreen = () => {
  const width = window.innerWidth;

  if (width < mediaScreen.md) {
    globalCheckVar = "mobile";
  } else if (width < mediaScreen.lg) {
    globalCheckVar = "tablet";
  } else if (width < mediaScreen.xl) {
    globalCheckVar = "smalldesk";
  } else if (width < mediaScreen.xxl) {
    globalCheckVar = "desktop";
  } else {
    globalCheckVar = "xxl-desktop";
  }

  return globalCheckVar;
};

const initClassList = () => {
  globalCheckVar = checkScreen();
  document.body.classList.add(globalCheckVar);
};

const handleMobileButtonClick = () => {
  console.log('Mobile clicked');
  btnMobile.classList.toggle('active');
  body.classList.toggle('mobile-active');
};


mobileMenuUL.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('menuitem')) {
    event.preventDefault();
    const parentLi = event.target.parentElement;
    const siblings = parentLi.parentElement.children;
    Array.prototype.forEach.call(siblings, sibling => {
      if (sibling !== parentLi) {
        sibling.classList.remove('active');
      }
    });
    parentLi.classList.toggle('active');
  }
});

const handleGnbItemMouseOver = () => {
  header.classList.add('open');
};

const handleGnbItemMouseOut = () => {
  header.classList.remove('open');
};

const handleDropdownButtonClick = (button, dropdownMenu, menuItems) => {
  let isOpen = false;

  const toggleDropdown = () => {
    isOpen = !isOpen;
    button.setAttribute("aria-expanded", isOpen);
    dropdownMenu.style.display = isOpen ? "block" : "none";
  };

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleDropdown();
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) toggleDropdown();
      menuItems[0].focus();
    }
  });

  menuItems.forEach((item, index) => {
    item.addEventListener("keydown", (event) => {
      const handleKeyDown = {
        ArrowDown: () => {
          event.preventDefault();
          menuItems[(index + 1) % menuItems.length].focus();
        },
        ArrowUp: () => {
          event.preventDefault();
          menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
        },
        Escape: () => {
          toggleDropdown();
          button.focus();
        }
      };
      handleKeyDown[event.key]?.();
    });

    item.addEventListener("click", () => {
      button.textContent = item.textContent;
      toggleDropdown();
    });
  });

  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
      if (isOpen) {
        toggleDropdown();
      }
    }
  });
};

// 헤더 스크롤 이벤트
function headers() {
  const header = document.querySelector('.header');
  const breadcrumb = document.querySelector('.breadcrumb');
  const breadcrumbTop = header.offsetHeight;
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

  function updateScrollDirection() {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (header.classList.contains('_sub') && breadcrumb) {
          

          if (currentScrollY >= breadcrumbTop) {
              if (isScrollingDown) {
                  header.classList.add('hide');
                  header.classList.remove('up');
              } else {
                  header.classList.remove('hide');
                  if (currentScrollY > 0) {
                      header.classList.add('up');
                  } else {
                      header.classList.remove('up');
                  }
              }
          } else {
              header.classList.remove('hide', 'up');
          }
      } else {
          if (isScrollingDown) {
              header.classList.add('hide');
              header.classList.remove('up');
          } else {
              header.classList.remove('hide');
              if (currentScrollY > 0) {
                  header.classList.add('up');
              } else {
                  header.classList.remove('up');
              }
          }
      }

      lastScrollY = currentScrollY;
  }

  // 초기 스크롤 상태 반영
  document.addEventListener('DOMContentLoaded', () => {
      lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

      // 초기 스크롤 상태 반영
      if (header.classList.contains('_sub') && breadcrumb) {
          const breadcrumbTop = breadcrumb.getBoundingClientRect().top + window.scrollY;

          if (lastScrollY >= breadcrumbTop) {
              header.classList.add('up');
          } else {
              header.classList.remove('up');
          }
      } else {
          if (lastScrollY > 50) {
              header.classList.add('up');
          } else {
              header.classList.remove('up');
          }
      }
  });

  ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: updateScrollDirection
  });
}

// gnb copy => mobile paste
function updateMobileMenu(){
    // gnb 아이디를 가진 ul 태그를 선택
  const gnbUl = document.getElementById('gnb');
  // mobile-menu 클래스를 가진 ul 태그를 선택
  const mobileMenuUl = document.querySelector('ul.mobile-menu');
  if (!mobileMenuUl) return;
  // gnbUl의 자식 요소들을 모두 가져오기
  const gnbChildren = gnbUl.innerHTML;
  // mobileMenuUl에 gnbUl의 자식 요소들을 추가
  mobileMenuUl.innerHTML = gnbChildren;

  // gnb--li1 클래스를 가진 모든 li 요소 선택
  const gnbLiElements = document.querySelectorAll('#gnb .gnb--li1');
  const firstListUl = document.querySelector('ul.first-list');

  gnbLiElements.forEach(gnbLi => {
    const firstATag = gnbLi.querySelector('a'); // 첫 번째 a 태그 선택
    if (firstATag) {
      const newLi = document.createElement('li'); // 새로운 li 요소 생성
      newLi.appendChild(firstATag.cloneNode(true)); // a 태그를 복사하여 li에 추가
      firstListUl.appendChild(newLi); // 새로운 ul에 li 추가
    }
  });
}
// 서브 페이지 맨처음 intro 및 메뉴 active 설정
(function pageTitles(){
  const ulElement = document.querySelector('[data-page-title]');

  if (!ulElement) return;

  const liElements = ulElement.querySelectorAll('li');
  const pageTitle = ulElement.getAttribute('data-page-title');

  liElements.forEach(li => {
    if (li.textContent.trim() === pageTitle) {
      li.classList.add('_current');
    }
  });

  const introTitleElement = document.querySelector('.page_title');
  introTitleElement.textContent = pageTitle;

  // current
  const pageConentWrap = document.querySelector('[data-layout]');
  const pageConentTitle = pageConentWrap.getAttribute('data-current');

  const introBgElement = document.querySelector('.intro--banner_bg');

  introBgElement.classList.add('_'+pageConentTitle)
})()

const init = () => {
  
  headers();
  updateMobileMenu()

  window.addEventListener('resize', function() {
    const screenType = checkScreen();
    
    if (screenType !== OldGlobalCheckVar) {
      const currentClasses = ['mobile', 'tablet', 'smalldesk', 'desktop', 'xxl-desktop'];
  
      // Remove any existing screen size class
      currentClasses.forEach(className => {
        if (document.body.classList.contains(className)) {
          document.body.classList.remove(className);
        }
      });
  
      // Add the new screen size class
      document.body.classList.add(screenType);
  
      // Update the old global check variable
      OldGlobalCheckVar = screenType;
    }
  });
  
  initClassList();
  
  btnMobile.addEventListener('click', handleMobileButtonClick);
  mobileMenus.forEach(menu => {
    menu.addEventListener('click', handleMobileMenuClick);
  });

  gnbItems.forEach(item => {
    item.addEventListener('mouseover', handleGnbItemMouseOver);
    item.addEventListener('mouseout', handleGnbItemMouseOut);
  });

  dropdownButtons.forEach(button => {
    const dropdownMenu = document.getElementById(button.getAttribute("aria-controls"));
    const menuItems = dropdownMenu.querySelectorAll('[role="menuitem"]');
    handleDropdownButtonClick(button, dropdownMenu, menuItems);
  });
};
document.addEventListener("DOMContentLoaded", init);