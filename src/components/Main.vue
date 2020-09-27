<!-- src/components/Main.vue -->
<template>
    <section class="main-element">
        <items-component v-show="currentPage.id === 'slideshow'" :showWings="showWings" />
        <about-component v-show="currentPage.id === 'about'" />
        <overlay-component />
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import ItemsComponent from "./Items.vue";
import AboutComponent from "./About.vue";
import OverlayComponent from "./Overlay.vue";
import { ManageData } from "../scripts/ManageData";
import { Page } from "../classes/Page";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: [],
    data() {
        return {
            App: window.$App,
            MainData: window.$App.MainData,
            elementHeight: '0',
            currentPage: window.$App.currentPage,
            mainItem: window.$App.mainItem,
            showWings: false
        }
    },
    methods: {
        setHeight: function(): void {
            if (window.innerWidth < 767.98) {
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

            if (this.currentPage.id === 'slideshow') {
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
    created: function () {
        this.setColors();

        ut.addEvent('main-item-change', () => {
            this.mainItem = this.App.mainItem;
            this.setColors();
        }, 100);

        ut.addEvent('move-to', (e: CustomEvent & {page: string}) => {
            let page = e.detail.page;
            if (page) {
                let nextPage = this.MainData.findPage(page);
                ut.trigger('show-overlay', { headline: nextPage.name });
            
                this.App.setActiveFor(1100);
                setTimeout(() => {
                    this.currentPage = nextPage;
                    
                    this.App.setCurrentPage(nextPage);
                    this.setColors();
                }, 500);
            } else {
                console.log('No designated page!')
            }
        }, 100);
    },
    mounted: function () {
       this.setHeight();
       ut.onResize(this.setHeight);
    },
    components: {
        ItemsComponent,
        AboutComponent,
        OverlayComponent
    }
});
</script>

<style lang="scss">
    @import "../styles/global.scss";
</style>
