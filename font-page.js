//************Complete*******************************/

const getAllData=async()=>{ //Getting all data for creating paginate buttons

    try{
        let res=await fetch('http://localhost:8080/fonts')
        let data=await res.json()
    
        Create_btn(data.length)
    }catch(error){
       console.log(error)
    }
   
}

const Create_btn=(total_data)=>{  //Creating Paginate Btns

    let no_of_btn=Math.ceil(total_data/12)
    let Paginate_btn_div=document.getElementById('p_btn')

    for(let i=1;i<=no_of_btn;i++){
        let btn =document.createElement('button')
        btn.innerText=i

        btn.onclick=()=>{
            getData(i)
        }

        Paginate_btn_div.append(btn)
    }
}

const getData=async(page_id)=>{ // Getting 12 data per page

    try{
        let res=await fetch(`http://localhost:8080/fonts?_page=${page_id}&_limit=12`)
        let data=await res.json()
    
        appendData(data)

    }catch(error){
       console.log(error)
    }
   
}



let cart_data=JSON.parse(localStorage.getItem('cart')) || []  // Creating Array for cart data/or getting from LS


const appendData=(data)=>{ // Appendind data
    let container=document.getElementById('container') // appending div
    container.innerHTML=null;
    let flag=false          ///var flag for wishlist  on clicking change the color of heart

    data.forEach((el)=>{
        let card=document.createElement('div') 

        let image=document.createElement('img')
        image.src=el.image

        let name=document.createElement('p')
        name.innerText=el.name;


        let rating_div=document.createElement('div') //creatiing div for appending rating and star logo
        rating_div.className="rating_div"

        let rating=document.createElement('p')
        let star=document.createElement('img')
        star.className='star'
        star.src='https://cdn1.iconfinder.com/data/icons/vote-reward-7/24/award_reward_rate_rating_star_empty-64.png' //Rating Star Image

        rating.innerText=el.rating

        rating_div.append(star,rating)

        let wishlist_div=document.createElement('div')  // div for appending heart logo and price
        wishlist_div.className='wishlist_div'

        let wishlist_img=document.createElement('img')
        wishlist_img.src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/heart-64.png'
         
        wishlist_img.className='wishlist_img'
        wishlist_img.onclick=()=>{ // this function changes the color of heart logo on clicking
            if(flag==false){
                wishlist_img.src='https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                flag=true
            }
            else{
                wishlist_img.src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/heart-64.png'
                flag=false;
            }
           
        }

        let cart_btn=document.createElement('button') 
        cart_btn.innerText='Add To Cart'
        cart_btn.className='cart_btn'

        cart_btn.onclick=()=>{//this fn will store the clicked data in the form of array of obj as "cart" as a key. 
            cart_data.push(el)
            localStorage.setItem('cart',JSON.stringify(cart_data))
        }



        let show_price=document.createElement('p')
        show_price.innerText=el.show_price;

        wishlist_div.append(wishlist_img,show_price)


        card.append(image,name,rating_div,wishlist_div,cart_btn)

        container.append(card)

    })

}

getData(1) // by default showing first page
getAllData() // for craeting paginate btns


//Sorting 




let select_budget=document.getElementById('range')
select_budget.oninput=()=>{
    if(select_budget.value=='high'){
        Sort_by_range('gte=1001')
    }
    else{
        Sort_by_range('lte=1000')
    }
   
}


const Sort_by_range=async(order)=>{

    try{
        let res=await fetch(`http://localhost:8080/fonts?price_${order}`)
        let data=await res.json()
        console.log(data)
        appendData(data)

    }catch(error){
       console.log(error)
    }
   

}



let sort=document.getElementById('sort-low-high')
sort.oninput=()=>{
    if(sort.value=='l-t-h'){
        Sort('asc')
    }
    else if(sort.value=='h-t-l'){
        Sort('desc')
    }else{
        getData(1)
    }
}




const Sort=async(order)=>{

    try{
        let res=await fetch(`http://localhost:8080/fonts?_sort=price&_order=${order}`)
        let data=await res.json()
        appendData(data)

    }catch(error){
       console.log(error)
    }

   

}



let rating_btn=document.getElementById('rating-low-high')
rating_btn.oninput=()=>{
    
    if(rating_btn.value=='less'){
        Sort_by_rating('asc')
    }
    else if(rating_btn.value=="high"){
        Sort_by_rating('desc')
    }
    else{
        getData(1)
    }
}



const Sort_by_rating=async(order)=>{
     try{
        let res=await fetch(`http://localhost:8080/fonts?_sort=rating&_order=${order}`)
        let data=await res.json()
        appendData(data)

     }catch(error){
        console.log(error)
     }
   

}
