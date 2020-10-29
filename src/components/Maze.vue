<!-- src/components/Canvas.vue -->
<template>
    <div class="maze-page">
        <div class="maze-header">
            <h2>Maze Project</h2>
            <p>This was the result of a project I worked on last year. Originally this was done without Vue or Typescript, but for this page I have converted it. It was inspired by Jamis Buck's <a href="https://www.amazon.com/Mazes-Programmers-Twisty-Little-Passages/dp/1680500554" title="Link to Mazes for Programmers on Amazon.">Mazes for Programers</a> I tried to follow the spirit of the book, but generally did not follow the solutions all that closely so there are likely some defects. Even so, it was quite fun, which was the goal.</p>
        </div>
        <div class="maze-board">
            <div class="grid"></div>
        </div>
        <div class="sidebar maze-tab" v-bind:class="{ open: menuOpen }">
            <div class="sidebar-shape" v-on:click="toggleMazeMenu()">
                <div class="arrow">
                    <img v-bind:src="'./src/icons/arrow-icon.svg'" />
                </div>
            </div>
            <button class="side-btn" v-bind:class="{ selected: this.currentAlgorithm === 'random' }" v-on:click="setMaze('random')">Random Maze</button>
            <button class="side-btn" v-bind:class="{ selected: this.currentAlgorithm === 'binaryTree' }" v-on:click="setMaze('binaryTree')">Binary Tree</button>
            <button class="side-btn" v-bind:class="{ selected: this.currentAlgorithm === 'sidewinder' }" v-on:click="setMaze('sidewinder')">Sidewinder</button>
            <button class="side-btn" v-bind:class="{ selected: this.currentAlgorithm === 'prim' }" v-on:click="setMaze('prim')">Prim's</button>
        </div>
        <div class="sidebar solution-tab" v-bind:class="{ open: tabOpen }">
            <div class="sidebar-shape" v-on:click="toggleSolutionMenu()">
                <div class="arrow">
                    <img v-bind:src="'./src/icons/arrow-icon.svg'" />
                </div>
            </div>
            <button class="side-btn" v-bind:class="{ selected: this.solved === true }" v-on:click="solveMaze()">Solve</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Maze } from "../scripts/maze/Maze";
import * as ut from "../scripts/Utilities";
import * as domHelpers from "../scripts/DOMHelpers";

export default Vue.extend({
    props: ['algorithm'],
    data() {
        return {
            maze: new Maze(this.algorithm),
            menuOpen: false,
            tabOpen: false,
            currentAlgorithm: this.algorithm,
            solved: false
        }
    },
    methods: {
        setMaze: function(algorithmName: string) {
            this.solved = false;
            this.currentAlgorithm = algorithmName;
            this.maze = new Maze(algorithmName);
        },
        setCellSize: function() {
            var mazeBoard = document.querySelector('.maze-board .grid');
            var boardWidth = (mazeBoard as HTMLElement).offsetWidth - 1;
            var cellWidth = Math.floor(boardWidth/this.maze.width);

            ut.setCssVar('--cell-size', cellWidth.toString() + 'px');
        },
        toggleMazeMenu: function() {
            this.menuOpen = !this.menuOpen;
        },
        toggleSolutionMenu: function() {
            this.tabOpen = !this.tabOpen;
        },
        solveMaze: function() {
            this.solved = true;
            domHelpers.visualizeDistance();
            domHelpers.colorCodeDistance();
        }
    },
    mounted() {
        this.setMaze('binaryTree');
        this.setCellSize();

        ut.addEvent('resize', () => {
            this.setCellSize();
        }, 300);
    }
});
</script>

<style></style>
