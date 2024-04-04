import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import components. Adjust the paths according to your project structure.
import LoginPage from './Pages/LoginPage';
import ItemSearchPage from './Pages/ItemSearchPage';
import InventoryPage from './Pages/InventoryPage';
import AccountPage from './Pages/AccountPage';

describe('React Component Render Tests', () => {
    test('LoginPage should render without crashing', () => {
        render(<LoginPage />);
        // Assert that there is a button that says login on the page
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('ItemSearchPage should render without crashing', () => {
        render(<ItemSearchPage />);
        // Tests if page loads by searching for "Account Page" text on the page
        expect(screen.getByText(/Item Search/i)).toBeInTheDocument();
    });

    test('InventoryPage should render without crashing', () => {
        render(<InventoryPage />);
        // Tests if page loads by searching for "Account Page" text on the page
        expect(screen.getByText(/Inventory Page/i)).toBeInTheDocument();
    });

    test('AccountPage should render without crashing', () => {
        render(<AccountPage />);
        // Tests if page loads by searching for "Account Page" text on the page
        expect(screen.getByText(/Account Page/i)).toBeInTheDocument();
    });
});
