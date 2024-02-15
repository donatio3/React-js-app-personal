import {Component, Fragment} from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import Appfilter from '../app-filter/app-filter';
import EmployerList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'


class WhoAmI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            years: 20,
            position: ''
        }

        // 1 способ привязать контекст
        // this.plus = this.plus.bind(this) // привязываем свойство к эклемпляру класса чтобы он не терял this

        // 2 способ(популярный) привязать контекст - через plus = () => {}
        // 3 cпособ вызвать в return через анонимную функцию - {() => this.plus()}
    }

    

    plus = () => {
        this.setState(state => ({ // КАЖДЫЙ раз когда вызывается setState - вызывается render()
            years: state.years + 1
        }))
    }

    commitInputChanges = (e, color) => {
        console.log(color)
        this.setState(state => ({
            position: e.target.value
        }))

    }


    render() {
        const {name, surname, link} = this.props
        const {years, position} = this.state
        
        return (
            <Fragment>
                <button onClick={this.plus}>PLUS</button>
                <h2>My Name - {name}, <a href={link}>my profile</a> surname - {surname},
                    age - {years}, 
                    position - {position}</h2>
                <form action="">
                    <span>Введите должнрость</span>
                    <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')} />
                </form>
            </Fragment>
            )
        
            
        
       
    }
}




class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {name: 'Johnis', salary: 1200, increase: false, rise: true, id:1},
                {name: 'Dima', salary: 5200, increase: true, rise: false, id:2},
                {name: 'Vanas', salary: 900, increase: false, rise: false, id:3}
            ],
            term: '',
            filter: 'all',

            active: [
                {proprety: true,  id:1},
                {proprety: false, id:2 },
                {proprety: false, id:3 }
            ]
        }

        this.maxId = 4
    }

    
    delete = (id) => {
        this.setState(({data}) => {
            const final = data.filter(elem => elem.id != id)

            return {
                data: final
            } 
        })
    }

    onAddPerson = (name, salary) => {
        if (name.length > 3 && salary > 50) {
            const elem = {
                name, 
                salary, 
                increase:false, 
                id: this.maxId++,
                rise:false
            }
    
            this.setState(({data}) => {
                return {data: [...data, elem]}
            })
        }
    }
    
    // Эти методы нужео пробросить вниз передав их в качетсве Props 
    // И в элементe employers-list указываем их как аргумент переменой 

    onToggleProperty = (id, prop) => {
        // (1 ВАРИАНТ) this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id) // индекс обьекта на который мы нажали

        //     const old = data[index] //обьект на который мы нажали 
        //     const newItem = {...old, increase: !old.increase} // cоздает новый обьект создавая копию, после 1 если свойства будут совпадать с тем что развернется в 1 то они будут его заменять
        //     // ↑ cодержит обьект у которого свойство increase поменяно 

        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)] 
        //     // ↑ содержит обьект: (1) от 0 исключая обьект на который нажали, (2) от обЪекта с замененым свойством до конца
            
        //     return {
        //         data: newArr
        //     }
        //})

        // (2 ВАРИАНТ) 

        this.setState(({data}) => ({
            data: data.map(item =>  { // у свойства data новый массив через callBack 
                if (item.id === id) { // Если совпадают id то мы нашли обьект с которым мы взаимодействуем
                    return {...item, [prop]: !item[prop]} //return new object which change свойство на противоположное
                }

                return item // Возвращаем новый массив с измененным свойством  
            })
        }))
    }

    // onToggleRise = (id) => { // переключение сос-ия сотрудника на повышение

    //     this.setState(({data}) => ({
    //         data: data.map(item =>  { // у свойства data новый массив через callBack 
    //             if (item.id === id) { // Если совпадают id то мы нашли обьект с которым мы взаимодействуем
    //                 return {...item, rice: !item.rice} //return new object which change свойство на противоположное
    //             }

    //             return item // Возвращаем новый массив с измененным свойством  
    //         })
    //     })) // 
    // }

    searchEmp = (items, term) => { // (1) cтрочку по которой ищем (2) массив даных который мы будем фильтровать
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    } 

    onUpdateSearch = (term) => {
        this.setState({term})
    }    

    // onAddActiveClassToFilter = (id) => {
    //     this.setState(({active}) => {
    //         const newArr = active.map(elem => {
    //             elem.proprety = false
    //             if (elem.id === id) {
    //                 return {...elem, proprety: !elem.proprety}
    //             }
    //             return elem
    //         })
    //     return {active: newArr}
    //     })
    // }

    // onFilterPersons = (items, active) => {
    //     if (active[0].proprety) {
    //         return items
    //     }else if (active[1].proprety) {
    //         return items.filter(elem => elem.rise == true)
    //     } else {
    //         return items.filter(elem => elem.salary >= 1000)
    //     }
    // }


    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }   
    }

    onFilterSelect = (filter) => {
        this.setState({filter})       
    }

    render() {

        const {data, term, active, filter} = this.state

        const visibleData = this.filterPost(this.searchEmp(data, term), filter); 
        // 1 аргумент отфильтрованный по поиску массив который мы еще раз отфильтруем по фильтрам

        // фильтрует и передает по умлочанию если в поиске ничего не нашли а если нашли выводит то что нашли 

        return (
            <div className="app">
                <WhoAmI name="DIMA" surname="Zagoruico" link="youtube.com"/>
                <WhoAmI name="Alex" surname="Zagoruico" link="youtube.com"/>



                <AppInfo quanityPerson={data.length}
                         quanityRise={data.filter(elem => elem.increase).length}
                />            
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <Appfilter onFilterSelect={this.onFilterSelect} 
                               filter={filter}/>
                </div>

                <EmployerList data={visibleData} // фильтрует и показывает массив по поиску  
                              onDelete={this.delete}
                              onToggleProperty={this.onToggleProperty}/>
                <EmployersAddForm onAddPerson={this.onAddPerson} />
            </div>
        )
    }
}


export default App;




