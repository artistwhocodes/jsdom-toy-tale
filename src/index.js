let addToy = false;
 

document.addEventListener("DOMContentLoaded", () => 
{
  //elements from DOM
 
  const toyUrl = "http://localhost:3000/toys"
  const addBtn = document.querySelector("#new-toy-btn")
        addBtn.style.cursor = "pointer" 
  const toyForm = document.querySelector(".container")
  const submitBtn = document.querySelector(".submit")   
      submitBtn.style.cursor = "pointer" 
  const toyCollection = document.querySelector('#toy-collection')

  

   //fetch( "http://localhost:3000/toys").then(res => res.json() )
   //.then( toys => makeToys(toys) )
  

    //Asynchronous functions operate in a separate order than the rest 
    //of the code via the event loop, returning an implicit Promise as 
    //its result
  //fetchToys()
  // async function fetchToys()
  // {
  //   try 
  //   {
  //     let response = await fetch( toyUrl )
  //     let obj = await response.json()
  //     obj.forEach( toy => makeToy(toy) )
  //   } 
  //   catch (error){ console.log(error) }
  // }
 


  //fetch toys from site 
  fetch( toyUrl )
  .then( res => res.json() ) 
  //to see what im getting back
  //.then(toys => console.dir(toys)) 
  .then( toys => renderToys(toys) ) 
  .catch( error => console.log(error.message) )  

  //render/show each toys
  function renderToys(toys)
  { 
    toys.forEach(toy => 
    { 
      makeToy(toy)
    }) 
  }

  //POST Toy function  
  //**how to prevent an empty value from going through* */
  function postToy(toyData) 
  { 
    fetch( toyUrl , 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify
        ({
          "name": toyData.name.value,
          "image": toyData.image.value,
          "likes": 0
        })
      }) 
      .then(res => res.json() )
      .then(json => makeToy(json) )
  }
 
  ////to render toys  
  function makeToy(toy) // 
  {
    //div class="card"
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')

    //<h2>Woody</h2>
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    //<img src=toy_image_url class="toy-avatar" />
    let img =  new Image();
    //document.createElement('img')
    img.src = toy.image  
    img.className = "toy-avatar"

    //<p>4 Likes </p>
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
    
    //<button class="like-btn">Like <3</button>
    let btn = document.createElement('button')
    btn.style.cursor = "pointer" //not working
    btn.className = "like-btn" 
    btn.innerText = "like"
    btn.addEventListener('click', (e) => 
    {
      e.preventDefault()
      //console.log(e.target.dataset);
      toy.likes += 1;
      p.innerText = toy.likes + " Likes";
      console.log(toy.id)
      fetch(`http://localhost:3000/toys/${toy.id}`, 
      {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify
        ({
          "likes":  toy.likes
        })
      })
    }) 
 
    divCard.append(h2, img, p, btn)
    toyCollection.append(divCard)
    //return divCard 
  }
  
  

  // hide & seek with the form
  addBtn.addEventListener("click", () => 
  {
    addToy = !addToy;
    if (addToy) 
    {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', e => 
      { 
        //keep it from refreshing
        e.preventDefault() 
        postToy(e.target)
        toyForm.style.display = 'none'
      })
    } 
    else 
    {
      toyForm.style.display = 'none'
    } 
  })
  
 
})
