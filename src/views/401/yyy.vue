<template>
    <div>
        <Table
        v-show="getActive"
        ref="tableRef"
        :rowClassName="getRowClassName"
        v-bind="getBindValues"
        @Change="handleChange"
        @resize-column="handleResizeColumn"
        >

        </Table>
    </div>
</template>

<script setup>
import { getActivePinia } from 'pinia';

const [registerTable,{reload}]=tableContext;


</script>

<style lang="scss" scoped>

</style>