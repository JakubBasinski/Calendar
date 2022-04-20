// const Worker = require('../../models/worker')
// const mongoose = require('mongoose')

export class Calendar {
  constructor(firstday, lastday, array) {
    this.firstday = firstday;
    this.lastday = lastday;
    this.array = array;
    this.arrayDates();
    this.createCalendar();
  }

  arrayDates() {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    let dateArray = [];
    let currentDate = this.firstday;
    let stopDate = this.lastday;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1);
    }
    this.array = dateArray;
    console.log(this.array);
  }

  createCalendar() {
    //Bigger screen if needed
    const miesiac = document.querySelector('.miesiac-widok');
    let dateAarray = this.array.reverse();
    //Renaming Months

    const monthsNamesArray = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];

    let monthIndex = 0;
    let monthNameDiv = document.querySelector('.miesiac-nazwa-p');
    monthNameDiv.innerHTML = monthsNamesArray[monthIndex];
    // console.log(monthIndex);

    const arrowLeft = document.getElementById('arrow left');
    const arrowRight = document.getElementById('arrow right');

    //  yearArray.forEach(e => {let data = e.getMonth(); console.log(data);})

    const yearArray = this.array;
    const styczenArray = yearArray.filter((e) => e.getMonth() == 0);
    const lutyArray = yearArray.filter((e) => e.getMonth() == 1);
    const marzecArray = yearArray.filter((e) => e.getMonth() == 2);
    const kwiecien = yearArray.filter((e) => e.getMonth() == 3);

    //// Display dni :
    dateAarray.forEach((e) => {
      if (e.getMonth() == monthIndex) {
        let box = document.createElement('div');
        const lookingForFirstDay = e.getDate();
        let emptyBox;
        const dayName = e.getDay();
        box.classList.add('dzien');
        box.setAttribute('id', `${e.getMonth()}${e.getDate()}`);
        miesiac.insertAdjacentElement('afterbegin', box);
        let dzienDaneBox = document.createElement('div');
        dzienDaneBox.classList.add('dzien-dane');
        box.insertAdjacentElement('afterbegin', dzienDaneBox);

        // nazwa dnia
        let dayNumber = document.createElement('p');
        dayNumber.classList.add('dzien-nazwa');

        if (dayName == 1) {
          dayNumber.innerHTML = 'poniedzialek';
        } else if (dayName == 2) {
          dayNumber.innerHTML = 'wtorek';
        } else if (dayName == 3) {
          dayNumber.innerHTML = 'sroda';
        } else if (dayName == 4) {
          dayNumber.innerHTML = 'czwartek';
        } else if (dayName == 5) {
          dayNumber.innerHTML = 'piatek';
        } else if (dayName == 6) {
          dayNumber.innerHTML = 'sobota';
        } else if (dayName == 0) {
          dayNumber.innerHTML = 'niedziela';
        }
        dzienDaneBox.insertAdjacentElement('afterbegin', dayNumber);

        // dzien miesiaca
        let dateNumber = document.createElement('p');
        dateNumber.classList.add('dzien-data');
        dateNumber.innerHTML = e.getDate();
        dzienDaneBox.insertAdjacentElement('beforeend', dateNumber);

        //wsadzic puste
        function createeEmpty() {
          emptyBox = document.createElement('div');
          emptyBox.classList.add('empty');
          miesiac.insertAdjacentElement('afterbegin', emptyBox);
        }
        if (parseInt(dayName) == 0 && parseInt(lookingForFirstDay) == 1) {
          Array(6)
            .fill(1)
            .forEach(() => {
              createeEmpty();
            });
        } else if (dayName !== 1 && lookingForFirstDay == 1) {
          let epmtyNumber = parseInt(dayName - 1);
          Array(epmtyNumber)
            .fill(1)
            .forEach(() => {
              createeEmpty();
            });
        }
      }
    });

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    arrowRight.addEventListener('click', () => {
      if (monthIndex < 11) {
        monthIndex += 1;
      } else {
        monthIndex = 0;
      }
      monthNameDiv.innerHTML = monthsNamesArray[monthIndex];

      miesiac.innerHTML = '';

      //// Display dni :

      dateAarray.forEach((e) => {
        if (e.getMonth() == monthIndex) {
          let box = document.createElement('div');
          const lookingForFirstDay = e.getDate();
          let emptyBox;
          const dayName = e.getDay();

          box.classList.add('dzien');
          box.setAttribute('id', `${e.getMonth()}${e.getDate()}`);

          miesiac.insertAdjacentElement('afterbegin', box);

          let dzienDaneBox = document.createElement('div');
          dzienDaneBox.classList.add('dzien-dane');
          box.insertAdjacentElement('afterbegin', dzienDaneBox);

          // nazwa dnia
          let dayNumber = document.createElement('p');
          dayNumber.classList.add('dzien-nazwa');

          if (dayName == 1) {
            dayNumber.innerHTML = 'poniedzialek';
          } else if (dayName == 2) {
            dayNumber.innerHTML = 'wtorek';
          } else if (dayName == 3) {
            dayNumber.innerHTML = 'sroda';
          } else if (dayName == 4) {
            dayNumber.innerHTML = 'czwartek';
          } else if (dayName == 5) {
            dayNumber.innerHTML = 'piatek';
          } else if (dayName == 6) {
            dayNumber.innerHTML = 'sobota';
          } else if (dayName == 0) {
            dayNumber.innerHTML = 'niedziela';
          }
          dzienDaneBox.insertAdjacentElement('afterbegin', dayNumber);

          // dzien miesiaca
          let dateNumber = document.createElement('p');
          dateNumber.classList.add('dzien-data');
          dateNumber.innerHTML = e.getDate();
          dzienDaneBox.insertAdjacentElement('beforeend', dateNumber);

          //wsadzic puste
          function createeEmpty() {
            emptyBox = document.createElement('div');
            emptyBox.classList.add('empty');
            miesiac.insertAdjacentElement('afterbegin', emptyBox);
          }
          if (parseInt(dayName) == 0 && parseInt(lookingForFirstDay) == 1) {
            Array(6)
              .fill(1)
              .forEach(() => {
                createeEmpty();
              });
          } else if (dayName !== 1 && lookingForFirstDay == 1) {
            let epmtyNumber = parseInt(dayName - 1);
            Array(epmtyNumber)
              .fill(1)
              .forEach(() => {
                createeEmpty();
              });
          }
        }
      });
    });

    arrowLeft.addEventListener('click', () => {
      if (monthIndex > 0) {
        monthIndex -= 1;
      } else {
        monthIndex = 11;
      }
      //// Display dni :

      miesiac.innerHTML = '';

      dateAarray.forEach((e) => {
        if (e.getMonth() == monthIndex) {
          let box = document.createElement('div');
          const lookingForFirstDay = e.getDate();
          let emptyBox;
          const dayName = e.getDay();

          box.classList.add('dzien');
          box.setAttribute('id', `${e.getMonth()}${e.getDate()}`);
          miesiac.insertAdjacentElement('afterbegin', box);

          let dzienDaneBox = document.createElement('div');
          dzienDaneBox.classList.add('dzien-dane');
          box.insertAdjacentElement('afterbegin', dzienDaneBox);

          // nazwa dnia
          let dayNumber = document.createElement('p');
          dayNumber.classList.add('dzien-nazwa');

          if (dayName == 1) {
            dayNumber.innerHTML = 'poniedzialek';
          } else if (dayName == 2) {
            dayNumber.innerHTML = 'wtorek';
          } else if (dayName == 3) {
            dayNumber.innerHTML = 'sroda';
          } else if (dayName == 4) {
            dayNumber.innerHTML = 'czwartek';
          } else if (dayName == 5) {
            dayNumber.innerHTML = 'piatek';
          } else if (dayName == 6) {
            dayNumber.innerHTML = 'sobota';
          } else if (dayName == 0) {
            dayNumber.innerHTML = 'niedziela';
          }
          dzienDaneBox.insertAdjacentElement('afterbegin', dayNumber);

          // dzien miesiaca
          let dateNumber = document.createElement('p');
          dateNumber.classList.add('dzien-data');
          dateNumber.innerHTML = e.getDate();
          dzienDaneBox.insertAdjacentElement('beforeend', dateNumber);

          //wsadzic puste
          function createeEmpty() {
            emptyBox = document.createElement('div');
            emptyBox.classList.add('empty');
            miesiac.insertAdjacentElement('afterbegin', emptyBox);
          }
          if (parseInt(dayName) == 0 && parseInt(lookingForFirstDay) == 1) {
            Array(6)
              .fill(1)
              .forEach(() => {
                createeEmpty();
              });
          } else if (dayName !== 1 && lookingForFirstDay == 1) {
            let epmtyNumber = parseInt(dayName - 1);
            Array(epmtyNumber)
              .fill(1)
              .forEach(() => {
                createeEmpty();
              });
          }
        }
      });

      monthNameDiv.innerHTML = monthsNamesArray[monthIndex];
    });
  }
}

const dateJan3 = new Date('Janury 1, 2022');
const dateJan4 = new Date('January 31, 2022');
const arrayFeb = [];

new Calendar(dateJan3, dateJan4, arrayFeb);

console.log(arrayFeb);
