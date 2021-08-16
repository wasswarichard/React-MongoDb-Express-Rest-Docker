import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "../LoginForm";
import { render, cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
it('should render without crashing', function () {
    const div = document.createElement("div")
    ReactDOM.render(<LoginForm></LoginForm>, div)
});

it('should match snapshot', function () {
    const tree = TestRenderer.create(<LoginForm></LoginForm>).toJSON();
    expect(tree).toMatchSnapshot();

});
