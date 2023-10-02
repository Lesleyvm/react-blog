import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";
import './Overzicht.css'

function Overzicht() {
    const [blog, setBlog] = useState([]);
    const [error, toggleError] = useState(false);

    async function fetchPosts() {
        try {
            const response = await axios.get('http://localhost:3000/posts')
            setBlog(response.data);
            console.log(response.data);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    const blogList = blog.map((blog) => (
        <div key={blog.id} className="blog-item">
            <Link to={`/blogposts/${blog.id}`}><h4>{blog.title} ({blog.author})</h4></Link>
            <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
        </div>
    ));

    return (
        <section className="blog-list-container">
            <div className="button-wrapper">
                <button type="button" onClick={fetchPosts}>Haal hier alle posts op!</button>
            </div>
            <h2>Totaal aantal posts: {blog.length}</h2>
            <div className="blog-list">
                {blogList}
                {error === true && <p className="error-message">Er is iets mis gegaan..</p>}
            </div>
        </section>
    )
}

export default Overzicht;