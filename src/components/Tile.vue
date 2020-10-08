<!-- src/components/Tile.vue -->
<template>
    <div class="tile-main" v-on:click="App.setMainItem(itemData)"> 
        <div class="tile-img">
            <img v-bind:src="itemData.images[1]" class="standard-img" v-bind:alt="`This is a screenshot from ${item.name}`">
            <img v-bind:src="itemData.images[2]" class="hover-img" v-bind:alt="`This is a screenshot from ${item.name}`">
        </div>
        <div class="tile-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.publisher }}</p>
            <p>{{ item.releaseDate }}</p>
        </div>
        <div class="tile-description">
            <p>{{ item.description }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['itemData'],
    data() {
        return {
            App: window.$App,
            item: this.itemData
        }
    },
    methods: {

    },
    components: {

    }
});
</script>

<style></style>
