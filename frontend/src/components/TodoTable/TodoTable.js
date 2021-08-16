import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {store} from "../../state/store/store";

const columns = [
    {id: 'createdAt', label: "Created Date", minWidth: 170, format: value => new Date (value).toLocaleDateString()},
    {id: 'dueDate', label: "Due Date", minWidth: 170, format: value => new Date (value).toLocaleDateString()},
    {id: 'status', label: "Status", minWidth: 170, format: value => value.toLowerCase()},
    {id: 'text', label: "Text", minWidth: 170, format: value => value},
    {id: 'todoId', label: "Todo ID", minWidth: 170, format: value => value},
    {id: 'updatedAt', label: "UpDated Date", minWidth: 170, format: value => new Date (value).toLocaleDateString()},
]

const useStyles = makeStyles((theme) =>({
    head: {
        backgroundColor: "#1b4053",
        color: theme.palette.common.white,
    },
    root: {
        width: '100%',
    },
    container: {
        maxHeight: window.innerHeight,
    },
}));

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(store.getState().todos)
    }, [store.getState().todos])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="main-content">
            <main>
                <h2>Todos</h2>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            className={classes.head}
                                            // align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((todo) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={todo._id}>
                                            {columns.map((column) => {
                                                const value = todo[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format(value)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={todos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </main>
        </div>
    );
}