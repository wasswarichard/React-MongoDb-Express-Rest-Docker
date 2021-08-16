import React from "react";
import ReactDOM from "react-dom";
import TodoItem from "../TodoItem";
import { cleanup} from "@testing-library/react";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup)
it('should render without crashing', function () {
    const div = document.createElement("div")
    const todo = {
        _id: 576897,
        completed: true
    }
    ReactDOM.render(<TodoItem todo={todo}/>, div)
});

it('should match snapshot', function () {
    const todo = {
        _id: 576897,
        completed: true
    }
    const tree = TestRenderer.create(<TodoItem todo={todo}/>).toJSON();
    expect(tree).toMatchSnapshot();

});
