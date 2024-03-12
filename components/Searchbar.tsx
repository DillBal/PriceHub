"use client"

import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url:string) => {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname

        if (hostname.includes('amazon.') || hostname.includes('amazon.com')) {
            return true
        }
    }
    catch (error) {
        return false
    }
}

const SearchBar = () => {
    const[searchPrompt, setSearchPrompt] = useState('')
    const[isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const isValidLink = isValidAmazonProductURL(searchPrompt);
    
        if(!isValidLink) return alert('Please provide a valid Amazon link')
    
        try {
          setIsLoading(true);
    
          // Scrape the product page
          const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    
    return (
    <form 
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
    >
        <input
            type='text'
            value = {searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder='Enter Product Link'
            className='searchbar-input'
        />
        <button 
            type='submit' 
            className='searchbar-btn' 
            disabled={searchPrompt === ''}
        >
           {isLoading ? 'Searching...' :'Search'}
        </button>
    </form>
  )
}

export default SearchBar