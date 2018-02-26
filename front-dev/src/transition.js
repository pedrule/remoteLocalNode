import {html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';

export const Transition = SuperClass => class extends SuperClass {

    static get properties() {
        return {
            nextSlide: {
                type: Object,
                observer : "__nextSlideChanged"
            }
        }
    }

    __nextSlideChanged(arg) {
        if(arg != undefined) {
            switch (arg.transition) {
                case "none" :
                    arg.style.transition = "";
                    break;
                case "top" :
                    arg.style.transition = `translate3d(0, -${window.innerHeight}px, 0)`;
                    break;
                case "left" :
                    arg.style.transition = `translate3d(-${window.innerWidth}px, 0, 0)`;
                    break;
            }
        }
    }
}