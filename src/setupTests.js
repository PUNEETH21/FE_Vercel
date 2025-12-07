// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia
const matchMediaMock = jest.fn((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

// Mock localStorage
const localStorageStore = {};

const localStorageMock = {
  getItem: jest.fn((key) => localStorageStore[key] ?? null),
  setItem: jest.fn((key, value) => {
    localStorageStore[key] = String(value);
  }),
  removeItem: jest.fn((key) => {
    delete localStorageStore[key];
  }),
  clear: jest.fn(() => {
    // Clear in place instead of reassigning to preserve closure reference
    Object.keys(localStorageStore).forEach(key => delete localStorageStore[key]);
  }),
};

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock,
});
