// is de code van eerdere opdracht

import {Link, useParams} from 'react-router-dom';
import posts from '/src/constants/data.json';
import './Blogposts.css'

function Blogposts() {
    const { id } = useParams();
    const blogpost = posts.find((post) => post.id === Number(id));

    if (!blogpost) {
        return <h2>Blogpost niet gevonden</h2>;
    }

    return (
        <section className="blogpost-container">
            <div className="blogpost-item">
                <h2>
                    {blogpost.title} ({blogpost.readTime} minuten)
                </h2>
                <h3>{blogpost.subtitle}</h3>
                <p>Geschreven door {blogpost.author} op {new Date(blogpost.created).toLocaleDateString()}</p>
                <p>{blogpost.content}</p>
                <p>
                    {blogpost.comments} reacties - {blogpost.shares} keer gedeeld
                </p>
                <Link to="/overzicht"><i>Terug naar de overzichtspagina</i></Link>
            </div>
        </section>
    );
}

export default Blogposts;