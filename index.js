/** @flow */

import onButtonClick from "./utils/btnClick.js";
import appendStyle from "./utils/appendStyle.js";
import format from "./utils/stringFormat.js";
import btnLeft from "./assets/chevron-left-solid-full.svg";
import btnRight from "./assets/chevron-right-solid-full.svg";
import style from "./assets/photocarousel.css";
// $FlowFixMe[cannot-resolve-module]
import template from "./assets/photocarousel.html";

// $FlowFixMe[cannot-resolve-name]
class PhotoCarousel extends HTMLElement {
    #photoIndex = 0;
    #photos: Array<string>;
    
    connectedCallback() {
        this.innerHTML = format(
            template,
            {
                title: this.title,
                author: this.getAttribute("author"),
                btnBack: btnLeft,
                btnForward: btnRight
            }
        );
        this.innerHTML += appendStyle(style);

        this.#photos = this.getAttribute("photos").split(",");

        const btnBack = this.querySelector("button.back");
        const btnForward = this.querySelector("button.forward");
        const onBtnBackClick = onButtonClick.bind(this, this.#photos.length - 1);
        const onBtnForwardClick = onButtonClick.bind(this, 1);

        this.showPhoto();
        btnBack.addEventListener("click", onBtnBackClick);
        btnForward.addEventListener("click", onBtnForwardClick);
    }

    updatePhotoIndex(delta: number = 1) {
        this.#photoIndex += delta;
        this.#photoIndex %= this.#photos.length;
    }

    showPhoto() {
        this.style.setProperty("--photo", `url(${this.#photos[this.#photoIndex]})`);
    }
}

declare export { PhotoCarousel };

// $FlowFixMe[cannot-resolve-name]
if (!customElements.get("fttl-photo-carousel"))
    // $FlowFixMe[cannot-resolve-name]
    customElements.define("fttl-photo-carousel", PhotoCarousel);
