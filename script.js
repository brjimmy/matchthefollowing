const dropZones = document.querySelectorAll('.drop-zone');
const leftColumn = document.querySelector('.left-column');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

// Randomize items on load
function randomizeItems() {
    const items = Array.from(leftColumn.querySelectorAll('.item'));
    items.sort(() => Math.random() - 0.5);
    items.forEach(item => leftColumn.appendChild(item));
}
window.addEventListener('load', randomizeItems);

// Add drag listeners
function applyDraggableListeners(item) {
    item.addEventListener('dragstart', () => item.classList.add('dragging'));
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
}
document.querySelectorAll('.item[draggable="true"]').forEach(applyDraggableListeners);

// Drop zone logic
dropZones.forEach((zone) => {
    zone.addEventListener('dragover', (e) => e.preventDefault());

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        leftColumn.replaceChild(placeholder, draggable);

        const pairedItem = draggable.cloneNode(true);
        pairedItem.classList.add('paired');
        zone.appendChild(pairedItem);

        pairedItem.addEventListener('click', () => returnToLeft(pairedItem, placeholder));
        draggable.remove();
    });
});

function returnToLeft(pairedItem, placeholder) {
    const restoredItem = document.createElement('div');
    restoredItem.className = 'item';
    restoredItem.setAttribute('draggable', 'true');
    restoredItem.textContent = pairedItem.textContent;
    applyDraggableListeners(restoredItem);
    leftColumn.replaceChild(restoredItem, placeholder);
    pairedItem.remove();
}

// Submit button logic
submitBtn.addEventListener('click', () => {
    dropZones.forEach(zone => {
        const pairedItem = zone.querySelector('.paired');
        const resultIcon = zone.querySelector('.result-icon');

        if (pairedItem && pairedItem.textContent === zone.dataset.answer) {
            resultIcon.innerHTML = '&#10003;'; // Using HTML entity for check mark
            resultIcon.className = 'result-icon correct';
        } else {
            resultIcon.textContent = '❌';
            resultIcon.className = 'result-icon incorrect';
        }
    });
});

// Reset button logic
resetBtn.addEventListener('click', () => {
    location.reload(); // Refresh the page
});
