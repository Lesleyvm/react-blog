import './Feed.css';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

function Feed() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, toggleError] = useState(false);
    const [success, toggleSucces] = useState(false);
    const [blogpost, setBlogpost] = useState([]);

    function calculateReadTime(content) {
        const wordCount = content.split(' ').length;
        const estimatedReadTime = Math.ceil((wordCount / 100) * 0.3);
        return estimatedReadTime;
    }

    async function handleFormSubmit(data) {
        const currentTimestamp = new Date().toISOString();
        const calculatedReadTime = calculateReadTime(data['input-blog']);
        const formData = {
            title: data.title,
            subtitle: data['sub-title-field'],
            content: data['input-blog'],
            created: currentTimestamp,
            author: data['author-field'],
            readTime: calculatedReadTime,
            comments: 0,
            shares: 0,
        };

        try {
            const result = await axios.post("http://localhost:3000/posts", formData);
            setBlogpost(result.data);
            toggleSucces(true);

            console.log(blogpost);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }

    }

    console.log('ERRORS', errors);

    return (
        <div>
            {success ? (
                <div>
                    <p className="succes-message">De blogpost is succesvol toegevoegd! Je kunt deze <Link to={`/blogposts/${blogpost.id}`}>hier</Link> bekijken:</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h2>Laat jouw verhaal horen!</h2>
                    {error && <p className="error-message">Er is iets mis gegaan..</p>}
                    <fieldset>
                        <legend>Gegevens</legend>
                        <div className="form-group">
                            <label htmlFor="title">Titel</label>
                            <input type="text"
                                   id="title"
                                   {...register("title", {
                                       required: {
                                           value: true,
                                           message: "Dit veld is verplicht"
                                       }
                                   })}
                            />
                            {errors.title && <p className="error-message">{errors.title.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub-titel</label>
                            <input type="text"
                                   id="sub-title"
                                   {...register("sub-title-field", {
                                       required: {
                                           value: true,
                                           message: "Dit veld is verplicht"
                                       }
                                   })}
                            />
                            {errors['sub-title'] && <p className="error-message">{errors['sub-title'].message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Auteur</label>
                            <input type="text"
                                   id="author"
                                   {...register("author-field", {
                                       required: {
                                           value: true,
                                           message: "Dit veld is verplicht"
                                       }
                                   })}
                            />
                            {errors['author-field'] &&
                                <p className="error-message">{errors['author-field'].message}</p>}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Jouw blog</legend>
                        <div className="input-blog">
                            <label htmlFor="sub-title">Bericht</label>
                            <textarea
                                id="input-blog"
                                cols="30"
                                rows="20"
                                placeholder="Begin hier met het schrijven van jouw blog"
                                {...register("input-blog", {
                                    required: {
                                        value: true,
                                        message: "Dit veld is verplicht"
                                    },
                                    minLength: {
                                        value: 300,
                                        message: "Bericht moet minimaal 300 karakters bevatten"
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "Bericht mag maxiimaal 2000 karakters bevatten"
                                    }
                                })}
                            />
                            {errors['input-blog'] && <p className="error-message">{errors['input-blog'].message}</p>}
                        </div>
                    </fieldset>
                    <button type="submit">Verzenden</button>
                </form>)}
        </div>
    );
}

export default Feed;