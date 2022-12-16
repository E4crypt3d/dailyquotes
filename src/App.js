import './App.css';
import Navbar from './components/Navbar.js'
import Card from './components/Card.js'
import Footer from './components/Footer'
import Filter from './components/Filter'
import PaginationComp from './components/Pagination'
import { useEffect, useState } from 'react'





function App() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [totalQuotes, setTotalQuotes] = useState(0);
  const [pagination, setPagination] = useState({ 'next': null, 'previous': null });

  // add pagination now
  useEffect(() => {
    get_quotes()

  }, [])

  // search function

  const handleChange = (event) => {
    setSearch(event.target.value)

    let search_data = async () => {
      let response = await fetch(`/api/quotes/search?query=${event.target.value}`);
      const data = await response.json()
      setQuotes(data)
    }
    if (event.target.value.length > 2) {
      search_data()
    }
    else if (event.target.value === '' || event.target.value.length <= 2) {
      get_quotes()
    }
    event.preventDefault()
  }


  let get_quotes = async () => {
    let response = await fetch('/api/quotes');
    let data = await response.json()
    setQuotes(data.results)
    setTotalQuotes(data.count)
    setPagination({ 'next': data.next, 'previous': data.previous, 'pages': Math.ceil(data.count / 12) })
  }
  return (
    <>
      <div className='container'>
        <Navbar setQuotes={setQuotes} setTotalQuotes={setTotalQuotes} />
        <form className='search-container'>
          <label className='search-label'>Search for quotes
            <input className='search-bar'
              type="text"
              name='query'
              value={search}
              placeholder='Search for quotes...'
              onChange={handleChange}
            />
          </label>
        </form>
        <h1 className='head-sub'>Add your own quote or look for a certain quote</h1>
        <h2 className='head-title'>Total Quotes ( {totalQuotes} )</h2>
        <div className='filter'>
          <Filter setQuotes={setQuotes} />
        </div>
        <div className='card-container'>


          {quotes.map((quote, index) => (
            <Card key={index} quote={quote} />
          ))}
        </div>
        <PaginationComp pagination={pagination} setQuotes={setQuotes} setPagination={setPagination} />
      </div>
      <Footer />
    </>
  );
}

export default App;
