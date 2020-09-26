<!-- src/components/Main.vue -->
<template>
    <div class="main-element">
        <div v-show="currentPage === 'slideshow'" class="item-collection">
            <item-component v-show="showWings" :data="mainData.dataList" :index="mainData.dataList.length -2" :position="-2" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="mainData.dataList.length -1" :position="-1" />
            <item-component :data="mainData.dataList" :index="listIndex" :position="0" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="listIndex + 1" :position="1" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="listIndex + 2" :position="2" />
        </div>
        <div v-show="currentPage === 'about'" class="about-collection">
            <about-component />
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
import AboutComponent from "./About.vue";
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
            currentPage: 'about',
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
            let mainObject: Object & { primaryColor: string, secondaryColor: string };

            if (this.currentPage === 'slideshow') {
                mainObject = this.mainItem;
            } else {
                mainObject = {
                    primaryColor: 'rgba(212, 22, 22, 1)',
                    secondaryColor: 'rgba(247, 233, 181, 1)'
                }
            }

            ut.setCssVar('--header-bg-color', mainObject.primaryColor);
            ut.setCssVar('--main-bg-color', mainObject.secondaryColor);
            ut.setCssVar('--footer-bg-color', mainObject.primaryColor);
            ut.setCssVar('--active-btn-bg-color', mainObject.primaryColor);
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

        window.addEventListener('move-to', ((e: CustomEvent & {page: string}) => {
            let page = e.detail.page;
            if (page) {
                this.currentPage = page;
                window.$App.setCurrentPage(page);
                this.setColors();
            } else {
                console.log('No designated page!')
            }
        }) as EventListener);

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
        ItemComponent,
        AboutComponent
    }
});
</script>

<style lang="scss">
    @import "../styles/global.scss";
</style>
