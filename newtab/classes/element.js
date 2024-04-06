import { Point } from './point.js';
export class Element {
    id;
    position;
    innerHTML;
    element;
    elementList;

    constructor(id, position, innerHTML) {
        this.id = id;
        this.position = position;
        this.innerHTML = innerHTML;
    }

    setElementList(elementList) {
        this.elementList = elementList;
    }

    updatePosition() {
        let x = this.element.offsetLeft;
        let y = this.element.offsetTop;
        this.position = new Point(x, y);
    }

    render() {
        // remove old element
        let oldElement = document.getElementById(this.id);
        if (oldElement) {
            oldElement.remove();
        }

        let DragDiv = document.createElement('div');
        DragDiv.id = this.id;
        DragDiv.className = 'draggable-element';
        DragDiv.style.position = 'absolute';
        DragDiv.style.left = this.position.x + 'px';
        DragDiv.style.top = this.position.y + 'px';
        DragDiv.innerHTML = this.innerHTML;
        
        // set onclick event
        if (this.id === 'add-btn') {
            console.log("ad function");
            console.log(DragDiv.childNodes[0]);
            DragDiv.childNodes.forEach(child => {
                child.onclick = () => {
                    // random id for new element
                    let id = Math.random().toString(36).substring(7); 
                    let element = new Element(id, new Point(10, 10), 
                    `<h1>Element ${id}</h1>`
                    );

                    this.elementList.addElement(element);
                    this.elementList.saveData();
                    this.elementList.render();
                }
            });
        }
        


        this.element = DragDiv;
        document.body.appendChild(DragDiv);
        this.dragElement();
    }

    dragElement() {
        this.updatePosition();
        this.element.onmousedown = dragMouseDown.bind(this);

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        function elementDrag(e) {
            let target = this.element;
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // chech collision with edges
            if (target.offsetTop - pos2 < 0) {
                pos2 = 0;
            }
            if (target.offsetLeft - pos1 < 0) {
                pos1 = 0;
            }
            if (target.offsetTop - pos2 > window.innerHeight - target.offsetHeight) {
                pos2 = 0;
            }
            if (target.offsetLeft - pos1 > window.innerWidth - target.offsetWidth) {
                pos1 = 0;
            }

            // set the element's new position:
            target.style.top = (target.offsetTop - pos2) + "px";
            target.style.left = (target.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;

            // call update position
            this.updatePosition();
            this.elementList.saveData();
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement.bind(this);
            document.onmousemove = elementDrag.bind(this);
        }

    }
}
