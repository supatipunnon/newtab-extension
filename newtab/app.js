import {ElementList} from './classes/elementList.js';
const App = {
    elementList: new ElementList(),
    init() {
        this.elementList.loadData().then(() => {
            this.elementList.render();
        });
    },

    reset() {
        this.elementList.resetElement();
    }
};

window.App = App;

App.init();
document.addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        event.preventDefault(); // Prevent default behavior

        // Your custom behavior for Ctrl + Scroll
        if (event.deltaY < 0) {
            // Zoom in or increase size
            zoomIn();
        } else {
            // Zoom out or decrease size
            zoomOut();
        }
    }
}, { passive: false });


// Example functions for zooming in and out
function zoomIn() {
    // Implement your zoom-in logic here
    console.log('Zooming in');
}

function zoomOut() {
    // Implement your zoom-out logic here
    console.log('Zooming out');
}
