<!-- src/components/Main.vue -->
<template>
    <div class="about-element">
        <div class="about-text-block">
            <h2>About this Work Space</h2>
            <p>Hi, this workspace is designed to be a development play area. Specically I wanted a place to work with typescript and vue. Over time, I will continue to add features and new pages based on my whims.<br>You can find the git repository and my linkedin profile by clicking the links in the footer.
            </p>
        </div>
        <div class="about-photo">
            <img v-bind:src="'./src/images/me-2020.jpg'" alt="This is a photo of me.">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
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

    }
});
</script>

<style></style>
