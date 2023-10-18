class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .preview {
            display: flex;
            align-items: center;
            background-color: #f5f5f5;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
          }
  
          .preview__image {
            width: 100px;
            height: 150px;
            margin-right: 10px;
          }
  
          .preview__info {
            flex: 1;
          }
  
          .preview__title {
            font-size: 1.2em;
            font-weight: bold;
          }
  
          .preview__author {
            color: #666;
          }
        </style>
        <div class="preview">
          <img class="preview__image" src="${this.getAttribute('image')}" />
          <div class="preview__info">
            <h3 class="preview__title">${this.getAttribute('title')}</h3>
            <div class="preview__author">${this.getAttribute('author')}</div>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('book-preview', BookPreview);
  