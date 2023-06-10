let list = document.getElementById('list');
let form = document.getElementById('form');
let button = document.getElementById('btn');
let amount = document.getElementById('amount');
let description = document.getElementById('description');
let category = document.getElementById('category');
//let editUser = null

button.addEventListener('click',addExpense);


async function addExpense(e)
{
    e.preventDefault();

    let obj ={
        amount: amount.value,
        description: description.value,
        category: category.value 
    }
// if(editUser !== null){
//    await axios.put(`https://crudcrud.com/api/5e33e94e89d74190a60f665c5e1c6415/details/${editUser}`,obj)
//    let editRes = await axios.get(`https://crudcrud.com/api/5e33e94e89d74190a60f665c5e1c6415/details/${editUser}`)
//    showOnScreen(editRes.data);
//    editUser = null; 
// }
// else{
  try{
    let res = await axios.post('http://localhost:3000/expenses',obj)
    showOnScreen(res.data);
  }  
  catch(error){
     console.log(error);
     document.body.innerHTML = `<h1>${error}</h1>`
  }
//}
}

window.addEventListener('DOMContentLoaded',async () => {

try{
    let res = await axios.get('http://localhost:3000/expenses')
     
     for(let i=0; i<res.data.length; i++){
         showOnScreen(res.data[i]);
     }
}    
catch(error){
    console.log(error);
    document.body.innerHTML = `<h1>${error}</h1>`
}

})

function showOnScreen(user)
{
    amount.value = '';
    description.value = '';
    category.value = '';

    let child = `<li class='list-group-item' id=${user.id}> ${user.amount} - ${user.description} - ${user.category}
                 <button class="btn btn-outline-danger" onclick=deleteExpense('${user.id}')>Delete Expense</button>
                 <button class="btn btn-outline-dark" onclick=editExpense('${user.id}','${user.amount}','${user.description}','${user.category}')>Edit Expense</button></li>`

    list.innerHTML = list.innerHTML + child;             
}


function editExpense(userid,amount,description,category)
{
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
    //editUser = userid;
    //removeFromScreen(userid);
    deleteExpense(userid);
}

async function deleteExpense(userid)
{
  try{
    await axios.delete(`http://localhost:3000/expenses/${userid}`)
    removeFromScreen(userid);
  }   
  catch(error){
    console.log(error);
    document.body.innerHTML = `<h1>${error}</h1>`
  }
}

function removeFromScreen(userid)
{
    let childNode = document.getElementById(userid);
    if(childNode)
    {
        list.removeChild(childNode);
    }
}