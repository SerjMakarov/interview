let VanillaCalendar = (function () {
    function VanillaCalendar(options) {
        let endEventDate;
        function getEndEventDate(callback){
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/services/design-reg/getEndEventDate.php');
            xhr.addEventListener("load", function() {
                if(xhr.status == 200){
                    // console.log('Положительный ответ от API');
                    endEventDate = JSON.parse(xhr.response);
                    // console.log(endEventDate);
                    for(let val in endEventDate){
                        endEventDate = String(endEventDate[val]);
                    }
                    callback(endEventDate);
                } else {
                    console.log(xhr.response);
                }
            })
            xhr.send(endEventDate);
        }

        function addEvent(el, type, handler){
            if (!el) return
            if (el.attachEvent) el.attachEvent('on' + type, handler)
            else el.addEventListener(type, handler);
        }

        function removeEvent(el, type, handler){
            if (!el) return
            if (el.detachEvent) el.detachEvent('on' + type, handler)
            else el.removeEventListener(type, handler);
        }

        let opts = {
            selector: null,
            datesFilter: false,
            pastDates: false,
            availableWeekDays: [],
            availableDates: [],
            date: new Date(),
            todaysDate: new Date(),
            button_prev: null,
            button_next: null,
            month: null,
            month_label: null,
            onSelect: (data, elem) => {},
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            shortWeekday: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        }
        for (let k in options) if (opts.hasOwnProperty(k)) opts[k] = options[k]

        let element = document.querySelector(opts.selector)
        if (!element)
            return

        const getWeekDay = function (day) {
            return ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'][day]
            // return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][day]
        }

        const getDay = function(date) {
          let d = date.getDay() - 1
          if(d === -1) {
            d = 6
          }
          return d
        }

        const createDay = function (date) {
            let newDayElem = document.createElement('div')
            let dateElem = document.createElement('span')
            dateElem.innerHTML = date.getDate()
            newDayElem.className = 'vanilla-calendar-date'
            newDayElem.setAttribute('data-calendar-date', date)

            let available_week_day = opts.availableWeekDays.filter(f => f.day === getDay(date) || f.day === getWeekDay(getDay(date)))
            let available_date = opts.availableDates.filter(f => f.date === (date.getFullYear() + '-' + String(date.getMonth() + 1).padStart('2', 0) + '-' + String(date.getDate()).padStart('2', 0)))

            if (date.getDate() === 1) {
                newDayElem.style.marginLeft = ((getDay(date)) * 14.28) + '%'
            }
            if (opts.date.getTime() <= opts.todaysDate.getTime() - 1 && !opts.pastDates) {
                newDayElem.classList.add('vanilla-calendar-date--disabled')
            } else {
                if (opts.datesFilter) {
                    if (available_week_day.length) {
                        newDayElem.classList.add('vanilla-calendar-date--active')
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_week_day[0]))
                        newDayElem.setAttribute('data-calendar-status', 'active')
                    } else if (available_date.length) {
                        newDayElem.classList.add('vanilla-calendar-date--active')
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_date[0]))
                        newDayElem.setAttribute('data-calendar-status', 'active')
                    } else {
                        newDayElem.classList.add('vanilla-calendar-date--disabled')
                    }
                } else {
                    newDayElem.classList.add('vanilla-calendar-date--active')
                    newDayElem.setAttribute('data-calendar-status', 'active')
                }
            }
            if (date.toString() === opts.todaysDate.toString()) {
                newDayElem.classList.add('vanilla-calendar-date--today')
            }
            // if (date.toString() !== opts.todaysDate.toString()) {
            //     newDayElem.classList.add('vanilla-calendar-date--disabled')
            //     console.log(date.toString())
            //     console.log(opts.todaysDate.toString())
            // }

            newDayElem.appendChild(dateElem)
            opts.month.appendChild(newDayElem)
        }

        const removeActiveClass = function () {
            document.querySelectorAll('.vanilla-calendar-date--selected').forEach(s => {
                s.classList.remove('vanilla-calendar-date--selected')
            })
        }

        const selectDate = function () {
            let activeDates = element.querySelectorAll('[data-calendar-status=active]')
            activeDates.forEach(date => {
                date.addEventListener('click', function () {
                    removeActiveClass()
                    let datas = this.dataset
                    let data = {}
                    if (datas.calendarDate)
                        data.date = datas.calendarDate
                    if (datas.calendarData)
                        data.data = JSON.parse(datas.calendarData)
                    opts.onSelect(data, this)
                    this.classList.add('vanilla-calendar-date--selected')
                })
            })
        }

        const createMonth = function () {
            clearCalendar()
                let currentMonth = opts.date.getMonth()
                while (opts.date.getMonth() === currentMonth) {
                    createDay(opts.date)
                    opts.date.setDate(opts.date.getDate() + 1)
                }
                opts.date.setDate(1)
                opts.date.setMonth(opts.date.getMonth() -1)
                opts.month_label.innerHTML = opts.months[opts.date.getMonth()] + ' ' + opts.date.getFullYear()
            getEndEventDate(function (res){
                frameworkDays(res)
                selectDate()
            });
        }

        const monthPrev = function () {
            opts.date.setMonth(opts.date.getMonth() - 1)
            createMonth()
        }

        const monthNext = function () {
            opts.date.setMonth(opts.date.getMonth() + 1)
            createMonth()
        }

        const clearCalendar = function () {
            opts.month.innerHTML = ''
        }

        const createCalendar = function () {
            document.querySelector(opts.selector).innerHTML = `
            <div class="vanilla-calendar-header">
                <div class="vanilla-calendar-header__label" data-calendar-label="month"></div>
                <div class="buttons">
                <button type="button" class="vanilla-calendar-btn" id="prev-now" data-calendar-toggle="previous" disabled>
                <img src="/local/templates/maxi2020/img/calendar-prev.png" class="prev-padding current-month">
                </button>
                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="next">
                <img src="/local/templates/maxi2020/img/calendar-next.png">
                </button></div>
            </div>
            <div class="vanilla-calendar-week"></div>
            <div class="vanilla-calendar-body" data-calendar-area="month"></div>`
            // if(document.querySelector('.vanilla-calendar-header__label').value == opts.date.getMonth()){
            //   document.querySelector('.prev-padding').classList.add('prev-disabled')
            // }
        }

        const setWeekDayHeader = function () {
            document.querySelector(`${opts.selector} .vanilla-calendar-week`).innerHTML = `
                <span>${opts.shortWeekday[0]}</span>
                <span>${opts.shortWeekday[1]}</span>
                <span>${opts.shortWeekday[2]}</span>
                <span>${opts.shortWeekday[3]}</span>
                <span>${opts.shortWeekday[4]}</span>
                <span>${opts.shortWeekday[5]}</span>
                <span>${opts.shortWeekday[6]}</span>
            `
        }

        const frameworkDays = (date) => {
            let listDay = document.querySelectorAll('.vanilla-calendar-date');

            function splitStr(str){
               let res = str.split('/');
               return res;
            }

            const prefixYear = '20';
            const getDay = splitStr(date)[0].replace(/^0/i, '');
            const getMonth = splitStr(date)[1].replace(/^0/i, '');
            const getYear = prefixYear + splitStr(date)[2];

            // console.log(getDay, getMonth, getYear)
            //
            // console.log(opts.date.getFullYear());

            if(opts.date.getFullYear() > getYear){
                console.log('Блокировать next year');
                for (let day of listDay) {
                    day.removeAttribute('data-calendar-status');
                    day.classList.add('vanilla-calendar-date--disabled');
                }
            } else if (opts.date.getFullYear() < getYear) {

            } else {
                if(opts.date.getMonth()+1 > getMonth){
                    console.log('Блокировать next month' )
                    for (let day of listDay) {
                        day.removeAttribute('data-calendar-status');
                        day.classList.add('vanilla-calendar-date--disabled');
                    }
                }else if(opts.date.getMonth()+1 == getMonth){
                    console.log('Блокировать next day' )
                    for (let day of listDay) {
                        if(+day.children[0].innerHTML > +getDay){
                            day.removeAttribute('data-calendar-status');
                            day.classList.add('vanilla-calendar-date--disabled');
                        }
                    }
                }
            }
        }

        this.init = function () {
            createCalendar()
            opts.button_prev = document.querySelector(opts.selector + ' [data-calendar-toggle=previous]')
            opts.button_next = document.querySelector(opts.selector + ' [data-calendar-toggle=next]')
            opts.month = document.querySelector(opts.selector + ' [data-calendar-area=month]')
            opts.month_label = document.querySelector(opts.selector + ' [data-calendar-label=month]')

            opts.date.setDate(1)
            createMonth()
            setWeekDayHeader()
            addEvent(opts.button_prev, 'click', monthPrev)
            addEvent(opts.button_next, 'click', monthNext)

            console.log('//Start Month compression');
            let month_comp = new Date()
            let year_comp = new Date()
            // console.log(opts.date.getMonth() + ' ' + opts.date.getFullYear());
            // console.log(month_comp.getMonth() + ' ' + year_comp.getFullYear());
            let buttonChange = () =>{
              if((month_comp.getMonth() == opts.date.getMonth()) && (year_comp.getFullYear() == opts.date.getFullYear())){
                console.log('Date is Equal')
                document.querySelector('.prev-padding').classList.add('current-month')
                document.querySelector('#prev-now').disabled = true
              } else {
                console.log('Date is NOT equal')
                document.querySelector('.prev-padding').classList.remove('current-month')
                document.querySelector('#prev-now').disabled = false
              }
            }
            addEvent(opts.button_next, 'click', buttonChange)
            addEvent(opts.button_prev, 'click', buttonChange)
            console.log('//End Month compression');
        }

        this.destroy = function () {
            removeEvent(opts.button_prev, 'click', monthPrev)
            removeEvent(opts.button_next, 'click', monthNext)
            clearCalendar()
            document.querySelector(opts.selector).innerHTML = ''
        }

        this.reset = function () {
            this.destroy()
            this.init()
        }

        this.set = function (options) {
            for (let k in options)
                if (opts.hasOwnProperty(k))
                    opts[k] = options[k]
            createMonth()
//             this.reset()
        }

        this.init()
    }
    return VanillaCalendar
})()
window.VanillaCalendar = VanillaCalendar

$('.design-reg__form_phone-choice-mask').mask("8(999)999-99-99");

// $('.design-reg__form_phone-choice-mask').inputmask("8(999)999-99-99");
