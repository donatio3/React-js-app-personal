import './app-info.css' // Сюда импортируем файл css

const AppInfo = ({quanityPerson, quanityRise}) => {

    
    
    return (
        <div className="app-info">
            <h1>Учет сотрудников в кампании N</h1>
            <h2>Общее число сотрудников: {quanityPerson} </h2>
            <h2>Премию получат: {quanityRise} </h2>
        </div>
    )
}


export default AppInfo;