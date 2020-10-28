let goods = [
    { id: 1, title: 'Яблоки', price: 20, img: 'img/apple.jpg' },
    { id: 2, title: 'Апельсины', price: 30, img: 'img/orange.jpg' },
    { id: 3, title: 'Манго', price: 40, img: 'img/mango.jpg' }
]

const toHtml = good => `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" style="height: 280px; width: 286px" src="${good.img}" alt="${good.title}">
                    <div class="card-body">
                        <h5 class="card-title">${good.title}</h5>
                        <a href="#" class="btn btn-primary" data-btn="price" data-id="${good.id}">Посмотреть цену</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${good.id}">Удалить</a>
                    </div>
                </div>
            </div>
        `


function render() {
    const html = goods.map(toHtml).join('')
    document.querySelector('#goods').innerHTML = html
}
render()


const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const good = goods.find(g => g.id === id)

    if (btnType === 'price') {
        priceModal.setContent(
            `<p>Цена на ${good.title}: <strong>${good.price}$</strong></p>`
        )
        priceModal.open()

    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${good.title}</strong></p>`
        }).then(() => {
            goods = goods.filter(g => g.id !==id)
            render()
        }).catch(() => {
            console.log('cancel')
        })
    }
})
