import React from 'react';
import './binaryTreeVisualizer.css';
import {buildMaxHeap, buildBinSearchTree, inorderTreeWalk,
            preorderTreeWalk, postorderTreeWalk} from '../Algorithms/algorithm.js';

/*BFDBFF
A4CEFF
FEDFA4
B29150*/

/*
FF5F31
5DC7FF
9AE897
FFE26E
*/



// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#21587F';

// This is the color of array bars that are being compared throughout the animations.
const COMPARING_COLOR = '#f00';

const HAS_COMPARED = '#f93';

// This is the color of array bars that are being compared throughout the animations.
const SWAPING_COLOR = '#0f0';

const TOP_POSITION = 75;
const TOP_SIZE = 50;
const TOP_FONT = 20;
const LEVELS = [2, 3, 4, 5, 6, 7];
const MARGINS = [0, 200, 99, 42.3, 15, 2.6, 1];

export class BinaryTreeVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            building: 0
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        this.setArray(randomIntFromInterval(4, 7));
    }

    setArray(i) {
        if (this.state.building === 0) {
            this.set(i);
        } else {
            const circles = document.getElementsByClassName('circle');
            if (circles[0].style.background === `rgb(255, 153, 51)`) {
                this.set(i);
            }
        }
    }

    set(i) {
        this.setColor(PRIMARY_COLOR);
        const array = [];
        const arraySize = i;
        for (let index = 0; index < Math.pow(2, arraySize) - 1; index++) {
            array.push(randomIntFromInterval(1, 99));
        }

        this.setState({array: array, building: 0});
    }

    setColor(c) {
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.background = c;
        }
    }

    animSpeed(n) {
        ANIMATION_SPEED_MS=n;
    }

    buildHeap() {
        if (this.state.building === 0) {
            this.setState({building: 1});
        const original = this.state.array.slice();
        const animations = buildMaxHeap(original);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            const [v1, v2, swaping] = animations[i];
            if (swaping !== 2 && swaping !== 3) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 0 ? COMPARING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (swaping === 2) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? SWAPING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                    const temp = this.state.array[v1];
                    const a = this.state.array;
                    a[v1] = a[v2];
                    a[v2] = temp;
                    this.setState({a});
                }, i * ANIMATION_SPEED_MS);
            } else if (swaping === 3) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? SWAPING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        }
    }

    buildBinSearchTree() {
        const original = this.state.array.slice();
        const animations = buildBinSearchTree(original);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            
            const [index, value] = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = HAS_COMPARED;
                const a = this.state.array;
                a[index] = value;
                this.setState({a});
            }, i * ANIMATION_SPEED_MS);
        }
    }

    showInorderWalk() {
        const animations = inorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = SWAPING_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    showPreorderWalk() {
        const animations = preorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = SWAPING_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    showPostorderWalk() {
        const animations = postorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = SWAPING_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    render() {
        const {array} = this.state;

        const indexes = [];

        for (let i = 0; Math.pow(2, i) < array.length; i++) {
            indexes.push(i);
        }

        return (
            <div className="bin-tree">
                <div className="menu">
                    <button
                        className="button"
                        style={{
                            marginLeft : `-48%`
                        }}
                        onClick={() => this.resetArray()}>
                        NEW HEAP !
                    </button>
                    <button
                        className="button"
                        style={{
                            marginLeft : `35%`
                        }}
                        onClick={() => this.buildHeap()}>
                            Build Max Heap
                    </button>
                    {
                        LEVELS.map(level => {
                            return  <button
                                className="levels"
                                onClick={() => this.setArray(level)}
                                style={{
                                marginLeft : (level === 2 || level === 5) ? `-35%` : (level === 3 || level === 6) ? `-33%` : `-31%`,
                                marginTop: (level < 5) ? `1%` : `3%`,
                            }}>
                            {level}
                            </button>
                        })
                    }
                    <button
                        className="levels"
                        style={{
                            marginLeft : `32%`,
                            marginTop: `0.3%`
                        }}
                        onClick={() => this.animSpeed(500)}>
                            S
                    </button>
                    <button
                        className="levels"
                        style={{
                            marginLeft : `32%`,
                            marginTop: `2.3%`
                        }}
                        onClick={() => this.animSpeed(75)}>
                            M
                    </button>
                    <button
                        className="levels"
                        style={{
                            marginLeft : `32%`,
                            marginTop: `4.3%`
                        }}
                        onClick={() => this.animSpeed(20)}>
                            F
                    </button>
                    <button
                        className="button"
                        
                        onClick={() => this.buildBinSearchTree()}>
                            Build Binary Tree
                    </button>
                    <button
                        className="button"
                        style={{
                            marginLeft : `15%`
                        }}
                        onClick={() => this.showInorderWalk()}>
                        itw
                    </button>
                    <button
                        className="button"
                        style={{
                            marginLeft : `-15%`
                        }}
                        onClick={() => this.showPreorderWalk()}>
                        ptw
                    </button>
                    <button
                        className="button"
                        style={{
                            marginLeft : `-10%`
                        }}
                        onClick={() => this.showPostorderWalk()}>
                        potw
                    </button>
                </div>
                <div className="bar"></div>
                {
                    indexes.map(index => {
                        return <div
                            className="array-container"
                            style={{
                                bottom: `${TOP_POSITION - (index * 10)}%`
                            }}
                        >
                        {
                            array.slice(Math.pow(2, index) - 1, Math.pow(2, index+1) - 1).map((value, idx) => {
                                return <div
                                    className="circle"
                                    key={idx}
                                    style={{
                                        margin: `0 ${MARGINS[index]}px`,//(index < 6) ? `0 ${10 * (Math.pow(2, 6 - index - 1) - 1)}px` : `0 0.3px`,
                                        width: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                        height: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                        fontSize: (index < 6) ? `${TOP_FONT * (1 - (index * 0.1))}px` : `${TOP_FONT * Math.pow(0.8, index)}px`,
                                        lineHeight: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                    }}
                                >
                                {value}
                                </div>
                    })}
                        </div>
                    })
                }
            </div>
        );
    }

}

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }