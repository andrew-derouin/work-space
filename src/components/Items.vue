<!-- src/components/Main.vue -->
<template>
    <div class="item-collection">
        <item-component v-show="showWings" :data="MainData.dataList" :index="MainData.dataList.length -2" :position="-2" />
        <item-component v-show="showWings" :data="MainData.dataList" :index="MainData.dataList.length -1" :position="-1" />
        <item-component :data="MainData.dataList" :index="listIndex" :position="0" />
        <item-component v-show="showWings" :data="MainData.dataList" :index="listIndex + 1" :position="1" />
        <item-component v-show="showWings" :data="MainData.dataList" :index="listIndex + 2" :position="2" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ItemComponent from "./Item.vue";
import { ManageData } from "../scripts/ManageData";
import { Page } from "../classes/Page";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['showWings'],
    data() {
        return {
            App: window.$App,
            MainData: window.$App.MainData,
            listIndex: 0,
            showWings: this.showWings,
            mainItem: window.$App.mainItem
        }
    },
    created: function () {
        ut.addEvent('main-item-change', () => {
            this.mainItem = this.App.mainItem;
        }, 100);
    },
    components: {
        ItemComponent
    }
});
</script>

<style lang="scss"></style>
