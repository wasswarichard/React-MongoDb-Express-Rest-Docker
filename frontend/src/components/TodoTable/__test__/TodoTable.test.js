import React from "react";
import ReactDOM from "react-dom";
import TodoTable from "../TodoTable";
import { render, cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
it('should render without crashing', function () {
    const div = document.createElement("div")
    ReactDOM.render(<TodoTable></TodoTable>, div)
});

it('should match snapshot', function () {
    const tree = TestRenderer.create(<TodoTable></TodoTable>).toJSON();
    expect(tree).toMatchSnapshot();

});
