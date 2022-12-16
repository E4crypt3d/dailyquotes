import { useState } from 'react'
import CategorySelect from './CategorySelect'

const Filter = (props) => {
  const [select, setSelect] = useState("");
  const [totalCategory, setTotalCategory] = useState(null);

  const get_cat_quotes = async (e) => {
    let category = e.target.value;
    setSelect(category)
    let response = await fetch(`/api/quotes/category?cat=${category}`);
    let data = await response.json();
    props.setQuotes(data)
    setTotalCategory(data.length)
  }

  const remove_category = async () => {
    let response = await fetch('/api/quotes');
    let data = await response.json()
    setSelect("")
    setTotalCategory(null)
    props.setQuotes(data.results)
  }

  return (
    <>
      <label className='form-input-lab'>Filter by Category
        <select className='form-input'
          value={select}
          placeholder='Choose a Category'
          name="category" onChange={get_cat_quotes}>
          <CategorySelect />
        </select>
      </label>
      {totalCategory !== null && (
        <>
          <p>Total Quotes in {select} Category : {totalCategory}</p>
          <button onClick={remove_category} className='clear-cat-btn'>Clear Category</button>
        </>
      )}

    </>
  )
}

export default Filter
