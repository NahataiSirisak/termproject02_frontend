import React, { useState, useEffect } from 'react'

function MyReviews() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/comments/mycomment`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setReviewList(data)
            });
    }, []);
    return (
        <h2>MyReviews</h2>
    )
}

export default MyReviews