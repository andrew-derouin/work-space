<!-- src/components/Main.vue -->
<template>
    <footer class="footer-element">
        <div class="footer-overlay"></div>
        <div class="icon-row-footer">
            <a href="https://www.linkedin.com/in/andrew-derouin-b28277197/" title="Link to Andrew DeRouin's Linkedin account." target="_blank">
                <div class="icon icon-linkedin">
                    <img v-bind:src="'./src/icons/linkedin-icon.svg'" />
                </div>
            </a>
            <a href="https://github.com/andrew-derouin/work-space" title="Link to the Github Repository." target="_blank">
                <div class="icon icon-github">
                    <img v-bind:src="'./src/icons/github-icon.svg'" />
                </div>
            </a>
        </div>
    </footer>
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
