import React from 'react';
import './binaryTreeVisualizer.css';
import {buildMaxHeap} from '../Algorithms/algorithm.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 500;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#333';

// This is the color of array bars that are being compared throughout the animations.
const COMPARING_COLOR = '#f00';

// This is the color of array bars that are being compared throughout the animations.
const SWAPING_COLOR = '#0f0';

export class BinaryTreeVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let index = 0; index < 15; index++) {
            array.push(randomIntFromInterval(1, 50));
        }
        this.setState({array});
    }

    buildHeap() {
        let original = this.state.array.slice();
        const animations = buildMaxHeap(original);
        for (let i = 0; i < animations.length; i++) {
            const circles = document.getElementsByClassName('circle');
            const [v1, v2, swaping] = animations[i];
            if (swaping !== 2 && swaping !== 3) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 0 ? COMPARING_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (swaping === 2) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? SWAPING_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                    const temp = this.state.array[v1];
                    this.state.array[v1] = this.state.array[v2];
                    this.state.array[v2] = temp;
                    const t = this.state.array.slice();
                    this.setState({t});
                }, i * ANIMATION_SPEED_MS);
            } else {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? SWAPING_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const {array} = this.state;
        const root = array[0];
        const array1 = array.slice(1, 3);
        const array2 = array.slice(3, 7);
        const array3 = array.slice(7, 15);

        return (
            <div className="bin-tree">
                <div className="array-container1">
                    <div
                        className="circle"
                        key={0}> {root}
                    </div>
                </div>
                <div className="array-container2">
                    {array1.map((value, idx) => (
                    <div
                        className="circle"
                        key={idx}
                        style={{
                            margin: `0 90px`
                        }}
                        >
                        {value}
                    </div>
                    ))}
                </div>
                <div className="array-container3">
                    {array2.map((value, idx) => (
                    <div
                        className="circle"
                        key={idx}
                        style={{
                            margin: `0 35px`
                        }}
                        >
                        {value}
                    </div>
                    ))}
                </div>
                <div className="array-container4">
                    {array3.map((value, idx) => (
                    <div
                        className="circle"
                        key={idx}> {value}
                    </div>
                    ))}
                </div>
                <button
                className="button"
                onClick={() => this.resetArray()}> Generate New Array </button>
                <button
                className="button"
                onClick={() => this.buildHeap(/*this.state.array*/)}> Build Max Heap </button>
            </div>
        );
    }

}

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }