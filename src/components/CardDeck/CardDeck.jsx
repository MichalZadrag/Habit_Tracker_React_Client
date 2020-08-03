import React from "react";
import styles from "./CardDeck.module.css";
import cx from "classnames";
import Card from "../Card/Card";
import {CARDS} from "../../constants";


const CardDeck = () => {



    return(
        <div className={cx("card-deck", styles.cardDeck)}>
            {CARDS.map( (card) => (
                <Card
                    key = { card.id }
                    card_text = { card.card_text }
                    icon = { card.icon }
                />
            ))}
        </div>
    )

}
export default CardDeck;