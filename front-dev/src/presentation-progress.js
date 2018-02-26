import {Element, html} from 'PolymerElement';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';


export class PresentationProgress extends Element{

    static get template(){
        return html`
        <style include="iron-flex iron-flex-alignment">
        :host {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
          }
          #progress {
            width: 10%;
            height: 100%;
            background: rgba(70,255,140,0.9);
            transition: width 0.5s;
          }
          
          @media print {
            :host {
              display: none;
            }
          }
        </style>
        <div id="progress"></div>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('slideChanged', this.__updateProgress.bind(this));
    }

    __updateProgress(e) {
        var percentage = e.detail.current / (e.detail.total-1) * 100;
        this.shadowRoot.querySelector("#progress").style.width = percentage + "%";
    }
}

customElements.define('presentation-progress', PresentationProgress);  