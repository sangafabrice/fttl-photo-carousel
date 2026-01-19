/** @flow */

import onButtonClick from "./utils/btnClick.js";
import appendStyle from "./utils/appendStyle.js";
// $FlowFixMe[cannot-resolve-module]
import "https://unpkg.com/string-format@2.0.0/index.js";
import btnLeft from "./assets/chevron-left-solid-full.svg";
import btnRight from "./assets/chevron-right-solid-full.svg";
import style from "./assets/photocarousel.css";
// $FlowFixMe[cannot-resolve-module]
import template from "./assets/photocarousel.html";

declare function format(string, ...any): string;

// $FlowFixMe[cannot-resolve-name]
class PhotoCarousel extends HTMLElement {
    _photoIndex: number;
    _photos: Array<string>;
    
    connectedCallback() {
        this._photoIndex = 0;

        this.innerHTML = format(
            template,
            this.title,
            this.getAttribute("author"),
            btnLeft,
            btnRight
        );
        this.innerHTML += appendStyle(style);

        this._photos = this.getAttribute("photos").split(",");

        const btnBack = this.querySelector("button.back");
        const btnForward = this.querySelector("button.forward");
        const onBtnBackClick = onButtonClick.bind(this, this._photos.length - 1);
        const onBtnForwardClick = onButtonClick.bind(this, 1);

        this.showPhoto();
        btnBack.addEventListener("click", onBtnBackClick);
        btnForward.addEventListener("click", onBtnForwardClick);
    }

    updatePhotoIndex(delta: number = 1) {
        this._photoIndex += delta;
        this._photoIndex %= this._photos.length;
    }

    showPhoto() {
        this.style.setProperty("--photo", `url(${this._photos[this._photoIndex]})`);
    }
}

/*:: declare export { PhotoCarousel }; */

// $FlowFixMe[cannot-resolve-name]
if (!customElements.get("fttl-photo-carousel"))
    // $FlowFixMe[cannot-resolve-name]
    customElements.define("fttl-photo-carousel", PhotoCarousel);
