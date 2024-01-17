import React, { useState, useEffect } from 'react';
import './App.css';
import getData from './callback';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData(1)
            .then((fetchedData) => {
                console.log(fetchedData);
                setData(fetchedData);
            })
            .catch((e) => console.log(e));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Veriyi ekranda g�stermek i�in JSON.stringify kullan�labilir
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default App;
