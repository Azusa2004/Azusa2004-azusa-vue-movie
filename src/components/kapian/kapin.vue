<template>
       <a-card :bordered="false" :bodyStyle="{ padding: '20px', background: '#fff', minHeight: '100px',borderRadius: '20px'}" >
        <div class="flex-bt" style="margin-bottom: var(--space-md);">
            <a-space>
                <slot name="toolbar"></slot>
            </a-space>
        </div>

        <slot></slot>
    </a-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>