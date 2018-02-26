import {Element, html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';


export class KeyboardControls extends Element{

    connectedCallback() {
        super.connectedCallback();
        this.__onTapKeyboardBind = this.__onTapKeyboard.bind(this);
    }

    __onTapKeyboard(event) {
        document.onkeydown = this.__onKeyDown(event);
    }

    __onKeyDown(event) {
        switch (event.keyCode) {
            case 39:
                this.parentNode.__nextStep();
                break;
            case 37:
                this.parentNode.__prevStep();
                break;
        }    
    }
}

customElements.define('keyboard-controls', KeyboardControls);  