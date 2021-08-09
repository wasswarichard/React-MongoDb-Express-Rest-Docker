import Blocks from "../components/Blocks/Blocks";

const routes = [
   {
        enabled: true,
        path: "/dashboard",
        link: "/dashboard",
        title:"Dashboard",
        component: Blocks,
        iconClass: "las la-blocks",
        navbar: "dashboard",
        child: null
    }, {
        enabled: false,
        path: "/Projects",
        title:"Projects",
        component: 'DataTable',
        link: "/Projects",
        iconClass: "las la-clipboard-list",
        navbar: "Projects",
        child: [
            {
                name: "Basic Map",
                path: "/projects/basic",
            },
            {
                name: "Markers",
                path: "/projects/markers",
            },
        ]
    }
];
export default routes.filter((route) => route.enabled);