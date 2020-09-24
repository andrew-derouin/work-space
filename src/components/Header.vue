<!-- src/components/Main.vue -->
<template>
    <div class="header-element">
        <div class="headline text-center"><h1>Work Space</h1></div>
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
