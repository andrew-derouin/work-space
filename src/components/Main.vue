<!-- src/components/Main.vue -->
<template>
    <div class="main-element" v-bind:style="{height: elementHeight + 'px'}">
        <item-component :data="mainData.dataList" :index="listIndex" />
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
            mainData: window.$App.MainData,
            listIndex: 0,
            elementHeight: 0
        }
    },
    methods: {
        setHeight: function() {
            this.elementHeight = window.innerHeight - 140;
            document.documentElement.style.setProperty('--main-element-height', this.elementHeight.toString());
        }
    },
    mounted: function () {
       this.setHeight();
    },
    components: {
        ItemComponent
    }
});
</script>

<style lang="scss">
    @import "../styles/global.scss";
</style>
