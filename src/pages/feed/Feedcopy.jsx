// is de code van eerdere opdracht

import './Feed.css';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
function Feed() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    function calculateReadTime(content) {
        const wordCount = content.split(' ').length;
        const estimatedReadTime = Math.ceil((wordCount / 100) * 0.3);
        return estimatedReadTime;
    }
    function handleFormSubmit(data) {
        const currentTimestamp = new Date().toISOString();
        const calculatedReadTime = calculateReadTime(data['input-blog']);
        const formData = {
            ...data,
            created: currentTimestamp,
            readTime: calculatedReadTime,
            comments: 0,
            shares: 0,
        };

        console.log(formData);
        navigate("/overzicht");
    }

    console.log('ERRORS', errors);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h2>Laat jouw verhaal horen!</h2>
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
                    {errors['author-field'] && <p className="error-message">{errors['author-field'].message}</p>}
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
        </form>
    )
}

export default Feed;