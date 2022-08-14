import './spoiler.scss';

console.log('spoiler is enabled!!!');
// data-spoilers - spoilers wrapper (can have params
//for example data-spoilers="650,min"; data-spoilers="600,max"
// Для включения функции акардиона добавляем атрибут data-one-spoiler
// data-spoiler - attribute for toggle click button

const rootSelector = "[data-spoilers]";
const spoilersArray = document.querySelectorAll(rootSelector);

if (spoilersArray.length > 0) {
    const spoilersRegular = Array.from(spoilersArray).filter(
        function (item, index, self) {
            return !item.dataset.spoilers.split(",")[0];
        }
    )
    if ( spoilersRegular.length > 0 ) {
        initSpoilers(spoilersRegular);
    }
    const spoilersMedia = Array.from(spoilersArray).filter(
        function (item, index, self) {
            return item.dataset.spoilers.split(",")[0];
        }
    )

    if ( spoilersMedia.length > 0 ) {
        const breakpointsArray = [];
        spoilersMedia.forEach( item => {
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        //Получаем уникалные брейпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
        });

        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            //Обьекты с нужными условиями
            const spoilersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            //Событие
            matchMedia.addListener(function () {
                initSpoilers(spoilersArray, matchMedia)
            });
            initSpoilers(spoilersArray, matchMedia)
        });
    }
    function initSpoilers(spoilerArray, matchMedia = false) {
        spoilerArray.forEach(spoilersBlock => {
            spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
            if (matchMedia.matches || !matchMedia) {
                spoilersBlock.classList.add('_init');
                initSpoilerBody(spoilersBlock);
                spoilersBlock.addEventListener("click", setSpoilerAction)
            } else {
                spoilersBlock.classList.remove('_init');
                initSpoilerBody(spoilersBlock, false);
                spoilersBlock.removeEventListener("click", setSpoilerAction)
            }
        });
    }
    function initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
        const spoilerTitle = spoilerBlock.querySelectorAll('[data-spoiler]');
        if (spoilerTitle.length > 0 ) {
            spoilerTitle.forEach(spoilerTitle => {
                if (hideSpoilerBody) {
                    spoilerTitle.removeAttribute('tabindex');
                    if ( !spoilerTitle.classList.contains('_active')) {
                        spoilerTitle.nextElementSibling.hidden = true;
                    } else {
                        spoilerTitle.setAttribute('tabindex', '-1');
                        spoilerTitle.nextElementSibling.hidden = false;
                    }
                }
            })
        }
    }

    function setSpoilerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
            const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
            const spoilerBlock = spoilerTitle.closest('[data-spoiler]');
            const oneSpoiler = spoilerBlock.hasAttribute('data-one-spoiler') ? true : false;
            if (!spoilerBlock.querySelectorAll('._slide').length) {
                if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
                    hideSpoilerBody(spoilerBlock);
                }
                spoilerTitle.classList.toggle('_active');
                _slideToggle(spoilerTitle.nextElementSibling, 500)
            }
            e.preventDefault();
        }
    }
    function hideSpoilerBody(spoilerBlock) {
        const spoilerActiveTitle = spoilerBlock.querySelector('[data-spoiler]._active');
        if (spoilerActiveTitle) {
            spoilerActiveTitle.classList.remove('active');
            _slideUp(spoilerActiveTitle.nextElementSibling, 500)
        }
    }
}
//SlideToggle
let _slideUp = (target, duration = 500) => {
 if (!target.classList.contains('_slide')) {
     target.classList.add('_slide');
     target.style.transitionProperty = 'height, margin, padding';
     target.style.transitionDuration = duration + 'ms';
     target.style.height = target.offsetHeight + 'px';
     target.offsetHeight;
     target.style.overflow = 'hidden';
     target.style.height = 0;
     target.style.paddingTop = 0;
     target.style.paddingBottom = 0;
     target.style.marginTop = 0;
     target.style.marginBottom = 0;
     window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
     }, duration)
 }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration)
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}
// const headers = document.querySelectorAll("[data-spoiler]");
//
// headers.forEach(function (item) {
//     item.addEventListener("click", headerClick);
// });
//
// function headerClick() {
//     // this.nextElementSibling.classList.toggle("spoiler-open");
//     this.parentElement.classList.toggle("spoiler-open");
// }