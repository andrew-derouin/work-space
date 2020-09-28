<!-- src/components/Overlay.vue -->
<template>
    <div class="main-overlay active" v-bind:class="{ 'active': showMainOverlay || showArrowOverlay }">
        <div v-show="showMainOverlay" class="main-overlay-content">
            <div class="white-line"></div>
            <div>{{ overlayHeadline }}</div>
            <div class="white-line"></div>
        </div>
        <div v-show="showArrowOverlay && !showMainOverlay" class="main-overlay-arrows">
            <div class="arrow-overlay arrow-overlay-left" v-on:click="trigger('ArrowLeft')">
                <div class="arrow">
                    <img v-bind:src="'./src/icons/arrow-icon.svg'" />
                </div>
            </div>
            <div class="arrow-overlay arrow-overlay-right" v-on:click="trigger('ArrowRight')">
                <div class="arrow">
                    <img v-bind:src="'./src/icons/arrow-icon.svg'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['showArrowOverlay'],
    data() {
        return {
            showArrowOverlay: this.showArrowOverlay,
            showMainOverlay: false,
            overlayHeadline: '',
            trigger: (event: string, data: Object) => {ut.trigger(event, data)}
        }
    },
    methods: {
        
    },
    components: {

    },
    mounted() {
        ut.addEvent('show-overlay', (e: CustomEvent & {headline: string, timer: number}) => {
            let timer = 1100;
            if (e.detail.timer) {
                timer = e.detail.timer
            }

            this.overlayHeadline = e.detail.headline;
            this.showMainOverlay = true;
            setTimeout(() => {
                this.showMainOverlay = false;
            }, timer);
        }, 1000);
    }
});
</script>

<style></style>
