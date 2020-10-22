<!-- src/components/Canvas.vue -->
<template>
    <div class="maze-page">
        <div class="maze-header">
            <h2>Maze Project</h2>
            <p>This was the result of a project I worked on last year. Originally this was done without Vue or Typescript, but for this page I have converted it. It was inspired by Jamis Buck's <a href="https://www.amazon.com/Mazes-Programmers-Twisty-Little-Passages/dp/1680500554" title="Link to Mazes for Programmers on Amazon.">Mazes for Programers</a><br>I tried to follow the spirit of the book, but generally did not follow the solutions all that closely so there are likely some defects. Even so, it was quite fun, which was the goal.</p>
        </div>
        <div class="maze-board">
            <div class="grid"></div>
        </div>
        <div class="sidebar">
            <button class="side-btn" v-on:click="setMaze('random')">Random Maze</button>
            <button class="side-btn" v-on:click="setMaze('binaryTree')">Binary Tree</button>
            <button class="side-btn" v-on:click="setMaze('sidewinder')">Sidewinder</button>
            <button class="side-btn" v-on:click="setMaze('prim')">Prim's</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Maze } from "../scripts/maze/Maze";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: [],
    data() {
        return {
            maze: new Maze('binaryTree')
        }
    },
    methods: {
        setMaze: function(algorythmName: string) {
            this.maze = new Maze(algorythmName);
        },
        setCellSize: function() {
            var mazeBoard = document.querySelector('.maze-board .grid');
            var boardWidth = (mazeBoard as HTMLElement).offsetWidth - 1;
            var cellWidth = Math.floor(boardWidth/this.maze.width);

            ut.setCssVar('--cell-size', cellWidth.toString() + 'px');
        }
    },
    mounted() {
        this.setMaze('binaryTree');
        this.setCellSize();

        ut.addEvent('resize', () => {
            this.setCellSize();
        }, 300)
    }
});
</script>

<style></style>
