//^ ro remove the stay without refresh the page

import { create } from 'zustand'

export const useWishlist = create((set) => ({
    wishlistStays: [],
    setWishlistStays: (stays) => set({ wishlistStays: stays }),
    removeFromWishlist: (stayId) => 
        set((state) => ({
            wishlistStays: state.wishlistStays.filter(stay => stay._id !== stayId)
        }))
}))
