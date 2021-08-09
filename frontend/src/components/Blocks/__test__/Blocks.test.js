import React from "react";
import ReactDOM from "react-dom";
import Blocks from "../Blocks";
import { render, cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
it('should render without crashing', function () {
    const div = document.createElement("div")
    ReactDOM.render(<Blocks></Blocks>, div)
});

it('should render the blocks correctly', function () {

});

it('should match snapshot', function () {
    const tree = TestRenderer.create(<Blocks></Blocks>).toJSON();
    expect(tree).toMatchSnapshot();

});
