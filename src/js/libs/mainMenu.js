
export default class MainMenu {
    constructor(menuParam) {
        this.mainMenuStatus = {
            currentBreakpoint: '',
            subCatalog: {
                open: false,
                subCatalogNumber: 0
            },
            catalogMenu: {
                active: '',
                open: false,
            },
            mainMenu:{
                open: false
            }
        }

        this.mainMenuLinks = document.querySelector(".menu-header__list-wrapper");
        this.mainMenuList = document.querySelector(".menu-header__list");
        this.catalogMenu = document.querySelector(".catalog-header__list-wrapper");
        this.catalogMenuLinks = document.querySelectorAll("[data-menu]");
        this.subMenuWrapper = document.querySelector(".sub-menu-catalog");
        this.subMenuBlocks = document.querySelectorAll("[data-submenu]");
        this.backButton = document.querySelector('.catalog-header__back');
        this.burgerButton = document.querySelector('.icon-menu');
        this.catalogMenuButton = document.querySelector('.menu-header__catalog-link');

        this.initMobileMenu(menuParam)
        this.backButton.addEventListener('click', this.hideCatalogMenu)
        this.burgerButton.addEventListener('click', this.showMenu);
        this.catalogMenuButton.addEventListener('click',this.showCatalogMenu)
        this.subMenuBlocks.forEach(subMenuBlock => {
            subMenuBlock.hidden = true;
            this._slideUp(subMenuBlock);
        });

        this.catalogMenuLinks.forEach(catalogMenuLink => {
            catalogMenuLink.addEventListener('click', this.toogleShowSubcatalog)
        })
    }

    hideCatalogMenu = () => {
        this._slideUp(this.catalogMenu);
        if (this.mainMenuStatus.catalogMenu.open) {
            this.hideSubCatalog(this.mainMenuStatus.catalogMenu.subCatalogNumber);
        }
    }
    showCatalogMenu = (e) => {
        this._slideToggle(this.catalogMenu);
    }
    initMobileMenu = ({breakpoints}) => {
        const clientWidth = document.documentElement.clientWidth;
        if( clientWidth < breakpoints.tablet) {
            this.mainMenuLinks.hidden = true;
            this.catalogMenu.hidden = true;
        } else {
            this.mainMenuLinks.hidden = false;
            this.catalogMenu.hidden = false;
        }
    }
    showMenu = (e) => {
        e.target.disabled = true;
        this._slideToggle(this.mainMenuLinks);
        this._toogleClass(e.target,"menu-open");
        this.hideCatalogMenu();
        if (this.mainMenuStatus.catalogMenu.open) {
            this.mainMenuStatus.catalogMenu.open = false;
            this.hideSubCatalog(this.mainMenuStatus.catalogMenu.subCatalogNumber);
        }
        e.target.disabled = false;
    }
    hideSubCatalog  = (submenuNumber) => {
        this.subMenuBlocks.forEach(subMenuBlock => {
            if (subMenuBlock.dataset.submenu === submenuNumber) {
                this._slideUp(subMenuBlock)
            }
        })
    }

    showSubCatalog  = (submenuNumber) => {
        this.subMenuBlocks.forEach(subMenuBlock => {
            if (subMenuBlock.dataset.submenu === submenuNumber) {
                this._slideDown(subMenuBlock)
            }
        })
    }
    chechActiveItemMenu = () => {
        this.catalogMenuLinks.forEach(link => {
            if (this.mainMenuStatus.catalogMenu.open) {
                if( link.dataset.menu === this.mainMenuStatus.catalogMenu.subCatalogNumber){
                    link.classList.add('active');
                } else {
                    link.classList.remove('active')
                }
            } else {
                link.classList.remove('active')
            }
        })

    }
    toogleShowSubcatalog = (e) => {
        const target =  e.target;
        const submenuNumber = target.dataset.menu;

        if (submenuNumber ==="") {
            console.log("sub menu is not define!!!");
            return false;
        }
        if (this.mainMenuStatus.catalogMenu.open) {
            if (this.mainMenuStatus.catalogMenu.subCatalogNumber === submenuNumber) {
                this.mainMenuStatus.catalogMenu.open = false;
                this.hideSubCatalog(submenuNumber);
                // target.classList.remove('active');
                // this.mainMenuStatus.catalogMenu.active = '';
            } else {
                target.classList.add('active');
                this.hideSubCatalog(this.mainMenuStatus.catalogMenu.subCatalogNumber);
                this.showSubCatalog(submenuNumber);
                this.mainMenuStatus.catalogMenu.subCatalogNumber = submenuNumber;
            }

        } else {
            this.mainMenuStatus.catalogMenu.open = true;
            this.mainMenuStatus.catalogMenu.subCatalogNumber = submenuNumber;
            this.showSubCatalog(submenuNumber)
        }
        this.chechActiveItemMenu();
        // const target =  e.target;
        // const submenuNumber = target.dataset.menu;
        // if (submenuNumber ==="") {
        //     console.log("sub menu is not define!!!");
        //
        // } else {
        //     this.subMenuBlocks.forEach(subMenuBlock => {
        //         if (subMenuBlock.dataset.submenu === submenuNumber) {
        //             if (target.classList.contains('active')) {
        //                 target.classList.remove('active');
        //                 this.subMenuBlocks.forEach(subMenuBlock => {
        //                     this._slideUp(subMenuBlock);
        //                 });
        //             } else {
        //                 this.catalogMenuLinks.forEach(link => {
        //                     link.classList.remove('active');
        //                 })
        //                 target.classList.add('active');
        //                 this._openSubmenu(submenuNumber);
        //             }
        //         }
        //     })
        // }
        // if (this.tablet) {
        //     let menuHeaderItem = document.querySelectorAll(".menu-header__item");
        //     menuHeaderItem.forEach(item => {
        //         if ( item!== target){
        //             item.hidden = true;
        //         } else {
        //             item.hidden = false;
        //         }
        //     })
        // }
    }
    _openSubmenu = (submenuNumber) => {
        this.subMenuBlocks.forEach(subMenuBlock => {
            if (subMenuBlock.dataset.submenu === submenuNumber) {
                this._slideToggle(subMenuBlock);
            }
        });
    }
    _toogleClass  = (element, className) =>  {
        if  (element.classList.contains(className)) {
            element.classList.remove(className)
        }  else {
            element.classList.add(className)
        }
    }
    _slideUp = (target, duration = 500) => {
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
    _slideDown = (target, duration = 500) => {
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
    _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return this._slideDown(target, duration);
        } else {
            return this._slideUp(target, duration);
        }
    }
}