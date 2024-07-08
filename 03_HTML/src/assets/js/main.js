document.addEventListener('DOMContentLoaded', function () {
    function section01() {
        // ScrollTrigger 인스턴스 제거
        const existingTrigger = ScrollTrigger.getById('st-story-visual-motion');
        if (existingTrigger) {
            existingTrigger.kill();
        }
        // 비디오 로드 및 재생
        const videoElement = document.getElementById('video');
        if (videoElement) {
            videoElement.load();
            videoElement.play();
        }
        // Clippath 값 계산
        const visualClippath = (window.innerWidth > window.innerHeight) ? 0 : ((window.innerHeight - window.innerWidth) / 4);
        // GSAP 타임라인 설정
        const visualTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'st-story-visual-motion',
                trigger: '.story-visual',
                pin: '.story-visual__video',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });

        // 애니메이션 추가
        visualTimeline
        .addLabel('step1')
        .to('.story-visual__content-item--01', { opacity: 0, duration: 1 }, 'step1')
        .to('.story-visual__content-item--02', { opacity: 1, duration: 1 }, 'step1')
        .to('.story-visual__down', { opacity: 0, duration: 0.5 }, 'step1')

        .addLabel('step2')
        .to('.story-visual__content-item--02', { opacity: 0, duration: 1 }, 'step2')
        .to('.story-visual__content-item--03', { opacity: 1, duration: 1 }, 'step2')

        .addLabel('step3')
        .to('.story-visual__content-item--03', { opacity: 0, duration: 1 }, 'step3')
        .to('.story-visual__video-inner', {
            scale: 0.7882,
            clipPath: `inset(${visualClippath}rem 0 round 5rem)`,
            duration: 0.7,
            delay: 0.3
        }, 'step3')

        .addLabel('step4')
        .fromTo('.story-visual__scene', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 'step4');
    }

    function section02() {

        let startTitle = document.querySelector('.business-visual__center')
        //let startTitles= document.querySelector('.business-visual__item--01')
        let lastProgress = 0;
        let valp = 0.4

        let businessTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.business-stage',
                start: 'top center',
                end: 'bottom bottom',
                pin: startTitle,
                //markers: {startColor: "black", endColor: "black", fontSize: "18px", fontWeight: "bold", indent: 20},
                scrub: true,
                onUpdate: self => {
                    const progress = self.progress;
                    const wheel = document.querySelector('.wheel');
                        const images = document.querySelectorAll('.wheel .gall-img');

                    if (progress < valp && lastProgress >= valp) {
                        //gsap.to('.business-visual__item--01', { opacity: 1, duration: 0.5 });
                    } else if (progress >= valp && lastProgress < valp) {
                        //gsap.to('.business-visual__item--01', { opacity: 0, duration: 0.5 });    
                    }

                    images.forEach(function(img,idx){
                        if((Math.round(progress * 10)) > idx){
                            img.style.opacity = 1;
                        } else {
                            img.style.opacity = 0;
                        }
                    })
                    
                    if(progress < 0.2){
                        gsap.to(wheel,{ transform : 'translate3d(0px, 0px, 30px)'})
                    } else {
                        let dd = progress * 1000;
                        if(dd > 898){
                            dd = 898;
                        }
                        
                        if(Math.round(progress * 10) > 4){
                            
                        }
                        if(Math.round(progress * 10) > 5){
                            
                        }
                    
                        gsap.to(wheel,{ transform : 'translate3d(0px, 0px, '+dd+'px)'})
                    }
                    lastProgress = progress;
                },
                onLeave : () => {
                    console.log('leave')
                }
            }
        })

        let mbusinessTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.business-stage',
                start: 'top bototm',
                end: 'bottom bottom',
                pin: '.businiss-visual-gallery',
                //markers: {startColor: "black", endColor: "black", fontSize: "18px", fontWeight: "bold", indent: 20},
                scrub: true,
                onUpdate: self => {
                    
                }
            }
        })

        let bsn = (document.querySelector('.business-visual__item--01').offsetHeight / 2) * -1;
        businessTimeline.fromTo('.business-visual__item--01' , { y : 150 } , { y : bsn , duration: 0.5})
        
        businessTimeline.to('.business-visual__item--01 h2,.business-visual__item--01 p', { duration: 1, color: "#fff" }, 'busi2');
        
    }

    function section03() {

        ScrollTrigger.getById('solution__sticky')?.kill();

        const slowedImages = document.querySelectorAll('.slowed-image .imgVid');
        const slowedImagesWrapper = document.querySelector('.slowed-images');

        let solutionTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'solution__sticky',
                trigger: '#mainSolution',
                pin: '.solution--titles',
                start: 'top top',
                end: 'bottom bottom',
                toggleClass: 'red',
                scrub: 0.5,
            },
            y: window.innerHeight - document.querySelector('.solution--titles').offsetHeight
        })

        solutionTimeline.addLabel('a');
        solutionTimeline.to('.solution-visual__item--01 h2,.solution-visual__item--01 p', { startAt: { color: '#fff' }, color: '#000', duration: 1 }, 'a');

        solutionTimeline.addLabel('b');

        let elements = gsap.utils.toArray(slowedImages);

        elements.forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    scrub: true,
                    start: "top 100%",
                    //markers: {startColor: "black", endColor: "black", fontSize: "18px", fontWeight: "bold", indent: 20}
                },
                scale: 1,
                y: 0
            }, 'b');
        });

        solutionTimeline.addLabel('c');
        solutionTimeline.to('.solution-visual__item--01 .txt-g', { opacity: 0, duration: 0.7 }, 'c')
        solutionTimeline.to('.solution-visual__item--01 .bi-g', { opacity: 1, duration: 1.2, delay: 0.7 }, 'c')
        solutionTimeline.fromTo('.solution--visual__bi', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 1, }, 'c')
    }

    function section04() {
        ScrollTrigger.getById('about__sticky')?.kill();
        const startThumbsCaption = document.querySelector('.start-thumbs-caption');
        const moveThumbs = document.querySelectorAll('.move-thumb-inner');

        

        let aboutTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'about__sticky',
                trigger: '.end-thumbs-wrapper',
                start: 'top center',
                end: 'bottom 0%',
                toggleClass: 'wide',
                pin: true,
                scrub: true,
                //markers: {startColor: "black", endColor: "black", fontSize: "18px", fontWeight: "bold", indent: 20},
                onUpdate: self => {
                    let progress = self.progress; // 스크롤 진행 상황 (0에서 1 사이)
                    let insetValue = (100 * progress); // 진행 상황에 따른 inset 값 조정
                    let cutTop = 1 - self.progress;

                    //console.log(self.end - self.start)
                    const scrollProgress = (self.scroll() - self.start);
                    if(scrollProgress > 1){
                        //gsap.to(startThumbsCaption , { y: scrollProgress })
                        //startThumbsCaption.style.transform = `translateY(${scrollProgress}px)`
                    }
                    document.querySelector('.about-stage .wrap').style.width = insetValue + '%';
                    document.querySelector('.about-stage .wrap').style.clipPath = `inset(${cutTop}rem 0 0 ${cutTop}rem round 0rem 0rem 0 0)`;
                },
                onLeave: () => {
                    
                }
            }
        })
        
        aboutTimeline.addLabel('about1')
        aboutTimeline.fromTo('.end-move-thumb--01', { y: 100, opacity: 0 }, { y: '-5rem', opacity: 1, duration: 1 }, 'about1');
        aboutTimeline.fromTo('.end-move-thumb--02', { y: 100, opacity: 0 }, { y: '-5rem', opacity: 1, duration: 1, delay: 0.15 }, 'about1');
        aboutTimeline.fromTo('.end-move-thumb--03', { y: 100, opacity: 0 }, { y: '-5rem', opacity: 1, duration: 1, delay: 0.30 }, 'about1');

        aboutTimeline.addLabel('about2')
        aboutTimeline.to('.end-move-thumb--01', { y: -200, opacity: 0, duration: 0.7 }, 'about2');
        aboutTimeline.to('.end-move-thumb--02', { y: -200, opacity: 0, delay: 0.15, duration: 0.7 }, 'about2');
        aboutTimeline.to('.end-move-thumb--03', { y: -200, opacity: 0, delay: 0.3, duration: 0.7 }, 'about2');

        aboutTimeline.addLabel('about3')
        aboutTimeline.fromTo('.end-scen', { y: "50%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1 }, 'about3');

    }

    window.addEventListener('load', function () {
        section01();
        section02();
        section03();
        section04();
    })
})
window.addEventListener('resize', () => {
    // 디바운싱을 추가하여 성능을 향상
    clearTimeout(window.resizingFinished);
    window.resizingFinished = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250); // 250밀리초 후에 refresh() 호출
});