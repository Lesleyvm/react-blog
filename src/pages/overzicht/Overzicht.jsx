import posts from '/src/constants/data.json';
import {Link} from 'react-router-dom';
import './Overzicht.css'

function Overzicht() {
    const totalPosts = posts.length;

    const blogList = posts.map((blog) => (
        <div key={blog.id} className="blog-item">
            <Link to={`/blogposts/${blog.id}`}><h4>{blog.title} ({blog.author})</h4></Link>
            <p>
                {blog.comments} reacties - {blog.shares} keer gedeeld
            </p>
        </div>
    ));

    return (
        <section>
            <h2>Totaal aantal posts: {totalPosts}</h2>
            <div className="blog-list">
                {blogList}
            </div>
        </section>
    );

}

export default Overzicht;