const  express = require("express")
const fs = require('fs')
const uniqid = require('uniqid'); 
const userRoter = require('./routes/user')


const app = express();
const port = '4000'


app.listen(port , () => {
            console.log(`server is listening to port  ${port}  `)
})

app.use(express.json())

//routing
app.use('/bank',  userRoter)
     


//catch 404
app.use((req,res,next)=>{
    let err = new Error('please , check end point and try again')
    err.status= 404
    next(err)
})





















///////////////////////////////////////////////////////////////////////////////


// const removeClient = (id)=>{
//    const clients =  loadClients()
//    //console.log(`remove note that has a title : ${title}`)

//    const newClients = clients.filter( (client)=>{
//       return  client.id !== id
//    })

//    if (clients.length > newClients.length){
//       saveClients(newClients)
//      console.log( chalk.bold.green.inverse("One client was deleted successfully"))
//    }else{
//       console.log(chalk.bold.red.inverse("There no match of this client"))

//    }
  
// }


//////////////////////////////////////////////////////////////////////////////


// const readClient = (id) =>{
//   const clients = loadClients();

//   const client1 = clients.find( (client)=>{
//         return client.id === id
//   })

//   if (client1){
//       console.log(client1)
//      console.log( chalk.bold.green.inverse("One client was readed successfully"))
//    }else{
//       console.log(chalk.bold.red.inverse("There no match of this client"))

//    }
// }





////////////////////////////////////////////////////

// const clientsList = ()=>{
//   const clients =  loadClients()

//   if (clients){
//       clients.forEach(client => {
//           console.log(client)
//       })
//      console.log( chalk.bold.green.inverse("List of clients loaded successfully"))
//    }else{
//       console.log(chalk.bold.red.inverse("There is not any client"))

//    }

  
// }

//////////////////////////////////////////////////////////////


// const updateClient = (id,fname,cash,credit)=>{
//   const clients =  loadClients()
//   //console.log(`remove client that has id : ${id}`)

//   const newClients = clients.filter( (client)=>{
//      return  client.id !== id
//   })

//      if(newClients.length < clients.length){
//           let updatedClient;

//           updatedClient.push({
//               fname: newTitle,
//               cash : cash,
//               credit:credit
//           })

//           saveClients (newClients)
//           console.log(chalk.green.inverse("A  client was updated successfully"))
//     }else{
//           console.log(chalk.red.inverse("There is no match for this client"))
//     } 

  
 
// }


///////////////////////////////////////////////////////////////////

// module.exports = {






// //   addClients : addNotes,
// //   removeNotes:removeNotes,
// //   readNote:readNote,
// //   notesList:notesList,
// //   updateNote,updateNote
  
  
// }