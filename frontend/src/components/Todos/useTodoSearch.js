import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../../helpers/config.json";
const useTodoSearch = (query, pageNumber) => {
    const authentication = JSON.parse(localStorage.getItem('session'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [todos, setTodos] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setTodos([])
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: `${config.apiUrl}/api/todos`,
            params: {q: query, page: pageNumber, limit: 20},
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization": authentication.accessToken,
                "x-refresh": authentication.refreshToken
            },
            cancelToken: new axios.CancelToken((c) =>  cancel =  c)

        })
            .then(response => {
                setTodos( prevTodos => {
                    return [...new Set([...prevTodos, ...response.data.todos])]
                })
                setHasMore(response.data.todos.length > 0);
                setLoading(false)
            })
            .catch(error => {
                if (axios.isCancel(error)) return
                setError(true)
            })

        return () => cancel();
    }, [query, pageNumber])

    return {loading, error, todos, hasMore}
}
export default useTodoSearch;