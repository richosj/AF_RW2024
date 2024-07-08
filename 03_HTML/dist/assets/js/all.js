(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var imgContainers = document.querySelectorAll('.business__imgs');
  if (!imgContainers.length) {
    return; // .business__imgs 요소가 없으면 스크립트를 실행하지 않음
  }
  imgContainers.forEach(function (imgContainer) {
    // 모든 img 요소를 선택합니다.
    var imgElements = imgContainer.querySelectorAll('img[data-src]');
    console.log(imgElements.length);

    // 로더 표시 함수
    var showLoader = function showLoader(img) {
      var loader = document.createElement('div');
      loader.classList.add('loader');
      loader.innerText = 'Loading...';
      img.parentNode.appendChild(loader);
    };

    // 로더 제거 함수
    var hideLoader = function hideLoader(img) {
      var loader = img.parentNode.querySelector('.loader');
      if (loader) loader.remove();
    };

    // 이미지 로딩 완료 핸들러
    var onImageLoad = function onImageLoad(event) {
      var img = event.target;
      hideLoader(img);
    };

    // 이미지 로딩 에러 핸들러
    var onImageError = function onImageError(event) {
      var img = event.target;
      hideLoader(img);
      img.alt = 'Failed to load image';
    };

    // 각 이미지 요소에 대해 처리합니다.
    imgElements.forEach(function (img) {
      var dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        var newSrc = !document.querySelector('.solution') ? "assets/images/business/".concat(dataSrc) : "assets/images/solution/".concat(dataSrc);

        // 로더를 표시합니다.
        showLoader(img);

        // 이벤트 리스너를 추가합니다.
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageError);

        // src 속성을 설정하여 이미지를 로드합니다.
        img.setAttribute('src', newSrc);
      }
    });
  });

  // 모든 버튼 요소를 선택합니다.
  var buttons = document.querySelectorAll('button[data-trigger="modal"]');

  // 모달 열기 함수
  var openModal = function openModal(modal) {
    modal.style.display = 'block';
  };

  // 모달 닫기 함수
  var closeModal = function closeModal(modal) {
    modal.style.display = 'none';
  };

  // 버튼 클릭 이벤트 리스너를 추가합니다.
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var target = button.getAttribute('data-target');
      var modal = document.querySelector(target);
      if (modal) {
        openModal(modal);

        // 모달 닫기 버튼 이벤트 리스너를 추가합니다.
        var closeButton = modal.querySelector('.close');
        if (closeButton) {
          closeButton.addEventListener('click', function () {
            return closeModal(modal);
          });
        }

        // 모달 외부 클릭 시 닫기 이벤트 리스너를 추가합니다.
        window.addEventListener('click', function (event) {
          if (event.target === modal) {
            closeModal(modal);
          }
        });
      }
    });
  });
});

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // GSAP과 ScrollTrigger를 등록합니다.
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  var cardsWrap = document.querySelector('.cards__wrap');
  if (!cardsWrap) return;
  var cardsItem = document.querySelectorAll('.cards__figure');
  gsap.set('.cards__wrap', {
    clearProps: 'all'
  });
  gsap.set(cardsWrap, {
    height: cardsWrap.scrollHeight
  });
  var totalItems = cardsItem.length; // 이미지의 총 개수를 계산합니다.
  var progressArray = new Array(totalItems).fill(0); // 각 이미지의 진행률을 저장할 배열입니다.

  // 전체 진행률을 업데이트하는 함수입니다.
  function updateProgressBar() {
    var totalProgress = progressArray.reduce(function (sum, progress) {
      return sum + progress;
    }, 0) / totalItems;
    var progressPercentage = totalProgress * 100;
    document.querySelector('.progress__bar--gage').style.width = "".concat(progressPercentage, "%");
  }

  // 각 이미지에 대해 개별 스크롤 애니메이션을 설정합니다.
  cardsItem.forEach(function (image, idx) {
    set_scroll_image(image, idx);
  });
  function set_scroll_image(image, imageNo) {
    gsap.to(image, {
      y: -240,
      scrollTrigger: {
        id: "st-promotion-image-".concat(imageNo),
        trigger: image,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: function onUpdate(self) {
          // 개별 이미지의 진행률을 저장합니다.
          progressArray[imageNo] = self.progress;
          updateProgressBar(); // 전체 진행률을 업데이트합니다.
        },
        onLeave: function onLeave(self) {
          // 스크롤이 앞으로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = 1;
          updateProgressBar();
        },
        onLeaveBack: function onLeaveBack(self) {
          // 스크롤이 뒤로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = 0;
          updateProgressBar();
        },
        onEnterBack: function onEnterBack(self) {
          // 스크롤이 뒤에서 다시 앞으로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = self.progress;
          updateProgressBar();
        }
      }
    });
  }
});

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

