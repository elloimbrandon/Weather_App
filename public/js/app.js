// client-side javascript file

const weatherForm = document.querySelector('form') // form search
const searchElement = document.querySelector('input') // input recieved from form
const messageOne = document.querySelector('#message-1') // p-1
const messageTwo = document.querySelector('#message-2') // p-2


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // event prevent default prevents the whole page or browser from refreshing and the server restarting 
    
    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    // My shortend code below!
    
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         if (!data.error)
    //             return (messageOne.textContent = data.location) + (messageTwo.textContent = data.forecast)
    //         messageOne.textContent = data.error
    //     })
    // })
})