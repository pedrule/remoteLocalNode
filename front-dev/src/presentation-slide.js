import {Element, html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';


export class PresentationSlide extends Element{
    

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

        :host(.active) {
            opacity: 1;
            z-index: 900;
        }
        
        #container{
            background: #242424;
            @apply --layout-center;
        }

        ::slotted(span){
            @apply --layout-flex;
        }

        </style>
        <div id="container" class="layout vertical center self-stretch flex">
            ${this.templateContent}
        </div>

        
        
        </style>
        <div id="content">
            <content></content>
        </div>
        `
    }

    static get templateContent(){
        return html`
        <div id="content" class="flex self-stretch"></div>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.parentNode.__registerSlide(this);
    }

    __showSlide(forward) {
        if(forward !== undefined) {
          this.classList.add("active");
          this.classList.add("forward-in");
          this.addEventListener("webkitAnimationEnd", __endAnimationOnNewSlide());
          return __promiseOnEvent("webkitAnimationEnd", this);
        } else {
          this.classList.add("active");
          return Promise.resolve("done");
        }
      }

      __hideSlide(forward){
        if (forward !== undefined) {
          this.classList.add("forward-out");
          this.addEventListener("webkitAnimationEnd", __endAnimationOnOldSlide());
          return __promiseOnEvent("webkitAnimationEnd", this);
        } else {
          this.classList.remove("active");
          return Promise.resolve("done");
        }
      }

      __promiseOnEvent(eventName, slide) {
        return new Promise(function(resolve){
          slide.addEventListener("webkitAnimationEnd", function(e){
            slide.removeEventListener("webkitAnimationEnd", this);
            resolve(slide);
          });
        });
      }

      __endAnimationOnOldSlide() {
        this.removeEventListener("webkitAnimationEnd", __endAnimationOnOldSlide());
        this.classList.remove("active");
        this.classList.remove("forward-out");
      }

      __endAnimationOnNewSlide() {
        this.removeEventListener("webkitAnimationEnd", __endAnimationOnNewSlide());
        this.classList.remove("forward-in");
      }

}

customElements.define('presentation-slide', PresentationSlide);  