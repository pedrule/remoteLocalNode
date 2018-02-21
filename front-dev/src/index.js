import { Element, html } from "PolymerElement";
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './slide.js';

export class Presentation extends Element{
    static get properties() {
        return {
            socket: {
                value: ()=>{
                    return io();
                },
                type: Object,
                observer: '__onChangeSocket'
            },

            selected: {
                type:Number,
                value: 0
            }
        }
    }
    static get template() {
        return html`
        <style include="iron-flex iron-flex-alignment">
            :host{
                @apply --layout-vertical;
                @apply --layout-fit;
            }
        </style>
            <iron-pages id="pages" selected="[[selected]]" class="flex">
                <my-slide title="première visite" idea="Les Web components et les frameworks actuels"></span></my-slide>
                <my-slide title="seconde visite"><span>Hello 1</span></my-slide>
                <my-slide title="encore une visite"><span>Hello 2</span></my-slide>
                <my-slide title="une nouvelle visite"><span>Hello 3</span></my-slide>
                <my-slide title="ceci est la dernière visite"><span>Hello 4</span></my-slide>
            </iron-pages>
        `
    }

    __onChangeSocket(arg) {
        if(arg)arg.emit('init-event');
        this.socketId = arg.id;
        arg.on('call-forward', (socket)=>{
            if(this.selected < this.$.pages.children.length-1)this.selected += 1
        });

        arg.on('call-backward', (socket)=>{
            this.selected >0 ? this.selected -= 1 : this.selected = 0;
        })
    }
}
customElements.define('my-presentation', Presentation);