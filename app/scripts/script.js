let products = [
    {
        title: 'Техас',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/12/12/pepperoni_i_tomaty_small.png',
        description: 'Лук, Томатный соус Domino\'s, Кукуруза, Ветчина, Сыр моцарелла, Шампиньоны',
        price: '9.9р'
    },
    {
        title: 'Гавайская',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/09/12/gavayskaya.png',
        description: 'Сыр моцарелла, Курица, Томатный соус Domino\'s, Ананас',
        price: '9.9р'
    },
    {
        title: 'Пепперони и томаты',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/12/12/pepperoni_i_tomaty_small.png',
        description: 'Соус барбекю, Пепперони, Сыр моцарелла, Томаты',
        price: '9.9р'
    },
    {
        title: 'Овощная',
        image: 'https://images.dominos.by/media/dominos/osg/api/2018/09/12/ovoshchnaya.png',
        description: 'Сладкий перец, Сыр моцарелла, Лук, Томаты, Оливки, Шампиньоны, Томатный соус Domino\'s',
        price: '9.9р'
    },
];

let nav = [
    {
        text: 'Главная',
        address: '/',
        className: '',
        wrapper: 'li',
    },
    {
        text: 'О нас',
        address: '/about',
        className: '',
        wrapper: 'li',
    },
    {
        text: 'Контакты',
        address: '/contacts',
        className: '',
        wrapper: 'li',
    },
    {
        text: 'Корзина',
        address: '#modal-example',
        className: 'uk-text-danger open-modal-btn',
        wrapper: 'li',
        specAttr: 'uk-toggle'
    }
];

let Card = function (image, title, description, price, weight, shopping_basket) {
    this.$image = new Image('item-image', image);
    this.$title = new Heading(3, title, 'item-name');
    this.$description = new Paragraph(description, 'item-description');
    this.$price = new Paragraph(price, 'item-price');
    this.$weight = weight;
    this.$shopping_basket = shopping_basket;
    this.$template = $('<div/>')
        .addClass('card')
        .append($('<div/>')
            .addClass('product')
            .append($('<div/>')
                .addClass('image')
                .append(this.$image))
            .append($('<div/>')
                .addClass('title')
                .append(this.$title))
            .append($('<div/>')
                .addClass('description')
                .append(this.$description)))
        .append($('<div/>')
            .addClass('price')
            .append($('<div/>')
                .addClass('cost')
                .append(this.$price))
            .append($('<div/>')
                .addClass('weight')
                .append(', за ' + this.$weight))
            .append($('<div/>')
                .addClass('purchase')
                .append(this.$shopping_basket)))

    this.initEvents();
    return this.$template;
};

let Image = function (classNames, src, alt) {
    this.classNames = classNames || '';
    this.src = src;
    this.alt = alt || 'Broken image';
    this.$template = $('<images/>')
        .addClass(this.classNames)
        .attr({
            'src': this.src,
            'alt': this.alt
        });

    return this.$template;
};

let Button = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || '';
    this.$template = $('<button/>')
        .addClass(this.classNames)
        .text(this.text);

    return this.$template;
};

let Heading = function (level, text, classNames) {
    this.text = text;
    this.level = level;
    this.classNames = classNames || '';
    this.$template = $(`<h${this.level}/>`)
        .text(this.text)
        .addClass(this.classNames);

    return this.$template;
};

let Paragraph = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || '';
    this.$template = $('<p/>')
        .html(this.text)
        .addClass(this.classNames);

    return this.$template;
};

Card.prototype = {
    initEvents : function () {
        $(this.$shopping_basket).on('click', () => {
            window.cart.addItem({
                title: this.$title.text(),
                price: this.$price.text(),
                image: this.$image.attr('src')
            });
        });
    }
};

window.onload = function () {
    products.forEach(function (product) {
        $('.foo').append(new Card(product.image, product.title, product.description, product.price, product.weight, product.shopping_basket));
    });


};