import '../scss/main.scss';
//import $ from '../../node_modules/jquery';
import './libs/spoiler.js';
import './popap.js';
import './libs/dynamicAdapt.js';
import MainMenu from "./libs/mainMenu";
import './libs/slider.js';
import './tippyInit.js';


const menuParam = {
    topMenuSelector: "data-menu",
    catalogMenuSelector: "data-menu",
    catalogSubmenuSelector: "data-submenu",
    breakpoints: {
        tablet: 991.98,
        mobile: 767.98,
        mobileSmall: 479.98
    }
}

const mainMenu = new MainMenu(menuParam);
// document.addEventListener('resize', resizeWindow)
// document.addEventListener('DOMContentLoaded', documentInit);
// document.addEventListener('click', documentActions);
//
// function documentInit() {
//     catalogMenuInit();
//     menuInitForMobile();
// }
// function resizeWindow() {
//
// }
// function menuInitForMobile(e) {
//     let width = document.documentElement.clientWidth;
//     const headerMenu = document.querySelector(".menu-header__list");
//
// }
// function documentActions(e){
//     const targetElement = e.target;
//     if (targetElement.closest("[data-menu]")) {
//         catalogMenuActions(e)
//     }
//     if (targetElement.classList.contains('menu-header__catalog-link')) {
//         let catalogMenu = document.querySelector(".catalog-header__menu");
//         catalogMenu.classList.add('catalog-header__menu-open')
//         _slideDown(catalogMenu);
//     }
//     if (targetElement.classList.contains('icon-menu')) {
//         let catalogMenu = document.querySelector(".menu-header__list");
//         if (catalogMenu.classList.contains('menu-header__list-open')) {
//             catalogMenu.classList.remove('menu-header__list-open');
//             targetElement.classList.remove('menu-open');
//             let catalogMenu = document.querySelector(".catalog-header__menu");
//             _slideUp(catalogMenu);
//         } else {
//             catalogMenu.classList.add('menu-header__list-open');
//             targetElement.classList.add('menu-open');
//         }
//     }
// }
// function catalogMenuInit() {
//     let subMenuBlocks = document.querySelectorAll("[data-submenu]");
//     subMenuBlocks.forEach(subMenuBlock => {
//         subMenuBlock.hidden = true;
//         _slideUp(subMenuBlock);
//     });
// }
//
// function catalogMenuActions(e) {
//     const target =  e.target;
//     const submenuNumber = target.dataset.menu;
//     const menuLinks = document.querySelectorAll("[data-menu]");
//     if (submenuNumber ==="") {
//         console.log("sub menu is not define!!!");
//         let catalogMenu = document.querySelector(".catalog-header__menu");
//         _slideUp(catalogMenu);
//         let subMenuBlocks = document.querySelectorAll("[data-submenu]");
//         subMenuBlocks.forEach(subMenuBlock => {
//             _slideUp(subMenuBlock);
//         });
//
//     } else {
//         let subMenuBlocks = document.querySelectorAll("[data-submenu]");
//         if (target.classList.contains('active')) {
//             target.classList.remove('active');
//             subMenuBlocks.forEach(subMenuBlock => {
//                 _slideUp(subMenuBlock);
//             });
//         } else {
//             menuLinks.forEach(link => {
//                 link.classList.remove('active');
//             })
//             target.classList.add('active');
//             subMenuBlocks.forEach(subMenuBlock => {
//                 if (subMenuBlock.dataset.submenu === submenuNumber) {
//                     _slideToggle(subMenuBlock);
//                 } else {
//                     _slideUp(subMenuBlock, 250);
//                 }
//             });
//         }
//     }
// }
//
// function showSubmenu(e) {
//     const el = e.target;
//     const menuNumber = el.dataset.menu;
//     subMenuBlocks.forEach( subMenuBlock => {
//         if (subMenuBlock.dataset.submenu === menuNumber) {
//             _slideToggle(subMenuBlock);
//         } else {
//             _slideUp(subMenuBlock, 250);
//         }
//     })
// }


