document.addEventListener('DOMContentLoaded', function(){
     // GSAP과 ScrollTrigger를 등록합니다.
     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

     const cardsWrap = document.querySelector('.cards__wrap');

     if(!cardsWrap) return;

     const cardsItem = document.querySelectorAll('.cards__figure');
     gsap.set('.cards__wrap', { clearProps: 'all' });
     gsap.set(cardsWrap, { height: cardsWrap.scrollHeight });
 
     const totalItems = cardsItem.length; // 이미지의 총 개수를 계산합니다.
     const progressArray = new Array(totalItems).fill(0); // 각 이미지의 진행률을 저장할 배열입니다.
 
     // 전체 진행률을 업데이트하는 함수입니다.
     function updateProgressBar() {
         const totalProgress = progressArray.reduce((sum, progress) => sum + progress, 0) / totalItems;
         const progressPercentage = totalProgress * 100;
         document.querySelector('.progress__bar--gage').style.width = `${progressPercentage}%`;
     }
 
     // 각 이미지에 대해 개별 스크롤 애니메이션을 설정합니다.
     cardsItem.forEach((image, idx) => {
         set_scroll_image(image, idx);
     });
 
     function set_scroll_image(image, imageNo) {
         gsap.to(image, {
             y: -240,
             scrollTrigger: {
                 id: `st-promotion-image-${imageNo}`,
                 trigger: image,
                 start: 'top bottom',
                 end: 'bottom center',
                 scrub: 0.5,
                 onUpdate: self => {
                     // 개별 이미지의 진행률을 저장합니다.
                     progressArray[imageNo] = self.progress;
                     updateProgressBar(); // 전체 진행률을 업데이트합니다.
                 },
                 onLeave: self => {
                     // 스크롤이 앞으로 이동할 때 진행률을 업데이트합니다.
                     progressArray[imageNo] = 1;
                     updateProgressBar();
                 },
                 onLeaveBack: self => {
                     // 스크롤이 뒤로 이동할 때 진행률을 업데이트합니다.
                     progressArray[imageNo] = 0;
                     updateProgressBar();
                 },
                 onEnterBack: self => {
                     // 스크롤이 뒤에서 다시 앞으로 이동할 때 진행률을 업데이트합니다.
                     progressArray[imageNo] = self.progress;
                     updateProgressBar();
                 }
             }
         });
     }
})