<!-- src/components/Main.vue -->
<template>
    <div class="main-element">
        <div class="item-collection">
            <item-component v-show="showWings" :data="mainData.dataList" :index="mainData.dataList.length -2" :position="-2" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="mainData.dataList.length -1" :position="-1" />
            <item-component :data="mainData.dataList" :index="listIndex" :position="0" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="listIndex + 1" :position="1" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="listIndex + 2" :position="2" />
        </div>
        <div class="main-overlay" v-bind:class="{ 'active': showOverlay }">
            <div class="white-line"></div>
            <div>{{ mainItem.name }}</div>
            <div class="white-line"></div>
        </div>
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
            elementHeight: '0',
            showWings: false,
            showOverlay: false,
            mainItem: window.$App.mainItem
        }
    },
    methods: {
        setHeight: function(): void {
            if (window.innerWidth < 700) {
                this.showWings = false;
                this.elementHeight = '100%';
            } else {
                const header: HTMLElement = document.getElementsByClassName('header-element')[0] as HTMLElement;
                const footer: HTMLElement = document.getElementsByClassName('footer-element')[0] as HTMLElement;
                const heightAround: number = header.offsetHeight + footer.offsetHeight;

                this.elementHeight = (window.innerHeight - heightAround).toString() + 'px';
                this.showWings = true;
            }
            ut.setCssVar('--main-element-height', this.elementHeight);
        },
        setColors: function(): void {
            ut.setCssVar('--header-bg-color', this.mainItem.primaryColor);
            ut.setCssVar('--main-bg-color', this.mainItem.secondaryColor);
            ut.setCssVar('--footer-bg-color', this.mainItem.primaryColor);
            ut.setCssVar('--active-btn-bg-color', this.mainItem.primaryColor);
        }
    },
    watch: {

    },
    created: function () {
        this.setColors();

        window.addEventListener('main-item-change', () => {
            this.mainItem = window.$App.mainItem;
            this.setColors();
        });

        ut.debounceEventListener(1000, 'show-overlay', () => {
            this.showOverlay = true;
            setTimeout(() => {
                this.showOverlay = false;
            }, 1100);
        });
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
