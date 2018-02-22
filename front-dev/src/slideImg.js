import {MySlide} from './slide';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-flex-layout/iron-flex-layout';
import { html} from '@polymer/polymer/polymer-element';

export class SlideImg extends MySlide{
    static get properties() {
        return {
            src: {
                type: String,
            }
        }
    }
    static get templateContent() {
        return html`
        <style include="iron-flex iron-flex-alignment">
            iron-image{
                width: 100%;
                @apply --layout-flex;
            }
        </style>
        <iron-image src="[[src]]" preload sizing="contain"></iron-image>
        `
    }

}
customElements.define('slide-img', SlideImg)