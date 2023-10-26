import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import BookCard from '../../features/Book/BookCard'
import styles from "../../styles/Products.module.css"

interface Props {
  data: Book[]
}
export type Book = { name: string, id: string, image: string }
export type Books = Book[]

const Products: NextPage<Props> = ({ data }) => {
  const [books, setBooks] = useState<Books>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
  }, [books])


  return (
    <main>
      <div className={styles.booksGrid}>
        {data?.map((dataBook) => (
          <div key={dataBook.id}>
            <BookCard data={dataBook} />
            {/* Stock */}
          </div>
        ))}
      </div>
    </main>
  )
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3000/api/products")
  const data: Book[] = await response.json()
  return {
    props: { data }
  }
}

export default Products