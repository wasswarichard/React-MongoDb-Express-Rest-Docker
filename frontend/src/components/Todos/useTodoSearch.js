import React, {useEffect, useState} from "react";
import axios from "axios";
import * as config from '../../helpers/config'
import {store} from "../../state/store/store";
import {addTodos} from "../../state/actions/TodosActions";
const useTodoSearch = (query, pageNumber) => {
    const authentication = store.getState().session
    const [loading, setLoading] = useState(true);
    const [todosItems, setTodosItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setTodosItems([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios({
            method: 'GET',
            url: `${config.apiUrl}/api/todos`,
            params: {
                dueDate: query,
                page: pageNumber,
                limit: 20
            },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization": authentication.accessToken,
                "x-refresh": authentication.refreshToken
            },
            cancelToken: new axios.CancelToken((c) =>  cancel =  c)

        })
            .then(response => {
                if(query.length > 0) {
                    setTodosItems( prevTodos => {
                        return [...new Set([...prevTodos, ...response.data.todos])]
                    })
                } else {
                    store.dispatch(addTodos(response.data.todos));
                }
                setHasMore(response.data.todos.length > 0);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                if (axios.isCancel(error)) return
                localStorage.removeItem('session');
                window.location.href = '/';
            })

        return () => cancel();
    }, [query, pageNumber])

    return {loading, todosItems, hasMore}
}
export default useTodoSearch;