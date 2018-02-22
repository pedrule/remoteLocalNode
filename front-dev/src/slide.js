import {Element, html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';


export class MySlide extends Element{
    static get properties() {
        return {
            title: {
                type: String,
            },
        }
    }
    static get template(){
        return html`
        <style include="iron-flex iron-flex-alignment">
            :host{
                width: 100%;
                height: 100%;
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-flex;
            }

            #container{
                background: #242424;
                @apply --layout-center;
            }
            #titre{
                background: #ffcc33;
                font-size: XX-large;
                text-transform: uppercase;
                font-style: oblique;
                padding-left: 150px;
                color: grey; 
                height: 50px;
            }

            ::slotted(span){
                @apply --layout-flex;
            }
        </style>
        <div id="container" class="layout vertical center self-stretch flex">
            <div id="titre" class="layout vertical self-stretch">[[title]]</div>
            ${this.templateContent}
        </div>
        `
    }

    static get templateContent(){
        return html`
        <div class="flex self-stretch"></div>
        `
    }
}

customElements.define('my-slide', MySlide);