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
        <div class="btn-case">
            <button class="btn btn-active" v-on:click="changeItem(1)">Next Item</button>
            <button class="btn btn-active" v-on:click="changeItem(-1)">Previous Item</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['data', 'index'],
    data() {
        return {
            listIndex: this.index,
            dataList: this.data,
            itemData: this.data[this.index]
        }
    },
    methods: {
        changeItem: function (change: number) {
            let newIndex = this.listIndex;
            let lastIndex = this.dataList.length - 1;

            newIndex += change;

            if (newIndex < 0) {
                newIndex = lastIndex;
            } else if (newIndex > lastIndex) {
                newIndex = 0;
            }

            this.listIndex = newIndex;
            this.itemData = this.dataList[newIndex];
        }
    }
});
</script>

<style></style>
