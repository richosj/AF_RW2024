const refreshGsapAnimations = () => {
  // Kill existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
(function() {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
  ScrollTrigger.refresh();
  const intro = document.querySelector(".intro--banner");
  if (!intro) return;

  const isNonScroll = document.querySelector('[data-current]');

  

  const introTitle = document.querySelector(".intro--banner_title");
  const introBackground = document.querySelector(".intro--banner_bg");
  
  if(isNonScroll.getAttribute('data-current') == "board"){ // 특정 페이지에서 기능 미작동을 위한 조건문
  

  } else {
    let introStroy = gsap.timeline({
      scrollTrigger: {
          id: 'sub_introTitle',
          trigger : intro,
          start : 'top top',
          end : 'bottom center',
          //toggleClass : 'scroll',
          pin : false,
          //markers : true,
          scrub: 0.3,
          onUpdate : (self) => {
              const scrollPos = self.progress * (window.innerHeight - introTitle.offsetHeight) / 2;
                  introTitle.style.top= `${scrollPos}px`;
          }
      }
    })
    introStroy.to(introTitle, { color : '#fff' , duration : 0.4});
  }
  
  if(isNonScroll.classList.contains('promotion')) return;

  let introStroyBg = gsap.timeline({ 
    scrollTrigger: {
        id: 'sub_intro',
        trigger : intro,
        start : 'top top-=10%',
        end : 'bottom center',
        pin : false,
        scrub: 0.3,
        onLeave : () => {
            //console.log('introStroy end');
        }
    }
  })
  introStroyBg.to(introBackground, { maxWidth : '100%' , duration : 2 , borderRadius : '0rem'})
  .to(introTitle.querySelectorAll("h2, p"), {
    color: '#fff',
    ease: 'none',
  }, 0)

  
})();
};
refreshGsapAnimations();
window.addEventListener('resize', function() { 
  refreshGsapAnimations();
})