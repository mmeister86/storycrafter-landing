// jest-dom adds custom jest matchers for asserting on DOM nodes
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock ResizeObserver which is not implemented in JSDOM
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    // Mock implementation - call the callback with mock data
    this.callback([
      {
        contentRect: {
          width: 500,
          height: 500,
        },
      },
    ]);
  }
  unobserve() {}
  disconnect() {}
}