import './app-filter.css'


const Appfilter = (props) => {
    const buttonData = [
       {name: 'all', label: 'Все сотрудники'},
       {name: 'rise', label: 'На повышение'},
       {name: 'moreThen1000', label: 'З/П БОЛЬШЕ ЧЕМ 1000$'},
    ]

    const buttons = buttonData.map(({name, label}) => {
        const active = props.filter === name // сюда записывается true или false
        const clazz = active ? 'btn-light' : 'btn-outline-light'

        return (
            <button className={`btn ${clazz}`}
            type="button"
            key={name}
            onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>
        )
    })


    return (
        <div className="btn-group">
            {buttons}
        </div>

    )
}


export default Appfilter;

