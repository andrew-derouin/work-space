<!-- src/components/Item.vue -->
<template>
    <a class="item-element" v-bind:href="itemData.url" v-bind:title="`Check out the wikipedia page for ${itemData.name}.`">
        <div class="item-case">
            <div v-show="showCover" class="item-bg-image">
                <img v-bind:src="itemData.images[0]" v-bind:alt="`This is a cover image for ${itemData.name}.`" />
            </div>
            <div class="item-info">
                <h2>{{ itemData.name }}</h2>
                <p>{{ itemData.description }}</p>
            </div>
            <div class="screenshot-case">
                <div v-show="showScreenshots" class="screenshot-element">
                    <img v-bind:src="itemData.images[1]" v-bind:alt="`This is a screenshot from ${itemData.name}.`" />
                </div>
                <div v-show="showScreenshots" class="screenshot-element">
                    <img v-bind:src="itemData.images[2]" v-bind:alt="`This is another screenshot from ${itemData.name}.`" />
                </div>
            </div>
        </div>
    </a>
</template>

<script lang="ts">
import Vue from "vue";
import { Breakpoint } from "../App";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['data', 'index', 'showCover'],
    data() {
        return {
            listIndex: this.index,
            dataList: this.data,
            itemData: this.data[this.index],
            showCover: this.showCover,
            showScreenshots: true,
            trigger: (event: string, data: Object) => {ut.trigger(event, data)}
        }
    }
});
</script>

<style></style>
