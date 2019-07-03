document.addEventListener("DOMContentLoaded", function() {
  let booksURL =   'http://localhost:3000/books'
  let usersURL = 'http://localhost:3000/users'
  let ul = document.querySelector('#list')
  let panel = document.querySelector('#show-panel')


  fetch(booksURL)
  .then((res)=>{return res.json()})
  .then((books)=>{

    // console.log(books);
    //call function to render bookslist
    books.forEach((b)=>{bookList(b)})
  })

  function bookList(book){
    let li = document.createElement('li')
    li.innerText = book.title
    //add event listener
    li.addEventListener('click',(e)=>{
      //function to show panel
      panel.innerHTML = ""
      showPanel(book)
    })
    ul.append(li)
    //
  }

  function showPanel(b){
    let h1 = document.createElement('h1')
    h1.innerText = b.title

    let img = document.createElement('img')
    img.src = b.img_url

    let p = document.createElement('p')
    p.innerText = b.description

    let btn = document.createElement('button')
    btn.innerText = 'Read Book'

    let users_ul = document.createElement('ul')

    b.users.forEach((u)=>{
      let li2 = document.createElement('li')
      li2.innerText = u.username
      users_ul.append(li2)
    })

    btn.addEventListener('click', (e)=> {
      //call function to "read book"
      e.preventDefault()
      panel.innerHTML = ""
      // console.log(b);

      fetch(usersURL)
      .then((res)=>{return res.json()})
      .then((all_users)=>{
        // console.log('after fetching users', all_users)
        // array of objects
        let firstUser = all_users[0]
        // console.log('firstUser', firstUser)
        // console.log('do we still have b?', b)
        // add user to array belonging to book in users who have read books
        b.users.push(firstUser)
        console.log(b.users)
        // nested fecth where we update our db.json families
        fetch(`${booksURL}/${b.id}`,{
          method: "PATCH",
          headers: {"Content-Type": "application/json",
                  "Accept": "application/json"
          },
          body: JSON.stringify({
            "users": b.users

          })

        })//fetch ends
        showPanel(b)
      })//second then


    })//listener
    panel.append(h1,img,p,btn,users_ul)

  }//showPanel






});