//import * as validate from './validation.js';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
var globalCheckVar = null;
var OldGlobalCheckVar = null;
var mediaScreen = {
  sm: 576,
  md: 768,
  lg: 1000,
  xl: 1440,
  xxl: 1660
};
var body = document.body;
var header = document.getElementById('header');
var btnMobile = document.getElementById('btnMobile');
var gnbItems = document.querySelectorAll('#gnb > li');
var mobileMenuUL = document.querySelector('ul.mobile-menu');
var mobileMenus = document.querySelectorAll('ul.mobile-menu .menuitem');
var dropdownButtons = document.querySelectorAll(".dropdownButton");
var checkScreen = function checkScreen() {
  var width = window.innerWidth;
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
var initClassList = function initClassList() {
  globalCheckVar = checkScreen();
  document.body.classList.add(globalCheckVar);
};
var handleMobileButtonClick = function handleMobileButtonClick() {
  console.log('Mobile clicked');
  btnMobile.classList.toggle('active');
  body.classList.toggle('mobile-active');
};
mobileMenuUL.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('menuitem')) {
    event.preventDefault();
    var parentLi = event.target.parentElement;
    var siblings = parentLi.parentElement.children;
    Array.prototype.forEach.call(siblings, function (sibling) {
      if (sibling !== parentLi) {
        sibling.classList.remove('active');
      }
    });
    parentLi.classList.toggle('active');
  }
});
var handleGnbItemMouseOver = function handleGnbItemMouseOver() {
  header.classList.add('open');
};
var handleGnbItemMouseOut = function handleGnbItemMouseOut() {
  header.classList.remove('open');
};
var handleDropdownButtonClick = function handleDropdownButtonClick(button, dropdownMenu, menuItems) {
  var isOpen = false;
  var toggleDropdown = function toggleDropdown() {
    isOpen = !isOpen;
    button.setAttribute("aria-expanded", isOpen);
    dropdownMenu.style.display = isOpen ? "block" : "none";
  };
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleDropdown();
  });
  button.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) toggleDropdown();
      menuItems[0].focus();
    }
  });
  menuItems.forEach(function (item, index) {
    item.addEventListener("keydown", function (event) {
      var _handleKeyDown$event$;
      var handleKeyDown = {
        ArrowDown: function ArrowDown() {
          event.preventDefault();
          menuItems[(index + 1) % menuItems.length].focus();
        },
        ArrowUp: function ArrowUp() {
          event.preventDefault();
          menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
        },
        Escape: function Escape() {
          toggleDropdown();
          button.focus();
        }
      };
      (_handleKeyDown$event$ = handleKeyDown[event.key]) === null || _handleKeyDown$event$ === void 0 || _handleKeyDown$event$.call(handleKeyDown);
    });
    item.addEventListener("click", function () {
      button.textContent = item.textContent;
      toggleDropdown();
    });
  });
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
      if (isOpen) {
        toggleDropdown();
      }
    }
  });
};

