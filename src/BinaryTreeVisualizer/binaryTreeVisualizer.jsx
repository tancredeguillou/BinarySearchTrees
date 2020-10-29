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
                            marginLeft : `35%`
                        }}
                        onClick={() => this.buildHeap()}>
                            Build Max Heap
                    </button>
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
                    
                    <div className="bar"></div>

                    <div class="hamburger-menu__wrapper">
                        
                        <div class="hamburger-menu">
                            <div class="hamburger-menu__wrapper">
                                <input type="checkbox" />
                                <div class="hamburger-menu__button"> NEW TREE
                                </div>
                                <div class="hamburger-menu__slider">
                                    <div class="hamburger-menu__item" onClick={() => this.setArray(3)}>3 levels</div>
                                    <div class="hamburger-menu__item" onClick={() => this.setArray(4)}>4 levels</div>
                                    <div class="hamburger-menu__item" onClick={() => this.setArray(5)}>5 levels</div>
                                    <div class="hamburger-menu__item" onClick={() => this.setArray(6)}>6 levels</div>
                                    <div class="hamburger-menu__item" onClick={() => this.setArray(7)}>7 levels</div>
                                </div>
                            </div>
                        </div>

                        <div class="hamburger-menu__wrapper"
                        style={{
                            marginLeft: `300px`
                        }}
                        >
                        
                        <div class="hamburger-menu">
                            <div class="hamburger-menu__wrapper">
                                <input type="checkbox" />
                                <div class="hamburger-menu__button"> WALKS
                                </div>
                                <div class="hamburger-menu__slider">
                                    <div class="hamburger-menu__item" onClick={() => this.showInorderWalk}>In Order</div>
                                    <div class="hamburger-menu__item" onClick={() => this.showPostorderWalk}>Post Order</div>
                                    <div class="hamburger-menu__item" onClick={() => this.showPreorderWalk}>Pre Order</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
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



    /*
    <button
                        className="button"
                        style={{
                            marginLeft : `-48%`
                        }}
                        onClick={() => this.resetArray()}>
                        NEW HEAP !
                    </button>
                    */

/*

*/


/*
<header class="nested-dropdown__header">
  <ul class="nested-dropdown__categories">
    <li class="nested-dropdown__category">
      <span>Cat 1</span>
      <ul class="nested-dropdown__menu">
        <li class="nested-dropdown__subcategory">
          <span>Sub Cat 1</span>
          <ul class="nested-dropdown__submenu">
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
            <li>Sub Cat 1 Thing</li>
          </ul>
        </li>
        <li class="nested-dropdown__subcategory">
          <span>Sub Cat 2</span>
          <ul class="nested-dropdown__submenu">
            <li>Sub Cat 2 Thing</li>
            <li>Sub Cat 2 Thing</li>
            <li>Sub Cat 2 Thing</li>
          </ul>
        </li>
        <li>Cat 1 Thing</li>
        <li>Cat 1 Thing</li>
      </ul>
    </li>
  </ul>
</header>
*/

/*

*/