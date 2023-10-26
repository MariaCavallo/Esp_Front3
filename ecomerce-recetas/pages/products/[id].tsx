import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Book from '../../features/Book/BookCard'
import BookInfo from '../../features/Book/BookInfo'

type BookType = { name: string, id: string, image: string }

interface Props {
    book: BookType
}

const Product: FC<Props> = ({ book }) => {
    const router = useRouter()
    const handleBought = async () => {
        await fetch(`http://localhost:3000/api/products/${book.id}`, { method: 'DELETE' })
        alert("Thanks for buying!")
        router.push("/products")
    }

    return (
        <BookInfo data={book} handleBought={handleBought} />
    )
}


export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    const response = await fetch(`http://localhost:3000/api/products/${id}`)
    const book = await response.json();

    return {
        props: {
            book
        }, 
        revalidate: 100,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3000/api/products`)
    const data: Book[] = await response.json()
    const paths = data.map(book => {
        return { params: { id: book.id } }
    })
    
    return {
        paths,
        fallback: 'blocking'
    }
}

export default Product