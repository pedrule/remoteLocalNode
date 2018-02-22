import { Element } from "PolymerElement";
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';

export class Mobile extends Element{
    static get properties() {
        return {
            socket: {
                value: ()=>{
                    return io();
                },
                type: Object,
                observer: '__onChangeSocket'
            }
        }
    }
    static get template() {
        return `
            <style include="iron-flex iron-flex-alignment">
                :host{
                    width: 100%;
                    height: 100%;
                    @apply --layout-vertical;
                }

                .fit{
                    height: 100vh;
                    @apply --layout-center-center;
                    @apply --layout-vertical;
                    color: white;
                }

                #red{
                    background: red
                }

                #blue{
                    background: blue;
                }
            </style>
            <div class="wrapper layout horizontal" on-click="__triggerClick">
                <div id="red" class="fit flex">précédent</div>
                <div id="blue" class="fit flex">suivant</div>
            </div>
        `
    }

    __onChangeSocket(arg) {
        if(arg)arg.emit('init-event');
    }

    __triggerClick(event){
        let eventName = event.target.id === 'red' ? 'before-event' : "after-event";
        this.socket.emit(eventName);
    }
}
customElements.define('my-mobile-remote', Mobile);