const container = document.getElementById('container');
const sizeBtn = document.getElementById('sizeBtn');

const START_CELLS = 16;
const MIN_N = 2;
const MAX_N = 100;

function buildGrid(n) {
    // clamp and coerce to int
    n = Math.max(MIN_N, Math.min(MAX_N, n|0));

    // tell CSS how many columns to lay out
    container.style.setProperty('--cols', n);

    // clear and rebuild
    container.replaceChildren();
    const total = n * n;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        frag.appendChild(cell);
    }
    container.appendChild(frag);
}


function askGridSize() {
    const raw = prompt(`How many squares per side? (${MIN_N}-${MAX_N})`);
    if (raw === null) return null;

    const n = Number(raw.trim());
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < MIN_N || n > MAX_N) {
        alert('please enter a whole number between 2 and 100.');
        return null;
    }
    return n;
}

function enableDrawing() {
    container.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('cell')) {
            e.target.classList.add('drawn');
        }
    });
}

sizeBtn.addEventListener('click', () => {
    const size = askGridSize();
    if (size !== null) buildGrid(size);
});


buildGrid(START_CELLS);
enableDrawing();