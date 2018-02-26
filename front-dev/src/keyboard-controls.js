import {html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import { Transition } from "./transition";

export const KeyboardControls = SuperClass => class extends Transition(SuperClass) {

    connectedCallback() {
        super.connectedCallback();
    }

    __onTapKeyboard(event) {
        window.addEventListener('keydown', this.__onKeyDown.bind(this));
    }

    __onKeyDown(event) {
        if (event.keyCode === 39 || event.keyCode === 37) {
            this.__assignSlide(event.keyCode === 39);
        }
    }

}