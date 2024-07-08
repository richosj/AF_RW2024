document.addEventListener('DOMContentLoaded', () => {
    const imgContainers = document.querySelectorAll('.business__imgs');

    if (!imgContainers.length) {
        return; // .business__imgs 요소가 없으면 스크립트를 실행하지 않음
    }

    imgContainers.forEach(imgContainer => {
        // 모든 img 요소를 선택합니다.
        const imgElements = imgContainer.querySelectorAll('img[data-src]');

        console.log(imgElements.length);

        // 로더 표시 함수
        const showLoader = (img) => {
            const loader = document.createElement('div');
            loader.classList.add('loader');
            loader.innerText = 'Loading...';
            img.parentNode.appendChild(loader);
        };

        // 로더 제거 함수
        const hideLoader = (img) => {
            const loader = img.parentNode.querySelector('.loader');
            if (loader) loader.remove();
        };

        // 이미지 로딩 완료 핸들러
        const onImageLoad = (event) => {
            const img = event.target;
            hideLoader(img);
        };

        // 이미지 로딩 에러 핸들러
        const onImageError = (event) => {
            const img = event.target;
            hideLoader(img);
            img.alt = 'Failed to load image';
        };

        // 각 이미지 요소에 대해 처리합니다.
        imgElements.forEach(img => {
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                const newSrc = !document.querySelector('.solution') 
                    ? `assets/images/business/${dataSrc}` 
                    : `assets/images/solution/${dataSrc}`;

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
    const buttons = document.querySelectorAll('button[data-trigger="modal"]');

    // 모달 열기 함수
    const openModal = (modal) => {
        modal.style.display = 'block';
    };

    // 모달 닫기 함수
    const closeModal = (modal) => {
        modal.style.display = 'none';
    };

    // 버튼 클릭 이벤트 리스너를 추가합니다.
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            const modal = document.querySelector(target);

            if (modal) {
                openModal(modal);

                // 모달 닫기 버튼 이벤트 리스너를 추가합니다.
                const closeButton = modal.querySelector('.close');
                if (closeButton) {
                    closeButton.addEventListener('click', () => closeModal(modal));
                }

                // 모달 외부 클릭 시 닫기 이벤트 리스너를 추가합니다.
                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        closeModal(modal);
                    }
                });
            }
        });
    });
});
