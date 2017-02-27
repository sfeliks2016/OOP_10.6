$(document).ready(function () {
    'use strict';
    
    
    var id = randomString();
    console.log(id);
    
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        var i = 0;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    //Klasa Column

    
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name || 'Nazwa Kolumny';
        this.$element = createColumn();

        function createColumn() {
        // TWORZENIE ELEMENTÓW SKŁADOWYCH KOLUMNY
        // (Tworzenie nowch węzłów)
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

        // PODPINANIE ODPOWIEDNICH ZDARZEŃ
            $columnDelete.click(function () {
                self.removeColumn();
            });
            
            $columnAddCard.click(function (event) {
                self.addCard(new Card(prompt("Wpisz nazwę karty")));
            });        
            

        // KONSTRUOWANIE ELEMENTU KOLUMNY
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

        // ZWRACANIE STWORZONEJ  KOLUMNY
            return $column;
        }

    }
    
    //Metody dla klasy Column stworzone za pomoca prototypu
    
    Column.prototype = {
        addCard: function (card) {
            this.$element.children('ul').append(card.$element);
        },
        
        removeColumn: function () {
            this.$element.remove();
        }
    };
    
    // Klasa Card
    
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description || 'nowe zadanie';
        this.$element = createCard(); //

        function createCard() {
            // tworzenie klocków
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
                    
            // przypiecie zdarzenia
            $cardDelete.click(function () {
                self.removeCard();
            });
            
            // skladanie i zwracanie karty
            
            $card.append($cardDelete)
	             .append($cardDescription);
            return $card;
        }
    }
    
    // stworzenie metody (removeCard) za pomoca prototypu
    // metoda wykorzystana przez obiekty stworzone przez klase Card
    
    Card.prototype = {
	    removeCard: function () {
		    this.$element.remove();
        }
    };
    
    // obiekt tablicy
    
    var board = {
            name: 'Tablica Kanban',
            addColumn: function (column) {
                this.$element.append(column.$element);
                initSortable();
            },
            $element: $('#board .column-container')
        };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    // tworzenie nowego obiektu - kolumny
    
    $('.create-column')
          .click(function () {
            var name = prompt('Wpisz nazwę kolumny');
            var column = new Column(name);
            board.addColumn(column);
        });
    
    
    
    // TWORZENIE KOLUMN (Podstawowych)
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('nowe zadanie');
    var card2 = new Card('stworzyc tablice kanban');

    
    // DODAWANIE KART DO KOLUMN
    //todoColumn.addCard(card1);
    //doingColumn.addCard(card2);
    doneColumn.addCard(card2);
    
});
