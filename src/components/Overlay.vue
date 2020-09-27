<!-- src/components/Overlay.vue -->
<template>
    <div class="main-overlay" v-bind:class="{ 'active': showOverlay }">
        <div v-show="showMainOverlay" class="main-overlay-content">
            <div class="white-line"></div>
            <div>{{ overlayHeadline }}</div>
            <div class="white-line"></div>
        </div>
        <div v-show="showArrowOverlay" class="main-overlay-arrows">
            <div class="arrow-overlay arrow-overlay-left">
                <div class="arrow-left">
                    <img v-bind:src="'./src/icons/arrow-icon.svg'" />
                </div>
            </div>
            <div class="arrow-overlay arrow-overlay-right">
                <div class="arrow-right">
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
    props: [],
    data() {
        return {
            showOverlay: false,
            showMainOverlay: true,
            showArrowOverlay: false,
            overlayHeadline: ''
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
            this.showOverlay = true;
            setTimeout(() => {
                this.showOverlay = false;
            }, timer);
        }, 1000);
    }
});
</script>

<style></style>
