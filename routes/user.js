

const router = require('express').Router()
const fs = require('fs')
const chalk = require('chalk')
const e = require('express')



////////////////////////////////////////////////////////////////////////////////////

//Add Client
router.post('/',  (req,res,next)=>{

     try{ 
                let newUser =  req.body
            
                const clients =  loadClients()
                
                
                const duplicateClients = clients.filter( (client)=>{
                    return  client.id === newUser.id 
                })

                if (duplicateClients.length === 0){
                
                        clients.push({
                            id : newUser.id,
                            fname: newUser.fname,
                            cash : newUser.cash,
                            credit:newUser.credit,
                            isActive: newUser.isActive
                            
                        })
                        
                        saveClients(clients)
                        res.json(newUser)
                        console.log(chalk.green.inverse("A new client was added successfully"))
                }else{
                console.log(chalk.red.inverse("This client is dublicated"))
                } 



    } catch(error){
        next(error)
    }
})


//////////////////////////////////////////////////////////////////////////////////////////


//Update Client

router.put('/:id', (req,res,next)=>{
    try{
          let id = parseInt(req.params.id)
         let ClientToUpdate =  req.body
         console.log(id)
          const clients =  loadClients()
         
          
          const newClients = clients.filter( (client)=>{
             return  client.id !== id
          })
      
          console.log(newClients)

             if(newClients.length < clients.length){
             
                  newClients.push({
                      id:id,
                      fname : ClientToUpdate.fname,
                      cash: ClientToUpdate.cash,
                      credit: ClientToUpdate.credit,
                      isActive: ClientToUpdate.isActive
                  })
      
                  saveClients(newClients)
                  res.json(newClients)
                  console.log(chalk.green.inverse("A  client was updated successfully"))
            }else{
                  console.log(chalk.red.inverse("There is no match for this client"))
            } 
      

         
    }catch(error){
        next(error)
    }
})

///////////////////////////////////////////////////////////////////////////////

//Delete Client

router.delete('/:id', (req,res,next)=>{
    try{
          
          let id = parseInt(req.params.id)
          console.log(id)
          const clients =  loadClients()
     
          const newClients = clients.filter( (client)=>{
             return  client.id !== id
          })
          console.log(clients)
          console.log(newClients)

          const ClientToDelete = clients.find( (client)=>{
            return  client.id === id
          })
     
          if (clients.length > newClients.length){
             saveClients(newClients)
             res.json(ClientToDelete)
             console.log( chalk.bold.green.inverse("One client was deleted successfully"))
          }else{
             console.log(chalk.bold.red.inverse("There no match of this client"))
     
          }





    }catch(error){
        next(error)
    }
})




//////////////////////////////////////////////////////////////////////////////////////////

//Get Client

router.get('/:id', (req,res,next)=>{
    try{
     
        let id = parseInt(req.params.id)
        const clients = loadClients()

        const clientToGet = clients.find( (client)=>{
              return client.id === id
        })
    
        if (clientToGet){
           // console.log(note1)
           res.json(clientToGet)
           console.log( chalk.bold.green.inverse("One client was readed successfully"))
         }else{
            console.log(chalk.bold.red.inverse("There no match of this client"))
    
         }
      
    }catch(error){
        next(error)
    }     
})
/////////////////////////////////////////////////////////////////////////////////


//Get All Clients

router.get('/', (req,res,next)=>{
    try{

            const clients =  loadClients()

            let clientsToGet = []

            if (clients){
                clients.forEach(client => {
                    console.log(client)
                    clientsToGet.push(client)
                })

               
                 res.send(clientsToGet)
                console.log( chalk.bold.green.inverse("List of clients loaded successfully"))
            }else{
                console.log(chalk.bold.red.inverse("There is not any client"))

            }
        }catch(error){
            next(error)
        }     
    })
    /////////////////////////////////////////////////////////////////////////////////



    router.put('/deposit/:id', (req,res,next)=>{
        try{
              let id = parseInt(req.params.id)
              let data  =  req.body
              newCash = data.cash
             

              let clients =  loadClients()
             
              
              let clientIndex = clients.findIndex((client)=>client.id === id)
              
         
            
              if(clientIndex >= 0){
                     
                      clients[clientIndex].cash += newCash
                      console.log("newCash",clients[clientIndex].cash)
                      saveClients(clients)
                      res.json(clients[clientIndex])
                      console.log(chalk.green.inverse("A client cash was deposited successfully"))
                }else{
                      console.log(chalk.red.inverse("There is no match for this client"))
                } 
          
    
             
        }catch(error){
            next(error)
        }
    })
    



