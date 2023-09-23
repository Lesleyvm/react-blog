import {useParams} from "react-router-dom";

function Blogposts() {
    const {id} = useParams()
    return (
        <>
            <h1>Blogposts</h1>
            <h2>{id}</h2>
        </>
    )
}

export default Blogposts;