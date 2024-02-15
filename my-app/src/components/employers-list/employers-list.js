import { Fragment } from "react"
import EmployerListItem from "../employers-list-item/employers-list-item"
import './employers-list.css'


const EmployerList = ({data, onDelete, onToggleProperty}) => {
    
    const elements = data.map(item => {

        const {id, ...itemProps} = item // деструктурируем на свойство id и остальной обьект
        
        return (
            <EmployerListItem 
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProperty={(e) => onToggleProperty(id, e.currentTarget.getAttribute('data-toggle'))}
            />
        )
    })


    return (
        <ul>
            {elements}
        </ul>
    )
}

export default EmployerList