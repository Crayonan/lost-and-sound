'use client'

import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'

const RIPPLE_DURATION_MS = 1000

export default function DelayedRender({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true)
        }, RIPPLE_DURATION_MS)
        return () => clearTimeout(timeout)
    }, [])

    if (!show) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return <>{children}</>
}
