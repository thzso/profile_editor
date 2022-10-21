

const addData = async (	firstName, surname, country, zipCode, city, street, houseNumber) => {
    const url = 'http://127.0.0.1:9000'

    const response = await fetch(url, {
        method: "POST",
        // mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({firstName,surname,country, zipCode, city, street, houseNumber})
    })
    return response.status
   
};

const init = async () => {
document.getElementById("submit").addEventListener('click', async () => {
    const firstName = document.getElementById("firstName").value
    const surname = document.getElementById("surname").value
    const country = document.getElementById("country").value
    const zipCode = document.getElementById("zipCode").value
    const city= document.getElementById("city").value
    const street = document.getElementById("street").value
    const houseNumber = document.getElementById("houseNumber").value

    console.log(firstName, surname, country, zipCode, city, street, houseNumber)

    const resStatus = await addData(firstName, surname, country, zipCode, city, street, houseNumber)
    if (resStatus === 200){
        alert("ok")
    }else{
        alert("err")
       
    }
});

}

init()




// async function loadData (){
//     const response = await fetch('http://localhost:9000')
//     const data = response.json()
//     console.log(data)
// }
// loadData()


// const getProfileData = async () => {
//     let response = await fetch('http://localhost:9000')
//     const profileData = await response.json()
//     // return profileData
//     console.log(profileData)
   
// }

// getProfileData()

// const run = async () => {
//     const profileData = await getProfileData()
//     console.log(profileData)
// }

// run()



// const submitBtn = document.getElementById('submit')
// const formelements = document.getElementById('form')
// console.log(formelements.elements)


// submitBtn.addEventListener('click', function () {
//     const data = []
//     for (let elem of formelements) {
//         data.push(elem.value)
//     }


//     console.log(data)
//     console.log('submit')
// })

    // 

    // const newData ={
    //     "firstName": firstName,
    //     "surname": surname,
    //     "country": country,
    //     "zipCode": zipCode,
    //     "city": city,
    //     "street": street,
    //     "houseNumber": houseNumber,
        
    // }








