'use strict';

import ships from './ships';

const accordion = () => {
    const leftMenu = document.querySelector('.left-menu');
    const leftMenuItems = document.querySelectorAll('.left-menu-item');

    const open = (button, dropDown) => {
        closeAllDrops();
        dropDown.style.height = `${dropDown.scrollHeight}px`;
        button.classList.add('active');
        dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
        button.classList.remove('active');
        dropDown.classList.remove('active');
        dropDown.style.height = '';
    };

    const closeAllDrops = (button, dropDown) => {
        leftMenuItems.forEach((elem) => {
            if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                close(elem.children[0], elem.children[1]);
            }
        })
    };

    leftMenu.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('left-menu-item-button')) {
            const parent = target.closest('.left-menu-item');
            const description = parent.querySelector('.left-menu-description');

            description.classList.contains('active') ?
                close(target, description) :
                    open(target, description);
        }
    });

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.left-menu')) {
            closeAllDrops();
        }
    });
};

const renderCards = (cards) => {
    const createCardItem = (card) => {
        const { shipName,
            className,
            classification,
            shipHull,
            speed,
            maneuverability,
            beidewind,
            hold,
            team,
            weapons,
            price} = card;
        const liItem = document.createElement('li');

        liItem.innerHTML = `
                    <article class="card-item">
                        <img
                            src="https://i.pinimg.com/originals/9a/5d/c8/9a5dc8195d864b6ce7d87b599b58e191.jpg"
                            alt="ship"
                            height="200px"
                            width="150px"
                            class="card-image"
                        />
                        <h1 class="card-name">${shipName}</h1>
                        <h1 class="card-classname">"${className}"</h1>
                        <span class="card-description">class: ${classification}</span>
                        <span class="card-description ship-hull">ship hull: ${shipHull}</span>
                        <span class="card-description speed">speed: ${speed}</span>
                        <span class="card-description maneuverability">maneuverability: ${maneuverability}</span>
                        <span class="card-description beidewind">beidewind: ${beidewind}</span>
                        <span class="card-description hold">hold: ${hold}</span>
                        <span class="card-description team">team: ${team}</span>
                        <span class="card-description weapons">weapons: ${weapons}</span>
                        <span class="card-description price">price: ${price}</span>
                    </article>
                `;
        liItem.classList.add('ship-cards');
        return liItem;
    };
    
    var docFrag = document.createDocumentFragment();
    cards.forEach(item => {
        docFrag.appendChild(createCardItem(item));
    });

    const cardsList = document.querySelector('.cards-list');
    cardsList.appendChild(docFrag);
};

const modal = () => {
    const cardsList = document.querySelector('.cards-list');
    const modal = document.querySelector('.modal');
    const modalCardName = modal.querySelector('.modal-card-name');
    const cardClassname = modal.querySelector('.modal-card-classname');
    const classification = modal.querySelector('.classification');
    const shipHull = modal.querySelector('.ship-hull');
    const speed = modal.querySelector('.speed');
    const maneuverability = modal.querySelector('.maneuverability');
    const beidewind = modal.querySelector('.beidewind');
    const hold = modal.querySelector('.hold');
    const team = modal.querySelector('.team');
    const weapons = modal.querySelector('.weapons');
    const price = modal.querySelector('.price');
    const cardText = modal.querySelector('.modal-card-text');
    
    const openModal = () => {
        modal.classList.add('open');
        document.addEventListener('keydown', escapePress);
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.removeEventListener('keydown', escapePress);
    };

    
    const escapePress = event => {
        if (event.code === 'Escape') {
            closeModal();
        }
    };

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('modal-close') || target === modal) {
            closeModal();
        }
    })



    cardsList.addEventListener('click', event => {
        const target = event.target;
        const parent = target.closest('.card-item');
        if (parent) {
            const findName =  parent.querySelector('.card-name').textContent;
            let ship = ships.find(item =>  item.shipName === findName);

            modalCardName.textContent = ship.shipName;
            cardClassname.textContent = `"${ship.className}"`;
            classification.textContent = `class: ${ship.classification}`;
            shipHull.textContent = `ship hull: ${ship.shipHull}`;
            speed.textContent = `speed: ${ship.speed}`;
            maneuverability.textContent = `maneuverability: ${ship.maneuverability}`;
            beidewind.textContent = `beidewind: ${ship.beidewind}`;
            hold.textContent = `hold: ${ship.hold}`;
            team.textContent = `team: ${ship.team}`;
            weapons.textContent = `weapons: ${ship.weapons}`;
            price.textContent = `price: ${ship.price}`;
            cardText.textContent = ship.desc;

            openModal();
        }
        
    });
};

