import { tik } from "../../data/elem"
import { Tiket } from "../../models/models"
import styles from "./rab.module.css"

function CrElT(tik){
    return(
        <div  className={styles.div_2}>
                <span>{tik.id}</span>
                <span> {tik.tikets}</span>
                <span>{tik.strim}</span>
                <span>{tik.status}</span>
               <button>Перейти</button>
        </div>
    )
}

function Rab(){
    return(
        <div className={styles.div}>
            <span>Мои тикеты</span>
            <div className={styles.filtrs }>
                <span>Фильтры</span>
            </div>
            <div>
            <div  className={`${styles.div_2} ${ styles.div2_sp}`}>
                <span>ID</span>
                <span> Тикет</span>
                <span>Стрим</span>
                <span>Статус</span>
                <span>Действие</span>
            </div>
            {
                tik.map(tiks=><CrElT tik={tiks}/>)
            }
          
            </div>
           
        </div>
    )
}
export default Rab