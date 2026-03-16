<template>
            <a-select :placeholder=placeholder v-model:value='value'  allow-clear style="min-width: 200px;" >
            <a-select-option :value="item2[valueKey!]" v-for="item2 in options">{{ item2[labelKey!] }}</a-select-option>
            </a-select>

            
</template>

<script setup lang="ts">
    interface props{
        options:any[],
        valueKey?: string,//默认_id
        labelKey?: string,//默认name
        placeholder?:string,
    }

const props2= withDefaults(defineProps<props>(),{
    valueKey:'_id',
    labelKey:'name',
})
const value=defineModel('value');


</script>

<style scoped>
</style>