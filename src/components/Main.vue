<!-- src/components/Main.vue -->
<template>
    <div class="main-element">
        <div class="item-collection">
            <item-component v-show="showWings" :data="mainData.dataList" :index="mainData.dataList.length -1" :position="-1" />
            <item-component :data="mainData.dataList" :index="listIndex" :position="0" />
            <item-component v-show="showWings" :data="mainData.dataList" :index="listIndex + 1" :position="1" />
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
            showWings: false
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
