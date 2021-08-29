const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

class Field 
{
    constructor() 
    {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;  

    }

generateField(percentage) 
{
    //Hat Location object
    const hatLocation = {
        x: Math.floor(Math.random() * colNum),
        y: Math.floor(Math.random() * rowNum)
    };   

    //to check hatLocation not at starting point

    if(hatLocation.x == 0 && hatLocation.y == 0)
    {
        hatLocation.x = Math.floor(Math.random() * colNum);
        hatLocation.y = Math.floor(Math.random() * rowNum);
    }
    
    for(let y=0; y<rowNum; y++)
    {
        for(let x=0; x<colNum; x++)
        {
            const prob = Math.random();
            this._field[y][x] = prob > percentage ? fieldCharacter : hole;
        }
    }
    this._field[hatLocation.y][hatLocation.x] = hat;
    
    //set pathCharacter position - Home
    this._field[0][0] = pathCharacter; 
    } //end of generateField
    
    runGame()
    {
        let playing = true;
        console.log("Start Game");
        console.log("Instructions: Please enter U - Up, D - Down, L - Left, R - Right, Ctrl+C - To exit.");
        //print field
        this.print();
        this.askQuestion();
    }

    print()
    {
        const displayString = this._field.map(row => {
        return row.join('');
    }).join('\n');
    console.log(displayString);
    }

    askQuestion()
    {
        let direction = prompt('Enter path direction >>').toUpperCase(); 
        let x=0;
        let y=0;
        let foundHat = 0;
        let foundHole = 0;

        
while(foundHat == 0 && foundHole == 0) {
        switch(direction)
        {
            case "U": 
               if(y === 0) {
                console.log("You cannot move any up.")  
                direction = prompt('Enter path direction >>').toUpperCase(); 
                break;
                }
                y -= 1;
               
                if(this._field[y][x] == hat) {
                    foundHat = 1;
                    console.log("Yay! You win.");
                } else if(this._field[y][x] == hole) {
                    foundHole = 1;
                    console.log("Game Over. You fell into the hole.");  
                } else {
                this._field[y][x] = pathCharacter; 
                this.print(); 
                direction = prompt('Enter path direction >>').toUpperCase(); 
                }
                
               break;            
               
                case "D":
                if(y === 10)
                {
                console.log("You cannot move any down.") 
                direction = prompt('Enter path direction >>').toUpperCase();
                break;                     
                }
                y += 1;
               
                if(this._field[y][x] == hat) {
                    foundHat = 1;
                    console.log("Yay! You win.");
                } else if(this._field[y][x] == hole) {
                    foundHole = 1;
                    console.log("Game Over. You fell into the hole.");  
                } else{
                this._field[y][x] = pathCharacter; 
                this.print(); 
                direction = prompt('Enter path direction >>').toUpperCase(); 
                }
                
                break;          

                case "L":
                if(x === 0)
                {
                    console.log("You cannot move any left.")
                    direction = prompt('Enter path direction >>').toUpperCase(); 
                    break;                    
                }
                x -= 1;
                 
                if(this._field[y][x] == hat) {
                    foundHat = 1;
                    console.log("Yay! You win.");
                } else if(this._field[y][x] == hole) {
                    foundHole = 1;
                    console.log("Game Over. You fell into the hole.");  
                } else{
                this._field[y][x] = pathCharacter;
                 this.print();
                 direction = prompt('Enter path direction >>').toUpperCase(); 
                }
                          
                 break;

                case "R":
                if(x === 10)
                {
                    console.log("You cannot move any right.")
                    direction = prompt('Enter path direction >>').toUpperCase(); 
                    break;
                }
                x += 1;               
                if(this._field[y][x] == hat) {
                    foundHat = 1;
                    console.log("Yay! You win.");
                } else if(this._field[y][x] == hole) {
                    foundHole = 1;
                    console.log("Game Over. You fell into the hole.");  
                } else {
                this._field[y][x] = pathCharacter; 
                this.print();  
                direction = prompt('Enter path direction >>').toUpperCase(); 
                }              
               
                break;   
        }
    }
    } 
}

const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();