//////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/withdraw/:id', (req,res,next)=>{
    try{
          let id = parseInt(req.params.id)
          let data  =  req.body
          newCash = data.cash
         

          let clients =  loadClients()
         
          
          let clientIndex = clients.findIndex((client)=>client.id === id)
        
          if(clientIndex >=0 ){
                 

                  if ( clients[clientIndex].cash >= newCash ){
                            
                            clients[clientIndex].cash -= newCash
                            saveClients(clients)
                            res.json(clients[clientIndex])
                            console.log(chalk.green.inverse("A client cash was deposited successfully"))

                  }else if(clients[clientIndex].cash + clients[clientIndex].credit >= newCash){
                        
                          clients[clientIndex].credit = clients[clientIndex].credit - newCash + clients[clientIndex].cash
                          clients[clientIndex].cash = 0   
                          saveClients(clients)
                          res.json(clients[clientIndex])
                          console.log(chalk.green.inverse("A client cash was deposited successfully"))

                  } else{
                          console.log(chalk.red.inverse("There is no money for your withdraw"))
                  }

                  
            }else{
                  console.log(chalk.red.inverse("There is no match for this client"))
            } 
      

         
    }catch(error){
        next(error)
    }
})


///////////////////////////////////////////////////////////////////////////


router.put('/transfer/:id1/:id2', (req,res,next)=>{
    try{
          let id1 = parseInt(req.params.id1)
          let id2 = parseInt(req.params.id2)
         

          let data  =  req.body
          newCash = data.cash
         

          let clients =  loadClients()
         
          
          let firstClientIndex = clients.findIndex((client)=>client.id === id1)
          let secondClientIndex = clients.findIndex((client)=>client.id === id2)
         

          if(firstClientIndex >= 0  && secondClientIndex >= 0){
                 

                  if ( clients[firstClientIndex].cash >= newCash ){
                            
                            clients[firstClientIndex].cash -= newCash
                            clients[secondClientIndex].cash += newCash

                            saveClients(clients)
                            res.json(clients[firstClientIndex])
                            
                            console.log(chalk.green.inverse("A client transfer transitiion done successfully"))

                  }else if(clients[firstClientIndex].cash + clients[firstClientIndex].credit >= newCash){
                        
                          clients[firstClientIndex].credit = clients[firstClientIndex].credit - newCash + clients[firstClientIndex].cash
                          clients[firstClientIndex].cash = 0   
                          clients[secondClientIndex].cash += newCash

                          saveClients(clients)
                          res.json(clients[firstClientIndex])
                         
                          console.log(chalk.green.inverse("A client transfer transitiion done successfully"))

                  } else{
                          console.log(chalk.red.inverse("There is no money for your tranfer"))
                  }

                  
            }else{
                  console.log(chalk.red.inverse("One or both id are not match for our clients"))
            } 
      

         
    }catch(error){
        next(error)
    }
})



////////////////////////////////////////////////////////////////////






const saveClients = (clients) =>{
    const dataJson = JSON.stringify(clients)
    fs.writeFileSync('clients.json', dataJson)
  }
  
  
  /////////////////////////////////////////////////////////////////
  
  const loadClients = ()=>{
    try{  
        const dataBuffer = fs.readFileSync('clients.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
  
    }catch(e){
        return []
    }
    
  
  }

  //////////////////////////////////////////////////////////////////////////////////////////








module.exports = router