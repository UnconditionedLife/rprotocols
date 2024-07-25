import { useState, useEffect, useCallback } from 'react';

export default function RunSearch() {
    const [query, setQuery] = useState("");


// ************************************************************

//  WAS INTENDED TO BE USED TO SLOW DOWN THE SEARCH FREQUENCY

// ************************************************************

// debounce function that goes with it

// function debounce(func, wait) {
//     let timeout;
//     return function(...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), wait);
//     };
// }



    const performSearch = (props) => {
        const { searchterm, db } = props
        console.log("Searching for:", query);
        // Your search logic here
        const rawResults = index.search(searchterm, {
            fields: {
                title: { boost: 2 },
                tags: { boost: 2 },
                description: { boost:1 },
                author: { boost: 1 },
                parentName: { boost: 1 }
            }
        })

console.log('rawResults', rawResults)

        const itemMap = {};
        db.forEach(item => {
            itemMap[item.id] = item;
        });
        const results = rawResults.map(result => itemMap[result.ref]).filter(item => item !== undefined);
        setSearchResults(results)
        if (results.length > 0 )
            setDisplayState('results')
        else 
            setDisplayState('no-results')
        
    }
    };

    const debouncedSearch = useCallback(debounce((query) => {
        performSearch(query);
    }, 300), []);

    useEffect(() => {
        if (query) {
            debouncedSearch(query);
        }
    }, [query, debouncedSearch]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
        />
    );
};
