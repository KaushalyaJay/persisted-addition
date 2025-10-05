// script.js

// === Core Function ===
// This function reads/writes persisted numbers AND computes their sum.
// It's designed to be testable separately (no DOM dependency).
function updatePersistedNumbers(newNumber, storage = window.localStorage) {
    const key = 'enteredNumbers';

    // Load existing numbers from localStorage
    const stored = storage.getItem(key);
    const numbers = stored ? JSON.parse(stored) : [];

    // If a new number is provided, validate and add it
    if (newNumber !== undefined && newNumber !== null) {
        if (typeof newNumber !== 'number' || !Number.isInteger(newNumber)) {
            throw new Error('Input must be an integer');
        }
        numbers.push(newNumber);
    }

    // Compute the sum
    const sum = numbers.reduce((a, c) => a + c, 0);

    // Persist updated numbers
    storage.setItem(key, JSON.stringify(numbers));

    return { numbers, sum };
}

// === UI Handling ===
// These connect the persisted logic to existing HTML
const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

// Render persisted numbers when the page loads
function render() {
    const { numbers, sum } = updatePersistedNumbers(undefined);
    numberList.textContent = numbers.join(' + ') || '';
    totalSum.textContent = sum;
}

// Add button click handler
addButton.addEventListener('click', function () {
    const numberStr = numberInput.value.trim();

    // Validate input
    if (!/^-?\d+$/.test(numberStr)) {
        alert('Please enter a valid integer.');
        return;
    }

    const numValue = parseInt(numberStr, 10);
    updatePersistedNumbers(numValue);
    render();

    numberInput.value = '';
    numberInput.focus();
});

//Initialise UI on load
render();

// === Exports for Testing ===
if (typeof module !== 'undefined') {
    module.exports = { updatePersistedNumbers };
}
