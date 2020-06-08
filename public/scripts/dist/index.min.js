let Card = function (image, title, description, price, weight, shopping_basket) {
    this.$image = new Image('item-image', image);
    this.$title = new Heading(3, title, 'item-name');
    this.$description = new Paragraph(description, 'item-description');
    this.$price = new Paragraph(price, 'item-price');
    this.$weight = weight;
    this.$shopping_basket = new Image('item-image', shopping_basket);
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
                .append(this.$shopping_basket)));

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

let Footer = function (image1, image2, image3, image4, image5, copywriter) {
    this.$image1 = new Image('item-image', image1);
    this.$image2 = new Image('item-image', image2);
    this.$image3 = new Image('item-image', image3);
    this.$image4 = new Image('item-image', image4);
    this.$image5 = new Image('item-image', image5);
    this.$copywriter = copywriter;
    this.$template = $('.footer')
        .append($('<div/>')
            .addClass('flex-wrapper')
            .append($('<div/>')
                .addClass('flex-item')
                .append($('<div/>')
                    .append(this.$image1)))
            .append($('<div/>')
                .addClass('flex-item')
                .append($('<div/>')
                    .append(this.$image2)))
            .append($('<div/>')
                .addClass('flex-item')
                .append($('<div/>')
                    .append(this.$image3)))
            .append($('<div/>')
                .addClass('flex-item')
                .append($('<div/>')
                    .append(this.$image4)))
            .append($('<div/>')
                .addClass('flex-item')
                .append($('<div/>')
                    .append(this.$image5))))
        .append($('<div/>')
            .addClass('copywriter')
            .append($('<p/>')
                .append(this.$copywriter)));

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

function removeBox(elementID)
{
    document.querySelector(elementID).remove();
}

let input,search,pr,result,result_arr, locale_HTML;

function func() {
    locale_HTML = document.querySelector('.product-cards').innerHTML;   // сохраняем в переменную весь body (Первоначальный)
}
setTimeout(func, 1000);  //ждем подгрузки Jsona и выполняем

function FindOnPage(name, status) {
    input = document.getElementById(name).value; //получаем значение из поля в html

    if(input.length<3&&status==true)
    {
        alert('Для поиска вы должны ввести три или более символов');
        function FindOnPageBack() { document.querySelector('.product-cards').innerHTML = locale_HTML; }
    }

    if(input.length>=3)
    {
        function FindOnPageGo() {

            search = '/'+input+'/g';  //делаем из строки регуярное выражение
            pr = document.querySelector('.product-cards').innerHTML;   // сохраняем в переменную cards
            result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
            result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)

            let warning = true;
            for(let i=0;i<result.length;i++) {
                if(result[i].match(eval(search))!=null) {
                    warning = false;
                }

            }
            if(warning == true) {
                alert('Не найдено ни одного совпадения');
            }

            for(let i=0; i<result.length;i++) {
                result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
            }
            for(let i=0; i<result.length;i++) {
                pr=pr.replace(result[i],result_arr[i])  //заменяем в переменной с html текст на новый из нового массива
            }
            document.querySelector('.product-cards').innerHTML = pr;  //заменяем код cards
        }
    }
    function FindOnPageBack() { document.querySelector('.product-cards').innerHTML = locale_HTML; }
    if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
    if(!status) { FindOnPageBack(); } //Снимаем выделение
}






$(window).on('load',(function() {



    fetch('/aa')
        .then(response => response.json())
        .then(data => {

            data.forEach(function (data) {
                $('main').append(new Card(data.image, data.name, data.description, data.cost, data.weight, 'shopping_basket.png'));
            })
        })
    $('.footer').append(new Footer('instagram-sketched.svg','facebook.svg','twitter.svg','vk.svg','telegram.svg', '© 2020. All Rights Reserved.'));

}));