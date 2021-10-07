import type { NextPage } from 'next'
import { useState, useEffect } from 'react'

import { useDecksForAddress } from '../lib/useDecksForAddress'

import Nav from '../components/Nav'
import DeckPreview from '../components/DeckPreview'
import images from '../data/images'

const DEFAULT_ADDRESS = '0xd17d1BcDe2A28AaDe2b3B5012f93b8B079d0E86B'

const HomePage: NextPage = () => {
  const { data: decks, loading, fetch } = useDecksForAddress()

  const [lookupAddress, setLookupAddress] = useState(DEFAULT_ADDRESS)

  useEffect(() => {
    fetch(lookupAddress)
  }, [lookupAddress])

  function handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setLookupAddress(event.target.value)
  }

  return (
    <div className="relative w-screen min-h-screen p-4 md:p-8">
      <Nav />

      <div className="flex flex-col md:flex-row md:items-center justify-center w-full gap-6 mb-16">
        <p className="text-xl md:mr-2">Find by address: </p>
        <input
          className="text-xl bg-backgrounddark px-2 py-1 border border-gray-100"
          value={lookupAddress}
          onChange={handleChangeAddress}
          onFocus={(event) => event.target.select()}
          onBlur={(event) => {
            if (event.target.value.length === 0) {
              setLookupAddress(DEFAULT_ADDRESS)
            }
          }}
        />
      </div>

      {!loading && (
        <div className="flex flex-wrap justify-center gap-12 md:p-4">
          {decks.map((deck, idx) => (
            <DeckPreview key={idx} deck={deck} images={images} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
