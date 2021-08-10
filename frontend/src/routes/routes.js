import Blocks from "../components/Blocks/Blocks";
import Todos from "../components/Todos/Todos";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const routes = [
    {
        enabled: true,
        path: "/task1",
        link: "/task1",
        title:"Task 1",
        component: Todos,
        iconClass: "las la-list-ol",
        navbar: "task1",
        child: null
    }, {
        enabled: true,
        path: "/task2",
        link: "/task2",
        title:"Task 2",
        component: Blocks,
        iconClass: "las la-list-alt",
        navbar: "Task 2",
        child: null
    }
];
export default routes.filter((route) => route.enabled);