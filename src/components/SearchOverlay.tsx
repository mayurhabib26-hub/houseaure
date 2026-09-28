import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const suggestedSearches = ['Tailored Jacket', 'Linen Shirt', 'Silk Dress', 'Trousers', 'Mulberry Silk'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#FAF9F5]/96 backdrop-blur-md flex flex-col justify-start text-[#141414] overflow-y-auto"
        >
          {/* Header */}
          <div className="max-w-5xl mx-auto w-full px-6 pt-8 pb-6 flex items-center justify-between border-b border-[#EAE3D5]">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              House of Aure · Search Catalogue
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[#736E68] hover:text-[#141414] transition-colors focus-visible:outline-none"
              aria-label="Close search"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="max-w-5xl mx-auto w-full px-6 py-12">
            <div className="relative border-b-2 border-[#141414] pb-4 flex items-center">
              <Search className="w-7 h-7 sm:w-8 sm:h-8 text-[#9B958D] mr-4 shrink-0 stroke-[1.5]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent font-editorial text-2xl sm:text-4xl md:text-5xl text-[#141414] placeholder-[#B5ADA1] focus:outline-none font-light"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-xs uppercase tracking-widest text-[#736E68] hover:text-[#141414] shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestions when empty */}
            {!query && (
              <div className="mt-8">
                <span className="text-xs uppercase tracking-[0.18em] text-[#8C8377] block mb-3 font-medium">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestedSearches.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 bg-[#F2EDE2] hover:bg-[#EAE4D7] rounded-xs text-xs text-[#141414] transition-colors font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="mt-12">
                <div className="flex items-center justify-between text-xs text-[#736E68] uppercase tracking-wider mb-6">
                  <span>Results for "{query}"</span>
                  <span className="tabular-nums font-semibold">{filteredProducts.length} items found</span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-16 text-center text-[#736E68]">
                    <p className="font-editorial text-2xl text-[#141414]">No results matched your query</p>
                    <p className="text-xs mt-1">Try searching for generic terms like "jacket", "shirt", or "silk".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="group cursor-pointer flex flex-col bg-[#F7F4EC] p-3 rounded-xs border border-[#EAE3D5] hover:border-[#D5CDBD] transition-all"
                      >
                        <div className="aspect-[3/4] w-full overflow-hidden bg-[#EAE4D7] mb-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[0.65rem] uppercase tracking-widest text-[#736E68]">
                          {product.category}
                        </span>
                        <h4 className="font-medium text-sm text-[#141414] mt-0.5 group-hover:text-[#A3845B] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#141414] mt-1 tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
