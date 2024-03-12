import Image from 'next/image'
import SearchBar from '../components/Searchbar'
import HeroCarousel from '../components/HeroCarousel'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'
const Home = async () => {
  const allProducts = await getAllProducts()

  return (
    <>
      <section className="px-6 md:px-20 py-24 text-orange">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text text-orange">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className='head-text'>
              Unleash the Power of Price
              <span className='text-primary-orange'>Hub</span>
            </h1>

            <p className='mt-6'>
              PriceHub is a powerful price comparison tool that helps you find the best deals online. 
              Our platform is designed to help you save time and money by making it easy to compare prices and 
              find the best deals on the products you want.
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>

      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home