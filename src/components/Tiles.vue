<!-- src/components/Tiles.vue -->
<template>
    <div class="tile-page">
        <div class="tile-banner">
            <img v-bind:src="CurrentItem.images[3]" v-bind:alt="CurrentItem.name" />
        </div>
        <div class="tile-list-container">
            <div class="tile-list"> 
                <tile-component v-for="item in MainData.dataList" v-bind:key="item.id" v-bind:itemData="item"></tile-component>
            </div>
        </div>
        <div class="tile-banner">
            <img v-bind:src="CurrentItem.images[4]" v-bind:alt="CurrentItem.name" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TileComponent from "./Tile.vue";
import { ManageData } from "../scripts/ManageData";

export default Vue.extend({
    props: ['CurrentItem'],
    data() {
        return {
            App: window.$App,
            MainData: window.$App.MainData,
            CurrentItem: this.CurrentItem
        }
    },
    methods: {

    },
    components: {
        TileComponent
    }
});
</script>

<style></style>