// 헤더 스크롤 이벤트
function headers() {
  var header = document.querySelector('.header');
  var breadcrumb = document.querySelector('.breadcrumb');
  var breadcrumbTop = header.offsetHeight;
  var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  function updateScrollDirection() {
    var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    var isScrollingDown = currentScrollY > lastScrollY;
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
  document.addEventListener('DOMContentLoaded', function () {
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // 초기 스크롤 상태 반영
    if (header.classList.contains('_sub') && breadcrumb) {
      var _breadcrumbTop = breadcrumb.getBoundingClientRect().top + window.scrollY;
      if (lastScrollY >= _breadcrumbTop) {
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
function updateMobileMenu() {
  // gnb 아이디를 가진 ul 태그를 선택
  var gnbUl = document.getElementById('gnb');
  // mobile-menu 클래스를 가진 ul 태그를 선택
  var mobileMenuUl = document.querySelector('ul.mobile-menu');
  if (!mobileMenuUl) return;
  // gnbUl의 자식 요소들을 모두 가져오기
  var gnbChildren = gnbUl.innerHTML;
  // mobileMenuUl에 gnbUl의 자식 요소들을 추가
  mobileMenuUl.innerHTML = gnbChildren;

  // gnb--li1 클래스를 가진 모든 li 요소 선택
  var gnbLiElements = document.querySelectorAll('#gnb .gnb--li1');
  var firstListUl = document.querySelector('ul.first-list');
  gnbLiElements.forEach(function (gnbLi) {
    var firstATag = gnbLi.querySelector('a'); // 첫 번째 a 태그 선택
    if (firstATag) {
      var newLi = document.createElement('li'); // 새로운 li 요소 생성
      newLi.appendChild(firstATag.cloneNode(true)); // a 태그를 복사하여 li에 추가
      firstListUl.appendChild(newLi); // 새로운 ul에 li 추가
    }
  });
}
// 서브 페이지 맨처음 intro 및 메뉴 active 설정
(function pageTitles() {
  var ulElement = document.querySelector('[data-page-title]');
  if (!ulElement) return;
  var liElements = ulElement.querySelectorAll('li');
  var pageTitle = ulElement.getAttribute('data-page-title');
  liElements.forEach(function (li) {
    if (li.textContent.trim() === pageTitle) {
      li.classList.add('_current');
    }
  });
  var introTitleElement = document.querySelector('.page_title');
  introTitleElement.textContent = pageTitle;

  // current
  var pageConentWrap = document.querySelector('[data-layout]');
  var pageConentTitle = pageConentWrap.getAttribute('data-current');
  var introBgElement = document.querySelector('.intro--banner_bg');
  introBgElement.classList.add('_' + pageConentTitle);
})();
var init = function init() {
  headers();
  updateMobileMenu();
  window.addEventListener('resize', function () {
    var screenType = checkScreen();
    if (screenType !== OldGlobalCheckVar) {
      var currentClasses = ['mobile', 'tablet', 'smalldesk', 'desktop', 'xxl-desktop'];

      // Remove any existing screen size class
      currentClasses.forEach(function (className) {
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
  mobileMenus.forEach(function (menu) {
    menu.addEventListener('click', handleMobileMenuClick);
  });
  gnbItems.forEach(function (item) {
    item.addEventListener('mouseover', handleGnbItemMouseOver);
    item.addEventListener('mouseout', handleGnbItemMouseOut);
  });
  dropdownButtons.forEach(function (button) {
    var dropdownMenu = document.getElementById(button.getAttribute("aria-controls"));
    var menuItems = dropdownMenu.querySelectorAll('[role="menuitem"]');
    handleDropdownButtonClick(button, dropdownMenu, menuItems);
  });
};
document.addEventListener("DOMContentLoaded", init);

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var refreshGsapAnimations = function refreshGsapAnimations() {
  // Kill existing ScrollTriggers
  ScrollTrigger.getAll().forEach(function (trigger) {
    return trigger.kill();
  });
  (function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ScrollTrigger.refresh();
    var intro = document.querySelector(".intro--banner");
    if (!intro) return;
    var isNonScroll = document.querySelector('[data-current]');
    var introTitle = document.querySelector(".intro--banner_title");
    var introBackground = document.querySelector(".intro--banner_bg");
    if (isNonScroll.getAttribute('data-current') == "board") {// 특정 페이지에서 기능 미작동을 위한 조건문
    } else {
      var introStroy = gsap.timeline({
        scrollTrigger: {
          id: 'sub_introTitle',
          trigger: intro,
          start: 'top top',
          end: 'bottom center',
          //toggleClass : 'scroll',
          pin: false,
          //markers : true,
          scrub: 0.3,
          onUpdate: function onUpdate(self) {
            var scrollPos = self.progress * (window.innerHeight - introTitle.offsetHeight) / 2;
            introTitle.style.top = "".concat(scrollPos, "px");
          }
        }
      });
      introStroy.to(introTitle, {
        color: '#fff',
        duration: 0.4
      });
    }
    if (isNonScroll.classList.contains('promotion')) return;
    var introStroyBg = gsap.timeline({
      scrollTrigger: {
        id: 'sub_intro',
        trigger: intro,
        start: 'top top-=10%',
        end: 'bottom center',
        pin: false,
        scrub: 0.3,
        onLeave: function onLeave() {
          //console.log('introStroy end');
        }
      }
    });
    introStroyBg.to(introBackground, {
      maxWidth: '100%',
      duration: 2,
      borderRadius: '0rem'
    }).to(introTitle.querySelectorAll("h2, p"), {
      color: '#fff',
      ease: 'none'
    }, 0);
  })();
};
refreshGsapAnimations();
window.addEventListener('resize', function () {
  refreshGsapAnimations();
});

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
    1. input value;
*/
// 이메일 직접입력 select
var dirDomain = function dirDomain(el) {
  var domainList = el;
  domainList = domainList.value;
  if (domainList === "직접입력") {
    el.previousElementSibling.value = "";
    el.disabled = false;
  } else {
    el.previousElementSibling.value = domainList;
    el.previousElementSibling.disabled = true;
  }
};
var validateForm = function validateForm(el) {
  var f = el;
  // 이메일 check
  var email = f.firstEmail.value + "@" + f.secondEmail.value;
  if (!validateEmail(email)) {
    alert("error");
    return;
  }
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 핸드폰 번호 체크
  var phoneNumber = f.phoneNumber.value;
  if (!validatePhoneNumber(phoneNumber)) {
    alert("error");
    return;
  }
  function validatePhoneNumber(phoneNumber) {
    var phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
  //const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
};

},{}]},{},[1]);

//# sourceMappingURL=all.js.map
