import { Element, html } from "PolymerElement";
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './slideImg.js';
import slide1 from '../assets/slide1.PNG'
import classImg from '../assets/class.PNG'

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
        return `
        <style include="iron-flex iron-flex-alignment">
            :host{
                @apply --layout-vertical;
                @apply --layout-fit;
            }
        </style>
            <iron-pages id="pages" selected="[[selected]]" class="flex">
                <slide-img title="Cycle évenementiel d'un web-component" src=${slide1}></span></slide-img>
                <slide-img title="Extension des classes natives du HTML"  src=${classImg}><span>Hello 1</span></slide-img>
                <slide-img title="encore une visite"><span>Hello 2</span></slide-img>
                <slide-img title="une nouvelle visite"><span>Hello 3</span></slide-img>
                <slide-img title="ceci est la dernière visite"><span>Hello 4</span></slide-img>
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