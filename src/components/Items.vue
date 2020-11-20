<!-- src/components/Main.vue -->
<template>
    <div class="item-collection">
        <div class="item-container">
            <item-component :data="MainData.dataList" :index="MainData.dataList.length - 2" :showCover="coversEnabled"/>
        </div>
        <div class="item-container">
            <item-component :data="MainData.dataList" :index="MainData.dataList.length - 1" :showCover="coversEnabled"/>
        </div>
        <div class="item-container" v-for="(item, index) in MainData.dataList" :key="item.id">
            <item-component :data="MainData.dataList" :index="index" :showCover="coversEnabled"/>
        </div>
        <div class="item-container">
            <item-component :data="MainData.dataList" :index="0" :showCover="coversEnabled"/>
        </div>
        <div class="item-container">
            <item-component :data="MainData.dataList" :index="1" :showCover="coversEnabled"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ItemComponent from "./Item.vue";
import { ManageData } from "../scripts/ManageData";
import { Page } from "../classes/Page";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['showWings', 'mainItem'],
    data() {
        return {
            App: window.$App,
            MainData: window.$App.MainData,
            listIndex: 0,
            showWings: this.showWings,
            mainItem: this.mainItem,
            windowWidth: window.innerWidth
        }
    },
    methods: {
        changeItem: function(change: number): void {
            var el = document.querySelector('.item-collection') as HTMLElement;
            var lastIndex = this.MainData.dataList.length - 1;
            var newIndex = this.listIndex + change;

            this.listIndex = newIndex;

            setTimeout(() => {
                el.classList.add('no-transition');
                if (newIndex < 0) {
                    this.listIndex = lastIndex;
                }

                if (newIndex > lastIndex) {
                    this.listIndex = 0;
                }
                setTimeout(() => {
                    el.classList.remove('no-transition');  
                }, 50);
            }, 1000);
        }
    },
    components: {
        ItemComponent
    },
    watch: {
        listIndex: function () {
            ut.setCssVar('--item-transform', `${this.transform}px`);
        }
    },
    mounted() {
        ut.addEvent('change-item', () => {
            ut.setCssVar('--img-opacity', '0');
            setTimeout(() => {
                ut.setCssVar('--img-opacity', '1');
            },500);
        });

        ut.setCssVar('--item-transform', `${this.transform}px`);

        ut.addEvent('ArrowRight', () => { this.changeItem(1) }, 1100, 'slideshow');
        ut.addEvent('ArrowLeft', () => { this.changeItem(-1) }, 1100, 'slideshow');

        ut.addEvent('resize', () => { this.windowWidth = window.innerWidth; }, 100);
    },
    computed: {
        transform: function(): string {
            var widthAdjustment = Math.round(this.itemWidth/2) - this.itemWidth * 2;
            return ((this.listIndex * this.itemWidth * -1) + widthAdjustment).toString();
        },
        itemWidth: function(): number {
            var el = document.querySelector('.item-container') as HTMLElement;
            return el ? el.offsetWidth : 0;
        },
        coversEnabled: function(): boolean {
            var conversEnabled = false;
            if (this.windowWidth > 768) {
                conversEnabled = true;
            }
            return conversEnabled;
        }
    }
});
</script>

<style lang="scss"></style>
