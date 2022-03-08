const itens = [
    {
        id: 0,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    },
    {
        id: 1,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    },
    {
        id: 4,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    },
    {
        id: 5,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        quantidade: 0
    }

]

inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    itens.map((val) => {
        containerProdutos.innerHTML += `
        <div class="produto">
        <img src= `+ val.img + ` />
        <p> `+ val.nome + `</p>
        <a key="`+ val.id + `" href="">Adicionar ao carrinho!</a> 
        /*alterar  para um botão*/
        </div>
         `
    })
}

inicializarLoja();
