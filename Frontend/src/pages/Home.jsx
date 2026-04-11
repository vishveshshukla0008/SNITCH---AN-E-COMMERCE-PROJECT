import React from 'react';
import Hero from '../features/Home/components/Hero';
import CategoryGrid from '../features/Home/components/CategoryGrid';
import FeaturedProducts from '../features/Home/components/FeaturedProducts';
import Marquee from '../features/Home/components/Marquee';
import Footer from '../shared/components/Footer';

const Home = () => {
    return (
        <main className="min-h-screen bg-bg overflow-x-hidden">
            {/* Hero Section - High-End Editorial Split */}
            <Hero />

            {/* Subtle Brand Promise Marquee */}
            <Marquee />

            {/* Editorial Category selection */}
            <CategoryGrid />

            {/* Curated Best Sellers */}
            <FeaturedProducts />

            {/* Editorial Newsletter / CTA Section */}
            <section className="bg-bg-surface py-32 border-t border-border animate-fade-in-up">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Newsletter</span>
                        <h2 className="text-5xl md:text-7xl font-black text-text tracking-tighter uppercase leading-[0.9]">
                            Join the <br /> <span className="text-primary italic">Exclusive</span>
                        </h2>
                        <p className="text-text-muted text-base md:text-lg font-medium max-w-sm mx-auto mt-2 leading-relaxed tracking-tight">
                            Subscribe to receive early access to seasonal editorial drops and private member offers.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-0 w-full max-w-lg mt-4 border-2 border-text/10 focus-within:border-primary transition-all duration-500 overflow-hidden group">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="flex-1 bg-transparent px-8 py-5 text-text font-bold placeholder:text-text-muted/40 outline-none"
                        />
                        <button className="bg-text text-bg font-black uppercase tracking-[0.2em] px-10 py-5 hover:bg-primary transition-all duration-300">
                            SUBSCRIBE
                        </button>
                    </div>
                    
                    <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] opacity-40">
                        By signing up you agree to our terms and privacy policy.
                    </p>
                </div>
            </section>

            {/* Professional Footer */}
            <Footer />
        </main>
    )
}

export default Home;