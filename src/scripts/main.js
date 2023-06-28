document.addEventListener('DOMContentLoaded', function() {                                      //para que o js seja carregado após o carregameno de todos os códigos css e html forem carregados
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {     //recuperando o formulário
        evento.preventDefault();                                                                //prevenindo o evento padrão do submit
        let numeroMaximo = document.getElementById('numero-maximo').value;                      //recuperando o valor digitado no input
        numeroMaximo = parseInt(numeroMaximo);                                                  //convertendo o valor inputado para inteiro          
    
        let numeroAleatorio = Math.random() * numeroMaximo;                                     //gerando o numero aleatório com a função
        numeroAleatorio = Math.floor(numeroAleatorio + 1);                                      //arredondando o numero aleatório para baixo uilizando apenas o número inteiro / "+1" => para evitar que o resultado dẽ zero

        document.getElementById('resultado-valor').innerText = numeroAleatorio;                 //recuperando a div e imprimindo o valor aleatório
        document.querySelector('.resultado').style.display = "block";                           //mudando o style da div "resultado" para ser exibido após o submit 
    })
})