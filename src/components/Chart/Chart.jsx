import React from "react";
import styles from './Chart.module.css';
import wykres from "./wykres.png";

const Chart = () => {


    return(
        <div className={ styles.chartContainer }>
            <div className={ styles.chart }>
                <img src={ wykres } alt="wykres"/>
                    <h5>Przykładowy wykres</h5>
            </div>
        </div>
    )
}


export default Chart;