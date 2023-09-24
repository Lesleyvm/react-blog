import posts from '/src/constants/data.json';
import {Link} from 'react-router-dom';
import './Overzicht.css'

function Overzicht() {
    const totalPosts = posts.length;

    const blogList = posts.map((blog) => (
        <div key={blog.id} className="blog-item">
            <Link to={`/blogposts/${blog.id}`}>{blog.title} ({blog.author})</Link>
            <p>
                {blog.comments} reacties - {blog.shares} keer gedeeld
            </p>
        </div>
    ));

    return (
        <div className="blog-list">
            <p>Totaal aantal posts: {totalPosts}</p>
            {blogList}
        </div>
    );

}
    export default Overzicht;