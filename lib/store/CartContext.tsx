"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { TShirt } from "./data"

export interface CartItem {
    product: TShirt
    quantity: number
    selectedSize: string
    selectedColor: string
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
    total: number
}

type CartAction =
    | { type: "ADD_ITEM"; payload: { product: TShirt; quantity: number; size: string; color: string } }
    | { type: "REMOVE_ITEM"; payload: { productId: number; size: string; color: string } }
    | { type: "UPDATE_QUANTITY"; payload: { productId: number; size: string; color: string; quantity: number } }
    | { type: "TOGGLE_CART" }
    | { type: "OPEN_CART" }
    | { type: "CLOSE_CART" }
    | { type: "CLEAR_CART" }

interface CartContextType {
    state: CartState
    dispatch: React.Dispatch<CartAction>
    addToCart: (product: TShirt, quantity: number, size: string, color: string) => void
    removeFromCart: (productId: number, size: string, color: string) => void
    updateQuantity: (productId: number, size: string, color: string, quantity: number) => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    clearCart: () => void
    getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const { product, quantity, size, color } = action.payload
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color,
            )

            let newItems: CartItem[]
            if (existingItemIndex > -1) {
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
                )
            } else {
                newItems = [
                    ...state.items,
                    {
                        product,
                        quantity,
                        selectedSize: size,
                        selectedColor: color,
                    },
                ]
            }

            const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            return { ...state, items: newItems, total, isOpen: true }
        }

        case "REMOVE_ITEM": {
            const { productId, size, color } = action.payload
            const newItems = state.items.filter(
                (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color),
            )
            const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            return { ...state, items: newItems, total }
        }

        case "UPDATE_QUANTITY": {
            const { productId, size, color, quantity } = action.payload
            if (quantity <= 0) {
                return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId, size, color } })
            }

            const newItems = state.items.map((item) =>
                item.product.id === productId && item.selectedSize === size && item.selectedColor === color
                    ? { ...item, quantity }
                    : item,
            )
            const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            return { ...state, items: newItems, total }
        }

        case "TOGGLE_CART":
            return { ...state, isOpen: !state.isOpen }

        case "OPEN_CART":
            return { ...state, isOpen: true }

        case "CLOSE_CART":
            return { ...state, isOpen: false }

        case "CLEAR_CART":
            return { ...state, items: [], total: 0 }

        default:
            return state
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        isOpen: false,
        total: 0,
    })

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
                parsedCart.items.forEach((item: CartItem) => {
                    dispatch({
                        type: "ADD_ITEM",
                        payload: {
                            product: item.product,
                            quantity: item.quantity,
                            size: item.selectedSize,
                            color: item.selectedColor,
                        },
                    })
                })
            } catch (error) {
                console.error("Failed to load cart from localStorage:", error)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state))
    }, [state])

    const addToCart = (product: TShirt, quantity: number, size: string, color: string) => {
        dispatch({ type: "ADD_ITEM", payload: { product, quantity, size, color } })
    }

    const removeFromCart = (productId: number, size: string, color: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } })
    }

    const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, color, quantity } })
    }

    const toggleCart = () => dispatch({ type: "TOGGLE_CART" })
    const openCart = () => dispatch({ type: "OPEN_CART" })
    const closeCart = () => dispatch({ type: "CLOSE_CART" })
    const clearCart = () => dispatch({ type: "CLEAR_CART" })

    const getItemCount = () => state.items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                state,
                dispatch,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart,
                openCart,
                closeCart,
                clearCart,
                getItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