const transition = () => {
    const bayLink = document.querySelector('.bay-link');
    const shipLink = document.querySelector('.ship-link');
    const galleryShipLink = document.querySelector('.gallery-ship-link');
    const cards = document.querySelector('.cards');
    const myShip = document.querySelector('.my-ship');
    const gallery = document.querySelector('.gallery-ship');

    const openMyShips = () => {
        cards.classList.add('hidden');
        gallery.classList.add('hidden');
        myShip.classList.remove('hidden');
    };

    const openBay = () => {
        gallery.classList.add('hidden');
        myShip.classList.add('hidden');
        cards.classList.remove('hidden');
    };

    const openGallery = () => {
        cards.classList.add('hidden');
        myShip.classList.add('hidden');
        gallery.classList.remove('hidden');
    };

    shipLink.addEventListener('click', openMyShips);

    bayLink.addEventListener('click', openBay);

    galleryShipLink.addEventListener('click', openGallery);
};

const filter = () => {
    document.querySelectorAll("#filter-input").forEach(item => {
        item.addEventListener('blur', onBlurFilter);
    });
    
    document.querySelector('.reset-button').addEventListener('click', () => {
        const cardList = document.querySelector('.cards-list')
        cardList.innerHTML = '';
        renderCards(ships)
    });
};

const onBlurFilter = () => {

    const maxPrice = document.querySelector('.max-price').value;
    const minPrice = document.querySelector('.min-price').value;
    const maxShipHull = document.querySelector('.max-ship-hull').value;
    const minShipHull = document.querySelector('.min-ship-hull').value;

    const filteredShips = ships.filter(item => (maxPrice ? item.price < maxPrice : true) &&
                                                (minPrice ? item.price > minPrice : true) &&
                                                (maxShipHull ? item.shipHull < maxShipHull : true) &&
                                                (minShipHull ? item.shipHull > minShipHull : true));

    const cardList = document.querySelector('.cards-list');
    cardList.innerHTML = '';
    renderCards(filteredShips);
};

const buyFormValidation = () => {
    const buyFormButton = document.querySelector('.buy-form-button');

    buyFormButton.addEventListener('click', onClickValidationForm);
};

const onClickValidationForm = () => {
    const nameInput = document.querySelector('.input-name').value;
    const numberInput = document.querySelector('.input-number').value;
    const classInput = document.querySelector('.input-class').value;
    const priceInput = document.querySelector('.input-price').value;
    const result = document.querySelector('.form-result');

    const buyFormObj = {
        name: nameInput,
        number: numberInput,
        class: classInput,
        price: priceInput
    };

    result.innerHTML = `Имя: ${buyFormObj.name} <br>
                        Количество: ${buyFormObj.number} <br>
                        Цена: ${buyFormObj.price} <br>
                        Класс: ${buyFormObj.class}
    `;
};

const getWeather = async () => {
    const weather = await fetch('https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=D3jlyiBioq07H0kzVJ4JYODQwdJEi5Ok');
    const content = await weather.json();
    const filteredDates = content.data.timelines[0].intervals.filter(i => {
        const date = new Date(i.startTime);
        const hour = date.getHours();
            return (hour === 12) ? true : false;
    });
/*     const filteredDates = [
        {startTime: "2021-04-22T09:53:00Z", values: {temperature: -57.45}},
        {startTime: "2021-04-23T09:53:00Z", values: {temperature: -59.67}},
        {startTime: "2021-04-24T09:53:00Z", values: {temperature: -52.5}},
        {startTime: "2021-04-25T09:53:00Z", values: {temperature: -44.75}}
    ] */
    
    const createTemperatureItem = (item) => {
            const tdItem = document.createElement('td');
            const celsius = (item.values.temperature - 32) * 5/9;
            tdItem.innerHTML = `${celsius.toFixed(2)} °C`;            
            return tdItem;
    };

    const createDateItem = (item) => {
        const tdItem = document.createElement('td');
        const date = new Date(item.startTime);
        tdItem.innerHTML = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        return tdItem;
    };

    const docFrag = document.createDocumentFragment();
    filteredDates.forEach(item => {
        docFrag.appendChild(createTemperatureItem(item));
    });

    const docFragTwo = document.createDocumentFragment();
    filteredDates.forEach(item => {
        docFragTwo.appendChild(createDateItem(item));
    });

    const temperature = document.querySelector('.temperature');
    const date = document.querySelector('.date');
    temperature.appendChild(docFrag);
    date.appendChild(docFragTwo);
};

const autoplaySlider = () => {
    let counter = 1;
    const timer = setInterval(() => {
        document.getElementById('switch' + counter).checked = true;
        counter ++;
        if (counter > 5) {
            counter = 1;
        }
    }, 4000);

    const stopAutoplay = document.querySelector('.stop-button');
    stopAutoplay.addEventListener('click', () => {
        clearInterval(timer);
    });
};

const onClickStartAutoplaySlider = () => {
    const startAutoplay = document.querySelector('.start-button');
    startAutoplay.addEventListener('click', autoplaySlider);
};


accordion();
filter();
renderCards(ships);
modal();
transition();
buyFormValidation();
getWeather();
autoplaySlider();
onClickStartAutoplaySlider();