// variables
let result = document.querySelector('.result')
let mainContainer = document.querySelector('.main-container');
let rowId = 1; 
let word = 'abrazo';
let wordArray = word.toUpperCase().split('');
const row = document.querySelector('.row');

drawSquares(row);
listenInput(row);
addFocus(row);
// dibujamos primeros cuadros
function listenInput(actualRow){
    let squares = actualRow.querySelectorAll('.square')
    squares = [...squares];

    let userInput = [];

    squares.forEach((square)=>{
        square.addEventListener('input',(e)=>{
            if(e.inputType !== 'deleteContentBackward'){
                userInput.push( e.target.value.toUpperCase())
                if(e.target.nextElementSibling){
                    e.target.nextElementSibling.focus()
                }else{
                    let squareFilled = document.querySelectorAll('.square');
                    squareFilled = [...squareFilled]
                    let squareFilledLast = squareFilled.slice(-word.length)
                    let userInputFinal = []
                    squareFilledLast.forEach((element)=>{
                        userInputFinal.push(element.value.toUpperCase())
                    })
                    let sameElements = compareArrays(wordArray,userInputFinal)
                    sameElements.forEach((element)=>{
                        squares[element].classList.add('green')
                    })
    
                    if(sameElements.length === wordArray.length){
                        showResult('Ganaste!')
                        reiniciar()
                        return
                    }
                
                    let actualRow = createRow()
                    if(!actualRow){
                        return
                    }
                    drawSquares(actualRow)
                    listenInput(actualRow)
                    addFocus(actualRow)
    
                    let letrasExistentes = existLetter(wordArray,userInputFinal)
                    letrasExistentes.forEach((element)=>{
                        squares[element].classList.add('gold')
                    })
                }
            }else{
                userInput.pop()
            }
            console.log(userInput)
        })
    })

}

// funcion para crear nueva fila
function createRow(){
    rowId++
    if(rowId <= 5){
        let newRow =  document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId);
        mainContainer.appendChild(newRow);
        return newRow
    }else{
        showResult('Perdiste :(')
        reiniciar()
    }
}

//comprobar si los arrays comparten letras
function existLetter(array1,array2){
    let coincidencias = []
    array2.forEach((element,index)=>{
        if(array1.includes(element)){
            coincidencias.push(index)
        }
    })
    return coincidencias
}
// comparar arrays
function compareArrays(array1,array2){
    let iqualsIndex = [];
    array1.forEach((element,index)=>{
        if(element === array2[index]){
            iqualsIndex.push(index)
        }else{
            console.log('en esta posicion no son iguales')
        }
    })
    return iqualsIndex
}

// dibujar cuadros
function drawSquares(row){
    wordArray.forEach((item,index) =>{
        if(index===0){
            row.innerHTML += `<input type="text" maxlength="1" class="square focus">`
        }else{
            row.innerHTML += `<input type="text" maxlength="1" class="square">`
        }
    })
}

// funcion pasar el focus
function addFocus(row){
    let focusElement = row.querySelector('.focus');
    focusElement.focus()
}

function showResult(mensaje){
    result.innerHTML=`
        <p>
            ${mensaje}
        </p>
        <button class="button">
            Reiniciar
        </button> 
    `
}

function reiniciar(){
    let resetButton = document.querySelector('.button');
    resetButton.addEventListener('click',()=>{
        location.reload()
    })
    return
}