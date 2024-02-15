import './employers-list-item.css'

const EmployerListItem = (props) => {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         increase: false, 
    //         like: false
    //     }

    // }

    // onIncrease = () => {
    //     this.setState(({increase}) => ({ // ({increase}) - Это callBack state - мы вытащили increase
    //         increase: !increase
    //     }))
    // }

    // addClassLike = () => {
    //     this.setState(({like}) => ({
    //         like: !like
    //     }))
    // }
    // ЭТО НЕ ИСПОЛЬЗУЕТСЯ ТЕПЕРЬ, ТАК КАК МЫ БУДЕМ КОНТРОЛИРОВАТЬ ЭТО НА ВЕРХНЕМ УРОВНЕ С ПОМОЩЬЮ onToggleIncrease, onToggleRise


        let classNames = "list-group-item d-flex justify-content-between"

        const {name, salary, onDelete, onToggleProperty, rise , increase} = props

        
        
        if  (increase) {
            classNames += ' increase'
        }

        if (rise) {
            classNames += ' like'
        }


        return (
            <li className={classNames}>
                <span data-toggle="rice" onClick={onToggleProperty} className="list-group-item-label">{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button data-toggle="increase" onClick={onToggleProperty} type="button"
                        className="btn-cookie btn-sm ">
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            onClick={onDelete} 
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }


export default EmployerListItem;

