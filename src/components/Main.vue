<!-- src/components/Main.vue -->
<template>
    <div class="main-element">
        <item-component :data="mainData.dataList" :index="listIndex" />
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
            mainData: window.$App.MainData,
            listIndex: 0,
            elementHeight: 0
        }
    },
    methods: {
        setHeight: function(): void {
            this.elementHeight = window.innerHeight - 140;
            ut.setCssVar('--main-element-height', this.elementHeight.toString() + 'px');
        }
    },
    watch: {
        
    },
    mounted: function () {
       this.setHeight();
       ut.onResize(this.setHeight);
    },
    components: {
        ItemComponent
    }
});
</script>

<style lang="scss">
    @import "../styles/global.scss";
</style>
