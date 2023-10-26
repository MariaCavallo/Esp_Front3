import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import styles from "../../styles/Products.module.css"


interface Props {
  data: Offer[]
}

const API = "http://localhost:3000/api/products/offers"

const Offers: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <h1 className={styles.offerTitle}>Offers</h1>
      <div className={styles.booksGrid}>
          {data?.map((offer) => (
            <div className={styles.booksOffer} key={offer.id}>
              <h4>{offer.name}</h4>
              <Image className={styles.offerImg} src={offer.image} alt={offer.name} width={250} height={300} />
            </div>
          ))}
      </div>
    </div>
  )
}

type Offer = { name: string, image: string, id: string }

export const getServerSideProps = async () => {
  const response = await fetch(API);
  const data: Offer[] = await response.json();

  return {
    props: {
      data
    }
  }

}

export default Offers