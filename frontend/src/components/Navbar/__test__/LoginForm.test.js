import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../Navbar";
import { cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
it('should render without crashing', function () {
    const div = document.createElement("div")
    ReactDOM.render(<Navbar></Navbar>, div)
});

it('should match snapshot', function () {
    const tree = TestRenderer.create(<Navbar></Navbar>).toJSON();
    expect(tree).toMatchSnapshot();

});
