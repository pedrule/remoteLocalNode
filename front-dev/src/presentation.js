import {Element, html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';

export class Presentation extends Element {
    static get properties() {
        return {
            selected: {
                type: Number,
                value: 0
            },
            isAnimating: {
                type: Boolean,
                value: false
            },
        }
    }

    get slideCount() { return this.slides.length; }
    get activeSlideElement() { return this.slides[this.activeSlide];}

    static get template(){
        return html`
        <style include="iron-flex iron-flex-alignment">
        
        :host {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
        }
        
        @media print {
            :host {
                display: block;
                position: relative;
            }
        }
        </style>
        <content></content>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("switch", (event) => {
            this.__goToSlide(this.__getSlideNumberFromHash());
          });
    }

    __goToSlide(number, forward) {
        if (this.slideCount <= number || this.isAnimating) {
          return;
        }
        // Animate
        this.isAnimating = true;
        Promise.all([
          this.activeSlideElement.__hideSlide(forward),
          this.slides[number].__showSlide(forward)
        ]).then(function(){
          this.isAnimating = false;
          this.activeSlide = number;
          // Change navigator history
          history.pushState(null, null, '#' + number);
          dispatchSlideChangedEvent.call(this);
        }.bind(this));
    }

    __dispatchSlideChangedEvent() {
        let total = this.slides.length;
        let current = this.activeSlide;
        let event = new CustomEvent('SlideChanged', {
          'detail': { total: total, current: current }
        });
        this.dispatchEvent(event);
    }

    __registerSlide(slide) {
        this.slides.push(slide);
        this.goToSlide(getSlideNumberFromHash());
    }

    __previousSlide(){
        if(this.activeSlide > 0) {
            __slideToSlide(activeSlide-1);
        }
    }
    
    __nextSlide(){
        if(this.activeSlide < this.slideCount - 1) {
            __slideToSlide(activeSlide+1);
        }
    }

    __slideToSlide(number) {
        this.goToSlide(number, this.activeSlide < number);
    }

    __nextStep() {
        if(this.activeSlideElement) {
          this.__nextSlide();  
        }
      }
      
    __prevStep() {
    if(this.activeSlideElement) {
        this.__previousSlide();  
    }
    }

}

customElements.define('presentation', Presentation);  