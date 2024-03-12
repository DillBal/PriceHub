"use server"

import { revalidatePath } from "next/cache";
import { get } from "http";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper/index";
import { connectToDatabase } from "../scraper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    //scrape the product page
    //store the product in the database

    if(!productUrl) return;

    try {

        connectToDatabase();

        const scrapedProduct = await scrapeAmazonProduct(productUrl)

        if(!scrapedProduct) return;

        //store the product in the database
        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if(existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { new: true, upsert: true }
        )

        revalidatePath(`/products/${newProduct._id}`)

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

export async function getProductById(productId: string) {
    try {
      connectToDatabase();
  
      const product = await Product.findOne({ _id: productId });
  
      if(!product) return null;
  
      return product;
    } catch (error) {
      console.log(error);
    }
  }