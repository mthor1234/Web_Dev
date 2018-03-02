// Check if a number is prime
function primeCheck(){
    
    int interator = 1;
    
while(iterator < 100){ 
      
    if(iterator/2){
        
        var i = 2;
        while(i < iterator){
            
            if(iterator % i === 0){
                // Not prime
                console.log("number is not prime!");
                break;
            }
            else{
                console.log("number is prime!");
            }
            i++;
        }
    }
    iterator++;
}
    
}



// Check if an array of numbers is sorted