import React, { Component } from "react";
import "./../css/sorting_visualizer.css";
import mergeSort from "./../sortingAlgorithms/mergeSort";
import bubbleSort from "./../sortingAlgorithms/bubbleSort";

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const randomArray = [];
        let min = 5,
            max = 750;

        for (let i = 0; i < 300; i++) {
            randomArray.push(Math.floor(Math.random() * (max - min + 1) + min));
        }

        this.setState({ array: randomArray });
    }

    mergeSortWrapper() {
        const currentState = [...this.state.array];
        const animations = mergeSort(currentState);
        const barsFromDom = document.getElementsByClassName("number-bar");
        for (let i = 0; i < animations.length; i++) {
            let [firstBar, secondBar] = animations[i][0];
            let swap = animations[i].length == 2;
            let speed = 24;
            setTimeout(() => {
                barsFromDom[firstBar].style["background-color"] = `aqua`;
                barsFromDom[secondBar].style["background-color"] = `aqua`;
            }, i * speed);
            if (swap) {
                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `red`;
                    barsFromDom[secondBar].style["background-color"] = `red`;
                }, i * speed + speed / 4);

                const [newIndex, newHeight] = animations[i][1];

                setTimeout(() => {
                    barsFromDom[newIndex].style.height = `${newHeight}px`;
                    barsFromDom[newIndex].style["background-color"] = `red`;
                }, i * speed + speed / 2);

                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `blue`;
                    barsFromDom[secondBar].style["background-color"] = `blue`;
                    barsFromDom[newIndex].style["background-color"] = `blue`;
                }, i * speed + (speed * 3) / 4);
            } else {
                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `blue`;
                    barsFromDom[secondBar].style["background-color"] = `blue`;
                }, i * speed + speed / 2);
            }
        }
    }

    bubbleSortWrapper() {
        const currentState = [...this.state.array];
        const animations = bubbleSort(currentState);
        const barsFromDom = document.getElementsByClassName("number-bar");
        for (let i = 0; i < animations.length; i++) {
            let [firstBar, secondBar] = animations[i].indexes;
            let swap = animations[i].swap;
            let speed = 6;
            setTimeout(() => {
                barsFromDom[firstBar].style["background-color"] = `aqua`;
                barsFromDom[secondBar].style["background-color"] = `aqua`;
            }, i * speed);

            if (swap) {
                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `red`;
                    barsFromDom[secondBar].style["background-color"] = `red`;
                }, i * speed + speed / 4);

                setTimeout(() => {
                    let tmp = barsFromDom[firstBar].style.height;
                    barsFromDom[firstBar].style.height =
                        barsFromDom[secondBar].style.height;
                    barsFromDom[secondBar].style.height = tmp;
                }, i * speed + speed / 2);

                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `blue`;
                    barsFromDom[secondBar].style["background-color"] = `blue`;
                }, i * speed + (speed * 3) / 4);
            } else {
                setTimeout(() => {
                    barsFromDom[firstBar].style["background-color"] = `blue`;
                    barsFromDom[secondBar].style["background-color"] = `blue`;
                }, i * speed + speed / 2);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div className="bar-container">
                {array.map((value, index) => {
                    return (
                        <div
                            className="number-bar"
                            key={index}
                            style={{ height: `${value}px` }}
                        ></div>
                    );
                })}

                <button
                    onClick={() => {
                        this.resetArray();
                    }}
                >
                    Generate New Array
                </button>
                <button
                    onClick={() => {
                        this.mergeSortWrapper();
                    }}
                >
                    Merge Sort
                </button>
                <button
                    onClick={() => {
                        this.bubbleSortWrapper();
                    }}
                >
                    Bubble Sort
                </button>
            </div>
        );
    }
}

export default SortingVisualizer;
