import { useEffect, useState } from "react"

export function useWaitingCursor() {
    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    useEffect(() => {
        document.body.style.cursor = isWaiting ? 'wait' : 'default'
        
        return () => {
            document.body.style.cursor = 'default'
        }
    }, [isWaiting])

    return { isWaiting, setIsWaiting }
}