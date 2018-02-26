import {html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import { Transition } from "./transition";

export const KeyboardControls = SuperClass => class extends Transition(SuperClass) {

    connectedCallback() {
        super.connectedCallback();
        this.__onTapKeyboardBind = this.__onTapKeyboard.bind(this);
    }

    __onTapKeyboard(event) {
        document.onkeydown = this.__onKeyDown(event);
    }

    __onKeyDown(event) {
        if (event.keyCode === 39 || event.keyCode === 37) {
            this.__assignSlide(event.keyCode === 39);
        }
    }

}