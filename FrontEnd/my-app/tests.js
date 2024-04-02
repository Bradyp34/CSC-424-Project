import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MyComponent from '../path/to/YourComponent';

// Configure Enzyme with React 17 adapter
configure({ adapter: new Adapter() });

describe('MyComponent', () => {
    it('renders component text', () => {
        const JSDOM = jsdom.JSDOM;
        global.document = new JSDOM('<!doctype html><html><body></body></html>').window.document;
        global.window = document.defaultView;

        const wrapper = mount(<MyComponent />);
        expect(wrapper.find('div').text()).to.contain('Expected text');
    });
});
