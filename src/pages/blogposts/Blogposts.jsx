import {Link, useParams} from 'react-router-dom';
import './Blogposts.css'
import axios from "axios";
import {useState} from "react";

function Blogposts() {
    const {id} = useParams();
    const [post, setPost] = useState([]);
    const [error, toggleError] = useState(false);
    async function fetchPosts() {
        try {
            const response = await axios.get(`http://localhost:3000/posts/${id}`)
            setPost(response.data)
            console.log(response.data)
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <section className="blogpost-container">
            <div className="button-wrapper">
                <button type="button" onClick={fetchPosts}>Post details:</button>
            </div>
            <div className="blogpost-item">
                <h2>{post.title} ({post.readTime} minuten)</h2>
                <h3>{post.subtitle}</h3>
                <p>Geschreven door {post.author} op {new Date(post.created).toLocaleDateString()}</p>
                <p>{post.content}</p>
                <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                {error && <p className="error-message">Er is iets mis gegaan..</p>}
                <Link to="/overzicht"><i>Terug naar de overzichtspagina</i></Link>
            </div>
        </section>
    );
}

export default Blogposts;
