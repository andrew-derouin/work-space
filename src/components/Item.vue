<!-- src/components/Main.vue -->
<template>
    <div class="item-element">
        <div class="item-case" v-bind:style="{ backgroundImage: 'url(' + itemData.images[0] + ')' }">
            <div class="info">
                <div class="title">
                    {{itemData.name}}
                </div>
                <div class="description">
                    {{itemData.description}}
                </div>
            </div>
            <div class="screenshot-case">
                <div class="screenshot-element">
                    <img v-bind:src="itemData.images[1]" />
                </div>
                <div class="screenshot-element">
                    <img v-bind:src="itemData.images[2]" />
                </div>
            </div>
        </div>
        <div class="btn-case" v-bind:class="{ 'opacity-0': buttonClass }">
            <button class="btn btn-active" v-on:click="changeItem(1)">Next Item</button>
            <button class="btn btn-active" v-on:click="changeItem(-1)">Previous Item</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as ut from "../scripts/Utilities";

export default Vue.extend({
    props: ['data', 'index', 'position'],
    data() {
        return {
            element: document.getElementById('root'),
            listIndex: this.index,
            dataList: this.data,
            relativePosition: this.position,
            itemData: this.data[this.index],
            buttonClass: this.position !== 0
        }
    },
    methods: {
        changeItem: function (change: number): void {
            let newIndex = this.listIndex;
            let lastIndex = this.dataList.length - 1;

            newIndex += change;

            if (newIndex < 0) {
                newIndex = lastIndex;
            } else if (newIndex > lastIndex) {
                newIndex = 0;
            }

            this.animateChange(change);
            window.$App.setActiveFor(1100);
            setTimeout(() => {
                this.listIndex = newIndex;
                this.itemData = this.dataList[newIndex];
            }, 1000);
        },
        animateChange(change: number): void {
            if (this.element) {
                if (change < 0) {
                    this.element.classList.add('transform-right');
                } else {
                    this.element.classList.add('transform-left');
                }
                setTimeout(() => {
                    if (this.element) {
                        this.element.classList.add('no-transition');
                        this.element.classList.remove('transform-right', 'transform-left');
                        setTimeout(() => {
                            if (this.element) {
                                this.element.classList.remove('no-transition');
                            }
                        }, 100);
                    }
                }, 1000);
            }
        },
        setColors: function(): void {
            if (this.relativePosition === 0) {
                ut.setCssVar('--header-bg-color', this.itemData.primaryColor);
                ut.setCssVar('--main-bg-color', this.itemData.secondaryColor);
                ut.setCssVar('--footer-bg-color', this.itemData.primaryColor);
                ut.setCssVar('--active-btn-bg-color', this.itemData.primaryColor);
            }
        }
    },
    created() {
        this.setColors();

        window.addEventListener('ArrowRight', () => { this.changeItem(1) });
        window.addEventListener('ArrowLeft', () => { this.changeItem(-1) });
    },
    mounted() {
        this.element = document.getElementsByClassName('item-element')[this.position + 2] as HTMLElement;
    },
    watch: {
        itemData: function (val) {
            this.setColors();
        }
    }
});
</script>

<style></style>
