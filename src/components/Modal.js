import React, { useState } from 'react'
import CategorySelect from './CategorySelect'

function Modal(props) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    await add_quote(inputs);
    setInputs({})
    setModal(!modal);
    await get_new_quotes()
  }

  const get_new_quotes = async () => {
    let response = await fetch('/api/quotes')
    let data = await response.json()
    props.setQuotes(data.results)
    props.setTotalQuotes(data.count)
  }

  const add_quote = async (inputs) => {
    let response = await fetch('/api/quotes/new-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });
    let data = await response.json()
    return data
  }
  return (
    <>
      <button className='nav-link add-btn' onClick={toggleModal}>Add a Quote</button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className='modal-content'>
            <button className="close-modal" onClick={toggleModal}>
              &#215;
            </button>
            <form onSubmit={handleSubmit} className='modal-form'>
              <h2 className='modal-form-title'>Add a Quote</h2>
              <hr className='break-line'></hr>
              <label className='form-input-lab'>Quote Author
                <input className='form-input'
                  placeholder='Author'
                  type="text"
                  name="author"
                  value={inputs.author || ""}
                  onChange={handleChange}
                />
              </label>
              <hr className='break-line'></hr>
              <label className='form-input-lab'>Write a Quote
                <textarea className='form-input'
                  placeholder='Write a Quote'
                  type="text"
                  name="quote"
                  defaultValue={inputs.quote || ""}
                  onChange={handleChange}
                ></textarea>
              </label>
              <hr className='break-line'></hr>
              <label className='form-input-lab'>Choose a Category
                <select className='form-input'
                  placeholder='Choose a Category'
                  name="category"
                  value={inputs.category || ""}
                  onChange={handleChange}>
                  <CategorySelect />
                </select>
              </label>
              <input className='form-input-submit' value={'Add Quote'} type="submit" />
            </form>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Modal
