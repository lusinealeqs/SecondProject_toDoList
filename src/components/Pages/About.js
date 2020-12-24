import React from 'react';
import styles from '../Pages/Page Styles/pageStyles.module.css';
import aboutTodo from './Page images/aboutTodo.jpg'
import { Card } from 'react-bootstrap';
import Masis from './Page images/Masis.jpg'
import Anahit from './Page images/Anahit.jpg'
import Lusine from './Page images/Lusine.JPG'
import tree from './Page images/tree.jpg'

export default function About() {
    return (
        <div className={styles.contenierOfAboutPage}>
            <div className={styles.leftDivOfAboutPage}>
                <div className={styles.leftInnerDivOfAboutPage}>
                    <h3>Meet the Team!</h3>
                    <Card style={{ width: '18rem', margin: "0 0 5% 0", height: "auto"}}>
                        <Card.Img variant="top" src={Masis} />
                        <Card.Body>
                            <Card.Title>Masis Karapetyan</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: "0 0 5% 0" }}>
                        <Card.Img variant="top" src={Anahit} />
                        <Card.Body>
                            <Card.Title>Anahit Khechumyan</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: "0 0 2% 0" }}>
                        <Card.Img variant="top" src={Lusine} />
                        <Card.Body>
                            <Card.Title>Lusine Aleksanyan</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className={styles.innerDivOfAboutPage}>
                <img src={aboutTodo} alt="ToDo" className={styles.img} />
                <p><b>Make Your ToDo list online․</b></p>
                <h5>We encourage you to use online ToDo list, instead of stickers.</h5>
                <p><b>More about us: </b>
We are a team of 3 web developers . Masis, Anahit and Lusine. We met with Anahit a year ago and decided to learn to code and create applications that will make the world and people better. To make our goal happen Masis helped us and taught the basics, the essentials.
We have made a ToDo list web application and will be very happy to see you using it. </p>
            </div>
            <div className={styles.rightDivOfAboutPage}>
                <h3>Paper comes from Trees…</h3>
                <p>In today’s electronic age, people are starting to consider going paperless. But there’s still a long way to go before we lose our dependence on this very important human product.</p>
                <p>To produce paper takes twice the energy used to produce a plastic bag. Everything takes energy to produce.</p>
                <p>In the case of paper, it also involves cutting down trees. Deforestation is one of the main environmental problems we’re facing in these times. 42% of all global wood harvest is used to make paper. Is it really worth it to cut down our life saving trees for this product?</p>
                <img src={tree} alt="tree" className={styles.img} />
            </div>
        </div>
    )
}