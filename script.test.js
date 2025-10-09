const { updatePersistedNumbers } = require('./script');

// Mock localStorage
function createMockStorage() {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value; },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; },
        _store: store
    };
}

describe('updatePersistedNumbers', () => {
    let mockStorage;

    beforeEach(() => {
        mockStorage = createMockStorage();
    });

    test('initializes with empty storage', () => {
        const result = updatePersistedNumbers(undefined, mockStorage);
        expect(result.numbers).toEqual([]);
        expect(result.sum).toBe(0);
    });

    test('adds a valid integer and persists it', () => {
        const result = updatePersistedNumbers(5, mockStorage);
        expect(result.numbers).toEqual([5]);
        expect(result.sum).toBe(5);
    });

    test('adds multiple numbers correctly', () => {
        updatePersistedNumbers(3, mockStorage);
        const result = updatePersistedNumbers(7, mockStorage);
        expect(result.numbers).toEqual([3, 7]);
        expect(result.sum).toBe(10);
    });

    test('throws error for non-integer input', () => {
        expect(() => updatePersistedNumbers('5', mockStorage)).toThrow('Input must be an integer');
        expect(() => updatePersistedNumbers(3.5, mockStorage)).toThrow('Input must be an integer');
    });
});
