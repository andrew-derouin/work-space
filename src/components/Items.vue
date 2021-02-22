<!-- src/components/Main.vue -->
<template>
    <div class="item-collection">
        <div class="item-container item-container-wing" v-for="(item, index) in MainData.dataList" :key="item.id">
            <item-component :data="MainData.dataList" :index="index" :showCover="coversEnabled"/>
        </div>
        <div class="item-container item-container-main" v-for="(item, index) in MainData.dataList" :key="item.id">
            <item-component :data="MainData.dataList" :index="index" :showCover="coversEnabled"/>
        </div>
        <div class="item-container item-container-wing" v-for="(item, index) in MainData.dataList" :key="item.id">
            <item-component :data="MainData.dataList" :index="index" :showCover="coversEnabled"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ItemComponent from "./Item.vue";
import * as ut from "../scripts/Utilities";
import { items } from "../data/items";

export default Vue.extend({
    props: ['showWings', 'mainItem'],
    data() {
        return {
            MainData: window.$App.MainData,
            showWings: this.showWings,
            windowWidth: window.innerWidth,
        }
    },
    methods: {
        changeItem: function (change: number): void {
            var el = document.querySelector('.item-collection') as HTMLElement;
            var lastIndex = this.MainData.dataList.length - 1;
            var newIndex = this.listIndex + change;

            window.$App.MainData.currentIndex = newIndex;

            newIndex = newIndex < 0 ? lastIndex : newIndex > lastIndex ? 0 : newIndex;

            window.$App.mainItem = window.$App.MainData.dataList[newIndex];
            ut.trigger('move-to', {page: 'slideshow', headline:  window.$App.mainItem.name});

            setTimeout(() => {
                el.classList.add('no-transition');

                window.$App.MainData.currentIndex = newIndex;

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

        ut.addEvent('resize', () => { 
            this.windowWidth = window.innerWidth;
            ut.setCssVar('--item-transform', `${this.transform}px`);
        }, 100);
    },
    computed: {
        listIndex: function (): number {
            return window.$App.MainData.currentIndex;
        },
        transform: function (): string {
            var firstWingWidth = document.querySelector('.item-container-wing') as HTMLElement;
            var widthAdjustment = (firstWingWidth?.offsetWidth * window.$App.MainData.dataList.length);
            var itemsOnScreen = (this.windowWidth/this.itemWidth)/2;

            return (((this.listIndex - itemsOnScreen + 0.5) * -this.itemWidth) - widthAdjustment).toString();
        },
        coversEnabled: function(): boolean {
            var conversEnabled = false;
            if (this.windowWidth > 768) {
                conversEnabled = true;
            }
            return conversEnabled;
        },
        mainItem: function (): any {
            return window.$App.MainData.dataList[this.listIndex];
        },
        itemWidth: function (): number {
            this.windowWidth;
            var el = document.querySelector('.item-container-main') as HTMLElement;
            return el ? el.offsetWidth : 0;
        }
    }
});
</script>

<style lang="scss"></style>
