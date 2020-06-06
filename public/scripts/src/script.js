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
                .append(this.$price)
                    .append($('<p/>')
                        .append('руб.'))
                )
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
    this.$template = $('<img/>')
        .addClass(this.classNames)
        .attr({
            'src': 'img/' + this.src,
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

function clearBox(elementID)
{

    document.querySelector(elementID).innerHTML  = "";
}

$(window).on('load',(function() {

    fetch('/aa')
        .then(response => response.json())
        .then(data => {

            data.forEach(function (data) {
                $('.foo').append(new Card(data.image, data.name, data.description, data.cost, data.weight, data.shopping_basket));
            })
        })
    clearBox('.foo');
}));











/*
    products.forEach(function (product) {
        $('.foo').append(new Card(product.image, product.title, product.description, product.price, product.weight, product.shopping_basket));
    });

 */

