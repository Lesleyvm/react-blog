import {Link, useParams} from 'react-router-dom';
import './Blogposts.css'
import axios from "axios";
import {useEffect, useState} from "react";

function Blogposts() {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [postDelete, setPostDelete] = useState({})
    const [error, toggleError] = useState(false);
    const [deleted, toggleDeleted] = useState(false);

    useEffect(() => {
        fetchPost();
    }, []);
    async function fetchPost() {
        try {
            const response = await axios.get(`http://localhost:3000/posts/${id}`)
            setPost(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function deletePost() {
        try {
            const response = await axios.delete(`http://localhost:3000/posts/${id}`)
            setPostDelete(response.data);
            postDelete;
            toggleDeleted(true);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <section className="blogpost-container">

            {/*///Hier stond de button voordat er useEffect is gebruikt///*/}
            {/*{Object.keys(post).length === 0 && (*/}
            {/*<div className="button-wrapper">*/}
            {/*    <button type="button" onClick={fetchPost}>Post details:</button>*/}
            {/*</div>*/}
            {/*)}*/}

            {deleted ? (
                <div>
                    <p className="succes-message">Gelukt! Post is verwijderd. <Link to="/overzicht"><i>Terug naar de overzichtspagina</i></Link></p>
                </div>
            ) : (

            <div className="blogpost-item">
                <h2>{post.title} ({post.readTime} minuten)</h2>
                <h3>{post.subtitle}</h3>
                <p>Geschreven door {post.author} op {new Date(post.created).toLocaleDateString()}</p>
                <p>{post.content}</p>
                <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                {error && <p className="error-message">Er is iets mis gegaan..</p>}
                <Link to="/overzicht"><i>Terug naar de overzichtspagina</i></Link>

                <div className="button-wrapper">
                    <button type="button" onClick={deletePost}>Verwijder post</button>
                </div>

            </div>)}
        </section>
    );
}

export default Blogposts;
