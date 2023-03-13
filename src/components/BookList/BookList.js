import React from 'react';
import { useGetBooksQuery } from '../../features/api/apiSlice';
import BookItem from '../BookItem/BookItem';
import Filters from '../Filters/Filters';
import Loading from '../UI/Loading';

const BookList = () => {
    // integration of rtk query hooks here
    const { data: books, isLoading, isError, error } = useGetBooksQuery();

    // deciding what to render here
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <p>{error}</p>;
    }

    if (!isLoading && !isError && !books.length) {
        content = <p>No Books Found!</p>;
    }

    if (!isLoading && !isError && books.length) {
        content = (<div className='space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {
                books.map(book => <BookItem
                    key={book.id}
                    book={book}
                />)
            }
        </div>);
    }

    // rendering the book list component here
    return (
        <main className='py-12 px-6 2xl:px-6 container'>
            <div className='order-2 xl:-order-1'>
                <Filters />
                {content}
            </div>
        </main>
    );
};

export default BookList;