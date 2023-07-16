import { useEffect, useState } from "react";
import { quotesApi } from "../../axiosInstances";
import { categories } from "../../categories";
import { useParams} from "react-router-dom";
import './AddEditQuote.css'

const AddEditQuote = () => {
    const {id} = useParams();
    const [addQuote, setAddQuote] = useState({author: '', title: '', category: ''});

    const inputChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        setAddQuote(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };
    
    useEffect(() => {
        if(id) {
            quotesApi.show(id).then(data => {
                if(data) {
                    setAddQuote(data);      // отображает данные цитаты в edit
                };
            });
        };
    }, [id]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        (id ? quotesApi.edit(id, addQuote) : quotesApi.add(addQuote));
    };
    
    return (
        <div className="addEdit-quote">
            <div className="container">
                <h1 className="addEdit-quote-title">{id ? "Edit quote" : "Submit new quote"}</h1>
            <form className="form-submit-quote" onSubmit={onSubmitHandler}>
                <select className="select-quotes" required name="category" id="category" onInput={inputChangeHandler} value={addQuote.category}>
                    <option value={""} disabled>Выберите категорию</option>
                    {
                        categories.map(categories => {
                            return <option key={categories.id} value={categories.id}>{categories.title}</option>
                        })
                    };
                </select>
                <div className="form-input">
                    <input 
                        type="text"
                        name="author"
                        placeholder="Author"
                        className="author-input"
                        required
                        value={addQuote.author}
                        onInput={inputChangeHandler}
                    />
                </div>
                <div className="form-textarea">
                    <textarea 
                        value={addQuote.title}
                        cols="25" 
                        rows="5" 
                        name="title"
                        required
                        placeholder="Quote text"
                        className="title-textarea"
                        onInput={inputChangeHandler}
                    ></textarea>
                </div>
                <button className="addEdit-quote-btn">{id ? "Edit" : "Submit"}</button>
            </form>
            </div>
        </div>
    )
}
export default AddEditQuote;