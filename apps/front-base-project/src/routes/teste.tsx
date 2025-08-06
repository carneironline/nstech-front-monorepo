import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useDebounce } from '@ns-tech/react-base'

export const Route = createFileRoute('/teste')({
    component: TesteComponent,
})

function TesteComponent() {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    useEffect(() => {
        if (debouncedSearch) {
            console.log('🔍 Buscando por:', debouncedSearch)
        }
    }, [debouncedSearch])

    return (
        <div>
            <input
                type="text"
                placeholder="Digite para buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded"
            />
        </div>
    )
}
