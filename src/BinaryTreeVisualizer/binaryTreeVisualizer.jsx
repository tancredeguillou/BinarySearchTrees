import React from 'react';
import './binaryTreeVisualizer.css';
import {buildMaxHeap, buildBinSearchTree, inorderTreeWalk,
            preorderTreeWalk, postorderTreeWalk} from '../Algorithms/algorithm.js';



// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#21587F';

// This is the color of array bars that are being compared throughout the animations.
const COMPARING_COLOR = '#DD5146';
const SWAPING_COLOR = '#1AA15F';
const HAS_COMPARED = '#f93';

const BMH_COMPARING_COLOR = '#f00';
const BMH_SWAPING_COLOR = '#0f0';

let WALK_COLOR = HAS_COMPARED;

const TOP_POSITION = 75;
const TOP_SIZE = 50;
const TOP_FONT = 20;
const MARGINS = [0, 200, 99, 42.3, 15, 2.6, 1];

export class BinaryTreeVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            born: 0
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        this.setArray(randomIntFromInterval(4, 7));
    }

    setArray(i) {
        this.setColor(PRIMARY_COLOR);
        const array = [];
        const arraySize = i;
        for (let index = 0; index < Math.pow(2, arraySize) - 1; index++) {
            array.push(randomIntFromInterval(1, 99));
        }

        this.setState({array: array, born:1});
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
        const original = this.state.array.slice();
        const animations = buildMaxHeap(original);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            const [v1, v2, swaping] = animations[i];
            if (swaping !== 2 && swaping !== 3) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 0 ? BMH_COMPARING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (swaping === 2) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? BMH_SWAPING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                    const temp = this.state.array[v1];
                    const a = this.state.array;
                    a[v1] = a[v2];
                    a[v2] = temp;
                    this.setState({array: a, born:1});
                }, i * ANIMATION_SPEED_MS);
            } else if (swaping === 3) {
                const circleOneStyle = circles[v1].style;
                const circleTwoStyle = circles[v2].style;
                const color = swaping === 2 ? BMH_SWAPING_COLOR : HAS_COMPARED;
                setTimeout(() => {
                    circleOneStyle.background = color;
                    circleTwoStyle.background = color;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    buildBinSearchTree() {
        const original = this.state.array.slice();
        const animations = buildBinSearchTree(original);
        const circles = document.getElementsByClassName('circle');
        for (let i = 0; i < animations.length; i++) {
            // we are sorting the array
            if (i < original.length) {
                const index = animations[i];
                const circleStyle = circles[index].style;
                setTimeout(() => {
                    circleStyle.background = COMPARING_COLOR;
                }, i * ANIMATION_SPEED_MS);
            } 
            // we are creating the tree
            else {
                const [index, value] = animations[i];
                const circleStyle = circles[index].style;
                setTimeout(() => {
                    circleStyle.background = HAS_COMPARED;
                    const a = this.state.array;
                    a[index] = value;
                    this.setState({array: a, born:1});
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    showInorderWalk() {
        const animations = inorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        WALK_COLOR  = WALK_COLOR === HAS_COMPARED ? SWAPING_COLOR : HAS_COMPARED;
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = WALK_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    showPreorderWalk() {
        const animations = preorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        WALK_COLOR  = WALK_COLOR === HAS_COMPARED ? SWAPING_COLOR : HAS_COMPARED;
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = WALK_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    showPostorderWalk() {
        const animations = postorderTreeWalk(this.state.array.length);
        const circles = document.getElementsByClassName('circle');
        WALK_COLOR  = WALK_COLOR === HAS_COMPARED ? SWAPING_COLOR : HAS_COMPARED;
        for (let i = 0; i < animations.length; i++) {
            const index = animations[i];
            const circleStyle = circles[index].style;
            setTimeout(() => {
                circleStyle.background = WALK_COLOR;
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
            <div>
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
                                        margin: `0 ${MARGINS[index]}px`,
                                        width: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                        height: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                        fontSize: (index < 6) ? `${TOP_FONT * (1 - (index * 0.1))}px` : `${TOP_FONT * Math.pow(0.8, index)}px`,
                                        lineHeight: (index < 6) ? `${TOP_SIZE * (1 - (index * 0.1))}px` : `${TOP_SIZE * Math.pow(0.8, index)}px`,
                                        background: (value === 0) ? `#fff` : `#21587F`,
                                    }}
                                >
                                {value}
                                </div>
                    })}
                        </div>
                    })
                }
                <div
                    className="bar"
                    style={{
                        height: `${window.innerWidth / 600}%`,
                        marginTop: `${window.innerHeight / 80}%`,
                    }}
                ></div>
                <header class="nested-dropdown__header">
                    <strong>Welcome</strong>
                    <ul class="nested-dropdown__categories">
                        <li class="nested-dropdown__category">
                            <span>MENU</span>
                            <ul class="nested-dropdown__menu">
                                <li class="nested-dropdown__subcategory">
                                    <span>New Tree</span>
                                    <ul class="nested-dropdown__submenu">
                                        <li className="button" onClick={()=> this.setArray(4)}>4 Levels</li>
                                        <li className="button" onClick={()=> this.setArray(5)}>5 Levels</li>
                                        <li className="button" onClick={()=> this.setArray(6)}>6 Levels</li>
                                        <li className="button" onClick={()=> this.setArray(7)}>7 Levels</li>
                                    </ul>
                                </li>
                                <li class="nested-dropdown__subcategory">
                                    <span>Build Max Heap</span>
                                    <ul class="nested-dropdown__submenu">
                                        <li className="button" onClick={()=> {this.animSpeed(300); this.buildHeap(); this.animSpeed(100);}}>Slow Speed</li>
                                        <li className="button" onClick={()=> {this.buildHeap()}}>Medium Speed</li>
                                        <li className="button" onClick={()=> {this.animSpeed(20); this.buildHeap(); this.animSpeed(100);}}>Fast Speed</li>
                                    </ul>
                                </li>
                                <li class="nested-dropdown__subcategory">
                                    <span>Tree Walk</span>
                                    <ul class="nested-dropdown__submenu">
                                        <li className="button" onClick={()=> {this.showInorderWalk()}}>In Order</li>
                                        <li className="button" onClick={()=> {this.showPreorderWalk()}}>Pre Order</li>
                                        <li className="button" onClick={()=> {this.showPostorderWalk()}}>Post Order</li>
                                    </ul>
                                </li>
                                <li className="button" onClick={()=> {this.buildBinSearchTree()}}>Build Binary Search Tree</li>
                            </ul>
                        </li>
                    </ul>
                </header>
            </div>
        );
    }

}

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }