import { useCallback, useEffect, useState } from 'react';
import axios from '../../axiosInstances';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './Quotes.css'


const Quotes = () => {
    const [quotes, setQuotes] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    const getQuotes = useCallback(async () => { 
        let getListQuotes = "/quotes.json";

        if (params.category) {
            getListQuotes += `?orderBy="category"&equalTo="${params.category}"`;
        }
        try {
            const quotes = await axios.get(getListQuotes);
            setQuotes(quotes.data);
        } catch(e) {
            console.log(e);
        }
      }, [params.category]);

    const deleteQuote = async(id) => {
        const deleteQuote = await axios.delete(`/quotes/${id}.json`);
        console.log(deleteQuote);
        getQuotes();
    }

    useEffect(() => {
        getQuotes(); // eslint-disable-next-line
    }, [params.category]); 
    
    return (
        <div className='quotes-main'>
            <div className='container'>
                <h1 className='quotes-title'>Quotes</h1>
            <div className='quotes-content-wrapper'>
                <div className='quote-categories'>
                    <NavLink className='link-quote-category' to='/quotes'>All</NavLink>
                    <NavLink className='link-quote-category' to='/quotes/famous'>Famous</NavLink>
                    <NavLink className='link-quote-category' to='/quotes/saying'>Saying</NavLink>
                    <NavLink className='link-quote-category' to='/quotes/humour'>Humour</NavLink>
                    <NavLink className='link-quote-category' to='/quotes/motivation'>Motivation</NavLink>
                </div>
            <div className='quotes-render'>
                {
                    quotes 
                        ? 
                        Object.keys(quotes).map(id => {
                            return <div className='new-quote' key={id}>
                                <div className='new-quote-wrapper'>
                                    <div className='quotes-buttons'>
                                        <button className='quotes-edit-btn' onClick={() => {navigate(`/quotes/${id}/edit`)}}>Edit</button>
                                        <button className='quotes-delete-btn' onClick={() => deleteQuote(id)}>Delete</button>
                                    </div>
                                    <h1 className='new-quote-category'>{quotes[id].category}</h1>
                                    <h1 className='new-quote-title'>{quotes[id].title}</h1>
                                    <p className='new-quote-author'>{quotes[id].author}</p>
                                </div>
                            </div>
                        })
                    : 
                    <p>Quotes is empty..</p>
                }
                </div> 
            </div>    
        </div>
    </div>
    );
};
export default Quotes;