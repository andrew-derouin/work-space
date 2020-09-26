<!-- src/components/Main.vue -->
<template>
    <div class="header-element">
        <div class="header-overlay"></div>
        <div class="icon-row-navigation">
            <div class="icon icon-bitbucket" v-on:click="trigger('move-to', { page: 'about' })">
                <img v-bind:src="'./src/icons/about-icon.svg'" />
            </div>
            <div class="icon icon-linkedin" v-on:click="trigger('move-to', { page: 'slideshow' })">
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
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: [],
    data() {
        return {
            trigger: (event: string, data: Object) => {ut.trigger(event, data)}
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
