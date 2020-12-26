// referencia a main
const main = document.querySelector( ' main ' )
// .btn-touggle e a classe do botão que está la em html 
const buttonInsertText = document.querySelector('.btn-toggle')
// seleciona o botão ler texto na caixa 
const buttonReadText = document.querySelector('#read')
// puxando a text-box la do html
const divTextBox = document.querySelector('.text-box')
// puxa o close o botão fechar do html
const closeDivtextBox = document.querySelector('.close')
// serve para quando selecionar 
const selectElement = document.querySelector('select')
// pega o texto digitado na caixa 
const textArea = document.querySelector('textarea')

// cada img e texto que contem no site 
const humanExpressions = [
    // shift + alt seta para baixo copia a linha 
    { img: './img/drink.jpg', text: 'Estou com sede ' },
    { img: './img/angry.jpg', text: 'Estou com raiva ' },
    { img: './img/food.jpg', text: 'Estou com fome ' },
    { img: './img/grandma.jpg', text: 'Quero ver a vovó ' },
    { img: './img/happy.jpg', text: 'Estou  feliz ' },
    { img: './img/home.jpg', text: 'Estou em casa ' },
    { img: './img/hurt.jpg', text: 'Estou machucado ' },
    { img: './img/outside.jpg', text: 'quero ir lá fora ' },
    { img: './img/sad.jpg', text: 'Estou Triste ' },
    { img: './img/scared.jpg', text: 'Estou assustado ' },
    { img: './img/school.jpg', text: 'Estou na escola ' },
    { img: './img/tired.jpg', text: 'Estou cansado ' }
]

const utterance  = new SpeechSynthesisUtterance ( )
const setTextMessage = text => {
    utterance.text = text 
}

const speakText = ( ) => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedVoice
}

// map retorna um novo array do array original só que com cada item tranformado
const addExpressionBoxesIntoDOM = ( ) => {
    main.innerHTML = humanExpressions.map(({ img, text}) => `
        <div class="expression-box" data-js="${text}">
            <img src="${img}" alt="${text}" data-js="${text}">
            <p class="info" data-js="${text}">${text}</p>
        </div>
    ` ).join( ' ' )
}

addExpressionBoxesIntoDOM( )

const setStyleOfClickedDiv = dataValue => {
    const div = document.querySelector(`[data-js="${dataValue}"]`)
    div.classList.add('active')
    setTimeout( ( ) => {
        div.classList.remove('active')
    }, 1500)
}

main.addEventListener('click', event => {
    const clickedElemente = event.target
    const clickedElementeText = clickedElemente.dataset.js

// CASO DEPOIS PRECISE ADICIONAR OUTRO ELEMENTO E SÓ PASSAR COMO PARAMENTRO 
// DENTRO DO ARRAY EX. ['IMG', 'P', 'BOTTON']
    const clickedElementTextMustBeSpoken = ['IMG', 'P'].some(elemetName => 
        clickedElemente.tagName.toLowerCase( ) === elemetName.toLowerCase( ))

    if (clickedElementTextMustBeSpoken ){
        setTextMessage(clickedElementeText)
        speakText ( )
        setStyleOfClickedDiv (clickedElementeText )
    }
})
                // // O CODIGO ABAIXO FOI REFEITO DE FORMA MAIS LIMPA E INTELIGENTE PELO ACIMA \\ \\
// {// // tirei o humanExpressions e coloquei ( { img, text}) porque feita uma descontrução para 
// // puxar cada img e text de cada elemento
// const createExpressionBox = ( { img, text }) => {
//     // cria uma div para cada img ( cada elemento )
//     const div = document.createElement ( 'div' ) 

//     // cria uma tag img e uma p para cada img e text 
//     div.classList.add('expression-box')
//     div.innerHTML = `
//         <img src="${img}" alt="${text}">
//         <p class="info">${text}</p>
//     `

//     div.addEventListener('click', ( ) => {
//         setTextMessage(text)
//         speakText ( )

//         div.classList.add('active')
//         setTimeout( ( ) => {
//             div.classList.remove('active')
//         }, 1500)
//     })

// // appendChild adiciona um elemento no ultimo filho do elemento que ele e encadiado
//     main.appendChild(div)
// }

// humanExpressions.forEach(createExpressionBox)}

// recebe let porque o valor está sendo modificado mais a frente
let voices = [ ]
// speechSynthesis e uma 
speechSynthesis.addEventListener('voiceschanged', ( ) => {
    voices = speechSynthesis.getVoices( )    


        // reduce estudar melhor 
        const optionElements = voices.reduce( ( accumulator, {name, lang}) => {
            accumulator +=  `<option value="${name}">${lang} | ${name}</option>`
            return accumulator
        }, ' ')

        selectElement.innerHTML = optionElements

            // setando voz padrão
         const googleVoice = voices.find( voice => 
        voice.name === 'Google português do Brasil')
        const microsoftVoice = voices.find ( voice =>
        voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')

        if (googleVoice){
            utterance.voice = googleVoice
            const googleOptionElement = selectElement
            .querySelector(`[value="${googleVoice.name}"]`)
            googleOptionElement.selected = true
        } else if (microsoftVoice){
            utterance.voice = microsoftVoice
            const microsoftOptionElement = selectElement
            .querySelector(`[value="${microsoftVoice.name}"]`)
            microsoftOptionElement.selected = true
        }

                // // O CODIGO ABAIXO FOI REFEITO DE FORMA MAIS LIMPA E INTELIGENTE PELO ACIMA \\ \\
               
    // // esse name e lang esta sendo puxado do speechSynthesis, está sendo feito uma descontrução
    // voices.forEach( ({name, lang}) => {
    //     const option = document.createElement( 'option' )

    //     option.value = name

    //     // condição de voz padrão

    //     if (googleVoice && option.value === googleVoice.name){
    //         utterance.voice = googleVoice
    //         option.selected = true
    //     } else if ( microsoftVoice && option.value === microsoftVoice.name){
    //         utterance.voice = microsoftVoice
    //         option.selected = true
    //     }

    //     option.textContent = ` ${lang} | ${name} `
    //     selectElement.appendChild(option) // está recebendo cada elemento e adicionando a option
    // })
})



buttonInsertText.addEventListener('click', ( ) => {
    divTextBox.classList.add('show')
})

closeDivtextBox.addEventListener('click', ( ) => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice )

buttonReadText.addEventListener('click', ( ) => {
    setTextMessage(textArea.value)
    speakText ( )
})