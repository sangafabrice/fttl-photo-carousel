/** @flow */

import type { PhotoCarousel } from "../index.js";

export default function onButtonClick(
    this: PhotoCarousel,
    delta: number
) {
    this.updatePhotoIndex(delta);
    this.showPhoto();
}