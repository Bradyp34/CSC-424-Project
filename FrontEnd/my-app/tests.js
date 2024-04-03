const React = require('react');
const { expect } = require('chai');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom/extend-expect');

// Import your React components
const App = require('../src/App').default;
const LoginPage = require('../src/pages/LoginPage').default;
const ItemSearchPage = require('../src/pages/ItemSearchPage').default;
const InventoryPage = require('../src/pages/InventoryPage').default;
const AccountPage = require('../src/pages/AccountPage').default;
