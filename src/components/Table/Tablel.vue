<template>
    <a-table bordered  
     :columns="columns" 
    :data-source="tableData.rows"
    style="margin: 20px 0 20px 0;">
    <template #bodyCell="{ column,record }">
      <slot :name="column.key" :record="record"></slot>
    </template>
  </a-table>

  
</template>

<script setup lang="ts">

    defineProps<{
     columns: any[],
    tableData: {
        rows: any[],
        total: number
    }
    }>()
    

</script>

<style scoped>

</style>