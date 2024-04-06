import { Element } from './element.js';
import { Point } from './point.js';
export class ElementList {
    elements;
    constructor() {
        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
        element.setElementList(this);
    }

    removeElement(id) {
        const index = this.elements.findIndex(element => element.id === id);
        if (index !== -1) {
            this.elements.splice(index, 1);
        }
    }

    getElementById(id) {
        return this.elements.find(element => element.id === id);
    }

    render() {
        // remove all elements
        document.querySelectorAll('.draggable-element').forEach(element => {
            element.remove();
        });
        this.elements.forEach(element => {
            // console.log(element);
            element.render();
        });
    }

    saveData() {
        let data = this.elements.map(element => {
            return {
                id: element.id,
                position: element.position,
                innerHTML: element.innerHTML,
            }
        });
        chrome.storage.local.set({ 'data': data }, function () {
            // do nothing
        });
    }

    async loadData() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['data'], (result) => {
                console.log(result.data);
                if (result.data) {
                    this.elements = result.data.map(data => {
                        let element = new Element(data.id, data.position, data.innerHTML);
                        element.onClick = data.onClick;
                        element.setElementList(this);
                        return element;
                    });
                }else{
                    this.resetElement();
                }
                resolve();
            });
        });
    }
    resetElement() {
        this.elements = [];
        let Add_btn = new Element("add-btn", new Point(0, 0), 
        `<button id="add-btn" class="add-btn">ADD NEW ELEMENT</button>
        `);

        let Title = new Element("title", new Point(200, 0), 
        `<h1 id="title" class="title"> Wellcome To Newtab Canvas </h1>`);
        this.addElement(Add_btn);
        this.addElement(Title);

        this.saveData();
        this.render();
    }

    

}