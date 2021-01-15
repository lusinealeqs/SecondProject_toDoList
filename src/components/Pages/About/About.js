import React from 'react';
import styles from './about.module.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function About() {
    return (
        <div className={styles.main}>
            <Container className={styles.mainInner}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <div className={styles.inner}>
                            <h3 className={styles.heading}>About ToDo</h3>
                            <p>If You want to learn Programming and learn by doing projects, 
                                we made this ToDo app to make your life and your learning process easier.
                            </p>
                            <p>This app is simple to use and easy to understand.</p>
                            <h5>Try once, make it for life!</h5>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

//___________________________________________________________________________

// The previous version 

// // <div className={styles.contenierOfAboutPage}>
// <Col  xs={12} sm={8} md={6}  className={styles.contenierOfAboutPage}>       
// <div className={styles.leftDivOfAboutPage}>
//     <div className={styles.leftInnerDivOfAboutPage}>
//         <h3>Meet the Team!</h3>
//         <Card style={{ width: '18rem', margin: "0 0 5% 0", height: "auto"}}>
//             <Card.Img variant="top" src={Masis} />
//             <Card.Body>
//                 <Card.Title>Masis Karapetyan</Card.Title>
//             </Card.Body>
//         </Card>
//         <Card style={{ width: '18rem', margin: "0 0 5% 0" }}>
//             <Card.Img variant="top" src={Anahit} />
//             <Card.Body>
//                 <Card.Title>Anahit Khechumyan</Card.Title>
//             </Card.Body>
//         </Card>
//         <Card style={{ width: '18rem', margin: "0 0 2% 0" }}>
//             <Card.Img variant="top" src={Lusine} />
//             <Card.Body>
//                 <Card.Title>Lusine Aleksanyan</Card.Title>
//             </Card.Body>
//         </Card>
//     </div>
// </div>
// <div className={styles.innerDivOfAboutPage}>
//     <img src={aboutTodo} alt="ToDo" className={styles.img} />
//     <p><b>Make Your ToDo list online․</b></p>
//     <h5>We encourage you to use online ToDo list, instead of stickers.</h5>
//     <p><b>More about us: </b>
// We are a team of 3 web developers . Masis, Anahit and Lusine. We met with Anahit a year ago and decided to learn to code and create applications that will make the world and people better. To make our goal happen Masis helped us and taught the basics, the essentials.
// We have made a ToDo list web application and will be very happy to see you using it. </p>
// </div>
// <div className={styles.rightDivOfAboutPage}>
//     <h3>Paper comes from Trees…</h3>
//     <p>In today’s electronic age, people are starting to consider going paperless. But there’s still a long way to go before we lose our dependence on this very important human product.</p>
//     <p>To produce paper takes twice the energy used to produce a plastic bag. Everything takes energy to produce.</p>
//     <p>In the case of paper, it also involves cutting down trees. Deforestation is one of the main environmental problems we’re facing in these times. 42% of all global wood harvest is used to make paper. Is it really worth it to cut down our life saving trees for this product?</p>
//     <img src={tree} alt="tree" className={styles.img} />
// </div>
// </Col>
// // {/* </div> */}