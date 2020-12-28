import React, {useEffect} from "react";
import {defaults, HorizontalBar} from "react-chartjs-2";
import {Col, Row} from "react-bootstrap";

defaults.global.tooltips.enabled = false;

const HabitChart = ({currentHabit, currentSeries, maxSeries}) => {

    useEffect(() => {

    }, [currentHabit])

    return (
        <div>
            <Row className="justify-content-center mt-2 text-center">
                <Col xs={9}>
                    <HorizontalBar
                        data={{
                            labels: ['Aktualna Seria', 'Najlepsza Seria'],
                            datasets: [
                                {
                                    label: "SERIA",
                                    barPercentage: 0.4,
                                    data: [currentSeries, maxSeries],
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.4)',
                                        'rgba(99, 255, 102, 0.4)',

                                    ],
                                    borderColor: [
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(99, 255, 102, 1)',
                                    ],
                                    borderWidth: 1
                                }
                            ],
                        }}
                        options={{
                            scales: {
                                xAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 1,
                                        }
                                    },
                                ]
                            }
                        }}

                    />
                </Col>
            </Row>
        </div>
    )
}


export default HabitChart;