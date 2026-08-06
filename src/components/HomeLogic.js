function Home() {
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');
    let carouselDom = document.querySelector('.carousel');
    let listItemDom = document.querySelector('.carousel .list');
    


    nextDom.onclick = function () {
        showSlider('next');
    }
    prevDom.onclick = function () {
        showSlider('prev');
    }
    let animationDuration = 3000;
    let slideTimer = 5000;
    let runTimeOut;
    let autoSlideTimer;
    
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            showSlider('next');
        }, slideTimer);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }
    
    // Auto slide timer disabled
    // startAutoSlide();
    function showSlider(type) {
        let itemSlider = document.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            listItemDom.appendChild(itemSlider[0]);
            carouselDom.classList.add('next');
        } else {
            let lastItem = itemSlider[itemSlider.length - 1];
            listItemDom.insertBefore(lastItem, itemSlider[0]);
            carouselDom.classList.add('prev');
        }
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, animationDuration);
    }

}
export default Home