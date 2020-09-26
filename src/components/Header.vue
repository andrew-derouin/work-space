<!-- src/components/Main.vue -->
<template>
    <div class="header-element">
        <div class="icon-row-navigation">
            <div class="icon icon-bitbucket">
                <img v-bind:src="'./src/icons/about-icon.svg'" />
            </div>
            <div class="icon icon-linkedin">
                <img v-bind:src="'./src/icons/slideshow-icon.svg'" />
            </div>
        </div>
        <div class="header-headline text-center"><h1>Work Space</h1></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ItemComponent from "./Item.vue";
import { ManageData } from "../scripts/ManageData";

export default Vue.extend({
    props: [],
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        ItemComponent
    }
});
</script>

<style></style>
