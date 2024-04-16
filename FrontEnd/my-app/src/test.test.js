import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import components. Adjust the paths according to your project structure.
import LoginPage from './Pages/LoginPage';
import InventoryPage from './Pages/InventoryPage';
import AccountPage from './Pages/AccountPage';

describe('React Component Render Tests', () => {
    test('LoginPage should render without crashing', () => {
        render(<LoginPage />);
        // Assert that there is a button that says login on the page
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('LoginPage allows the user to toggle password visibility', async () => {
        render(<LoginPage />);

        // Initial check: password should be hidden
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Click the toggle visibility button
        const toggleButton = screen.getByText('Show'); // Assuming the button initially says "Show"
        fireEvent.click(toggleButton);

        // Now, the password should be visible
        expect(passwordInput).toHaveAttribute('type', 'text');

        // Click again to hide the password
        const hideButton = screen.getByText('Hide'); // The button should now say "Hide"
        fireEvent.click(hideButton);

        // The password should be hidden again
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('InventoryPage should render without crashing', () => {
        render(<InventoryPage />);
        // Tests if page loads by searching for "Inventory Page" text on the page
        expect(screen.getByText(/Inventory Page/i)).toBeInTheDocument();
    });

    test('AccountPage should render without crashing', () => {
        render(<AccountPage />);
        // Tests if page loads by searching for "Account Page" text on the page
        expect(screen.getByText(/Account Page/i)).toBeInTheDocument();
    });
});
