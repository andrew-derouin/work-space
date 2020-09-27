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
            <a href="https://bitbucket.org/andrew--derouin/work-place/src/master/" title="Link to the Bitbucket Repository." target="_blank">
                <div class="icon icon-bitbucket">
                    <img v-bind:src="'./src/icons/bitbucket-icon.svg'" />
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
